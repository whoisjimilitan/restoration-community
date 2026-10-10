/* brotherjimi.com front-end behaviour. Locked: do not edit. Endpoints live in config.js. */
(function () {
  const C = window.BJ_CONFIG || {};
  const SITE = C.site || "https://brotherjimi.com";
  const $ = (s, r) => (r || document).querySelector(s);
  const $$ = (s, r) => Array.from((r || document).querySelectorAll(s));
  const post = (url, data) => fetch(url, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });

  /* Signup */
  $$("[data-signup]").forEach(form => {
    const note = form.parentElement.querySelector(".note") || (form.closest(".wrap") && form.closest(".wrap").querySelector(".note")) || document.createElement("p");
    form.addEventListener("submit", async e => {
      e.preventDefault();
      if (form.company.value) return;
      const email = form.email.value.trim();
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        note.className = "note err"; note.textContent = "Enter an email like name@example.com.";
        form.email.focus(); return;
      }
      const btn = form.querySelector("button"); btn.disabled = true;
      try {
        const ref = new URLSearchParams(location.search).get("ref");
        const res = await post(C.subscribe, { email, ref, source: form.dataset.source || location.pathname });
        if (!res.ok) throw new Error(res.status);
        location.href = form.dataset.source === "received" ? "/welcome/received" : (form.closest(".tease") ? "/welcome?letter" : "/welcome");
      } catch (err) {
        note.className = "note err"; note.textContent = "That didn’t go through. Try again.";
        btn.disabled = false;
      }
    });
  });

  /* Sharing */
  $$("[data-wa]").forEach(a => {
    a.href = "https://wa.me/?text=" + encodeURIComponent(a.dataset.wa + " " + SITE + "/today");
    a.target = "_blank"; a.rel = "noopener";
  });
  $$("[data-copy]").forEach(b => b.addEventListener("click", async () => {
    const url = SITE + "/today";
    try { await navigator.clipboard.writeText(url); b.textContent = "Copied"; } catch (err) { b.textContent = url; }
    setTimeout(() => b.textContent = "Copy link", 2400);
  }));

  /* Prayer request */
  const pf = $("#prayer-form");
  if (pf) pf.addEventListener("submit", async e => {
    e.preventDefault();
    const note = pf.querySelector(".note"), btn = pf.querySelector("button");
    const prayer = pf.prayer.value.trim();
    if (!prayer) { note.className = "note err"; note.textContent = "Write your request first."; return; }
    btn.disabled = true;
    try {
      const res = await post(C.prayer, { prayer });
      if (!res.ok) throw new Error(res.status);
      pf.prayer.value = ""; note.className = "note"; note.textContent = "Received. I’m praying for you.";
    } catch (err) {
      note.className = "note err"; note.textContent = "That didn’t go through. Try again.";
    }
    btn.disabled = false;
  });

  /* Partner amounts */
  const give = $("#give");
  if (give) {
    const btns = $$(".amounts button"), custom = $(".custom"), input = $("#custom-amt"),
          giveBtn = $("#give-btn"), note = $("#give .note");
    let amt = 25;
    const label = () => giveBtn.textContent = amt ? "Give $" + amt + " a month" : "Give monthly";
    btns.forEach(b => b.addEventListener("click", () => {
      btns.forEach(x => x.setAttribute("aria-pressed", x === b));
      custom.hidden = b.dataset.amt !== "custom";
      amt = b.dataset.amt === "custom" ? (parseInt(input.value) || 0) : +b.dataset.amt;
      if (!custom.hidden) input.focus(); label();
    }));
    input.addEventListener("input", () => { amt = parseInt(input.value) || 0; label(); });
    give.addEventListener("submit", async e => {
      e.preventDefault();
      if (!amt || amt < 1) { note.className = "note err"; note.textContent = "Enter $1 or more."; return; }
      giveBtn.disabled = true;
      try {
        const res = await post(C.checkout, { amount: amt });
        if (!res.ok) throw new Error(res.status);
        const data = await res.json();
        location.href = data.url;
      } catch (err) {
        note.className = "note err"; note.textContent = "That didn’t go through. Try again.";
        giveBtn.disabled = false;
      }
    });
  }

  /* Letter: the 6:00 AM notification opens into the full letter, and folds back when closed */
  $$("[data-letter]").forEach(card => {
    const sheet = document.getElementById(card.getAttribute("aria-controls"));
    if (!sheet || !sheet.showModal) return;
    const calm = () => matchMedia("(prefers-reduced-motion: reduce)").matches;
    const from = () => {
      const c = card.getBoundingClientRect(), d = sheet.getBoundingClientRect();
      return `translate(${c.left - d.left}px, ${c.top - d.top}px) scale(${c.width / d.width}, ${c.height / d.height})`;
    };
    const ease = "cubic-bezier(.3,.7,.2,1)";
    card.addEventListener("click", () => {
      sheet.showModal(); sheet.scrollTop = 0;
      if (calm() || !sheet.animate) return;
      card.classList.add("away");
      sheet.style.transformOrigin = "0 0";
      sheet.animate([{ transform: from(), opacity: .4, borderRadius: "24px" }, { transform: "none", opacity: 1 }], { duration: 480, easing: ease });
    });
    let closing = false;
    const close = () => {
      if (closing) return;
      if (calm() || !sheet.animate) { sheet.close(); return; }
      closing = true; sheet.scrollTop = 0;
      sheet.animate([{ transform: "none", opacity: 1 }, { transform: from(), opacity: .3 }], { duration: 380, easing: ease })
        .finished.then(() => { sheet.close(); closing = false; });
    };
    $("[data-letter-close]", sheet).addEventListener("click", close);
    sheet.addEventListener("click", e => { if (e.target === sheet) close(); });
    sheet.addEventListener("cancel", e => { e.preventDefault(); close(); });
    sheet.addEventListener("close", () => { card.classList.remove("away"); card.focus({ preventScroll: true }); });
  });
  /* end Letter */

  /* Reply: opens a real reply under the letter (it goes to Jimi through the prayer form) */
  $$("[data-reply]").forEach(b => b.addEventListener("click", () => {
    const f = b.closest(".email") && b.closest(".email").querySelector(".em-reply");
    if (!f) return;
    f.hidden = false;
    const t = f.querySelector("textarea"); if (t) t.focus();
  }));

  /* "I'll do this today": the commitment opens the next step (share, and on the homepage the signup) */
  $$("[data-commit]").forEach(commit => {
    const then = commit.closest(".commit") && commit.closest(".commit").querySelector(".commit-then");
    if (then) commit.addEventListener("click", () => {
      commit.hidden = true; then.hidden = false;
      const first = then.querySelector("button, input[type=email]"); if (first) first.focus({ preventScroll: true });
    });
  });

  /* Scene: the moment of receiving plays once, when the phone comes into view */
  $$("[data-scene]").forEach(sc => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = $("[data-time]", sc); if (!t) return;
    sc.classList.add("pre"); t.textContent = "5:59";
    const run = () => {
      setTimeout(() => sc.classList.add("warm"), 300);
      setTimeout(() => { t.textContent = "6:00"; sc.classList.add("tick"); }, 2100);
      setTimeout(() => sc.classList.remove("pre", "warm"), 2600);
    };
    if ("IntersectionObserver" in window) {
      const io = new IntersectionObserver(es => { if (es.some(e => e.isIntersecting)) { io.disconnect(); run(); } }, { threshold: 0.35 });
      io.observe(sc);
    } else run();
  });
  /* end Scene */

  /* Dock: hidden on the homepage while the hero signup bar is on screen, so they never stack */
  const dock = $("[data-dock]"), heroBar = $(".hero .bar");
  if (dock && heroBar && "IntersectionObserver" in window) {
    dock.classList.add("away");
    new IntersectionObserver(es => es.forEach(e => dock.classList.toggle("away", e.isIntersecting))).observe(heroBar);
  }

  /* Dates */
  /* Today: the day's video, title, line and link come from /today/today.json (filled each morning) */
  let todayCard = "";
  const shareTo = async (path) => {
    const url = SITE + (path || "/today") + ((path || "").includes("?") ? "&" : "?") + "ref=share";
    const text = "This was for me today. I thought of you.";
    /* Where the phone can share images, today's Status card goes with the link (ready for WhatsApp Status) */
    if (todayCard && path !== "/" && navigator.canShare) {
      try {
        const blob = await (await fetch(todayCard)).blob();
        const file = new File([blob], "brother-jimi-today.png", { type: blob.type || "image/png" });
        if (navigator.canShare({ files: [file] })) { await navigator.share({ files: [file], text: text + " " + url }); return; }
      } catch (err) { if (err && err.name === "AbortError") return; }
    }
    if (navigator.share) navigator.share({ text, url }).catch(() => {});
    else window.open("https://wa.me/?text=" + encodeURIComponent(text + " " + url), "_blank", "noopener");
  };
  let todayUrl = "/today";
  $$("[data-share]").forEach(b => b.addEventListener("click", () => shareTo(b.dataset.shareUrl || todayUrl)));

  const ring = 301.6;
  const wireVideo = (box, src, poster) => {
    const v = $("video", box), play = $(".vid-play", box), prg = $(".prg", box);
    if (poster) v.poster = poster;
    v.src = src;
    play.addEventListener("click", () => { v.paused ? v.play() : v.pause(); });
    v.addEventListener("play", () => box.classList.add("playing"));
    v.addEventListener("pause", () => box.classList.remove("playing"));
    v.addEventListener("ended", () => { box.classList.remove("playing"); prg.style.strokeDashoffset = ring; });
    v.addEventListener("timeupdate", () => { if (v.duration) prg.style.strokeDashoffset = ring * (1 - v.currentTime / v.duration); });
    return v;
  };

  const loadToday = () => window.BJ_TODAY ? Promise.resolve(window.BJ_TODAY)
    : fetch("/today/today.json", { cache: "no-cache" }).then(r => r.ok ? r.json() : null).catch(() => null);
  loadToday().then(T => {
    if (!T) return;
    if (T.url) todayUrl = T.url;
    if (T.card) todayCard = T.card;
    $$("[data-t]").forEach(el => { if (T[el.dataset.t]) el.textContent = T[el.dataset.t]; });
    $$("[data-t-href]").forEach(el => { if (T[el.dataset.tHref]) el.href = T[el.dataset.tHref]; });
    const d = $("#today-date"); if (d && T.dateLabel) d.textContent = T.dateLabel;
    /* The real number of people who started this month. Shown only from 50 up; never estimated. */
    const c = $("[data-count]"), n = Number(T.startedThisMonth);
    if (c && Number.isInteger(n) && n >= 50) { $("[data-count-n]", c).textContent = n.toLocaleString("en-US"); c.hidden = false; }
    if (!T.video) return;
    const inline = $(".vid-inline"); if (inline) { inline.hidden = false; wireVideo(inline, T.video, T.poster); }
    const face = $("[data-today-face]"), sheet = $("#today-sheet");
    if (!face || !sheet || !sheet.showModal) return;
    const v = wireVideo($("[data-vid]", sheet), T.video, T.poster);
    face.classList.add("live");
    face.addEventListener("click", e => { e.preventDefault(); sheet.showModal(); v.play().catch(() => {}); });
    $("[data-vid-close]", sheet).addEventListener("click", () => sheet.close());
    sheet.addEventListener("click", e => { if (e.target === sheet) sheet.close(); });
    sheet.addEventListener("close", () => v.pause());
  });
  const y = $("#yr"); if (y) y.textContent = new Date().getFullYear();
})();

