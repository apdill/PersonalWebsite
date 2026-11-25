/* Interactive, fixed-seed previews of the Fractal Fluency generators. */
'use strict';
function mountFractalSlider(group) {
  const slider = group.querySelector('input');
  const output = group.querySelector('output');
  const contexts = [...group.querySelectorAll('canvas')].map(canvas => canvas.getContext('2d'));
  const size = 256, stride = size + 1;
  const field = new Float32Array(stride * stride);
  let seed = 14107;
  function random() {
    seed = (Math.imul(1664525, seed) + 1013904223) >>> 0;
    return (seed + 0.5) / 4294967296;
  }
  const noise = Float32Array.from(field, () =>
    Math.sqrt(-2 * Math.log(random())) * Math.cos(2 * Math.PI * random()));
  const angles = Float32Array.from({length:4096}, () => 0.26 + random() * 0.77);

  function terrain(d) {
    field.fill(0);
    const decay = 0.5 ** ((2 - d) / 2);
    let amplitude = 1;
    // Square centers, then edge midpoints, with a half-step in noise amplitude.
    for (let step = size; step >= 2; step /= 2) {
      const half = step / 2;
      for (let y = half; y < size; y += step) {
        for (let x = half; x < size; x += step) {
          const i = y * stride + x, row = half * stride;
          field[i] = (field[i-row-half] + field[i-row+half] +
                      field[i+row-half] + field[i+row+half]) / 4 + amplitude * noise[i];
        }
      }
      amplitude *= decay;
      for (let y = 0; y <= size; y += half) {
        for (let x = y % step === 0 ? half : 0; x <= size; x += step) {
          const i = y * stride + x;
          let sum = 0, count = 0;
          if (x >= half) { sum += field[i-half]; count++; }
          if (x+half <= size) { sum += field[i+half]; count++; }
          if (y >= half) { sum += field[i-half*stride]; count++; }
          if (y+half <= size) { sum += field[i+half*stride]; count++; }
          field[i] = sum / count + amplitude * noise[i];
        }
      }
      amplitude *= decay;
    }
  }

  function coastline(ctx) {
    const ordered = field.slice().sort();
    const level = ordered[Math.floor(ordered.length / 2)];
    // Interpolate contour crossings so edges move between pixels as D changes.
    for (let y = 0; y < size; y++) for (let x = 0; x < size; x++) {
      const i = y * stride + x;
      const a=field[i], b=field[i+1], c=field[i+stride+1], e=field[i+stride];
      const high = a >= level;
      if ((b >= level) === high && (c >= level) === high && (e >= level) === high) continue;
      const pts = [];
      if ((b >= level) !== high) pts.push([x+(level-a)/(b-a), y]);
      if ((b >= level) !== (c >= level)) pts.push([x+1, y+(level-b)/(c-b)]);
      if ((c >= level) !== (e >= level)) pts.push([x+(level-e)/(c-e), y+1]);
      if ((e >= level) !== high) pts.push([x, y+(level-a)/(e-a)]);
      if (pts.length === 4 && (((a+b+c+e)/4 >= level) !== high)) pts.push(pts.shift());
      for (let k=0; k<pts.length; k+=2) {
        ctx.moveTo(...pts[k]); ctx.lineTo(...pts[k+1]);
      }
    }
  }

  function mountain(ctx) {
    const row = field.subarray(size / 2 * stride, size / 2 * stride + stride);
    const low = Math.min(...row), high = Math.max(...row);
    for (let x=0; x<=size; x++) {
      const y = 245 - 234 * (row[x]-low)/(high-low);
      if (x===0) ctx.moveTo(x,y); else ctx.lineTo(x,y);
    }
  }

  function network(ctx, d) {
    const ratio = 2 ** (-1 / d), depth = 8;
    const first = 124 * (1-ratio) / (1-ratio**depth);
    let index = 0;
    function grow(x,y,angle,length,levels) {
      const endX=x+Math.cos(angle)*length, endY=y+Math.sin(angle)*length;
      ctx.moveTo(x,y); ctx.lineTo(endX,endY);
      if (levels>1) {
        grow(endX,endY,angle-angles[index++],length*ratio,levels-1);
        grow(endX,endY,angle+angles[index++],length*ratio,levels-1);
      }
    }
    for (let arm=0; arm<5; arm++) grow(128,128,arm*2*Math.PI/5-.7,first,depth);
  }

  let frame = 0;
  function draw() {
    frame = 0;
    if (!group.isConnected) return;
    const d=Number(slider.value);
    terrain(d);
    contexts.forEach((ctx,index)=>{
      ctx.setTransform(2,0,0,2,0,0);
      ctx.fillStyle='#101010'; ctx.fillRect(0,0,size,size);
      ctx.strokeStyle='#fff'; ctx.lineWidth=1; ctx.lineJoin='round'; ctx.beginPath();
      if (index===0) coastline(ctx);
      else if (index===1) mountain(ctx);
      else network(ctx,d);
      ctx.stroke();
    });
    output.value=d.toFixed(2);
  }
  slider.addEventListener('input',()=>{if (!frame) frame=requestAnimationFrame(draw);});
  group.querySelectorAll('button').forEach(button=>button.addEventListener('click',()=>{
    const enlarge=button.getAttribute('aria-pressed')!=='true';
    for(const other of group.querySelectorAll('button')) other.setAttribute('aria-pressed',String(enlarge && other===button));
  }));
  draw();
}
