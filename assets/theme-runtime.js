// Published defaults use native CSS layout. Only explicit theme overrides need the editor's renderer.
(function(){
  'use strict';
  const settings=window.STUDIO_CONFIG?.design;
  if(!settings||typeof settings!=='object'||Array.isArray(settings)||Object.keys(settings).length===0)return;
  function mount(){
    const preview=document.getElementById('sitePreview');
    if(preview&&window.StudioTheme)window.StudioTheme.mount(preview,settings);
  }
  // Wait for stylesheets before measuring custom theme baselines, including on Safari.
  if(document.readyState==='complete')mount();
  else window.addEventListener('load',mount,{once:true});
})();
