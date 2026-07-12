const CACHE='polanco-os-v3.8.0';
const ASSETS=['./','index.html','styles.css?v=380','mobile.css?v=380','deal-prices.css?v=380','excel-model-migration.js?v=380','engine.js?v=380','app.js?v=380','mobile-dashboard.js?v=380','app.part01.txt?v=380','app.part02.txt?v=380','app.part03.txt?v=380','app.part04.txt?v=380','app.part05.txt?v=380','app.part06.txt?v=380','app.part07.txt?v=380','app.part08.txt?v=380','app.part09.txt?v=380','manifest.webmanifest?v=380','icon.svg'];
self.addEventListener('install',event=>event.waitUntil(caches.open(CACHE).then(cache=>cache.addAll(ASSETS)).then(()=>self.skipWaiting())));
self.addEventListener('activate',event=>event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(key=>key!==CACHE).map(key=>caches.delete(key)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',event=>{
  if(event.request.method!=='GET')return;
  event.respondWith(fetch(event.request).then(response=>{
    const copy=response.clone();
    caches.open(CACHE).then(cache=>cache.put(event.request,copy));
    return response;
  }).catch(()=>caches.match(event.request).then(hit=>hit||caches.match('index.html'))));
});