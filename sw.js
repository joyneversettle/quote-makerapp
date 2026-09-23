const CACHE="quotation-maker-v4-1";
const APP_SHELL=["./","./index.html","./manifest.webmanifest","./icon-192.png","./icon-512.png","./favicon-64.png","./apple-touch-icon.png"];
self.addEventListener("install",event=>{event.waitUntil(caches.open(CACHE).then(c=>c.addAll(APP_SHELL)).then(()=>self.skipWaiting()))});
self.addEventListener("activate",event=>{event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim()))});
self.addEventListener("message",event=>{if(event.data?.type==="SKIP_WAITING")self.skipWaiting()});
self.addEventListener("fetch",event=>{if(event.request.method!=="GET")return; const u=new URL(event.request.url); if(u.origin===location.origin){event.respondWith(fetch(event.request).then(r=>{const copy=r.clone();caches.open(CACHE).then(c=>c.put(event.request,copy));return r}).catch(()=>caches.match(event.request).then(r=>r||caches.match("./index.html"))))}});
