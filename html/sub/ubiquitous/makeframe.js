function g_openPopup(page, opts)
{
  if(page)
    window.open(page, Math.random(), opts);
}
function g_openPopupTesterPopups()
{
var opts = 'titlebar=0,toolbar=0,status=0,innerHeight=768,innerWidth=1024,menubar=0,resizable=1';
g_openPopup('ubiquitous.html?$randomval', opts);
}
