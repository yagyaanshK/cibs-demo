import puppeteer from "puppeteer-core";
const EDGE="C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe";
const SP="C:/Users/yagya/AppData/Local/Temp/claude/k--StartUp-SaaS/8e1dba89-df96-47ff-a8b8-6ef74be63d55/scratchpad";
const b=await puppeteer.launch({executablePath:EDGE,headless:"new",defaultViewport:{width:1440,height:900,deviceScaleFactor:1.5},args:["--disable-gpu"]});
const p=await b.newPage();
await p.emulateMediaFeatures([{name:"prefers-color-scheme",value:"light"}]);
await p.goto("http://localhost:4222/",{waitUntil:"networkidle2",timeout:60000});
await new Promise(r=>setTimeout(r,1500));
// closed nav
await p.screenshot({path:`${SP}/nav_closed.png`, clip:{x:0,y:170,width:1440,height:120}});
// hover "Administration"
const links=await p.$$("header nav a");
for(const l of links){const t=(await p.evaluate(e=>e.textContent,l)||"").trim(); if(t.startsWith("Administration")){await l.hover(); break;}}
await new Promise(r=>setTimeout(r,700));
await p.screenshot({path:`${SP}/nav_admin.png`, clip:{x:0,y:170,width:1440,height:520}});
// hover "Students"
for(const l of links){const t=(await p.evaluate(e=>e.textContent,l)||"").trim(); if(t.startsWith("Students")){await l.hover(); break;}}
await new Promise(r=>setTimeout(r,700));
await p.screenshot({path:`${SP}/nav_students.png`, clip:{x:0,y:170,width:1440,height:520}});
await b.close(); console.log("done");
