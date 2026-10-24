// Public pages apply only the published design; no editor or browser-specific preferences.
(function(){
  'use strict';
  const preview=document.getElementById('sitePreview');
  if(preview&&window.StudioTheme)window.StudioTheme.mount(preview,window.STUDIO_CONFIG?.design);
})();
