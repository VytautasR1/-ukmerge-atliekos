self.addEventListener("install",e=>self.skipWaiting());
self.addEventListener("activate",e=>e.waitUntil(self.clients.claim()));
self.addEventListener("push",e=>{
 let d={};try{d=e.data?e.data.json():{}}catch(_){}
 e.waitUntil(self.registration.showNotification(d.title||"Ukmergės atliekos",{
  body:d.body||"Rytoj bus išvežamos atliekos.",
  icon:"./icon-192.png",badge:"./icon-192.png",
  tag:d.tag||"ukmerge-atliekos",data:{url:d.url||"./"}
 }));
});
self.addEventListener("notificationclick",e=>{
 e.notification.close();
 e.waitUntil(clients.openWindow(e.notification.data.url));
});
