const CACHE='polanco-os-v2.2.0';
const ASSETS=['./','index.html','styles.css?v=220','mobile.css?v=220','engine.js?v=220','app.js?v=220','app.part01.txt','app.part02.txt','app.part03.txt','app.part04.txt','app.part05.txt','app.part06.txt','app.part07.txt','app.part08.txt','app.part09.txt','manifest.webmanifest?v=220','icon.svg'];
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
