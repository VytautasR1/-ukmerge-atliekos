const routes={
"Dukstynos":{"mixed":[["2026-09",14,28],["2026-10",12,26],["2026-11",9,23],["2026-12",7,21]],"pack":[["2026-09",14],["2026-10",5,26],["2026-11",16],["2026-12",7]],"glass":[["2026-12",30]],"streets":["A. Baranausko g.","Anykščių skg.","Bažnyčios g.","Darbininkų g.","Daržų g.","J. Basanavičiaus g.","J. Biliūno g.","Kalkių g.","Kalvių g.","Kareivinių g.","Kranto g.","Lygioji g.","Maironio g.","Maironio skg.","Paupio g.","Piliakalnio g.","Ramybės skg.","S. Daukanto g.","Šlaitų g.","Šlaitų skg.","Šviesos g.","Utenos g.","V. Krėvės g.","V. Kudirkos g.","V. Kudirkos skg.","Vaižganto g.","Vilkmergėlės g.","Virėjų g.","Vytauto g.","Žuvų g."]},
"Gėlyno":{"mixed":[["2026-09",8,22],["2026-10",6,20],["2026-11",3,17],["2026-12",1,15]],"pack":[["2026-09",15],["2026-10",6,27],["2026-11",17],["2026-12",8]],"glass":[["2026-12",1]],"streets":["Aguonų g.","Akloji g.","Alytaus g.","Alyvų g.","Aukštaičių g.","Beržų g.","Bugenėlių g.","Bugenių g.","Dirvonų g.","Dirvonų skg.","Dzūkų g.","Gražinos g.","Gvazdikų g.","Jurginų g.","Kalno g.","Linų g.","Malkų g.","Matininkų g.","Mėtų g.","Naujoji g.","Pabaisko g.","Pašilės g.","Pavasario g.","Pavasario skg.","Pergalės g.","Pievų g.","Pivonijos g.","Pušyno g.","Radastų g.","Ramunių g.","Rožių g.","S. Nėries g.","Siauroji g.","Šilagėlių g.","Šilo g.","Trakų g.","Trakų skg.","Tulpių g.","Vaitkuškio g.","Vėjų g.","Vilniaus g.","Vilties g.","Žibučių g.","Žilvičių g."]},
"Užupio":{"mixed":[["2026-09",8,22],["2026-10",6,20],["2026-11",3,17],["2026-12",1,15]],"pack":[["2026-09",16],["2026-10",7,28],["2026-11",18],["2026-12",9]],"glass":[["2026-12",2]],"streets":["Antakalnio g.","Gruodžio 17-osios g.","Gružų g.","Jaunimo g.","Kreivoji g.","Kūdrų g.","Koklių fabriko g.","Laukų g.","Lelijų g.","Liūnų g.","Lyduokių g.","Miškų g.","Nuotekų g.","Rusų g.","Smėlių g.","Šventoji g.","Vasarnamių g.","Vilniaus g.","Žalioji g."]},
"Krekšlių":{"mixed":[["2026-09",2,16,30],["2026-10",14,28],["2026-11",11,25],["2026-12",9,23]],"pack":[["2026-09",17],["2026-10",8,29],["2026-11",19],["2026-12",10]],"glass":[["2026-12",3]],"streets":["A.Vienuolio-Žukausko g.","Atgimimo g.","Ąžuolų g.","Draugystės g.","Eglių g.","Geologų g.","Jaunimo skg.","Kaštonų g.","Klevų g.","Krekšlių g.","Krekšlių skg.","Lazdynų g.","Nuotekų g.","Nuotekų skg.","Mokyklos g.","Mėlynių g.","Pamiškės g.","Pilėnų g.","Putinų g.","Santakos g.","Slėnio g.","Statybininkų g.","Šaltalankių g.","Šermukšnių g.","Taikos g.","Topolių g.","Tujų g.","Vienkiemio g.","Vingio g.","Vyšnių g."]},
"Šlapių":{"mixed":[["2026-09",2,16,30],["2026-10",14,28],["2026-11",11,25],["2026-12",9,23]],"pack":[["2026-09",18],["2026-10",9,30],["2026-11",20],["2026-12",11]],"glass":[["2026-12",4]],"streets":["A. Smetonos g.","Ajerų g.","Artilerijos g.","Artilerijos skg.","Aušros g.","Birutės g.","Deltuvos g.","Dobilų g.","Gailių g.","Gedimino g.","Gedimino skg.","Gėlių g.","Gogolio g.","Jogailos g.","Kapinės g.","Kauno g.","Klaipėdos g.","L. Giros g.","Lubinų g.","Medelyno skg.","Miglių g.","Mildos g.","Mindaugo g.","P. Cvirkos g.","Pakalnės g.","Paparčių g.","Purienų g.","Ramygalos g.","Rugiagėlių g.","Rūtų g.","Senoji g.","Smilgų g.","Sodų g.","Stoties g.","Šalpusnių g.","Širvintų g.","Šlaitų g.","Tvenkinių g.","Tvenkinių skg.","Vasario 16-osios g.","Vikių g.","Vilniaus g.","Viržių g.","Žalgirio g.","Žemaičių g.","Žemaitės g.","Žiedo g."]}};
const names={mixed:"Mišrios atliekos",pack:"Plastikas ir popierius",glass:"Stiklas"};
const street=document.querySelector("#street"), number=document.querySelector("#number"), result=document.querySelector("#result"), ns=document.querySelector("#notifyStatus");
const all=[...new Set(Object.values(routes).flatMap(x=>x.streets))].sort((a,b)=>a.localeCompare(b,"lt"));
all.forEach(s=>{const o=document.createElement("option");o.value=s;o.textContent=s;street.appendChild(o)});

