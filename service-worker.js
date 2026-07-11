const CACHE="polanco-flipping-v2";
const ASSETS=[
  "./","index.html","css/styles.css","css/mobile-v2.b64","js/logic.js","js/app.js",
  "js/app-core-00.b64","js/app-core-01.b64","js/app-core-02.b64","js/app-core-03.b64",
  "js/app-core-04.b64","js/app-core-05.b64","js/app-core-06.b64","js/app-core-07.b64",
  "manifest.webmanifest","icon.svg"
];
self.addEventListener("install",event=>{
  event.waitUntil(caches.open(CACHE).then(cache=>cache.addAll(ASSETS)).then(()=>self.skipWaiting()));
});
self.addEventListener("activate",event=>{
  event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim()));
});
self.addEventListener("fetch",event=>{
  if(event.request.method!=="GET")return;
  event.respondWith(fetch(event.request).then(response=>{
    const copy=response.clone();
    caches.open(CACHE).then(cache=>cache.put(event.request,copy));
    return response;
  }).catch(()=>caches.match(event.request).then(hit=>hit||caches.match("index.html"))));
});
