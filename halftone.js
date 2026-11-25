/* Original procedural halftones. No photographs or stock images are embedded.
   A rotated printing screen samples a soft ink field; only dots are displayed. */
'use strict';
window.Halftone = (() => {
  const NS = 'http://www.w3.org/2000/svg';
  const dot = (x,y,r) => `M${(x-r).toFixed(2)} ${y.toFixed(2)}a${r.toFixed(2)} ${r.toFixed(2)} 0 1 0 ${(2*r).toFixed(2)} 0a${r.toFixed(2)} ${r.toFixed(2)} 0 1 0 ${(-2*r).toFixed(2)} 0`;
  // Reserve space for the large screen first. Every finer layer uses the same
  // grid so it can occupy the paper between dots with a visible margin.
  function spacedDots(gap) {
    const cells = new Map(), cellSize = 12;
    let largest = 0;
    return (x, y, radius) => {
      const reach = radius + largest + gap;
      const column = Math.floor(x / cellSize), row = Math.floor(y / cellSize);
      const span = Math.ceil(reach / cellSize);
      for (let j = row - span; j <= row + span; j++) {
        for (let i = column - span; i <= column + span; i++) {
          const neighbors = cells.get(i + ',' + j);
          if (!neighbors) continue;
          for (const other of neighbors) {
            radius = Math.min(radius, Math.hypot(x - other.x, y - other.y) - other.radius - gap);
            if (radius < .28) return 0;
          }
        }
      }
      const key = column + ',' + row;
      if (!cells.has(key)) cells.set(key, []);
      cells.get(key).push({x, y, radius});
      largest = Math.max(largest, radius);
      return radius;
    };
  }
  function screen(width,height,spacing,sample,flow=false,place=null) {
    const groups = new Map(),angle=Math.PI/12,c=Math.cos(angle),s=Math.sin(angle);
    const extent=Math.hypot(width,height)/2+spacing;
    for(let v=-extent;v<extent;v+=spacing)for(let u=-extent;u<extent;u+=spacing){
      const gridX=width/2+u*c-v*s,gridY=height/2+u*s+v*c;
      // Gently bend the printing screen without introducing random scatter.
      const x=gridX+(flow?Math.sin(gridY*.014+gridX*.004)*2.2:0);
      const y=gridY+(flow?Math.sin(gridX*.012-gridY*.005)*1.8:0);
      if(x<0||y<0||x>=width||y>=height)continue;
      const value=sample(x,y);
      if(!value||value.density<.025)continue;
      // Adjacent cells sample the same continuous tone. Keep enough room at
      // peak density that the spacing pass rarely has to pinch a dark dot.
      const maxRadius=spacing*(flow ? .415 : .485);
      let radius=maxRadius*Math.pow(Math.min(1,value.density),.68);
      if(radius<.28)continue;
      if(place && !(radius=place(x,y,radius)))continue;
      const owner=value.owner||'trunk';
      if(!groups.has(owner))groups.set(owner,[]);
      groups.get(owner).push(dot(x,y,radius));
    }
    return groups;
  }
  function render(svg,width,height) {
    svg.querySelector('.halftone-art')?.remove();
    const mask=document.createElement('canvas');mask.width=width;mask.height=height;
    const ink=mask.getContext('2d',{willReadFrequently:true});
    const detail=document.createElement('canvas');detail.width=width;detail.height=height;
    const fine=detail.getContext('2d');
    // Split the trunk at actual takeoffs. This lets every upstream dot share
    // a highlight while dots beyond the selected fork can dim independently.
    const forks=[...svg.querySelectorAll('.branch[data-parent="tree-trunk"]:not(.root-path)')]
      .map(limb=>Number(limb.dataset.attachment)).sort((a,b)=>a-b);
    const ownership=new Map(), cellSize=48;
    for(const shape of svg.querySelectorAll('.tapered,.trunk-solid,.twig,.tip-path')){
      const d=shape.getAttribute('d'),path=new Path2D(d);
      if(shape.classList.contains('twig-shape')){
        ink.globalAlpha=1;ink.fill(path);
        fine.globalAlpha=1;fine.fill(path);
        // Preserve fine stippled definition even where a twig tapers below a pixel.
        fine.lineWidth=.65;fine.lineJoin='round';fine.stroke(path);
      }else if(shape.matches('.tapered,.trunk-solid')){
        ink.globalAlpha=1;ink.fill(path);
        fine.globalAlpha=1;fine.fill(path);
      }else if(shape.classList.contains('tip-path')){
        // Continue the parent's terminal width rather than restarting every
        // outcome branch as a thicker, darker constant-width stroke.
        const parent=svg.querySelector(`#${shape.dataset.parent}`);
        const startWidth=Math.min(7,Number(parent?.dataset.endWidth||1.4)*3);
        // Carry the paper stem's thickness into its three fine branches.
        const taper=shape.id==='tip-published-paper' ? .97 : parent?.id==='tip-published-paper' ? .72 : .45;
        const endWidth=startWidth*taper;
        shape.dataset.endWidth=endWidth/3;
        const length=shape.getTotalLength(),steps=Math.max(2,Math.ceil(length/2));
        for(const context of [ink,fine]){
          context.globalAlpha=1;context.lineCap='round';context.lineJoin='round';
          let previous=shape.getPointAtLength(0);
          for(let step=1;step<=steps;step++){
            const t=step/steps,point=shape.getPointAtLength(length*t);
            context.lineWidth=startWidth+(endWidth-startWidth)*t;
            context.beginPath();context.moveTo(previous.x,previous.y);
            context.lineTo(point.x,point.y);context.stroke();previous=point;
          }
        }
      }else{
        const root=shape.classList.contains('root-twig');
        ink.globalAlpha=shape.classList.contains('tip-path') ? .8 : root ? .64 : .38;
        ink.lineCap='round';
        ink.lineWidth=shape.classList.contains('tip-path') ? 7 : Math.max(2.8,Number(shape.getAttribute('stroke-width')||1)*3.4);
        ink.stroke(path);
        // Keep a sharper field for the fine limbs; the broad blur alone erases them.
        fine.globalAlpha=shape.classList.contains('tip-path') ? .88 : .78;
        fine.lineCap='round';fine.lineWidth=ink.lineWidth;
        fine.stroke(path);
      }
      const guide=document.createElementNS(NS,'path');
      guide.setAttribute('d',shape.dataset.centerline || d);
      svg.append(guide);
      const length=guide.getTotalLength(), samples=Math.max(1,Math.ceil(length/4));
      const startWidth=Number(shape.dataset.startWidth)*3.5 || 4;
      const endWidth=Number(shape.dataset.endWidth)*3 || 2;
      for(let i=0;i<=samples;i++){
        const t=i/samples, {x,y}=guide.getPointAtLength(length*t);
        let segment=shape.id;
        if(segment==='tree-trunk')segment='trunk:'+(forks.find(fork=>fork>=t) ?? 1);
        else if(shape.matches('.root-path,.root-twig'))segment='roots';
        else if(shape.matches('.twig'))segment='off-route';
        const key=Math.floor(x/cellSize)+','+Math.floor(y/cellSize);
        if(!ownership.has(key))ownership.set(key,[]);
        ownership.get(key).push({x,y,segment,radius:(endWidth+(startWidth-endWidth)*(1-t)**.95)/2});
      }
      guide.remove();
    }
    const soft=document.createElement('canvas');soft.width=width;soft.height=height;
    const tone=soft.getContext('2d',{willReadFrequently:true});
    tone.filter='blur(14px)';tone.drawImage(mask,0,0);
    tone.filter='none';tone.globalAlpha=.05;tone.drawImage(mask,0,0);
    const pixels=tone.getImageData(0,0,width,height).data;
    tone.clearRect(0,0,width,height);
    tone.globalAlpha=1;tone.filter='blur(2.2px)';tone.drawImage(detail,0,0);
    tone.filter='none';tone.globalAlpha=.18;tone.drawImage(detail,0,0);
    const finePixels=tone.getImageData(0,0,width,height).data;
    // A broad, low-density field gives the regular screen several rows of
    // progressively smaller dots beyond each branch, like printed halftone.
    tone.clearRect(0,0,width,height);
    tone.globalAlpha=1;tone.filter='blur(23px)';tone.drawImage(mask,0,0);
    const haloPixels=tone.getImageData(0,0,width,height).data;
    function segmentsAt(x,y){
      const column=Math.floor(x/cellSize),row=Math.floor(y/cellSize);
      let owner='off-route',nearest=Infinity;
      const shared=new Set();
      for(let j=row-2;j<=row+2;j++)for(let i=column-2;i<=column+2;i++){
        const samples=ownership.get(i+','+j);
        if(!samples)continue;
        for(const sample of samples){
          const distance=Math.hypot(sample.x-x,sample.y-y)-sample.radius;
          if(distance<nearest){nearest=distance;owner=sample.segment;}
          // Dots in a fork belong to each limb whose ink passes through
          // them. Include the first row of edge dots on narrow tip paths.
          if(distance<=5 && sample.segment!=='off-route')shared.add(sample.segment);
        }
      }
      if(!shared.size)return owner;
      if(owner!=='off-route')shared.add(owner);
      return [...shared].sort().join(' ');
    }
    const smoothstep=(low,high,value)=>{
      const t=Math.max(0,Math.min(1,(value-low)/(high-low)));
      return t*t*(3-2*t);
    };
    function shadeAt(x,y){
      const i=(Math.floor(y)*width+Math.floor(x))*4+3;
      const body=Math.max(pixels[i]/255,haloPixels[i]/255*.6),detail=finePixels[i]/255;
      // Every level receives the same modest core definition, so fine limbs
      // stay readable without gaining a stronger ink source than their parent.
      // Avoid spatial lighting waves that dim a parent before a brighter child.
      // Sample a broad shoulder of the silhouette for a gradual side light.
      // Its influence fades with branch width, keeping the tips delicate.
      const offsetIndex=(Math.floor(y)*width+Math.max(0,Math.floor(x)-20))*4+3;
      const sideLight=1-.23*body*(1-pixels[offsetIndex]/255);
      const density=Math.min(.98,body+(1-body)*detail*.24)*sideLight;
      return {density,broad:smoothstep(.15,.85,body),detail};
    }
    const coarseStep = width<1000?10:9;
    const place = spacedDots(width<1000?1.35:1.05);
    const groups=screen(width,height,coarseStep,(x,y)=>{
      const shade=shadeAt(x,y);
      const density=shade.density*(.72+.28*shade.broad);
      return density<.025?null:{density,owner:segmentsAt(x,y)};
    },true,place);
    // The center of each four-dot cell is the natural interstice on a rotated
    // screen. Follow the same warp as its corners and fit a smaller dot there.
    const extent=Math.hypot(width,height)/2+coarseStep;
    const angle=Math.PI/12, cosine=Math.cos(angle), sine=Math.sin(angle);
    for(let v=-extent+coarseStep/2;v<extent;v+=coarseStep)for(let u=-extent+coarseStep/2;u<extent;u+=coarseStep){
      const gx=width/2+u*cosine-v*sine, gy=height/2+u*sine+v*cosine;
      const x=gx+Math.sin(gy*.014+gx*.004)*2.2, y=gy+Math.sin(gx*.012-gy*.005)*1.8;
      if(x<0||y<0||x>=width||y>=height)continue;
      const shade=shadeAt(x,y);
      const requested=coarseStep*.14*shade.broad*shade.density;
      if(requested<.28)continue;
      const radius=place(x,y,requested);
      if(!radius)continue;
      const owner=segmentsAt(x,y);
      if(!groups.has(owner))groups.set(owner,[]);
      groups.get(owner).push(dot(x,y,radius));
    }
    // Add smaller dots only around narrow limbs; keep the wider fade on one
    // regular screen so its shrinking circles remain distinct and readable.
    const middle=screen(width,height,width<1000?4.7:4.2,(x,y)=>{
      const shade=shadeAt(x,y);
      const blend=(1-shade.broad)*smoothstep(.02,.45,shade.detail);
      const density=shade.density*blend*.42;
      return density<.025?null:{density,owner:segmentsAt(x,y)};
    },true,place);
    // Fine stippling continues under the entire form, thinning gradually as
    // larger dots take over. Seeded jitter keeps the shading reproducible.
    const grain=new Map();
    let seed=87241;
    const random=()=>{seed=(Math.imul(seed,1664525)+1013904223)>>>0;return seed/4294967296;};
    const grainStep=1.5;
    let grainCount=0;
    for(let gy=0;gy<height;gy+=grainStep)for(let gx=0;gx<width;gx+=grainStep){
      const x=gx+random()*grainStep,y=gy+random()*grainStep;
      if(x>=width||y>=height)continue;
      const shade=shadeAt(x,y);
      const density=shade.density*(.92-.54*shade.broad);
      // Where the limb tapers, trade coarse ink for a wider, lighter plume
      // of fine dots. Scatter from the existing field to follow each curve.
      const softness=1-shade.broad;
      if(density<.018||random()>Math.pow(density,.82)*.94*softness*softness*(.48+.52*shade.detail))continue;
      const radius=(.24+.46*Math.sqrt(density))*(.72+random()*.58);
      const spread=1+9*softness;
      const cloudX=x+(random()-random())*spread;
      const cloudY=y+(random()-random())*spread;
      const fitted=place(cloudX,cloudY,radius);
      if(!fitted)continue;
      const owner=segmentsAt(cloudX,cloudY);
      if(!grain.has(owner))grain.set(owner,[]);
      grain.get(owner).push(dot(cloudX,cloudY,fitted));grainCount++;
    }
    const art=document.createElementNS(NS,'g');art.setAttribute('class','halftone-art');
    let count=0;
    for(const [id,dots] of grain){
      const path=document.createElementNS(NS,'path');
      path.setAttribute('d',dots.join(''));path.setAttribute('class','halftone-ink stipple-shading');
      path.dataset.segment=id;
      art.append(path);
    }
    let middleCount=0;
    for(const [id,dots] of middle){
      const path=document.createElementNS(NS,'path');
      path.setAttribute('d',dots.join(''));path.setAttribute('class','halftone-ink transition-shading');
      path.dataset.segment=id;
      art.append(path);middleCount+=dots.length;
    }
    for(const [id,dots] of groups){
      const path=document.createElementNS(NS,'path');
      path.setAttribute('d',dots.join(''));path.setAttribute('class','halftone-ink');
      path.dataset.segment=id;
      art.append(path);count+=dots.length;
    }
    art.dataset.dots=count;art.dataset.shadingDots=grainCount;art.dataset.transitionDots=middleCount;art.dataset.spacing=width<1000?10:9;svg.append(art);
  }
  function swatch(width,height,spacing=5) {
    const groups=screen(width,height,spacing,(x,y)=>{
      const wave=Math.sin(x*.036+Math.sin(y*.038)*1.9);
      const other=Math.cos(x*.016-y*.047);
      const edge=Math.min(1,y/15,(height-y)/15);
      return {density:Math.max(0,(wave*.48+other*.28+.36))*edge};
    });
    return `<svg class="halftone-swatch" viewBox="0 0 ${width} ${height}" aria-hidden="true"><path d="${[...groups.values()].flat().join('')}"/></svg>`;
  }
  return {render,swatch};
})();