/* ===== Concept: One morning ===== */
(function(){
  const $=(q,r=document)=>r.querySelector(q), $$=(q,r=document)=>[...r.querySelectorAll(q)];
  const calm=matchMedia("(prefers-reduced-motion: reduce)").matches;
  const clamp=(v,a=0,b=1)=>Math.min(b,Math.max(a,v));

  /* 1. Bubble: tap for sound, tap again to mute */
  const bub=$("[data-cbub]");
  if(bub){ const v=$("video",bub);
    if(calm){ v.removeAttribute("autoplay"); v.pause(); }
    bub.addEventListener("click",()=>{
      if(v.muted){ v.muted=false; v.currentTime=0; v.play().catch(()=>{}); bub.classList.add("sound"); bub.setAttribute("aria-label","Mute Brother Jimi’s welcome"); }
      else { v.muted=true; bub.classList.remove("sound"); bub.setAttribute("aria-label","Play Brother Jimi’s welcome with sound"); }
    });
  }

  /* 2. The letter opens itself as you scroll */
  const sc=$("[data-cscene]");
  if(sc){
    const dev=$(".cdev",sc), t=$("[data-time]",sc), body=$(".mv-body",sc), win=$(".mv-win",sc), vs=$(".mv-body .vs",sc);
    const dawn=$(".dawn",sc);
    if(calm){ sc.classList.add("still","done"); dev.classList.add("notif","open"); }
    else {
      const frame=()=>{
        const r=sc.getBoundingClientRect(), span=r.height-innerHeight;
        const p=clamp(-r.top/span);
        sc.style.setProperty("--p",p.toFixed(3));
        dawn.style.opacity=clamp(p/0.12);
        t.textContent=p<0.12?"5:59":"6:00";
        dev.classList.toggle("notif",p>=0.14);
        dev.classList.toggle("open",p>=0.30);
        const q=clamp((p-0.36)/0.5), max=Math.max(0,body.scrollHeight-win.clientHeight+90);
        body.style.transform=`translateY(${-q*max}px)`;
        if(vs){ const vr=vs.getBoundingClientRect(), wr=win.getBoundingClientRect(); vs.classList.toggle("lit", p>0.3 && vr.top < wr.bottom-30); }
        sc.classList.toggle("done",p>=0.9);
      };
      let raf=0; const on=()=>{ if(!raf) raf=requestAnimationFrame(()=>{raf=0;frame();}); };
      addEventListener("scroll",on,{passive:true}); addEventListener("resize",on); frame();
    }
    const commit=$("[data-cs-commit]",sc), read=$(".cs-read",sc);
    if(commit&&read) commit.addEventListener("click",()=>{ read.click(); const c=$("[data-commit]"); if(c&&!c.hidden) setTimeout(()=>{ c.click(); const sh=$("#letter-sheet"); if(sh) sh.scrollTop=sh.scrollHeight; },60); });
  }

  /* 3. Ninety mornings: dots fill as the section comes up */
  const days=$(".days");
  if(days){ const dots=$$("i",days);
    if(calm) dots.forEach(d=>d.classList.add("on"));
    else { const f=()=>{ const r=days.getBoundingClientRect(); const p=clamp((innerHeight*0.92-r.top)/(innerHeight*0.6)); const n=Math.round(p*dots.length); dots.forEach((d,i)=>d.classList.toggle("on",i<n)); };
      addEventListener("scroll",f,{passive:true}); f(); }
  }

  /* 4. The thread draws itself into each section */
  const th=$$(".thread");
  if("IntersectionObserver" in window){ const io=new IntersectionObserver(es=>es.forEach(e=>{ if(e.isIntersecting){ e.target.classList.add("drawn"); io.unobserve(e.target);} }),{threshold:.6}); th.forEach(x=>io.observe(x)); }
  else th.forEach(x=>x.classList.add("drawn"));
})();

