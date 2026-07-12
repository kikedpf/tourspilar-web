const CACHE='polanco-os-v4.0.0';
const ASSETS=['./','index.html','styles.css?v=400','mobile.css?v=400','deal-prices.css?v=400','excel-model-migration.js?v=400','engine.js?v=400','app.js?v=400','mobile-dashboard.js?v=400','app.part01.txt?v=400','app.part02.txt?v=400','app.part03.txt?v=400','app.part04.txt?v=400','app.part05.txt?v=400','app.part06.txt?v=400','app.part07.txt?v=400','app.part08.txt?v=400','app.part09.txt?v=400','manifest.webmanifest?v=400','icon.svg'];
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