function routeFor(s,n){
 for(const [r,d] of Object.entries(routes)){
  if(!d.streets.includes(s))continue;
  if(s==="Nuotekų g.") return r==="Užupio"?(n<=47?r:null):(n>=48?r:null);
  if(s==="Vilniaus g.") {
   if(r==="Gėlyno") return n>=35&&n<=113&&n%2===1?r:null;
   if(r==="Užupio") return n>=30&&n<=138&&n%2===0?r:null;
   if(r==="Šlapių") return ((n<=28&&n%2===0)||(n<=33&&n%2===1))?r:null;
  }
  if(s==="Šlaitų g.") return r==="Dukstynos"?(n>=13?r:null):(n<=12?r:null);
  return r;
 }
 return null;
}
function dates(items){
 const out=[];for(const [ym,...ds] of items)for(const d of ds)out.push(new Date(`${ym}-${String(d).padStart(2,"0")}T00:00:00`));
 return out;
}
function next(r){
 const now=new Date();now.setHours(0,0,0,0);let a=[];
 for(const k of Object.keys(names))for(const d of dates(routes[r][k]||[]))if(d>=now)a.push({d,k});
 return a.sort((a,b)=>a.d-b.d).slice(0,8);
}
function fmt(d){return d.toLocaleDateString("lt-LT",{weekday:"long",day:"numeric",month:"long"})}
function render(){
 const s=street.value,n=parseInt(number.value,10),r=routeFor(s,n);
 if(!s||!n){result.innerHTML="";return}
 if(!r){result.innerHTML='<div class="card"><b>Šiam adresui maršruto dar nenustačiau.</b></div>';return}
 localStorage.setItem("address",JSON.stringify({s,n}));
 const a=next(r);
 result.innerHTML=`<div class="card"><div class="muted">${s} ${n} · ${r} maršrutas</div><div class="next" style="margin-top:8px">Kitas išvežimas</div><div class="date">${a[0]?`${fmt(a[0].d)} — ${names[a[0].k]}`:"Grafiko nebėra"}</div>${a.map(x=>`<div class="row"><b>${fmt(x.d)}</b><br>${names[x.k]}</div>`).join("")}</div>`;
}
function saveAddress(){render()}
async function enableNotifications(){
 if(!("Notification" in window)){ns.textContent="Šis iPhone naršyklės režimas nepalaiko pranešimų.";return}
 if(location.protocol!=="https:"){ns.textContent="Pranešimams reikia HTTPS.";return}
 const p=await Notification.requestPermission();
 ns.textContent=p==="granted"?"Pranešimai leidžiami. Push serverį dar reikia prijungti.":`Pranešimai: ${p}.`;
 if(p==="granted"&&"serviceWorker" in navigator){
  try{await navigator.serviceWorker.register("./service-worker.js");}catch(e){console.error(e)}
 }
}
if("serviceWorker" in navigator) navigator.serviceWorker.register("./service-worker.js").catch(console.error);
const old=JSON.parse(localStorage.getItem("address")||"null");
if(old){street.value=old.s;number.value=old.n;render()}