/* ===== Concept: Pass it on ===== */
(function(){
  const msgEl=document.querySelector("[data-pass-msg]");
  const msg=msgEl?msgEl.textContent:"Start your 90 mornings with Brother Jimi: https://brotherjimi.com/?ref=share";
  document.querySelectorAll("[data-pass]").forEach(b=>b.addEventListener("click",async()=>{
    const src=b.getAttribute("data-pass")||b.closest(".pc").querySelector("img").src;
    try{
      const img=b.closest(".pc").querySelector("img"); const r=await fetch(img.currentSrc||img.src); const blob=await r.blob();
      const file=new File([blob],"brotherjimi-today.jpg",{type:"image/jpeg"});
      if(navigator.canShare&&navigator.canShare({files:[file]})){ await navigator.share({files:[file],text:msg}); return; }
    }catch(e){ if(e&&e.name==="AbortError") return; }
    open("https://wa.me/?text="+encodeURIComponent(msg),"_blank","noopener");
  }));
  const copy=(t,btn)=>{ (navigator.clipboard?navigator.clipboard.writeText(t):Promise.reject()).then(()=>{ const o=btn.textContent; btn.textContent="Copied"; setTimeout(()=>btn.textContent=o,1600); }).catch(()=>{}); };
  document.querySelectorAll("[data-pass-copy]").forEach(b=>b.addEventListener("click",()=>copy(msg,b)));
  document.querySelectorAll("[data-pass-copy-link]").forEach(b=>b.addEventListener("click",()=>copy("https://brotherjimi.com/?ref=share",b)));
})();

