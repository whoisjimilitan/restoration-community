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

  /* Dates */
  const d = $("#today-date");
  if (d && !d.dataset.fixed) d.textContent = new Date().toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" });
  const y = $("#yr"); if (y) y.textContent = new Date().getFullYear();
})();
