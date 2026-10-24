(function(){
  'use strict';
  const model=window.StudioDesign;
  if(!model)return;
  window.StudioTheme={mount(preview,settings){
    let state=model.normalize(settings);
  function capture(){
    preview.removeAttribute('data-design-active');
    for(const el of preview.querySelectorAll('*')){
      if(el.closest('svg')||['SCRIPT','STYLE','CANVAS','NOSCRIPT'].includes(el.tagName))continue;
      const css=getComputedStyle(el);
      delete el.dataset.designGap;
      const text=Array.from(el.childNodes).some(n=>n.nodeType===3&&n.textContent.trim())||['TEXTAREA','INPUT'].includes(el.tagName)&&!['checkbox','radio','range'].includes(el.type)||el.matches('#minutesError,#quoteStatus');
      if(text){
        el.dataset.designText=el.closest('h1,h2,h3,h4,h5,h6,blockquote,.font-serif')?'heading':el.closest('.font-mono')?'label':'body';
        el.style.setProperty('--original-size',css.fontSize);
        el.style.setProperty('--original-leading',Number.isFinite(parseFloat(css.lineHeight))?css.lineHeight:`${parseFloat(css.fontSize)*1.5}px`);
        el.style.setProperty('--original-tracking',css.letterSpacing==='normal'?'0px':css.letterSpacing);
      }
      if(el.matches('.max-w-6xl,.max-w-5xl,.max-w-4xl')){
        el.dataset.designContainer='';el.style.setProperty('--original-width-ratio',parseFloat(css.maxWidth)/1152);
      }
      if(el.tagName==='SECTION'){
        el.dataset.designSection='';el.style.setProperty('--original-top',css.paddingTop);el.style.setProperty('--original-bottom',css.paddingBottom);
      }
      if(['flex','grid','inline-flex','inline-grid'].includes(css.display)&&(parseFloat(css.rowGap)>0||parseFloat(css.columnGap)>0)){
        el.dataset.designGap='';el.style.setProperty('--original-row-gap',`${parseFloat(css.rowGap)||0}px`);el.style.setProperty('--original-column-gap',`${parseFloat(css.columnGap)||0}px`);
      }
      if(el.matches('.studio-card,.studio-metal-plate,a,button')&&!el.classList.contains('rounded-full')){
        el.dataset.designPanel='';
        for(const side of ['Top','Right','Bottom','Left'])el.style.setProperty(`--original-pad-${side.toLowerCase()}`,css[`padding${side}`]);
        el.style.setProperty('--original-radius',css.borderTopLeftRadius);
      }
      if(el.tagName==='IMG')el.style.setProperty('--original-filter',css.filter==='none'?'brightness(1)':css.filter);
      if(Array.from(el.classList).some(c=>/^bg-sage-/.test(c)))el.dataset.designPrimary='';
    }
    preview.dataset.designActive='';
  }
  function blend(a,b,amount){const aa=a.slice(1).match(/../g).map(x=>parseInt(x,16)),bb=b.slice(1).match(/../g).map(x=>parseInt(x,16));return '#'+aa.map((n,i)=>Math.round(n*(1-amount)+bb[i]*amount).toString(16).padStart(2,'0')).join('');}
  function apply(){
    const dark=model.luminance(state.background)<.35;
    const values={error:dark?'#fca5a5':'#a12c24',background:state.background,surface:state.surface,text:state.text,heading:state.heading,muted:state.muted,accent:state.accent,primary:state.primary,'primary-ink':model.ink(state.primary),raised:blend(state.surface,dark?'#ffffff':'#000000',.035),field:blend(state.background,state.surface,.3),wash:state.accent+'0b','body-font':model.fonts[state.bodyFont],'heading-font':model.fonts[state.headingFont],'label-font':model.fonts[state.labelFont],'body-scale':state.bodySize/16,'label-scale':state.labelSize/13,'heading-scale':state.headingScale,'body-leading':state.lineHeight/1.85,'heading-leading':state.headingLineHeight/1.2,tracking:`${state.tracking}em`,width:`${state.pageWidth}px`,'section-space':state.sectionSpace,gap:state.gap,padding:state.padding,radius:state.radius/16,saturation:state.imageSaturation/100,'heading-weight':state.headingWeight==='original'?700:state.headingWeight};
    for(const [key,value]of Object.entries(values))document.documentElement.style.setProperty(`--design-${key}`,value);
    document.documentElement.dataset.studioDesign='';
    document.documentElement.dataset.designTexture=state.texture?'on':'off';
    document.documentElement.dataset.designMotion=state.motion?'on':'off';
    document.documentElement.style.colorScheme=dark?'dark':'light';
    preview.dataset.headingWeight=state.headingWeight;preview.dataset.headingAlign=state.headingAlign;
    document.dispatchEvent(new CustomEvent('studio:designchange',{detail:{accent:state.accent,motion:state.motion}}));
  }
  let resizeTimer;
  window.addEventListener('resize',()=>{clearTimeout(resizeTimer);resizeTimer=setTimeout(capture,100);},{passive:true});
  capture();apply();
  return {set(value){state=model.normalize(value);apply();}};
  }};
})();