/* ===== Concept 2 ===== */
(function(){
  const ph=document.querySelector(".answer .photo");
  if(ph&&"IntersectionObserver" in window){ const io=new IntersectionObserver(es=>{ if(es.some(e=>e.isIntersecting)){ ph.classList.add("go"); io.disconnect(); } },{threshold:.45}); io.observe(ph); }
  else if(ph) ph.classList.add("go");
})();

/* Concept 2: share today's video as a file (WhatsApp Status), else open WhatsApp with the message */
(function(){
  const msgEl=document.querySelector("[data-pass-msg]");
  const msg=msgEl?msgEl.textContent:"Start your 90 mornings with Brother Jimi: https://brotherjimi.com/?ref=share";
  document.querySelectorAll("[data-pass-vid]").forEach(b=>b.addEventListener("click",async()=>{
    try{
      const v=b.closest(".pc").querySelector("video"); const r=await fetch(v.currentSrc||v.src); const blob=await r.blob();
      const file=new File([blob],"brotherjimi-today.mp4",{type:"video/mp4"});
      if(navigator.canShare&&navigator.canShare({files:[file]})){ await navigator.share({files:[file],text:msg}); return; }
    }catch(e){ if(e&&e.name==="AbortError") return; }
    open("https://wa.me/?text="+encodeURIComponent(msg),"_blank","noopener");
  }));
})();

/* ===== Concept 2: hero shows Jimi's photo until tapped, then plays with sound ===== */
(function(){
  const b=document.querySelector("[data-hplay]"); if(!b) return; const v=b.querySelector("video");
  b.addEventListener("click",()=>{ if(v.paused) v.play().catch(()=>{}); else v.pause(); });
  v.addEventListener("play",()=>b.classList.add("playing","seen"));
  v.addEventListener("pause",()=>b.classList.remove("playing"));
  v.addEventListener("ended",()=>{ b.classList.remove("playing"); v.currentTime=0; });
})();
/* ===== Concept 2: one-tap share row ===== */
(function(){
  document.querySelectorAll("[data-wa-choose]").forEach(b=>{
    const box=b.closest(".srow").nextElementSibling;
    b.addEventListener("click",()=>{ const open=box.hidden; box.hidden=!open; b.setAttribute("aria-expanded",open); });
  });
  const flash=(b,t)=>{ const o=b.textContent; b.textContent=t; setTimeout(()=>b.textContent=o,1600); };
  document.querySelectorAll("[data-sr-copy]").forEach(b=>b.addEventListener("click",()=>{
    (navigator.clipboard?navigator.clipboard.writeText(b.dataset.srCopy):Promise.reject()).then(()=>flash(b,"Copied")).catch(()=>{});
  }));
  document.querySelectorAll("[data-sr-more]").forEach(b=>b.addEventListener("click",()=>{
    if(navigator.share) navigator.share({text:b.dataset.text,url:b.dataset.url}).catch(()=>{});
    else open("https://wa.me/?text="+encodeURIComponent(b.dataset.text+" "+b.dataset.url),"_blank","noopener");
  }));
  const shareFile=async(src,name,type)=>{
    const msgB=document.querySelector("[data-sr-more]"); const text=msgB?msgB.dataset.text+" "+msgB.dataset.url:"";
    try{ const r=await fetch(src); const blob=await r.blob(); const f=new File([blob],name,{type});
      if(navigator.canShare&&navigator.canShare({files:[f]})){ await navigator.share({files:[f],text}); return; } }catch(e){ if(e&&e.name==="AbortError") return; }
    open("https://wa.me/?text="+encodeURIComponent(text),"_blank","noopener");
  };
  document.querySelectorAll("[data-pass-img]").forEach(b=>b.addEventListener("click",()=>shareFile(b.dataset.passImg,"brotherjimi-today.jpg","image/jpeg")));
  document.querySelectorAll("[data-sr-vid]").forEach(b=>b.addEventListener("click",()=>shareFile(b.dataset.srVid,"brotherjimi-today.mp4","video/mp4")));
})();

