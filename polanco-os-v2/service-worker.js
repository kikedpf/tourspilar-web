const CACHE='polanco-os-v5.6.0';
const ASSETS=['./','index.html','styles.css?v=520','mobile.css?v=520','deal-prices.css?v=520','excel-model-migration.js?v=520','engine.js?v=520','app.js?v=520','pwa-install.js?v=560','mobile-dashboard-fixed.js?v=520','tax-breakdown.js?v=520','financing-dashboard.js?v=520','app.part01.txt?v=520','app.part02.txt?v=520','app.part03.txt?v=520','app.part04.txt?v=520','app.part05.txt?v=520','app.part06.txt?v=520','app.part07.txt?v=520','app.part08.txt?v=520','app.part09.txt?v=520','manifest.webmanifest?v=560','icon.svg?v=550','apple-touch-icon.png?v=560'];
self.addEventListener('install',event=>event.waitUntil(caches.open(CACHE).then(cache=>cache.addAll(ASSETS)).then(()=>self.skipWaiting())));
self.addEventListener('activate',event=>event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(key=>key!==CACHE).map(key=>caches.delete(key)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',event=>{
  if(event.request.method!=='GET'||new URL(event.request.url).origin!==self.location.origin)return;
  event.respondWith(fetch(event.request).then(response=>{
    if(response&&response.ok){const copy=response.clone();caches.open(CACHE).then(cache=>cache.put(event.request,copy));}
    return response;
  }).catch(()=>caches.match(event.request).then(hit=>hit||caches.match('index.html'))));
});
