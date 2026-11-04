/* Tulostaulu – offline-tuki (service worker). Päivitä CACHE-versio, jos haluat pakottaa uuden välimuistin. */
const CACHE='tulostaulu-1.12.1';
const CORE=['./','./index.html','./en.html','./manifest.webmanifest','./manifest-en.webmanifest','./icon-192.png','./icon-512.png'];

self.addEventListener('install',e=>{
  e.waitUntil(caches.open(CACHE).then(c=>Promise.all(CORE.map(u=>c.add(u).catch(()=>{})))).then(()=>self.skipWaiting()));
});

self.addEventListener('activate',e=>{
  e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim()));
});

self.addEventListener('fetch',e=>{
  const req=e.request;
  if(req.method!=='GET')return;
  const url=new URL(req.url);
  if(url.hostname==='api.github.com')return;
  const isPage=req.mode==='navigate'||(url.origin===location.origin&&/(\.html?|\/)$/.test(url.pathname));
  if(isPage){
    // Sivut: verkko ensin (saa päivitykset), välimuisti jos verkkoa ei ole
    e.respondWith(
      fetch(req).then(r=>{if(r&&r.ok){const cp=r.clone();caches.open(CACHE).then(c=>c.put(req,cp));}return r;})
        .catch(()=>caches.match(req,{ignoreSearch:true}).then(r=>r||caches.match('./index.html')))
    );
    return;
  }
  // Muut tiedostot (fontit, logot, kuvakkeet): välimuisti ensin, päivitys taustalla
  e.respondWith(caches.match(req).then(hit=>{
    const net=fetch(req).then(r=>{if(r&&(r.ok||r.type==='opaque')){const cp=r.clone();caches.open(CACHE).then(c=>c.put(req,cp));}return r;}).catch(()=>hit);
    return hit||net;
  }));
});
