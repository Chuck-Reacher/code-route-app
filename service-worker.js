const CACHE='code-route-v1';
const A=['./index.html','./manifest.json','./icon-192.png','./icon-512.png','./apple-touch-icon.png'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(CACHE).then(c=>c.addAll(A)));self.skipWaiting();});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==CACHE).map(x=>caches.delete(x)))));self.clients.claim();});
self.addEventListener('fetch',e=>{
  if(e.request.method!=='GET')return;
  e.respondWith(caches.match(e.request).then(c=>{
    const n=fetch(e.request).then(r=>{if(r&&r.status===200){const cl=r.clone();caches.open(CACHE).then(ca=>ca.put(e.request,cl));}return r;}).catch(()=>c);
    return c||n;
  }));
});
