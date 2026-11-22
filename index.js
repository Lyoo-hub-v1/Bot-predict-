const express = require('express');
const app = express();

// JANGAN ISI TOKEN DISINI! ISI DI RENDER / REPLIT BAGIAN SECRETS!
const BOT_TOKEN = process.env.BOT_TOKEN;
const CHANNEL_ID = "1574063671301111848";

function buatPrediksi(){
  let wib = new Date(new Date().toLocaleString('en-US',{timeZone:'Asia/Jakarta'}));
  let date = wib.getDate();
  let month = wib.toLocaleDateString('en-US',{month:'long', timeZone:'Asia/Jakarta'});
  let day = wib.toLocaleDateString('en-US',{weekday:'long', timeZone:'Asia/Jakarta'});

  function buatList(min, max, label){
    let teks = "";
    let jamDasar = wib.getHours()*60 + wib.getMinutes();
    for(let i=1;i<=5;i++){
      let jeda = min + Math.floor(Math.random()*(max-min));
      jamDasar += jeda;
      let jam = Math.floor(jamDasar/60)%24;
      let menit = jamDasar%60;
      let jamStr = String(jam).padStart(2,'0')+":"+String(menit).padStart(2,'0');
      let chance = i==1?"88%":i==2?"82%":i==3?"75%":i==4?"68%":"60%";
      teks += `* PET   : ${label} #${i} - MY BOT PREDICT ${jamStr} O'CLOCK WIB (${chance})\n`;
    }
    return teks;
  }

  return `🔥TODAY'S PREDICTION🔥\nDATE : ${date}\nMONTH : ${month}\nDAY : ${day}\n\nDIVINE PREDICT ‼️\n\n${buatList(12,18,"DIVINE")}\nETERNAL PREDICT ‼️\n\n${buatList(35,50,"ETERNAL")}\nSECRET PREDICT ‼️\n\n${buatList(8,12,"SECRET")}\n> CIOO PREDICT ⚡🔥 | Steal an Egg`;
}

async function kirim(){
  let pesan = buatPrediksi();
  await fetch(`https://discord.com/api/v10/channels/${CHANNEL_ID}/messages`, {
    method:'POST',
    headers:{'Authorization':`Bot ${BOT_TOKEN}`,'Content-Type':'application/json'},
    body: JSON.stringify({content: "@everyone 🔥 CIOO PREDICT UDAH KELUAR!\n\n" + pesan})
  });
  console.log("Terkirim!");
}

let sudahKirim = "";
setInterval(()=>{
  let wib = new Date(new Date().toLocaleString('en-US',{timeZone:'Asia/Jakarta'}));
  if(wib.getHours()===0 && wib.getMinutes()===0 && sudahKirim!==wib.toDateString()){
    sudahKirim = wib.toDateString();
    kirim();
  }
}, 60000);

app.get('/', (req,res)=>res.send("CIOO PREDICT BOT JALAN"));
app.get('/test', async (req,res)=>{ await kirim(); res.send("Udah dikirim test!"); });
const PORT = process.env.PORT || 3000;
app.listen(PORT, ()=>console.log("CIOO PREDICT JALAN"));
