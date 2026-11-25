/* The tree is an editorial map: coordinates control the composition, while
   project records below own the content, connections, and destination links. */
'use strict';
(() => {
  const records = {
    fracstack: {
      title: 'FracStack', subtitle: 'FRACTAL ANALYSIS · PYTHON', kind: 'OPEN SOURCE',
      x: 310, y: 418, path: 'M706 654 C701 586 552 550 486 497 S378 448 310 418', width: 6,
      deck: 'How does the detail in an image change as you zoom in?',
      body: 'FracStack lays grids of different sizes over an image. Box counting tracks how many boxes contain the pattern. Information dimension also accounts for how the foreground pixels are distributed among those boxes.',
      tags: ['Python', 'Fractal analysis', 'Image processing'], link: ['Explore the code', 'https://github.com/apdill/FracStack'], related: ['retinal', 'design', 'fluency']
    },
    fluency: {
      upstream: 'retinal',
      title: 'Fractal Fluency', subtitle: 'COMPUTER VISION · UNDER SUBMISSION', kind: 'UNDER SUBMISSION',
      x: 510, y: 253, path: 'M723 462 C714 390 631 388 597 346 S552 277 510 253', width: 4.7,
      deck: 'Can a model trained on coastlines measure the fractal dimension of a branching network?',
      body: 'We train DenseNet121 and a vision transformer (ViT-B/16) to estimate fractal dimension. We call a model fluent when its prediction error falls within the uncertainty of box counting. We test that criterion on a family of shapes left out of training.',
      samples:[
        ['coastline','Coastline','An irregular coastline with inlets and scattered islands'],
        ['mountain','Mountain profile','A jagged height profile with peaks at several scales'],
        ['branch','Branching network','A network of fine branches extending from larger limbs']
      ],
      tags: ['Fractal dimension', 'Computer vision', 'Generalization'], related: ['fracstack', 'nnis']
    },
    retinal: {
      title: 'Retinal Neuron Fractality', subtitle: 'NEURONS · ELECTRODE DESIGN', kind: 'PUBLICATION',
      junction: 'nnis',
      deck: 'Could an electrode connect more effectively to retinal neurons if its pattern of branches matched theirs?',
      body: 'My paper, Evolution of Retinal Neuron Fractality, explores this idea through fractal dimension, a measure of how branching detail changes with scale.',
      tags: ['Neurons', 'Electrode design', 'Fractal resonance'], link: ['Read the publication', 'https://www.mdpi.com/2306-5354/11/8/823'], related: ['nnis', 'fluency', 'fracstack']
    },
    nnis: {
      upstream: 'retinal',
      title: 'NNIS', subtitle: 'NEURONAL INSTANCE SEGMENTATION', kind: 'IN PROGRESS',
      x: 1030, y: 388, path: 'M735 522 C763 478 864 462 908 442 S993 402 1030 388', width: 5,
      deck: 'Where does one neuron end and the next begin in a microscopy image?',
      body: 'I’m developing NNIS to assign each neuron its own mask. That makes it possible to study individual cells within a field of neuronal tissue.',
      tags: ['Instance segmentation', 'Microscopy', 'Deep learning'], related: ['retinal', 'fluency']
    },
    design: {
      title: '13&9 Collaboration', subtitle: 'FRACTAL PATTERN ANALYSIS', kind: 'IN PROGRESS',
      x: 1070, y: 677, path: 'M705 666 C737 619 845 674 919 673 S1019 671 1070 677', width: 4.7,
      
      body: 'In my collaboration with 13&9 Design, I use fractal measurements to compare visual patterns and inform design choices.',
      link: ['13&9 Design website', 'https://www.13and9design.com/'],
      extraLinks: [['13&9 Design on LinkedIn', 'https://www.linkedin.com/company/13-9-design/']],
      showcase: {
        title: 'Fractal Chapel',
        src: 'https://www.13and9design.com/wp-content/uploads/HAA4.jpg',
        page: 'https://innocad.at/project/fractal-chapel/',
        alt: 'Daylight passes through white screens perforated with branching patterns around wooden benches and a sculpted wooden altar.',
        caption: 'At University Hospital Graz, daylight filters through fractal openings in the chapel screens. INNOCAD architecture designed the space with 13&9 Design and Fractals Research.',
        credit: 'Photograph © Paul Ott'
      },
      tags: ['Fractal analysis', 'Design', 'Pattern recognition'], related: ['fracstack', 'fluency']
    },
    robot: {
      title: 'Side/Old Projects', subtitle: 'ROBOTICS · SIMULATION', kind: 'SIDE PROJECT / ARCHIVE', secondary: true,
      x: 420, y: 683, left: true, path: 'M713 728 C702 687 603 710 548 700 S459 678 420 683', width: 3,
      
      body: 'One project maps gestures to a robot arm. The other models how activity changes the connections between simulated neurons.',
      tags: ['Arduino', 'MPU 6050', 'Robotics'], related: ['about']
    },
    resume: {
      title:'Résumé', subtitle:'2026 · PDF', kind:'RÉSUMÉ', root:true,
      x:578,y:932,path:'M720 765 C702 803 670 813 651 855 S607 917 578 932',width:3.2,
      link:['Open résumé (PDF)','artifacts/Aiden_Dillon_Resume_2026.pdf'], related:['education','contact']
    },
    education: {
      title: 'Education', subtitle: 'PHYSICS · MATHEMATICS', kind: 'BACKGROUND / EDUCATION', root: true,
      x: 470, y: 862, left: true, path: 'M720 765 C681 795 620 797 580 823 S505 849 470 862', width: 4,
      
      body: 'I studied Physics at Cal Poly San Luis Obispo, with a minor in Mathematics (2018–2022), before beginning doctoral research at the University of Oregon in 2022.',
      outputTitle: 'Research experience', outputs: ['2020 · Simulation-based analysis of sparse carbon nanotube networks for biosensing at Cal Poly.', '2021 · Research data collection design and academic poster presentations at Cal Poly.', '2022–present · Graduate research in fractals, neurons, computer vision, and electrode design at the University of Oregon.'],
      tags: ['Physics', 'Mathematics', 'Simulation'], related: ['about', 'retinal']
    },
    about: {
      title: 'Aiden Dillon', subtitle: 'PHYSICS PH.D. CANDIDATE', kind: 'BACKGROUND / ABOUT', root: true, center: true,
      x: 735, y: 904, path: 'M720 765 C713 817 752 845 735 904', width: 5,
      deck: 'Physics Ph.D. candidate, University of Oregon.',
      body: 'I study the branching geometry of retinal neurons and develop computer vision tools to measure it.',
      outputTitle: 'Methods & skills', outputs: ['Python, PyTorch, deep learning, and computer vision.', 'Image analysis, microscopy, and cell culture.', 'Physics, fractal analysis, and neural interface research.'],
      tags: ['Eugene, Oregon', 'University of Oregon'], related: ['education', 'contact', 'retinal']
    },
    contact: {
      title: 'Contact', subtitle: 'EMAIL · GITHUB · LINKEDIN', kind: 'BACKGROUND / CONTACT', root: true,
      x: 980, y: 853, path: 'M720 765 C772 802 808 790 854 815 S934 840 980 853', width: 3.7,
      
      body: 'Email me about a project or research collaboration.',
      tags: ['Eugene, Oregon'], link: ['aidend@uoregon.edu', 'mailto:aidend@uoregon.edu'],
      extraLinks: [['GitHub', 'https://github.com/apdill'], ['LinkedIn', 'https://www.linkedin.com/in/aidendillon/']], related: ['about']
    }
  };

  // Each selectable tip opens a concrete outcome or artifact.
  const tips = [
    {
      id: "box-counting",
      artifact: {
        title: 'One branching pattern, two grid sizes',
        panels: [
          ['box-grid-256.png','256 px · 43 boxes','Coarse grid over the branching test image, with occupied squares shaded.'],
          ['box-grid-128.png','128 px · 102 boxes','The same branching image under a finer grid with more occupied squares.']
        ],
        caption: 'Each tinted square contains at least one foreground pixel. Halving the box width raises the count from 43 to 102. At 8 pixels, 2,225 boxes are occupied. Fitting all six scales with the grid fixed at the upper left gives D₀ ≈ 1.13 for this branching image.',
        download: ['box-counts.csv','Download counts at six scales (CSV)'],
        images:[{
          file:'fracstack-koch.png',title:'A reference shape',
          alt:'Koch snowflake outline, three progressively finer grids, and a fitted line on a log-count versus log-width plot.',
          caption:'Each segment of the ideal Koch boundary splits into four segments one-third as long. Its capacity dimension is log(4) / log(3), about 1.26. In the plot, smaller boxes lie to the left, so D₀ is the magnitude of the downward slope.'
        }]
      },
      deck: "How quickly does a pattern occupy more boxes as the grid gets finer?",
      body: "Lay a grid over the same image at several box sizes. At each size, count the boxes that intersect the pattern. On a log–log plot of count against inverse box size, the slope estimates the box-counting dimension over the scales examined.",
      parent:'fracstack',x:171,y:327,title:'Capacity Dimension',left:true,path:'M310 418 Q238 401 216 365 T171 327'},
    {
      id:'information-dimension', parent:'fracstack', title:'Information Dimension',
      x:316,y:284,left:true,path:'M310 418 C321 386 326 333 316 284',
      artifact:{images:[
        {
          title:'Where the pixels fall',file:'fracstack-box-mass.png',
          alt:'A branching outline on a grid of 256-pixel boxes. Darker boxes contain a larger share of the foreground.',
          caption:'This grid has 43 occupied boxes. The fullest contains 8.5% of the foreground pixels. If all 43 boxes held equal shares, their entropy would be log₂(43), or 5.43 bits. The uneven distribution shown here gives 4.70 bits.'
        },
        {title:'From entropy to dimension',file:'fracstack-entropy.png',
        alt:'Entropy rises from 4.28 bits at a box width of 256 pixels to 10.59 bits at 8 pixels. The fitted slope gives an information dimension of 1.24.',
        caption:'For each box, p is its share of the foreground. Shannon entropy is −Σ p log₂(p), summed over occupied boxes. Here each point averages four grid placements, so it can differ from the single grid above. The slope against log₂(1 / box width) gives D₁ ≈ 1.24 over 8–256 pixels.'
        }]}
    },
    {
      id:'fracstack-app', parent:'fracstack', title:'Desktop App',
      x:166,y:425,left:true,path:'M310 418 C265 400 209 431 166 425',
      deck:'I built FracStack’s desktop app to measure the fractal dimension of an image and test how much the estimate depends on how I prepare it.',
      body:'Choose the range of box sizes for one image, or apply the same range to a batch so the measurements are comparable. The app can repeat the analysis at several intensity thresholds, with edge detection on and off, and export the results to a CSV for comparison.',
      artifact:{icon:'fracstack-app.png',caption:'Private desktop interface for the FracStack Python package.',
        images:[{file:'fracstack-desktop.png',title:'Choosing the measurement range',
          alt:'FracStack desktop interface with a processed mask beside its log–log scaling plot and fitted dimension.',
          caption:'The fine and coarse cutoffs set which points contribute to the slope. For this branching outline, box widths from 8 to 124 pixels give a capacity dimension of 1.77.'}]}
    },
    {
      id: "published-paper",
      link: records.retinal.link,
      deck: "The branching geometry of retinal neurons changed as they interacted with an electrode.",
      body: "The study used in vitro images of mouse retinal neurons interacting with carbon nanotube electrodes. The finding matters for implant design because the geometry an electrode is meant to match can itself change during contact.",
      parent:'retinal',x:724,y:398,title:'Published paper',path:'M717 423 C720 413 722 407 724 398',fork:'M724 398 C730 369 755 364 773 334'},
    {
      id: 'retinal-micrograph', parent: 'published-paper', title: 'Cell culturing',
      x: 635, y: 188, path: 'M724 398 C728 361 707 345 678 316 S652 272 655 252 C659 220 647 205 635 188',
      crown: 'M635 188 C623 171 609 169 591 157 S560 126 541 114 S497 100 467 78',
      artifact: {
        images: [
          {file:'retinal-published-sem.webp', title:'Cells on the electrode',
           alt:'Blue cell bodies and orange processes on a textured gray surface.',
           caption:'A false-colored electron micrograph shows the culture at 17 days. Blue marks cell bodies and orange marks the processes connecting them. Scale bar, 25 µm.'},
          {file:'retinal-fluorescence.webp', title:'The whole culture',
           alt:'Red neurons cover a square electrode, with green glial cells concentrated around its edges.',
           caption:'Fluorescence microscopy at 17 days shows how neurons (red) and glia (green) occupy the electrode and the surrounding surface. Scale bar, 500 µm.'},
          {file:'electrode-sem.webp', title:'The electrode surface',
           alt:'Two grayscale electron micrographs show a nanotube sidewall and a branching pattern viewed from above.',
           caption:'The side view shows the vertically aligned nanotubes (10 µm scale bar). The overhead view shows a patterned electrode (250 µm scale bar). The cultures in this study grew on square electrodes.'},
          {file:'retinal-network-trace.webp', title:'Tracing the network',
           alt:'Thin red traces follow neuronal processes across a fluorescence micrograph.',
           caption:'At 17 days, the red overlay follows processes identified by the tracing algorithm across the network. Scale bar, 200 µm.'}
        ],
        paperCredit:true
      }
    },
    {
      id: 'retinal-box-counting', parent: 'published-paper', title: 'Box counting',
      x: 804, y: 140, sharedFork:true, path: 'M773 334 C786 311 778 292 765 270 S746 233 753 212 C763 183 800 174 804 140',
      crown: 'M804 140 C807 113 799 103 780 88 S744 56 740 28',
      artifact: {
        file:'retinal-box-counting.png', paperCredit:true,
        alt:'Two rows show a neuron in fluorescence, its isolated branching trace, and a scaling plot. The fitted dimensions are 1.18 at 7 days and 1.11 at 17 days for the two examples.',
        caption:'Each row follows one neuron from micrograph to traced branches to a scaling plot. Counting the grid boxes touched by the trace at several box widths gives its fractal dimension from the magnitude of the log–log slope. The top row shows a neuron at 7 days in culture and the bottom row one at 17 days.'
      }
    },
    {
      id: 'retinal-morphology', parent: 'published-paper', title: 'Time evolution',
      x: 949, y: 263, sharedFork:true, path: 'M773 334 C790 307 822 308 854 310 S906 307 924 292 S944 275 949 263',
      crown: 'M949 263 C957 244 960 230 979 217 S1044 209 1072 182 S1108 154 1162 146',
      artifact: {
        file: 'retinal-morphology.png',
        alt: 'Bar chart comparing 7 and 17 days in culture. Mean fractal dimension falls from about 1.20 to 1.10, normalized process length decreases, and convex hull area increases.',
        caption: 'At day 17, the branches spanned a larger area on average and had a lower fractal dimension than at day 7. Each color has its own vertical scale. Error bars show the standard error of the mean.'
      }
    },
    {
      id:'microscopy-masks', parent:'nnis', title:'GAN translation',
      x:1253,y:329,path:'M1030 388 Q1124 393 1163 365 T1253 329',
      artifact:{
        file:'nnis-gan-comparison.png',
        comparison:['nnis-generated-mask.png','nnis-gan-translation.png'],
        caption:'Slide across the generated network to see how a generative adversarial network (GAN) renders the same branches in the style of our microscope images.'
      }
    },
    {
      id:'network-growth', parent:'nnis', title:'Network growth',
      x:1101,y:280,path:'M1030 388 Q1079 339 1101 280',
      artifact:{
        file:'nnis-network-growth.gif?v=green-dark',
        alt:'Green simulated neurons extend branching processes across a dark field.',
        caption:'A simplified simulation follows the generated cells as their branches grow across the field.'
      }
    },
    {
      id:'area-plasticity', parent:'robot', title:'Neuronal network criticality',
      x:256,y:716,left:true,path:'M420 683 C362 684 320 714 256 716',
      deck:'If neurons adjust their connections to maintain a firing rate, how far can a burst of spikes spread?',
      body:'I simulated 100 spiking neurons for 1,000 seconds with a target of five spikes per second per neuron. Their firing rates settled near the target. Most bursts were small, but a few accumulated thousands of spikes. This run did not establish scale-free avalanche behavior.',
      artifact:{images:[
        {file:'area-plasticity.gif?v=loop',title:'Activity-dependent growth',
          alt:'Circles expand or contract and flash green when the simulated neurons spike.',
          caption:'Each circle grows when its neuron fires below the target rate and shrinks when it reaches or exceeds it. Overlapping area sets the strength of the connection between two neurons.'},
        {file:'criticality-avalanche-sizes.png?v=log-log',title:'Avalanche sizes',
          alt:'Log–log plot of avalanche size against probability density. Small bursts are common and the largest bursts form a sparse tail.',
          caption:'Each blue point gives the density of bursts in one size bin. Size is the total spike count across consecutive 0.1-second steps with at least 50 spikes per step. Both axes use logarithmic scales.'},
        {file:'criticality-firing-rates.png?v=low-target',title:'Firing rates at a lower target',
          alt:'Firing-rate heatmap for 100 neurons. Yellow and blue bands vary across neurons early in the run and become greener as rates approach 0.2 spikes per second.',
          caption:'In a separate run, I set the target to 0.2 spikes per second. Each row follows one neuron over 10,000 steps. Yellow and blue show rates above and below the target as the network adjusts.'}
      ]}
    },
    {
      id: "arduino-robot-arm",
      link: ['Watch the demonstration', 'https://www.youtube.com/watch?v=u0LKt7FbUtw&t=104s'],
      videoPreview: 'https://i.ytimg.com/vi/u0LKt7FbUtw/hqdefault.jpg',
      deck: "A motion sensor supplies the input. Servo motors turn it into movement.",
      body: "This earlier Arduino build used an MPU 6050 to track movement and drive the arm. The video shows how the physical arm follows the person controlling it.",
      parent:'robot',x:272,y:605,title:'Arduino robot arm',left:true,path:'M420 683 C366 681 335 612 272 605'}
  ];

  const notes = {...records, ...Object.fromEntries(tips.map(tip=>[tip.id,tip]))};

  function lineage(id) {
    const path = [id];
    let parent;
    while ((parent = notes[path[0]].parent || notes[path[0]].upstream)) path.unshift(parent);
    return path;
  }
  function owningProject(id) {
    while (notes[id].parent) id=notes[id].parent;
    return id;
  }
  function segmentId(id) {
    return (notes[id].parent ? 'tip-' : 'limb-') + id;
  }

  const $ = s => document.querySelector(s);
  const scene = $('#tree-scene');
  const viewport = $('#map');
  const ns = 'http://www.w3.org/2000/svg';
  function svgEl(tag, attrs, parent) {
    const element = document.createElementNS(ns, tag);
    for (const [key,value] of Object.entries(attrs)) element.setAttribute(key,value);
    parent.append(element);
    return element;
  }
  // These hidden silhouettes define ink density, not visible filled branches.
  // The halftone screen renders the final tree as individual circular dots.
  function tapered(d, startWidth, endWidth, attrs, parent) {
    const sourceStart=startWidth,sourceEnd=endWidth;
    startWidth*=3.5;endWidth*=3;
    const guide=svgEl('path',{d,visibility:'hidden'},parent);
    const length=guide.getTotalLength(),steps=Math.max(35,Math.ceil(length/3));
    const left=[],right=[];
    for(let i=0;i<=steps;i++) {
      const t=i/steps,s=t*length,p=guide.getPointAtLength(s);
      const a=guide.getPointAtLength(Math.max(0,s-.6)),b=guide.getPointAtLength(Math.min(length,s+.6));
      const dx=b.x-a.x,dy=b.y-a.y,n=Math.hypot(dx,dy)||1;
      // Keep volume through each curve and taper gently into its terminal node.
      const radius=(endWidth+(startWidth-endWidth)*Math.pow(1-t,.95))/2;
      left.push(`${(p.x-dy/n*radius).toFixed(2)},${(p.y+dx/n*radius).toFixed(2)}`);
      right.push(`${(p.x+dy/n*radius).toFixed(2)},${(p.y-dx/n*radius).toFixed(2)}`);
    }
    guide.remove();
    return svgEl('path',{d:`M${left.join(' L')} L${right.reverse().join(' L')}Z`,'data-centerline':d,'data-start-width':sourceStart,'data-end-width':sourceEnd,...attrs},parent);
  }
  // Resolve attachments against the actual curve, never a nearby control point.
  function attachment(parentId,x,y) {
    const shape=document.getElementById(parentId);
    const guide=svgEl('path',{d:shape.dataset.centerline||shape.getAttribute('d'),visibility:'hidden'},$('.tree-drawing'));
    const length=guide.getTotalLength();
    const distance=s=>{const p=guide.getPointAtLength(s);return (p.x-x)**2+(p.y-y)**2;};
    let best=0,error=Infinity;
    for(let s=0;s<=length;s+=3){const e=distance(s);if(e<error){best=s;error=e;}}
    if(distance(length)<error)best=length;
    let low=Math.max(0,best-3),high=Math.min(length,best+3);
    for(let i=0;i<20;i++){const a=low+(high-low)/3,b=high-(high-low)/3;if(distance(a)<distance(b))high=b;else low=a;}
    const s=(low+high)/2,p=guide.getPointAtLength(s),a=guide.getPointAtLength(Math.max(0,s-.3)),b=guide.getPointAtLength(Math.min(length,s+.3));
    const t=s/length,start=Number(shape.dataset.startWidth||2)*3.5,end=Number(shape.dataset.endWidth||1)*3;
    guide.remove();
    return {x:p.x,y:p.y,angle:Math.atan2(b.y-a.y,b.x-a.x),width:end+(start-end)*Math.pow(1-t,.95),t};
  }
  function attachedPath(d,parentId,reverse=false) {
    const numbers=d.match(/^M([\d.-]+) ([\d.-]+) C([\d.-]+) ([\d.-]+)/);
    const p=attachment(parentId,Number(numbers[1]),Number(numbers[2]));
    const reach=Math.hypot(Number(numbers[3])-Number(numbers[1]),Number(numbers[4])-Number(numbers[2]));
    const angle=p.angle+(reverse?Math.PI:0);
    return {d:d.replace(/^M[\d.-]+ [\d.-]+ C[\d.-]+ [\d.-]+/,`M${p.x} ${p.y} C${p.x+Math.cos(angle)*reach} ${p.y+Math.sin(angle)*reach}`),t:p.t};
  }
  const escapeHTML = value => String(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  let hoverTimer;
  function node(id, data, target = `limb-${id}`) {
    const tip=target.startsWith('tip-');
    const button = document.createElement('button');
    button.className = `tree-node${data.root?' root':''}${tip?' tip':''}${data.left?' left-label':''}${data.center?' center-label':''}${data.secondary?' secondary':''}`;
    if(!tip)button.classList.add('annotated-node');
    button.style.left = `${data.x}px`;
    button.style.top = `${data.y}px`;
    button.dataset.project = id;
    button.dataset.target = target;
    button.dataset.note = data.id || id;
    button.dataset.x = data.x;
    button.dataset.y = data.y;
    button.setAttribute('aria-label', `${data.title}${tip?` — ${data.artifact?'artifact':'outcome'} of ${notes[data.parent].title}`:` — ${data.kind.toLowerCase()}`}`);
    button.setAttribute('aria-haspopup','dialog');
    button.innerHTML = `<span class="node-dot" aria-hidden="true"></span><span class="node-label"><span class="node-title">${escapeHTML(data.title)}</span>${data.subtitle?`<span class="node-sub">${escapeHTML(data.subtitle)}</span>`:''}</span>`;
    button.addEventListener('click', () => { if (!dragged) openRecord(tip ? data.id : id); });
    button.addEventListener('pointerenter',event=>{
      clearTimeout(hoverTimer);
      if(event.pointerType==='touch')return;
      if(data.root)highlight(null);
      else hoverTimer=setTimeout(()=>highlight(button),140);
    });
    button.addEventListener('pointerleave',()=>{
      clearTimeout(hoverTimer);
      highlight(null);
    });
    button.addEventListener('focus',()=>{
      clearTimeout(hoverTimer);
      highlight(button);
      ensureVisible(button);
    });
    button.addEventListener('blur',()=>{clearTimeout(hoverTimer);highlight(null);});
    $('#tree-nodes').append(button);
  }
  const trunkGuide=$('.trunk'),trunkLength=trunkGuide.getTotalLength();
  for (const [id, record] of Object.entries(records)) {
    let d=record.junction?records[record.junction].path:record.path;
    let startWidth=0,position=0;
    if(!record.junction)startWidth=record.width*(record.root?3.6:2);
    if(!record.root){
      const targetY=Number(d.match(/^M[\d.]+ ([\d.]+)/)[1]);
      let nearest=null,distance=Infinity;
      for(let i=0;i<=500;i++){const p=trunkGuide.getPointAtLength(trunkLength*i/500),gap=Math.abs(p.y-targetY);if(gap<distance){distance=gap;nearest=p;position=i/500;}}
      if(record.junction){record.x=nearest.x;record.y=nearest.y;}
      else d=d.replace(/^M[\d.]+ [\d.]+/,`M${nearest.x} ${nearest.y}`);
      startWidth=Math.min(startWidth,(6+20*Math.pow(1-position,1.2))*.86);
    }
    if(!record.junction)tapered(d,startWidth,record.root?2.6:1.4,{id:`limb-${id}`,class:`branch tapered ${record.root?'root-path':''}`,'data-project':id,'data-parent':'tree-trunk','data-attachment':position},record.root?$('#root-paths'):$('#branch-paths'));
    node(id,record);
    const option = document.createElement('option'); option.value=id; option.textContent=record.title;
    $('#jump').append(option);
  }
  function drawTip(id, parent, path, layout={}) {
    const project=owningProject(parent);
    if(layout.fork){
      const trunk=$('#tree-trunk');
      tapered(path,Number(trunk.dataset.endWidth)*3/3.5,4,{id,class:'branch tapered','data-project':parent,'data-parent':'tree-trunk','data-attachment':1},$('#branch-paths'));
      tapered(layout.fork,3.55,3.25,{id:'paper-fork',class:'tapered','data-project':project,'data-parent':id},$('#branch-paths'));
      return;
    }
    if(layout.crown){
      const parentSegment=notes[id.slice(4)].sharedFork?'paper-fork':segmentId(parent);
      tapered(path,2.85,2.1,{id,class:'tapered','data-project':project,'data-parent':parentSegment},$('#branch-paths'));
      tapered(layout.crown,1.8,.55,{id:'crown-'+id,class:'tapered','data-project':project,'data-parent':id},$('#branch-paths'));
      return;
    }
    svgEl('path',{id,d:path,class:'tip-path','data-project':project,'data-parent':segmentId(parent)},$('#tip-paths'));
  }
  tapered(trunkGuide.getAttribute('d'),26,6,{id:'tree-trunk',class:'trunk-solid'},$('.trunk-group'));
  for (const tip of tips) {
    const id=`tip-${tip.id}`;
    drawTip(id,tip.parent,tip.path,tip);
    node(owningProject(tip.id),tip,id);
  }
  // Keep the unlabeled twigs in the canopy as part of the drawing.
  drawTip('canopy-1','fluency','M510 253 C485 227 456 204 455 165');
  drawTip('canopy-2','fluency','M510 253 Q555 201 565 168 T596 109');
  drawTip('canopy-5','design','M1070 677 Q1150 673 1179 636 T1254 610');
  drawTip('canopy-6','design','M1070 677 C1101 696 1120 728 1152 741 S1212 752 1233 758');
  trunkGuide.remove();
  const extraRoots=[
    ['M716 771 C704 818 650 830 632 867 C611 909 585 907 557 938',12,1.1],
    ['M726 777 C732 834 797 845 819 890 C842 933 861 929 880 960',11,1.1],
    ['M582 822 C574 864 520 870 480 906 C449 934 414 914 389 945',7,1],
    ['M849 812 C854 855 915 859 949 894 C990 933 1022 913 1055 947',7,1]
  ];
  extraRoots.forEach(([d,start,end],index)=>{
    const parentId=index%2?'limb-contact':'limb-education',joined=attachedPath(d,parentId);
    tapered(joined.d,start,end,{id:`root-extra-${index}`,class:'branch tapered root-path','data-project':'about','data-parent':parentId,'data-attachment':joined.t},$('#root-paths'));
  });

  // Deterministic recursive branching adds self-similarity without random layout shifts.
  let seed=419;
  const random=()=>{seed=(seed*1664525+1013904223)>>>0;return seed/4294967296;};
  let twigId=0;
  function twig(x,y,length,angle,depth,root=false,parentAngle=angle,width=5,parentId='',project='',attachmentT=1) {
    if (!depth || length<4) return;
    const desiredTurn=Math.atan2(Math.sin(angle-parentAngle),Math.cos(angle-parentAngle));
    const turn=Math.max(-.58,Math.min(.58,desiredTurn));
    angle=parentAngle+turn;
    const endX=x+Math.cos(angle)*length,endY=y+Math.sin(angle)*length;
    const c1x=x+Math.cos(parentAngle)*length*.42,c1y=y+Math.sin(parentAngle)*length*.42;
    const endAngle=parentAngle+turn*1.2;
    const c2x=endX-Math.cos(endAngle)*length*.3,c2y=endY-Math.sin(endAngle)*length*.3;
    const id=`twig-${twigId++}`,endWidth=depth===1?Math.min(.65,width*.55):Math.max(.65,width*.77);
    tapered(`M${x} ${y} C${c1x} ${c1y} ${c2x} ${c2y} ${endX} ${endY}`,width/3.5,endWidth/3,{id,class:`twig twig-shape${root?' root-twig':''}`,'data-parent':parentId,'data-attachment':attachmentT,'data-project':project,'data-turn-degrees':Math.abs(turn*1.2*180/Math.PI)},$('#fine-branches'));
    const leftLength=length*(.64+random()*.1),leftAngle=angle-.26-random()*.23;
    const rightLength=length*(.59+random()*.15),rightAngle=angle+.24+random()*.24;
    // Finish each small fork with one flowing tip, leaving breathing room
    // between silhouettes instead of doubling into a thicket of tiny wisps.
    twig(endX,endY,leftLength,depth===2?endAngle:leftAngle,depth-1,root,endAngle,endWidth*.94,id,project);
    if(depth>2)twig(endX,endY,rightLength,rightAngle,depth-1,root,endAngle,endWidth*.82,id,project);
    if(depth===1&&!root&&random()>.55)svgEl('ellipse',{cx:endX,cy:endY,rx:2.4,ry:1.2,transform:`rotate(${angle*180/Math.PI} ${endX} ${endY})`,class:'growth-mark'},$('#growth-marks'));
  }
  function sprout(parentId,x,y,length,angle,depth,root=false) {
    const p=attachment(parentId,x,y),parent=document.getElementById(parentId);
    // Start inside the parent's centerline with its tangent, then curve away.
    twig(p.x,p.y,length,angle,depth,root,p.angle,Math.min(10,p.width*.47),parentId,parent.dataset.project||'about',p.t);
  }
  [['limb-fracstack',486,497,73,-2.3],['limb-fracstack',548,544,68,-1.3],['limb-fracstack',378,448,61,-2.9],['limb-fluency',597,346,75,-2.6],['limb-fluency',631,388,68,-1.4],['limb-nnis',864,462,75,-1.5],['limb-nnis',908,442,64,-.7],['limb-nnis',993,402,54,-1.9],['limb-design',847,672,68,-.58],['limb-design',919,673,58,.88],['limb-robot',548,700,43,-2],['tip-box-counting',216,365,42,-2.1],['canopy-2',565,168,37,-2],['canopy-5',1179,636,41,-.88]].forEach(a=>sprout(...a,5));
  [['limb-education',580,823,66,2.6],['limb-education',470,862,56,2.5],['limb-contact',854,815,64,.6],['limb-contact',980,853,53,.5],['limb-about',735,904,38,1.8],['limb-about',723,823,57,2.1],['root-extra-0',632,867,50,2.3],['root-extra-1',819,890,45,.8],['root-extra-2',480,906,35,2.3],['root-extra-3',949,894,36,.7]].forEach(a=>sprout(...a,4,true));

  // Side shoots start on the same curves that carry the figure dots.
  function crownTwigs(shoots){
    for(const [branch,x,y,length,angle,depth] of shoots){
      sprout(branch,x,y,length,angle,depth);
    }
  }
  crownTwigs([
    ['tip-retinal-micrograph',659,282,36,-1.22,4],
    ['crown-tip-retinal-micrograph',612,171,54,-1.55,5],
    ['crown-tip-retinal-micrograph',540,114,32,-2.85,4],
    ['tip-retinal-box-counting',755,213,48,-1.92,5],
    ['crown-tip-retinal-box-counting',797,114,43,-.92,4],
    ['tip-retinal-morphology',846,310,37,-.72,4],
    ['crown-tip-retinal-morphology',975,220,62,-1.28,5],
    ['crown-tip-retinal-morphology',1066,186,39,-.12,4]
  ]);
  const desktopDrawing=$('.tree-drawing').innerHTML;
  Halftone.render($('.tree-drawing'),1440,1020);
  const compactPositions={
    'box-counting':{x:225,y:682,left:true},
    'information-dimension':{x:251,y:806,left:true,path:'M282 730 C285 759 268 790 251 806'},
    'fracstack-app':{x:165,y:858,left:true,path:'M282 730 C274 753 203 803 165 858'},
    'network-growth':{x:475,y:464},
    'published-paper':{x:376,y:383,path:'M350 410 C353 394 366 396 376 383',fork:'M376 383 C391 359 409 361 423 331'},
    'retinal-micrograph':{x:263,y:210,left:true,path:'M376 383 C382 352 353 333 322 313 S282 287 282 260 S274 227 263 210',crown:'M263 210 C247 186 216 187 191 172 S152 136 114 130'},
    'retinal-box-counting':{x:429,y:135,left:true,path:'M423 331 C438 299 410 282 404 258 S397 219 414 197 S436 161 429 135',crown:'M429 135 C423 112 400 102 393 85 S394 54 381 31'},
    'retinal-morphology':{x:522,y:286,path:'M423 331 C437 305 459 309 481 309 S512 299 522 286',crown:'M522 286 C540 263 538 239 557 224 S607 215 626 196 S647 177 668 171'},
    retinal:{left:true},fluency:{x:282,y:350,left:true},
    nnis:{x:400,y:540,forkY:605},fracstack:{x:282,y:730,left:true},
    design:{x:423,y:961,forkY:1010},robot:{x:282,y:1050,left:true},
    resume:{x:180,y:1376,center:true},education:{x:130,y:1235,center:true},about:{x:355,y:1320,center:true},contact:{x:580,y:1235,center:true}
  };
  let compactLayout=false,sceneWidth=1440,sceneHeight=1020;
  const annotations={
    fracstack:{x:265,y:490,align:'right',width:245},
    fluency:{x:390,y:144,align:'right',width:260},
    retinal:{x:913,y:475,align:'left',width:420},
    nnis:{x:1260,y:405,align:'left',width:160},
    design:{x:1220,y:664,align:'left',width:200},
    robot:{x:420,y:583,align:'center',width:240,anchor:'bottom'},
    resume:{x:578,y:965,align:'center',width:160},education:{x:390,y:828,align:'right',width:245},
    about:{x:735,y:1000,align:'center',width:280},
    contact:{x:1100,y:820,align:'left',width:275}
  };
  function layoutAnnotations(){
    const drawing=$('.tree-drawing');
    drawing.querySelector('.annotation-leaders')?.remove();
    if(compactLayout)return;
    const leaders=svgEl('g',{class:'annotation-leaders'},drawing);
    for(const [id,label] of Object.entries(annotations)){
      const button=scene.querySelector(`.annotated-node[data-project="${id}"]`),point=records[id];
      button.style.setProperty('--label-x',`${label.x-point.x+10}px`);
      button.style.setProperty('--label-y',`${label.y-point.y+22}px`);
      button.style.setProperty('--label-width',`${label.width}px`);
      button.dataset.labelAlign=label.align;
      const endX=label.x+(label.align==='left'?-10:label.align==='right'?10:0),endY=label.y+(label.anchor==='bottom'?button.querySelector('.node-label').offsetHeight+4:label.align==='center'?-10:15);
      svgEl('path',{d:`M${point.x} ${point.y} Q${endX} ${point.y} ${endX} ${endY}`,'data-project':id},leaders);
    }
  }
  function placeNode(button,point) {
    button.style.left=`${point.x}px`;button.style.top=`${point.y}px`;
    button.dataset.x=point.x;button.dataset.y=point.y;
    button.classList.toggle('left-label',!!point.left);
    button.classList.toggle('center-label',!!point.center);
  }
  function layoutTree(compact) {
    if(compact===compactLayout)return;
    compactLayout=compact;
    sceneWidth=compact?720:1440;sceneHeight=compact?1490:1020;
    scene.style.width=`${sceneWidth}px`;scene.style.height=`${sceneHeight}px`;
    scene.classList.toggle('compact',compact);
    const drawing=$('.tree-drawing');
    drawing.setAttribute('viewBox',`0 0 ${sceneWidth} ${sceneHeight}`);
    drawing.innerHTML=desktopDrawing;
    const projectButtons=[...scene.querySelectorAll('.tree-node:not(.tip)')];
    const tipButtons=[...scene.querySelectorAll('.tree-node.tip')];
    if(!compact){projectButtons.forEach(button=>placeNode(button,records[button.dataset.project]));tipButtons.forEach((button,i)=>placeNode(button,tips[i]));Halftone.render(drawing,sceneWidth,sceneHeight);return;}
    for(const id of ['fine-branches','branch-paths','root-paths','tip-paths','growth-marks'])$(`#${id}`).replaceChildren();
    seed=419;twigId=0;
    $('.trunk-group').replaceChildren();
    $('.ground').setAttribute('d','M20 1140 Q180 1135 350 1140 T700 1140');
    $('.earth-wash').setAttribute('d','M20 1140 Q180 1135 350 1140 T700 1140 V1490 H20Z');
    const trunkD='M350 1146 C330 1040 362 942 350 850 C338 758 363 650 350 550 C343 490 343 448 350 410';
    tapered(trunkD,27,3,{id:'tree-trunk',class:'trunk-solid'},$('.trunk-group'));
    projectButtons.forEach(button=>{
      const id=button.dataset.project,record=records[id],p=compactPositions[id];
      if(record.junction){
        const fork=attachment('tree-trunk',350,compactPositions[record.junction].forkY);
        Object.assign(p,{x:fork.x,y:fork.y});
        placeNode(button,p);
        return;
      }
      placeNode(button,p);
      const d=record.root?`M350 1146 C350 1190 ${p.x} ${p.y-65} ${p.x} ${p.y}`:`M350 ${p.forkY ?? p.y+90} C350 ${p.y+40} ${p.x} ${p.y+45} ${p.x} ${p.y}`;
      const joined=attachedPath(d,'tree-trunk',!!record.root);
      tapered(joined.d,record.root?15:record.secondary?5:10,1.6,{id:`limb-${id}`,class:`branch tapered${record.root?' root-path':''}`,'data-project':id,'data-parent':'tree-trunk','data-attachment':joined.t},record.root?$('#root-paths'):$('#branch-paths'));
      if(!record.root&&!record.secondary)sprout(`limb-${id}`,350,p.y+78,32,p.left?-2.4:-.7,3);
    });
    tipButtons.forEach((button,i)=>{
      const tip=tips[i],p=compactPositions[tip.parent];
      const point=compactPositions[tip.id] || {x:p.left?245:475,y:p.y+(tip.parent==='nnis'?72:-70),left:!!p.left};
      if(tip.parent==='robot')point.y=tip.id==='area-plasticity'?1125:990;
      placeNode(button,point);
      const bend=(point.y-p.y)*.55;
      drawTip(button.dataset.target,tip.parent,point.path || `M${p.x} ${p.y} C${p.x} ${p.y+bend} ${point.x} ${point.y-bend} ${point.x} ${point.y}`,point);
    });
    [
      ['M350 1140 C320 1215 255 1265 225 1355',13,1],
      ['M350 1140 C385 1220 435 1275 493 1370',13,1],
      ['M287 1241 C250 1280 165 1310 102 1335',7,1],
      ['M413 1249 C455 1285 559 1290 621 1335',7,1]
    ].forEach(([d,start,end],index)=>{
      const parentId=index<2?(index?'limb-contact':'limb-education'):`root-extra-${index-2}`,joined=attachedPath(d,parentId);
      tapered(joined.d,start,end,{id:`root-extra-${index}`,class:'branch tapered root-path','data-project':'about','data-parent':parentId,'data-attachment':joined.t},$('#root-paths'));
    });
    [['root-extra-0',225,1300,48,2],['root-extra-1',493,1310,45,.9],['limb-education',130,1235,46,2],['limb-contact',580,1235,46,1],['limb-about',355,1320,45,1.5]].forEach(a=>sprout(...a,4,true));
    crownTwigs([
      ['tip-retinal-micrograph',288,279,32,-1.25,4],
      ['crown-tip-retinal-micrograph',212,182,34,-1.75,4],
      ['tip-retinal-box-counting',404,245,32,-1.98,4],
      ['crown-tip-retinal-box-counting',396,90,28,-.9,4],
      ['crown-tip-retinal-morphology',554,228,43,-1.32,5],
      ['crown-tip-retinal-morphology',623,199,25,-.15,4]
    ]);
    Halftone.render(drawing,sceneWidth,sceneHeight);
  }

  let lingerTimer;
  function highlight(button) {
    clearTimeout(lingerTimer);
    const active=Boolean(button && !button.classList.contains('root'));
    scene.classList.toggle('has-highlight',active);
    if(!active)return;
    const route=new Set(lineage(button.dataset.note).map(segmentId));
    // Include unlabeled stem sections that two figures share before they fork.
    for(const segment of route){
      const parent=document.getElementById(segment)?.dataset.parent;
      if(parent && parent!=='tree-trunk')route.add(parent);
    }
    const project=records[button.dataset.project];
    const trunkBranch=[...route].reverse().map(id=>document.getElementById(id)).find(el=>el?.dataset.parent==='tree-trunk');
    const fork=Number((trunkBranch || document.getElementById('limb-'+project.junction)).dataset.attachment);
    for(const path of scene.querySelectorAll('.halftone-ink')){
      const onRoute=path.dataset.segment.split(' ').some(segment=>
        segment==='roots' || route.has(segment) ||
        (segment.startsWith('trunk:') && Number(segment.slice(6))<=fork)
      );
      path.classList.toggle('lit',onRoute);
    }
    for(const node of scene.querySelectorAll('.tree-node')){
      node.classList.toggle('lit',node.classList.contains('root') || route.has(node.dataset.target));
    }
    for(const leader of scene.querySelectorAll('.annotation-leaders path')){
      leader.classList.toggle('lit',records[leader.dataset.project].root || route.has(segmentId(leader.dataset.project)));
    }
  }

  const dialog=$('#detail');
  let returnFocus=null, viewedNote=null;
  const motif=Halftone.swatch(420,116,8);
  function showDialog() {
    clearTimeout(lingerTimer);
    clearTimeout(hoverTimer);
    if (!dialog.open) {returnFocus=document.activeElement;dialog.showModal();}
    dialog.scrollTop=0;
    $('#close-detail').focus();
  }
  function linkMarkup(link) {
    const external=link[1].startsWith('https:');
    return `<a class="external-link" href="${escapeHTML(link[1])}"${external?' target="_blank" rel="noopener noreferrer"':''}>${escapeHTML(link[0])}<span aria-hidden="true">↗</span></a>`;
  }
  function openRecord(id) {
    if(!Object.hasOwn(notes,id))return;
    if(location.hash!=='#'+id){
      const method=dialog.open && history.state?.treeNote ? 'replaceState' : 'pushState';
      history[method]({treeNote:true},'', '#'+id);
    }
    showRecord(id);
  }
  function artifactMarkup(artifact,title){
    const icon=artifact.icon ? `<figure class="work-example app-icon"><img src="artifacts/${escapeHTML(artifact.icon)}" alt="FracStack desktop app icon"><figcaption>${escapeHTML(artifact.caption)}</figcaption></figure>` : '';
    const media=artifact.images || (artifact.file ? [artifact] : []);
    const figures=media.map(image=>{
      const src='artifacts/'+escapeHTML(image.file);
      const label=escapeHTML(image.title || title);
      if(image.comparison){
        const [mask,translation]=image.comparison;
        return `<figure class="work-example network-comparison">
          ${image.title?`<h3>${label}</h3>`:''}
          <div class="comparison-labels"><span>Generated mask</span><span>GAN translation</span></div>
          <div class="comparison-view">
            <img src="artifacts/${escapeHTML(translation)}" alt="Simulated microscope view of the branching network.">
            <img class="comparison-mask" src="artifacts/${escapeHTML(mask)}" alt="Aligned binary mask showing the same branches in white.">
            <span class="comparison-divider" aria-hidden="true"><b>‹ ›</b></span>
            <input class="comparison-range" type="range" min="0" max="100" value="50"
              aria-label="Generated mask revealed" aria-valuetext="50 percent" aria-describedby="comparison-help">
          </div>
          <figcaption id="comparison-help">${escapeHTML(image.caption)}</figcaption>
          <a href="${src}" target="_blank" rel="noopener">Open original pair ↗</a>
        </figure>`;
      }
      const content=`<a href="${src}" target="_blank" rel="noopener" aria-label="Open full size: ${label}">
        <img src="${src}" alt="${escapeHTML(image.alt)}"><span>View full size ↗</span>
      </a>`;
      return `<figure class="work-example paper-figure">
        ${image.title?`<h3>${label}</h3>`:''}
        ${content}
        <figcaption>${escapeHTML(image.caption)}</figcaption>
      </figure>`;
    }).join('');
    if(!artifact.panels){
      const credit=artifact.paperCredit?`<p class="image-credit">Images from <a href="${records.retinal.link[1]}">Dillon et al., 2024</a> · <a href="https://creativecommons.org/licenses/by/4.0/">CC BY 4.0</a></p>`:'';
      return icon+figures+credit;
    }
    const panels=artifact.panels.map(([file,label,description])=>
      `<div><img src="artifacts/${file}" alt="${escapeHTML(description)}"><span>${escapeHTML(label)}</span></div>`
    ).join('');
    const [file,label]=artifact.download;
    return `<figure class="work-example"><h3>${escapeHTML(artifact.title)}</h3>
      <div class="example-pair">${panels}</div>
      <figcaption>${escapeHTML(artifact.caption)}</figcaption>
      <a download href="artifacts/${file}">${escapeHTML(label)}</a></figure>${figures}`;
  }
  function showRecord(id) {
    const record=notes[id];
    if(!record)return;
    viewedNote=id;
    const trail=lineage(id).slice(0,-1).map(key=>
        `<a data-open="${key}" href="#${key}">${escapeHTML(notes[key].title)}</a>`
      ).join(' <span aria-hidden="true">/</span> ');
    const breadcrumbs=trail?`<nav class="note-lineage" aria-label="Project lineage">${trail}</nav>`:'';
    if(record.parent){
      $('#panel-kind').textContent=record.artifact?'':'OUTCOME';
      $('#detail-content').innerHTML=`${record.artifact?.file || record.artifact?.images || record.artifact?.icon?'':motif}
        ${breadcrumbs}
        <h2 id="detail-title">${escapeHTML(record.title)}</h2>
        ${record.deck?`<p class="deck">${escapeHTML(record.deck)}</p><p>${escapeHTML(record.body)}</p>`:''}
        ${record.artifact?artifactMarkup(record.artifact,record.title):''}
        ${record.videoPreview?`<figure class="work-example paper-figure">
          <button type="button" class="play-demo" aria-label="Play Arduino robot arm demonstration">
            <img src="${record.videoPreview}" alt=""><span>▶ Play demonstration</span>
          </button></figure>`:record.link?linkMarkup(record.link):''}`;
    }else if(id==='resume'){
      $('#panel-kind').textContent='2026';
      $('#detail-content').innerHTML=`<h2 id="detail-title">${escapeHTML(record.title)}</h2>${linkMarkup(record.link)}`;
    }else{
      $('#panel-kind').textContent=record.kind;
      $('#detail-content').innerHTML=`${record.samples?'':motif}${breadcrumbs}<h2 id="detail-title">${escapeHTML(record.title)}</h2>${record.deck?`<p class="deck">${escapeHTML(record.deck)}</p>`:''}<p>${escapeHTML(record.body)}</p>${record.outputs?`<h3>${escapeHTML(record.outputTitle).toUpperCase()}</h3><ul>${record.outputs.map(output=>`<li>${escapeHTML(output)}</li>`).join('')}</ul>`:''}<div class="panel-tags">${record.tags.map(tag=>`<span>${escapeHTML(tag)}</span>`).join('')}</div>${record.link?linkMarkup(record.link):''}${record.extraLinks?record.extraLinks.map(linkMarkup).join(''):''}<h3>Related entries</h3><div class="related-links">${record.related.map(key=>`<button data-open="${key}">${escapeHTML(records[key].title)} <span aria-hidden="true">→</span></button>`).join('')}</div>`;
    }
    const preview=$('#detail-content .play-demo');
    if(preview)preview.addEventListener('click',()=>{
      const frame=document.createElement('iframe');
      frame.title='Arduino robot arm demonstration';
      frame.className='demo-player';
      frame.allow='autoplay; encrypted-media; picture-in-picture; fullscreen';
      frame.referrerPolicy='strict-origin-when-cross-origin';
      frame.src='https://www.youtube.com/embed/u0LKt7FbUtw?autoplay=1&playsinline=1&start=104';
      preview.replaceWith(frame);
      frame.focus();
    });
    const slider=$('#detail-content .comparison-range');
    if(slider){
      const view=slider.parentElement;
      let dragPointer=null;
      function updateReveal(){
        view.style.setProperty('--reveal',slider.value+'%');
        slider.setAttribute('aria-valuetext',slider.value+' percent');
      }
      function dragReveal(event){
        const rect=slider.getBoundingClientRect();
        slider.value=Math.round(100*(event.clientX-rect.left)/rect.width);
        updateReveal();
      }
      slider.addEventListener('input',updateReveal);
      slider.addEventListener('pointerdown',event=>{
        if(event.button!==0 || !event.isPrimary)return;
        event.preventDefault();
        slider.focus({preventScroll:true});
        dragPointer=event.pointerId;
        view.setPointerCapture(event.pointerId);
        dragReveal(event);
      });
      view.addEventListener('pointermove',event=>{
        if(dragPointer===event.pointerId && event.buttons)dragReveal(event);
      });
      view.addEventListener('lostpointercapture',()=>{dragPointer=null;});
    }
    if(record.samples){
      const samples=record.samples.map(([,label,alt])=>
        `<figure><button type="button" aria-label="Enlarge ${label.toLowerCase()}" aria-pressed="false">
          <canvas width="512" height="512" role="img" aria-label="${alt}"></canvas></button><figcaption>${label}</figcaption></figure>`
      ).join('');
      $('#detail-content .deck').insertAdjacentHTML('afterend',`<section class="fractal-explorer" aria-label="Generated fractal examples">
        <label for="fractal-dimension">Generator dimension <output for="fractal-dimension">1.50</output></label>
        <input type="range" id="fractal-dimension" min="1.10" max="1.90" step="0.001" value="1.50">
        <div class="fractal-samples">${samples}</div></section>`);
      mountFractalSlider($('#detail-content .fractal-explorer'));
    }
    if(record.showcase){
      const {title,src,page,alt,caption,credit}=record.showcase;
      $('#detail-content .panel-tags').insertAdjacentHTML('beforebegin',`<figure class="work-example paper-figure">
        <h3>${escapeHTML(title)}</h3><a href="${page}" target="_blank" rel="noopener noreferrer">
          <img src="${src}" alt="${escapeHTML(alt)}" referrerpolicy="no-referrer"><span>Explore the chapel ↗</span>
        </a><figcaption>${escapeHTML(caption)} <small>${escapeHTML(credit)}</small></figcaption></figure>`);
    }
    const children=tips.filter(tip=>tip.parent===id);
    if(children.length){
      const links=children.map(tip=>
        `<button data-open="${tip.id}">${escapeHTML(tip.title)} <span aria-hidden="true">→</span></button>`
      ).join('');
      const markup=`<div class="related-links">${links}</div>`;
      const tags=$('#detail-content .panel-tags');
      if(tags)tags.insertAdjacentHTML('beforebegin',markup);
      else $('#detail-content').insertAdjacentHTML('beforeend',markup);
    }
    $('#detail-content').querySelectorAll('[data-open]').forEach(item=>item.addEventListener('click',event=>{
      if(item.tagName==='A' && (event.ctrlKey||event.metaKey||event.shiftKey||event.altKey))return;
      event.preventDefault();
      openRecord(item.dataset.open);
    }));
    showDialog();
  }
  function openIndex() {
    viewedNote=null;
    $('#panel-kind').textContent='PORTFOLIO / INDEX';
    $('#detail-content').innerHTML=`<h2 id="detail-title">Research & projects</h2>${['research','side','background'].map(group=>`<h3>${group==='background'?'BACKGROUND':group==='side'?'SIDE PROJECTS':'RESEARCH'}</h3>${Object.entries(records).filter(([,r])=>group==='background'?r.root:group==='side'?r.secondary:!r.root&&!r.secondary).map(([id,r])=>`<button class="index-item" data-open="${id}"><span>${escapeHTML(r.title)}<small>${escapeHTML(r.kind)}</small></span><span aria-hidden="true">→</span></button>`).join('')}`).join('')}`;
    $('#detail-content').querySelectorAll('[data-open]').forEach(button=>button.addEventListener('click',()=>openRecord(button.dataset.open)));
    showDialog();
  }
  function closeNotes(){
    if(history.state?.treeNote && Object.hasOwn(notes,location.hash.slice(1)))history.back();
    else{
      if(Object.hasOwn(notes,location.hash.slice(1)))history.replaceState(null,'',location.href.split('#')[0]);
      dialog.close();
    }
  }
  function syncNote(){
    const id=location.hash.slice(1);
    if(Object.hasOwn(notes,id))showRecord(id);
    else if(dialog.open)dialog.close();
  }
  window.addEventListener('hashchange',syncNote);
  $('#close-detail').addEventListener('click',closeNotes);
  dialog.addEventListener('cancel',event=>{event.preventDefault();closeNotes();});
  dialog.addEventListener('click',event=>{if(event.target===dialog){const rect=dialog.getBoundingClientRect();if(event.clientX<rect.left||event.clientX>rect.right||event.clientY<rect.top||event.clientY>rect.bottom)closeNotes();}});
  dialog.addEventListener('close',()=>{
    if(dialog.open)return;
    $('#detail-content .demo-player')?.remove();
    if(returnFocus?.isConnected)returnFocus.focus({preventScroll:true});
    clearTimeout(hoverTimer);
    const selected=viewedNote && scene.querySelector(`[data-note="${viewedNote}"]`);
    viewedNote=null;
    highlight(selected);
    if(selected && !selected.classList.contains('root')){
      lingerTimer=setTimeout(()=>highlight(null),1600);
    }
  });
  $('#open-index').addEventListener('click',openIndex);
  $('#start-roots').addEventListener('click',()=>openRecord('about'));
  $('#jump').addEventListener('change',event=>{if(event.target.value){focusBranch(event.target.value);openRecord(event.target.value);event.target.value='';}});

  // Pan and zoom use the same coordinates as the SVG and HTML buttons.
  let scale=1,offsetX=0,offsetY=0,minScale=.25;
  let dragged=false;
  let gesture=null;
  const pointers=new Map();
  const clamp=(value,min,max)=>Math.min(max,Math.max(min,value));
  function constrain() {
    const w=viewport.clientWidth,h=viewport.clientHeight;
    offsetX=sceneWidth*scale<=w?(w-sceneWidth*scale)/2:clamp(offsetX,w-sceneWidth*scale-90,90);
    offsetY=sceneHeight*scale<=h?(h-sceneHeight*scale)/2-30:clamp(offsetY,h-sceneHeight*scale-80,80);
  }
  function render() {
    constrain();
    scene.style.setProperty('--map-scale',scale);
    scene.style.transform=`translate(${offsetX}px,${offsetY}px) scale(${scale})`;
    viewport.classList.toggle('is-zoomed',scale>minScale+.001);
    $('#zoom-out').disabled=scale<=minScale+.001;
    $('#zoom-in').disabled=scale>=1.8;
  }
  function fit() {
    const compact=window.matchMedia('(max-width:800px)').matches;
    layoutTree(compact);
    // Fit primarily to page width; let the page grow vertically instead of
    // shrinking the tree and all its labels to a short browser viewport.
    viewport.style.height=compact?`${(viewport.clientWidth-24)/sceneWidth*sceneHeight+130}px`:`${Math.min((viewport.clientWidth-40)/sceneWidth,1.15)*sceneHeight+140}px`;
    const w=viewport.clientWidth,h=viewport.clientHeight;
    minScale=Math.min((w-24)/sceneWidth,(h-85)/sceneHeight,1.2);
    scale=minScale;
    offsetX=(w-sceneWidth*scale)/2;offsetY=(h-85-sceneHeight*scale)/2;
    render();
    layoutAnnotations();
    $('#map-status').textContent='Showing the whole tree. Use Find a branch or Index to read any entry.';
  }
  function zoom(factor,cx=viewport.clientWidth/2,cy=viewport.clientHeight/2) {
    const next=clamp(scale*factor,minScale,1.8);
    offsetX=cx-(cx-offsetX)*next/scale;
    offsetY=cy-(cy-offsetY)*next/scale;
    scale=next;render();
  }
  function focusBranch(id) {
    const record=compactLayout?compactPositions[id]:records[id];
    scale=Math.max(minScale,compactLayout?.85:1);
    offsetX=viewport.clientWidth/2-record.x*scale;
    offsetY=viewport.clientHeight*.55-record.y*scale;
    render();
  }
  function ensureVisible(element) {
    if(dialog.open)return;
    const rect=element.getBoundingClientRect(),bounds=viewport.getBoundingClientRect();
    if(rect.left<bounds.left+15||rect.right>bounds.right-15||rect.top<bounds.top+15||rect.bottom>bounds.bottom-90) {
      offsetX+=bounds.left+bounds.width/2-(rect.left+rect.width/2);
      offsetY+=bounds.top+bounds.height*.55-(rect.top+rect.height/2);
      render();
    }
  }
  $('#zoom-in').addEventListener('click',()=>zoom(1.25));
  $('#zoom-out').addEventListener('click',()=>zoom(.8));
  $('#reset-view').addEventListener('click',()=>{fit();highlight(null);});
  viewport.addEventListener('wheel',event=>{if(!event.ctrlKey&&!event.metaKey)return;event.preventDefault();const rect=viewport.getBoundingClientRect();zoom(Math.exp(-event.deltaY*.0015),event.clientX-rect.left,event.clientY-rect.top);},{passive:false});
  viewport.addEventListener('pointerdown',event=>{
    if(event.button!==0)return;
    if(compactLayout&&event.pointerType==='touch'&&scale<=minScale+.001)return;
    pointers.set(event.pointerId,{x:event.clientX,y:event.clientY});
    if(pointers.size===1){dragged=false;gesture={x:event.clientX,y:event.clientY,ox:offsetX,oy:offsetY};}
    if(pointers.size===2){const [a,b]=[...pointers.values()];gesture={pinch:true,distance:Math.hypot(a.x-b.x,a.y-b.y)};}
    if(!event.target.closest('button'))viewport.setPointerCapture(event.pointerId);
  });
  window.addEventListener('pointermove',event=>{
    if(!pointers.has(event.pointerId))return;
    pointers.set(event.pointerId,{x:event.clientX,y:event.clientY});
    if(pointers.size===2){const [a,b]=[...pointers.values()],distance=Math.hypot(a.x-b.x,a.y-b.y);const rect=viewport.getBoundingClientRect();if(gesture.distance>0)zoom(distance/gesture.distance,(a.x+b.x)/2-rect.left,(a.y+b.y)/2-rect.top);gesture.distance=distance;dragged=true;}
    else if(gesture&&!gesture.pinch){const dx=event.clientX-gesture.x,dy=event.clientY-gesture.y;if(Math.hypot(dx,dy)>5){dragged=true;viewport.classList.add('dragging');offsetX=gesture.ox+dx;offsetY=gesture.oy+dy;render();}}
  });
  function endPointer(event) {
    pointers.delete(event.pointerId);
    if(pointers.size===1){const [p]=pointers.values();gesture={x:p.x,y:p.y,ox:offsetX,oy:offsetY};}
    else if(!pointers.size){gesture=null;viewport.classList.remove('dragging');setTimeout(()=>{dragged=false;},0);}
  }
  window.addEventListener('pointerup',endPointer);
  window.addEventListener('pointercancel',endPointer);
  viewport.addEventListener('keydown',event=>{
    if(event.key==='+'||event.key==='='){event.preventDefault();zoom(1.25);}
    else if(event.key==='-'){event.preventDefault();zoom(.8);}
    else if(event.key==='0'){event.preventDefault();fit();}
    else if(['ArrowLeft','ArrowRight','ArrowUp','ArrowDown'].includes(event.key)){event.preventDefault();offsetX+=event.key==='ArrowLeft'?70:event.key==='ArrowRight'?-70:0;offsetY+=event.key==='ArrowUp'?70:event.key==='ArrowDown'?-70:0;render();}
  });
  new ResizeObserver(fit).observe(viewport);
  fit();
  const initialId=location.hash.slice(1);
  if(Object.hasOwn(notes,initialId)){
    if(!history.state?.treeNote){
      history.replaceState(null,'',location.href.split('#')[0]);
      history.pushState({treeNote:true},'', '#'+initialId);
    }
    showRecord(initialId);
  }
})();
