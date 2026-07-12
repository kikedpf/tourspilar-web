const CACHE='polanco-os-v4.3.0';
const ASSETS=['./','index.html','styles.css?v=420','mobile.css?v=420','deal-prices.css?v=420','excel-model-migration.js?v=420','engine.js?v=420','app.js?v=420','mobile-dashboard-fixed.js?v=420','tax-breakdown.js?v=420','app.part01.txt?v=420','app.part02.txt?v=420','app.part03.txt?v=420','app.part04.txt?v=420','app.part05.txt?v=420','app.part06.txt?v=420','app.part07.txt?v=420','app.part08.txt?v=420','app.part09.txt?v=420','manifest.webmanifest?v=420','icon.svg'];
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