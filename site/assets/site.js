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
        location.href = form.dataset.source === "received" ? "/welcome/received" : "/welcome";
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
      pf.prayer.value = ""; note.className = "note"; note.textContent = "Received. We’re praying for you.";
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
