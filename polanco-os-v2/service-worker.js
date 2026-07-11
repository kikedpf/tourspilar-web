const CACHE='polanco-os-v3.2.0';
const ASSETS=['./','index.html','styles.css?v=320','mobile.css?v=320','deal-prices.css?v=320','engine.js?v=320','app.js?v=320','mobile-dashboard.js?v=320','app.part01.txt?v=320','app.part02.txt?v=320','app.part03.txt?v=320','app.part04.txt?v=320','app.part05.txt?v=320','app.part06.txt?v=320','app.part07.txt?v=320','app.part08.txt?v=320','app.part09.txt?v=320','manifest.webmanifest?v=320','icon.svg'];
self.addEventListener('install',event=>event.waitUntil(caches.open(CACHE).then(cache=>cache.addAll(ASSETS)).then(()=>self.skipWaiting())));
self.addEventListener('activate',event=>event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(key=>key!==CACHE).map(key=>caches.delete(key)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',event=>{
  if(event.request.method!=='GET')return;
  event.respondWith(
    fetch(event.request).then(response=>{
      const copy=response.clone();
      caches.open(CACHE).then(cache=>cache.put(event.request,copy));
      return response;
    }).catch(()=>caches.match(event.request).then(hit=>hit||caches.match('index.html')))
  );
});