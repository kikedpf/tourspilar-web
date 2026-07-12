const CACHE='polanco-os-v4.4.0';
const ASSETS=['./','index.html','styles.css?v=440','mobile.css?v=440','deal-prices.css?v=440','excel-model-migration.js?v=440','engine.js?v=440','app.js?v=440','mobile-dashboard-fixed.js?v=440','tax-breakdown.js?v=440','app.part01.txt?v=440','app.part02.txt?v=440','app.part03.txt?v=440','app.part04.txt?v=440','app.part05.txt?v=440','app.part06.txt?v=440','app.part07.txt?v=440','app.part08.txt?v=440','app.part09.txt?v=440','manifest.webmanifest?v=440','icon.svg'];
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