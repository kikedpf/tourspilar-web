const CACHE='polanco-os-v4.1.0';
const ASSETS=['./','index.html','styles.css?v=410','mobile.css?v=410','deal-prices.css?v=410','excel-model-migration.js?v=410','engine.js?v=410','app.js?v=410','mobile-dashboard-fixed.js?v=410','app.part01.txt?v=410','app.part02.txt?v=410','app.part03.txt?v=410','app.part04.txt?v=410','app.part05.txt?v=410','app.part06.txt?v=410','app.part07.txt?v=410','app.part08.txt?v=410','app.part09.txt?v=410','manifest.webmanifest?v=410','icon.svg'];
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