/* Voice note: Jimi reads today's letter */
(function(){
  const l=document.querySelector("[data-listen]"); if(!l) return;
  const a=l.querySelector("audio"), b=l.querySelector(".ls-btn"), bar=l.querySelector(".ls-bar i"), t=l.querySelector("[data-ls-time]");
  const fmt=s=>Math.floor(s/60)+":"+String(Math.floor(s%60)).padStart(2,"0");
  b.addEventListener("click",()=>{ a.paused?a.play().catch(()=>{}):a.pause(); });
  a.addEventListener("play",()=>l.classList.add("on")); a.addEventListener("pause",()=>l.classList.remove("on"));
  a.addEventListener("timeupdate",()=>{ if(a.duration){ bar.style.width=(a.currentTime/a.duration*100)+"%"; t.textContent=fmt(a.currentTime)+" / "+fmt(a.duration);} });
  a.addEventListener("ended",()=>{ l.classList.remove("on"); bar.style.width="0"; });
})();

/* ===== Final: the Word rises toward the reader, then the highlighter; questions one at a time ===== */
(function(){
  const st=document.querySelector(".answer .stage"), ph=st&&st.querySelector(".photo");
  if(st&&"IntersectionObserver" in window){
    const io=new IntersectionObserver(es=>{ if(es.some(e=>e.isIntersecting)){ st.classList.add("up"); setTimeout(()=>ph&&ph.classList.add("go"),900); io.disconnect(); } },{threshold:.3});
    io.observe(st);
  } else if(st){ st.classList.add("up"); ph&&ph.classList.add("go"); }
  const ql=document.querySelector(".asklist");
  if(ql&&"IntersectionObserver" in window){ const io2=new IntersectionObserver(es=>{ if(es.some(e=>e.isIntersecting)){ ql.classList.add("in"); io2.disconnect(); } },{threshold:.15}); io2.observe(ql); }
  else if(ql) ql.classList.add("in");
})();

/* ===== Questions become doorways; readers' words appear only when real ===== */
(function(){
  const esc=t=>String(t).replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
  fetch("/counsel/index.json",{cache:"no-cache"}).then(r=>r.ok?r.json():[]).catch(()=>[]).then(slugs=>{
    if(!Array.isArray(slugs)) return;
    document.querySelectorAll(".asklist li[data-topic]").forEach(li=>{
      if(slugs.includes(li.dataset.topic)){ const a=document.createElement("a"); a.href="/counsel/"+li.dataset.topic; a.textContent=li.textContent; li.textContent=""; li.appendChild(a); }
    });
  });
  const box=document.querySelector("[data-voices]");
  if(box) fetch("/voices.json",{cache:"no-cache"}).then(r=>r.ok?r.json():[]).catch(()=>[]).then(v=>{
    if(!Array.isArray(v)||!v.length) return;
    box.querySelector("[data-voices-list]").innerHTML=v.slice(0,3).map(x=>"<figure><blockquote>“"+esc(x.words)+"”</blockquote><figcaption>"+esc(x.from||"A reader")+"</figcaption></figure>").join("");
    box.hidden=false;
  });
})();

/* ===== Burden cards: settle into view; a card links once its topic page is published ===== */
(function(){
  const box=document.querySelector(".burdens"); if(!box) return;
  if("IntersectionObserver" in window){ const io=new IntersectionObserver(es=>{ if(es.some(e=>e.isIntersecting)){ box.classList.add("in"); io.disconnect(); } },{threshold:.2}); io.observe(box); } else box.classList.add("in");
  fetch("/counsel/index.json",{cache:"no-cache"}).then(r=>r.ok?r.json():[]).catch(()=>[]).then(sl=>{
    if(!Array.isArray(sl)) return;
    box.querySelectorAll(".bcard[data-topic]").forEach(c=>{ if(sl.includes(c.dataset.topic)){ const a=document.createElement("a"); a.href="/counsel/"+c.dataset.topic; a.textContent=c.textContent; c.textContent=""; c.appendChild(a);} });
  });
})();

