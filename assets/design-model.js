(function(root){
  'use strict';
  const defaults = Object.freeze({headingFont:'serif',bodyFont:'sans',labelFont:'mono',bodySize:16,labelSize:13,headingScale:1,headingWeight:'original',lineHeight:1.85,headingLineHeight:1.2,tracking:0,background:'#05070a',surface:'#11151f',text:'#cbd5e1',heading:'#eef2ee',muted:'#9aa8bd',accent:'#f59e0b',primary:'#d7ded7',pageWidth:1152,sectionSpace:1,gap:1,padding:1,radius:16,imageSaturation:100,texture:true,motion:true,headingAlign:'original'});
  const ranges = {bodySize:[14,22,1],labelSize:[12,18,1],headingScale:[.75,1.5,.05],lineHeight:[1.4,2.4,.05],headingLineHeight:[1,1.7,.05],tracking:[-.02,.15,.01],pageWidth:[900,1440,12],sectionSpace:[.5,1.8,.05],gap:[.5,1.8,.05],padding:[.5,1.6,.05],radius:[0,28,1],imageSaturation:[0,150,5]};
  const choices = {headingFont:['serif','sans','system'],bodyFont:['sans','serif','system'],labelFont:['mono','sans','system'],headingWeight:['original','400','600','700','900'],headingAlign:['original','left','center']};
  const colorKeys = ['background','surface','text','heading','muted','accent','primary'];
  const fonts = {serif:'"Noto Serif TC", serif',sans:'"Noto Sans TC", sans-serif',mono:'"Space Mono", monospace',system:'system-ui, -apple-system, "PingFang TC", sans-serif'};
  function normalize(value){
    const out={...defaults};
    if(!value||typeof value!=='object'||Array.isArray(value))return out;
    for(const [key,[min,max,step]] of Object.entries(ranges)){
      if(typeof value[key]==='number'&&Number.isFinite(value[key]))out[key]=Number(Math.min(max,Math.max(min,min+Math.round((value[key]-min)/step)*step)).toFixed(4));
    }
    for(const [key,allowed] of Object.entries(choices))if(allowed.includes(value[key]))out[key]=value[key];
    for(const key of colorKeys)if(typeof value[key]==='string'&&/^#[\da-f]{6}$/i.test(value[key]))out[key]=value[key].toLowerCase();
    for(const key of ['motion','texture'])if(typeof value[key]==='boolean')out[key]=value[key];
    return out;
  }
  function luminance(hex){
    const rgb=hex.slice(1).match(/../g).map(x=>parseInt(x,16)/255).map(x=>x<=.04045?x/12.92:((x+.055)/1.055)**2.4);
    return rgb[0]*.2126+rgb[1]*.7152+rgb[2]*.0722;
  }
  function contrast(a,b){const x=luminance(a),y=luminance(b);return(Math.max(x,y)+.05)/(Math.min(x,y)+.05);}
  function ink(bg){return contrast('#000000',bg)>=contrast('#ffffff',bg)?'#000000':'#ffffff';}
  const presets={studio:{...defaults},paper:{...defaults,background:'#faf9f5',surface:'#eeede6',text:'#373d38',heading:'#19261e',muted:'#58645b',accent:'#8b4e00',primary:'#2f4e3b',texture:false},ocean:{...defaults,background:'#0b1722',surface:'#142839',text:'#d2e0e8',heading:'#f1f7fb',muted:'#a4b8c5',accent:'#76c9d4',primary:'#b4dce2'}};
  const api={defaults,ranges,choices,colorKeys,fonts,normalize,luminance,contrast,ink,presets};
  if(typeof module==='object'&&module.exports)module.exports=api;else root.StudioDesign=api;
})(typeof window==='undefined'?globalThis:window);