/* ===== Flow: the notes are carried into the Word (scroll-linked; off for reduced motion) ===== */
(function(){
  const sec=document.querySelector(".answer"), track=sec&&sec.querySelector(".flow-track");
  if(!track||matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  const pin=track.querySelector(".flow-pin"), cards=[...pin.querySelectorAll(".bcard")], st=pin.querySelector(".stage"), target=pin.querySelector(".hl:nth-of-type(2)");
  sec.classList.add("flow");
  let rel=[], lift=0; const hd=pin.querySelector(".answer-h"), bx=pin.querySelector(".burdens");
  const measure=()=>{
    const hdr=document.querySelector("header"); const h=hdr?hdr.getBoundingClientRect().height:56;
    pin.style.setProperty("--pin-top",Math.max(h+8,Math.min((innerHeight-pin.offsetHeight)/2+h/2,innerHeight-pin.offsetHeight-84))+"px");
    cards.forEach(c=>c.style.transform="none"); st.style.translate=""; hd.style.translate="";
    const pr=pin.getBoundingClientRect();
    rel=cards.map(c=>{ const r=c.getBoundingClientRect(); return [r.left+r.width/2-pr.left, r.top+r.height/2-pr.top]; });
    lift=bx.offsetHeight*.8;
    tick();
  };
  const ease=x=>x<.5?2*x*x:1-Math.pow(-2*x+2,2)/2, cl=x=>Math.max(0,Math.min(1,x));
  const tick=()=>{
    const r=track.getBoundingClientRect(), range=track.offsetHeight-innerHeight;
    const p=cl(-r.top/Math.max(1,range));
    const up=-lift*ease(cl((p-.62)/.3)); st.style.translate=`0 ${up}px`; hd.style.translate=`0 ${up}px`;
    const pr=pin.getBoundingClientRect(), t0=target.getBoundingClientRect(), tx=t0.left+t0.width/2, ty=t0.top+t0.height/2;
    cards.forEach((c,i)=>{
      const o=[3,4,5,0,1,2].indexOf(i), t=ease(cl((p-(.16+o*.07))/.32));
      const dx=tx-(pr.left+rel[i][0]), dy=ty-(pr.top+rel[i][1]);
      c.style.zIndex=t>0?String(10+o):"";
      const rot=getComputedStyle(c).getPropertyValue("--r")||"0deg";
      c.style.transform=`translate(${dx*t}px,${dy*t}px) scale(${1-.82*t}) rotate(calc(${rot} * ${1-t}))`;
      c.style.opacity=String(1-Math.pow(t,3));
    });
    st.style.setProperty("--st",String(.6+.4*cl((p-.1)/.5)));
    sec.classList.toggle("absorbed",p>.88);
  };
  addEventListener("scroll",()=>requestAnimationFrame(tick),{passive:true});
  addEventListener("resize",measure);
  addEventListener("load",measure); measure();
})();

/* ===== Today's recording (video first, else voice; the letter always) and full screen for every video ===== */
(function(){
  const full=v=>{ if(!v) return; if(v.requestFullscreen) v.requestFullscreen().catch(()=>{}); else if(v.webkitEnterFullscreen) v.webkitEnterFullscreen(); if(v.paused) v.play().catch(()=>{}); };
  document.querySelectorAll("[data-fullscreen]").forEach(b=>b.addEventListener("click",e=>{ e.stopPropagation(); full(b.parentElement.querySelector("video")); }));
  const hw=document.querySelector(".fv-wrap"), hv=hw&&hw.querySelector("video");
  if(hv){ hv.addEventListener("play",()=>hw.classList.add("playing")); hv.addEventListener("pause",()=>hw.classList.remove("playing")); }
  const w=document.querySelector("[data-watch]"); if(!w) return;
  const get=()=>window.BJ_TODAY?Promise.resolve(window.BJ_TODAY):fetch("/today/today.json",{cache:"no-cache"}).then(r=>r.ok?r.json():null).catch(()=>null);
  get().then(T=>{
    if(!T) return;
    const src=T.statusVideo||T.video; if(!src) return;
    const v=w.querySelector("video"); v.src=src; if(T.poster) v.poster=T.poster;
    const wa=w.querySelector(".w-wa"); if(wa){ if(T.statusVideo){ wa.dataset.srVid=T.statusVideo; wa.hidden=false; } else wa.hidden=true; }
    w.hidden=false;
    const l=document.querySelector("[data-listen]"); if(l){ l.hidden=true; setTimeout(()=>l.hidden=true,0); }
    w.querySelector(".w-play").addEventListener("click",()=>{ v.controls=true; v.play().catch(()=>{}); });
    v.addEventListener("play",()=>w.classList.add("on"));
  });
})();

/* ===== A counsel page: Do this today -> Amen -> share; more on the same burden; the topic links once its page exists ===== */
(function(){
  const b=document.querySelector("[data-doit]");
  if(b) b.addEventListener("click",()=>{ const t=b.nextElementSibling; b.hidden=true; t.hidden=false; });
  const box=document.querySelector("[data-more]"), tag=document.querySelector(".cq-topic[data-topic]");
  if(!box||!tag) return;
  const esc=t=>String(t).replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
  const here=location.pathname.replace(/\/$/,"");
  fetch("/counsel/index.json",{cache:"no-cache"}).then(r=>r.ok?r.json():[]).catch(()=>[]).then(sl=>{
    if(Array.isArray(sl)&&sl.includes(tag.dataset.topic)){ const a=document.createElement("a"); a.href="/counsel/"+tag.dataset.topic; a.textContent=tag.textContent; tag.textContent=""; tag.appendChild(a); }
  });
  fetch("/today/archive.json",{cache:"no-cache"}).then(r=>r.ok?r.json():[]).catch(()=>[]).then(all=>{
    if(!Array.isArray(all)) return;
    const cur=document.querySelector("#today-date"), list=all.filter(x=>x.topic===tag.dataset.topic&&x.url!==here&&!(cur&&x.dateLabel===cur.textContent)).slice(0,3);
    if(!list.length) return;
    box.querySelector("[data-more-topic]").textContent=tag.textContent;
    box.querySelector("[data-more-list]").innerHTML=list.map(x=>'<li><a href="'+esc(x.url)+'">'+esc(x.question)+'<span>'+esc(x.dateLabel)+'</span></a></li>').join("");
    box.hidden=false;
  });
})();

/* ===== The video as the counsel's cover: move the topic and question onto it ===== */
(function(){
  const w=document.querySelector("[data-watch]"), h=document.querySelector(".cq-head"); if(!w||!h) return;
  const go=()=>{ if(w.hidden||w.classList.contains("cover")) return;
    const f=w.querySelector(".w-frame"), t=h.querySelector(".when");
    w.classList.add("cover");
    if(t){ t.classList.add("cover-top"); f.appendChild(t); }
    f.appendChild(h); };
  new MutationObserver(go).observe(w,{attributes:true,attributeFilter:["hidden"]}); go();
})();

/* ===== The letter carries the same date as the page ===== */
(function(){ const d=document.querySelector("#today-date"); document.querySelectorAll("[data-copy-date]").forEach(t=>{ const f=()=>t.textContent=d?d.textContent:""; f(); if(d) new MutationObserver(f).observe(d,{childList:true,characterData:true,subtree:true}); }); })();
/* ===== Welcome, after "Send it" on a counsel page: the letter is on its way now; Day 1 is tomorrow ===== */
(function(){
  if(location.pathname.replace(/\/$/,"")!=="/welcome"||!/(^|[?&])letter\b/.test(location.search.slice(1))) return;
  const l=document.querySelector(".open .lede"); if(l) l.textContent="Tap the link in the email to confirm. Today’s letter follows straight away, and Day 1 tomorrow morning.";
})();

/* ===== Receive Jesus: scrolling down brings up the next card (same direction as Home); Next/Back scroll for you ===== */
(function(){
  const sec=document.querySelector("[data-steps]"); if(!sec) return;
  if(matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  const pin=sec.querySelector(".rj-pin"), cards=[...sec.querySelectorAll(".st")], bars=[...sec.querySelectorAll(".st-bars i")],
        next=sec.querySelector(".st-next"), back=sec.querySelector(".st-back"), N=cards.length;
  sec.classList.add("v");
  let i=-1;
  const range=()=>sec.offsetHeight-innerHeight;
  const place=()=>{ const h=document.querySelector("header"), t=(h?h.getBoundingClientRect().height:52)+10;
    pin.style.setProperty("--rj-top",Math.max(t,Math.min((innerHeight-pin.offsetHeight)/2+t/2,innerHeight-pin.offsetHeight-90))+"px"); };
  const show=n=>{ if(n===i) return; i=n;
    cards.forEach((c,k)=>{ c.classList.toggle("on",k===i); c.classList.toggle("past",k<i); c.setAttribute("aria-hidden",k===i?"false":"true"); });
    bars.forEach((b,k)=>b.classList.toggle("on",k<=i)); back.disabled=i===0; next.textContent=i===N-1?"I prayed this":"Next"; };
  const tick=()=>{ const p=Math.min(1,Math.max(0,-sec.getBoundingClientRect().top/Math.max(1,range()))); show(Math.min(N-1,Math.round(p*(N-1)))); };
  const top=()=>sec.getBoundingClientRect().top+scrollY;
  const go=n=>scrollTo({top:top()+range()*Math.max(0,Math.min(N-1,n))/(N-1),behavior:"smooth"});
  next.addEventListener("click",()=>{ if(i<N-1) go(i+1); else { const c=document.querySelector(".close"); if(c){ c.scrollIntoView({behavior:"smooth",block:"center"}); setTimeout(()=>{ const e=c.querySelector("input[type=email]"); e&&e.focus({preventScroll:true}); },700); } } });
  back.addEventListener("click",()=>go(i-1));
  addEventListener("scroll",()=>requestAnimationFrame(tick),{passive:true});
  addEventListener("resize",()=>{ place(); tick(); });
  place(); tick();
})();

/* ===== Focus: the message nearest the middle of the screen is clear; the others rest faintly ===== */
(function(){
  const els=[...document.querySelectorAll("[data-focus]")]; if(!els.length) return;
  if(matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  const tick=()=>{ const mid=innerHeight/2;
    els.forEach(e=>{ const r=e.getBoundingClientRect(), c=r.top+r.height/2, d=Math.min(1,Math.abs(c-mid)/(innerHeight*.55));
      e.style.opacity=String(Math.max(.08,1-d*d*1.15)); e.style.transform=`translateY(${(c-mid)*.06}px)`; }); };
  addEventListener("scroll",()=>requestAnimationFrame(tick),{passive:true}); addEventListener("resize",tick); tick();
})();
/* ===== Home: "Maybe you're asking" fades as the notes go into the Word ===== */
(function(){
  const h=document.querySelector(".burdens-h"), tr=document.querySelector(".flow-track"); if(!h||!tr) return;
  if(matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  const tick=()=>{ if(!document.querySelector(".answer.flow")) return; const r=tr.getBoundingClientRect(), p=Math.max(0,Math.min(1,-r.top/Math.max(1,tr.offsetHeight-innerHeight)));
    h.style.opacity=String(Math.max(0,1-Math.max(0,(p-.12)/.3))); };
  addEventListener("scroll",()=>requestAnimationFrame(tick),{passive:true}); tick();
})();

/* ===== Prayer requests: send, then offer a call (number + WhatsApp, both optional) ===== */
(function(){
  const f=document.getElementById("prayer-form"); if(!f) return;
  const step=f.querySelector("[data-call]"); if(!step) return;
  const C=window.BJ_CONFIG||{prayer:"/api/prayer"};
  const send=body=>fetch(C.prayer,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(body)});
  let lastId=null, lastText="";
  f.addEventListener("submit",async e=>{
    e.preventDefault(); e.stopImmediatePropagation();
    const note=f.querySelector(":scope > .note"), t=f.prayer.value.trim();
    if(!t){ note.className="note err"; note.textContent="Write your request first."; return; }
    const b=f.querySelector(":scope > .row button"); b.disabled=true;
    try{ const r=await send({prayer:t}); if(!r.ok) throw 0; try{ const j=await r.clone().json(); lastId=j&&j.id||null; }catch(_){}
      lastText=t; f.classList.add("sent"); step.hidden=false; step.querySelector("input[type=tel]").focus({preventScroll:true}); }
    catch(_){ note.className="note err"; note.textContent="That didn’t go through. Try again."; b.disabled=false; }
  },true);
  step.querySelector("[data-call-send]").addEventListener("click",async()=>{
    const n=step.querySelector(".note"), ph=step.querySelector("input[type=tel]").value.trim(), wa=step.querySelector("#call-wa").checked;
    if(!/^\+?[\d\s()-]{7,}$/.test(ph)){ n.className="note err"; n.textContent="Enter a number with its country code, like +233 24 123 4567."; return; }
    const btn=step.querySelector("[data-call-send]"); btn.disabled=true;
    try{ const r=await send(lastId?{id:lastId,phone:ph,whatsapp:wa}:{prayer:lastText,phone:ph,whatsapp:wa}); if(!r.ok) throw 0;
      n.className="note"; n.textContent=wa?"Thank you. I’ll call you on WhatsApp.":"Thank you. I’ll call you."; }
    catch(_){ n.className="note err"; n.textContent="That didn’t go through. Try again."; btn.disabled=false; }
  });
})();

/* ===== Daily: share text, Status video and card, voice note (all from /today/today.json) ===== */
(function(){
  const get = () => window.BJ_TODAY ? Promise.resolve(window.BJ_TODAY)
    : fetch("/today/today.json",{cache:"no-cache"}).then(r=>r.ok?r.json():null).catch(()=>null);
  get().then(T=>{
    if(!T) return;
    if(T.line){
      const msg="This morning’s letter from Brother Jimi: “"+T.line+"” Start your 90 mornings:";
      document.querySelectorAll(".srow").forEach(row=>{
        const more=row.querySelector("[data-sr-more]"); if(!more) return;
        const url=more.dataset.url, q=encodeURIComponent; more.dataset.text=msg;
        const box=row.nextElementSibling;
        const wa=box&&box.querySelector("a.wc-o"); if(wa) wa.href="https://wa.me/?text="+q(msg+" "+url);
        row.querySelectorAll("a.sr-b").forEach(a=>{
          if(a.href.includes("twitter.com")) a.href="https://twitter.com/intent/tweet?text="+q(msg)+"&url="+q(url);
          if(a.href.includes("t.me")) a.href="https://t.me/share/url?url="+q(url)+"&text="+q(msg);
        });
      });
    }
    document.querySelectorAll("[data-sr-vid]").forEach(b=>{ if(T.statusVideo){ b.dataset.srVid=T.statusVideo; b.hidden=false; } });
    document.querySelectorAll("[data-pass-img]").forEach(b=>{ if(T.card){ b.dataset.passImg=T.card; b.hidden=false; } });
    const l=document.querySelector("[data-listen]");
    if(l&&T.voice&&!(T.statusVideo||T.video)){ l.querySelector("audio").src=T.voice; l.hidden=false; }
  });
})();
