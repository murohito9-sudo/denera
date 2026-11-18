/* ============================================================
   DENERA — The Fourth Generation of PDF Ulya
   main.js · UI layer (data terpisah di js/data.js)
   ============================================================ */
(function () {
  "use strict";

  /* ---------------- utils ---------------- */
  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const MONTHS = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];
  const MONTHS_SHORT = ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Agu", "Sep", "Okt", "Nov", "Des"];

  function esc(str) {
    return String(str == null ? "" : str).replace(/[&<>"']/g, (c) => (
      { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]
    ));
  }

  function parseDate(iso) {
    const [y, m, d] = String(iso).slice(0, 10).split("-").map(Number);
    return new Date(y, m - 1, d);
  }

  function fmtDate(iso, withYear = true) {
    const d = parseDate(iso);
    return d.getDate() + " " + MONTHS[d.getMonth()] + (withYear ? " " + d.getFullYear() : "");
  }

  function initials(name) {
    const parts = String(name).trim().split(/\s+/).filter((w) => !/^\d+$/.test(w));
    if (!parts.length) return "D";
    return (parts[0][0] + (parts[1] ? parts[1][0] : "")).toUpperCase();
  }

  const ICONS = {
    instagram: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.2" cy="6.8" r="1" fill="currentColor" stroke="none"/></svg>',
    tiktok: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M16.5 3h-2.6v11.2a2.4 2.4 0 1 1-2-2.36V9.2a5 5 0 1 0 4.6 4.98V8.7a6.4 6.4 0 0 0 3.5 1.04V7.1A3.6 3.6 0 0 1 16.5 3Z"/></svg>',
    youtube: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true"><rect x="2.5" y="5.5" width="19" height="13" rx="4"/><path d="m10.5 9.5 5 2.5-5 2.5z" fill="currentColor" stroke="none"/></svg>',
    mail: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true"><rect x="2.5" y="5" width="19" height="14" rx="3"/><path d="m3.5 7 8.5 6 8.5-6"/></svg>',
    trophy: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="M8 4h8v4a4 4 0 0 1-8 0Z"/><path d="M8 5H5.5a2.5 2.5 0 0 0 2.5 2.5M16 5h2.5A2.5 2.5 0 0 1 16 7.5"/><path d="M12 12v4M9 20h6M10 20v-2h4v2"/></svg>',
    pin: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true"><path d="M12 21s6-5.2 6-10a6 6 0 1 0-12 0c0 4.8 6 10 6 10Z"/><circle cx="12" cy="11" r="2.2"/></svg>',
    camera: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2" aria-hidden="true"><rect x="2.5" y="6.5" width="19" height="13" rx="3"/><circle cx="12" cy="13" r="3.6"/><path d="M8 6.5 9.5 4h5L16 6.5"/></svg>'
  };

  /* ---------------- data loading ----------------
     Ganti fungsi ini dengan fetch ke Supabase/Firebase.
     Bentuk objek yang dikembalikan harus sama.
  ---------------------------------------------- */
  async function loadData() {
    if (window.DENERA_DATA) return window.DENERA_DATA;
    // contoh implementasi backend di masa depan:
    // const res = await fetch("/api/site"); return await res.json();
    throw new Error("Data DENERA tidak ditemukan (js/data.js).");
  }

  /* ---------------- state ---------------- */
  const state = {
    data: null,
    memberFilter: "all",
    memberQuery: "",
    activityFilter: "All",
    achFilter: "All",
    galleryFilter: "All",
    galleryItems: [],
    lightboxIndex: 0,
    calMonth: null,
    calYear: null,
    calSelected: null,
    bookPage: 0,
    orbitFilter: "Indonesia"
  };

  /* ---------------- toast ---------------- */
  let toastTimer = null;
  function toast(msg, ms = 3400) {
    const el = $("#toast");
    el.textContent = msg;
    el.classList.add("is-on");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => el.classList.remove("is-on"), ms);
  }

  /* ---------------- reveal ---------------- */
  let revealObserver = null;
  function initReveal() {
    if (reduceMotion) {
      $$("[data-reveal]").forEach((el) => el.classList.add("is-in"));
      return;
    }
    revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-in");
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -60px 0px" }
    );
    $$("[data-reveal]").forEach((el) => revealObserver.observe(el));
  }
  function observeNew(node) {
    if (revealObserver && node) revealObserver.observe(node);
  }

  /* ---------------- nav ---------------- */
  function initNav() {
    const nav = $("#nav");
    const toggle = $("#navToggle");
    const brand = $("#brand");

    const onScroll = () => {
      nav.classList.toggle("is-scrolled", window.scrollY > 40);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    const closeMenu = () => {
      nav.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
      document.body.classList.remove("is-locked");
    };
    const openMenu = () => {
      nav.classList.add("is-open");
      toggle.setAttribute("aria-expanded", "true");
      document.body.classList.add("is-locked");
    };
    toggle.addEventListener("click", () => {
      nav.classList.contains("is-open") ? closeMenu() : openMenu();
    });
    $$("#mobileMenu a").forEach((a) => a.addEventListener("click", closeMenu));
    window.addEventListener("keydown", (e) => {
      if (e.key === "Escape") closeMenu();
    });
    window.addEventListener("resize", () => {
      if (window.innerWidth > 900) closeMenu();
    });

    /* active link */
    const links = $$(".nav__link");
    const sections = links
      .map((a) => $(a.getAttribute("href")))
      .filter(Boolean);
    if ("IntersectionObserver" in window) {
      const io = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            links.forEach((l) =>
              l.classList.toggle("is-active", l.getAttribute("href") === "#" + entry.target.id)
            );
          });
        },
        { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
      );
      sections.forEach((s) => io.observe(s));
    }

    /* easter egg: 5 klik logo */
    let clicks = 0;
    let resetTimer = null;
    brand.addEventListener("click", () => {
      clicks += 1;
      clearTimeout(resetTimer);
      resetTimer = setTimeout(() => (clicks = 0), 1800);
      if (clicks >= 5) {
        clicks = 0;
        toast(state.data.easterEggs[0].message);
        if (!reduceMotion) confettiBurst(0.45);
      }
    });

    /* easter egg: ketik "denera" */
    let buffer = "";
    window.addEventListener("keydown", (e) => {
      if (e.key.length !== 1) return;
      buffer = (buffer + e.key.toLowerCase()).slice(-6);
      if (buffer === "denera") {
        buffer = "";
        toast(state.data.easterEggs[1].message, 4200);
      }
    });
  }

  /* ---------------- hero ---------------- */
  function initHero() {
    const word = $("#heroTitle");
    word.innerHTML = "DENERA"
      .split("")
      .map((ch, i) => `<span style="--i:${i}">${ch}</span>`)
      .join("");

    /* particles */
    const holder = $("#particles");
    if (!reduceMotion) {
      const frag = document.createDocumentFragment();
      const count = window.innerWidth < 700 ? 14 : 26;
      for (let i = 0; i < count; i++) {
        const p = document.createElement("span");
        p.className = "particle";
        p.style.left = Math.random() * 100 + "%";
        p.style.top = 42 + Math.random() * 58 + "%";
        p.style.animationDuration = 12 + Math.random() * 16 + "s";
        p.style.animationDelay = -Math.random() * 22 + "s";
        const size = Math.random() > 0.7 ? 3 : 2;
        p.style.width = size + "px";
        p.style.height = size + "px";
        p.style.opacity = 0;
        frag.appendChild(p);
      }
      holder.appendChild(frag);
    }

    /* parallax */
    const sky = $("#heroSky");
    if (!reduceMotion && sky) {
      let ticking = false;
      const update = () => {
        const y = Math.min(window.scrollY, window.innerHeight);
        sky.style.transform = `translate3d(0, ${y * -0.12}px, 0) scale(1.08)`;
        ticking = false;
      };
      window.addEventListener(
        "scroll",
        () => {
          if (!ticking) {
            ticking = true;
            window.requestAnimationFrame(update);
          }
        },
        { passive: true }
      );
    }
  }

  /* ---------------- about / facts / stats ---------------- */
  function renderAbout(d) {
    $("#aboutLead").textContent = d.about.lead;
    $("#aboutBody").innerHTML = d.about.body.map((p) => `<p>${esc(p)}</p>`).join("");

    const facts = [
      ["Generation", d.config.generation],
      ["Institution", d.config.institution],
      ["Status", d.config.status],
      ["Vision", d.config.vision]
    ];
    $("#facts").innerHTML = facts
      .map(
        ([label, value]) =>
          `<div class="fact"><dt class="fact__label">${esc(label)}</dt><dd class="fact__value" style="margin:0">${esc(value)}</dd></div>`
      )
      .join("");

    const s = d.config.stats;
    const items = [
      [s.students, "Students"],
      [s.dreams, "Dreams"],
      [s.memories, "Memories"],
      [s.generation, "Generation"]
    ];
    $("#stats").innerHTML = items
      .map(
        ([num, label], i) =>
          `<div class="stat"><div class="stat__num"><b data-count="${Number(num) || 0}">0</b><i>${i === 3 ? "" : "+"}</i></div><div class="stat__label">${esc(label)}</div></div>`
      )
      .join("");
  }

  function animateCounters(scope) {
    const nodes = $$("[data-count]", scope || document);
    const run = (node) => {
      const target = Number(node.dataset.count) || 0;
      if (node.dataset.done === "1") return;
      node.dataset.done = "1";
      if (reduceMotion) {
        node.textContent = String(target);
        return;
      }
      const dur = 1500;
      const start = performance.now();
      const step = (now) => {
        const p = Math.min((now - start) / dur, 1);
        const eased = 1 - Math.pow(1 - p, 3);
        node.textContent = String(Math.round(target * eased));
        if (p < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    };
    if (!("IntersectionObserver" in window)) {
      nodes.forEach(run);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            run(e.target);
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.4 }
    );
    nodes.forEach((n) => io.observe(n));
  }

  /* ---------------- timeline ---------------- */
  function renderTimeline(d) {
    $("#timeline").innerHTML = d.timeline
      .map(
        (t, i) => `
      <article class="tl-item" role="listitem" data-reveal style="--d:${i * 90}ms">
        <div class="tl-item__dot" aria-hidden="true"></div>
        <div class="tl-item__year">${esc(t.year)}</div>
        <div class="tl-item__label">${esc(t.label)}</div>
        <h3 class="tl-item__title">${esc(t.title)}</h3>
        <p class="tl-item__text">${esc(t.text)}</p>
      </article>`
      )
      .join("");
    $$("#timeline [data-reveal]").forEach(observeNew);
  }

  /* ---------------- members ---------------- */
  function memberPhoto(m) {
    if (m.photo) {
      return `<img src="${esc(m.photo)}" alt="Foto ${esc(m.name)}" loading="lazy" width="400" height="500" />`;
    }
    return `<div class="ph">
        <span class="ph__mark" aria-hidden="true"></span>
        <span class="ph__initial" aria-hidden="true">${esc(initials(m.name))}</span>
        <span class="ph__hint">Photo coming soon</span>
      </div>`;
  }

  function socialsHtml(socials) {
    if (!socials) return "";
    const keys = Object.keys(socials).filter((k) => ICONS[k] && socials[k]);
    if (!keys.length) return "";
    return `<div class="member__socials">${keys
      .map(
        (k) =>
          `<a href="${esc(socials[k])}" target="_blank" rel="noopener noreferrer" aria-label="${esc(k)} ${esc(k)}">${ICONS[k]}</a>`
      )
      .join("")}</div>`;
  }

  function renderMemberFilters(d) {
    $("#memberFilters").innerHTML = d.memberFilters
      .map(
        (f) =>
          `<button class="chip${f.key === state.memberFilter ? " is-active" : ""}" type="button" data-member-filter="${esc(f.key)}">${esc(f.label)}</button>`
      )
      .join("");
  }

  function renderMembers(d) {
    const grid = $("#membersGrid");
    const q = state.memberQuery.trim().toLowerCase();
    const list = d.members.filter((m) => {
      const matchCat =
        state.memberFilter === "all" ||
        m.category === state.memberFilter ||
        (m.tags || []).includes(state.memberFilter);
      const matchQ =
        !q ||
        m.name.toLowerCase().includes(q) ||
        (m.nickname || "").toLowerCase().includes(q) ||
        (m.role || "").toLowerCase().includes(q);
      return matchCat && matchQ;
    });

    if (!list.length) {
      grid.innerHTML = `<p class="empty-note">Tidak ada anggota yang cocok dengan pencarian ini.</p>`;
      return;
    }

    grid.innerHTML = list
      .map(
        (m, i) => `
      <article class="member" data-reveal style="--d:${Math.min(i, 8) * 60}ms">
        <div class="member__photo">${memberPhoto(m)}</div>
        <div class="member__body">
          <h3 class="member__name">${esc(m.name)}</h3>
          <p class="member__nick">${esc(m.nickname)}</p>
          <span class="member__role">${esc(m.role)}</span>
          <p class="member__quote">“${esc(m.quote)}”</p>
          ${socialsHtml(m.socials)}
        </div>
      </article>`
      )
      .join("");
    $$("#membersGrid [data-reveal]").forEach(observeNew);
  }

  function renderOrg(d) {
    const levels = {};
    d.leadership.forEach((l) => {
      (levels[l.level] = levels[l.level] || []).push(l);
    });
    $("#orgLevels").innerHTML = Object.keys(levels)
      .sort((a, b) => a - b)
      .map(
        (k) => `
      <div class="org__row" data-reveal>
        ${levels[k]
          .map(
            (o) => `
          <div class="org__card">
            <div class="org__role">${esc(o.role)}</div>
            <div class="org__name">${esc(o.member)}</div>
            <p class="org__desc">${esc(o.desc)}</p>
          </div>`
          )
          .join("")}
      </div>`
      )
      .join("");
    $$("#orgLevels [data-reveal]").forEach(observeNew);
  }

  /* ---------------- activities ---------------- */
  function mediaOrPlaceholder(item, cls) {
    if (item.image) {
      return `<img src="${esc(item.image)}" alt="${esc(item.title || "")}" loading="lazy" />`;
    }
    return `<div class="gal__ph">${ICONS.camera}<span class="ph__hint">Foto menyusul</span></div>`;
  }

  function renderActivityFilters(d) {
    $("#activityFilters").innerHTML = d.activityCategories
      .map(
        (c) =>
          `<button class="chip${c === state.activityFilter ? " is-active" : ""}" type="button" data-activity-filter="${esc(c)}">${esc(c)}</button>`
      )
      .join("");
  }

  function renderActivities(d) {
    const list = d.activities.filter((a) => state.activityFilter === "All" || a.category === state.activityFilter);
    const grid = $("#activitiesGrid");
    grid.innerHTML = list.length
      ? list
          .map(
            (a, i) => `
      <button class="activity" type="button" data-activity="${esc(a.id)}" data-reveal style="--d:${Math.min(i, 8) * 60}ms" aria-label="Lihat detail ${esc(a.title)}">
        <div class="activity__media">
          ${mediaOrPlaceholder(a)}
          <span class="activity__cat">${esc(a.category)}</span>
        </div>
        <div class="activity__body">
          <span class="activity__date">${esc(fmtDate(a.date))}</span>
          <h3 class="activity__title">${esc(a.title)}</h3>
          <p class="activity__desc">${esc(a.desc)}</p>
          <div class="activity__foot"><span>${esc(a.participants)}</span><span>${esc(a.place)}</span></div>
        </div>
      </button>`
          )
          .join("")
      : `<p class="empty-note">Belum ada kegiatan di kategori ini.</p>`;
    $$("#activitiesGrid [data-reveal]").forEach(observeNew);
  }

  function openActivity(id) {
    const a = state.data.activities.find((x) => x.id === id);
    if (!a) return;
    $("#actModalMedia").innerHTML = a.image
      ? `<img src="${esc(a.image)}" alt="${esc(a.title)}" />`
      : `<div class="gal__ph">${ICONS.camera}<span class="ph__hint">Foto menyusul</span></div>`;
    $("#actModalMeta").innerHTML = `<span>${esc(a.category)}</span><span>${esc(fmtDate(a.date))}</span><span>${esc(a.place)}</span>`;
    $("#actModalTitle").textContent = a.title;
    $("#actModalText").textContent = a.desc;
    $("#actModalFoot").innerHTML = `<span>Peserta: ${esc(a.participants)}</span>`;
    openModal("#activityModal");
  }

  /* ---------------- achievements ---------------- */
  function renderAchFilters(d) {
    $("#achFilters").innerHTML = d.achievementCategories
      .map(
        (c) =>
          `<button class="chip${c === state.achFilter ? " is-active" : ""}" type="button" data-ach-filter="${esc(c)}">${esc(c)}</button>`
      )
      .join("");
  }

  function renderAchievements(d) {
    const list = d.achievements.filter((a) => state.achFilter === "All" || a.category === state.achFilter);
    $("#achGrid").innerHTML = list.length
      ? list
          .map(
            (a, i) => `
      <article class="card ach" data-reveal style="--d:${Math.min(i, 8) * 55}ms">
        <span class="ach__year">${esc(a.year)}</span>
        <div class="ach__icon">${ICONS.trophy}</div>
        <h3 class="ach__title">${esc(a.title)}</h3>
        <p class="ach__who">${esc(a.recipient)}</p>
        <p class="ach__note">${esc(a.note)}</p>
        <span class="ach__cat">${esc(a.category)}</span>
      </article>`
          )
          .join("")
      : `<p class="empty-note">Belum ada prestasi di kategori ini.</p>`;
    $$("#achGrid [data-reveal]").forEach(observeNew);
    const counter = $("#achCount");
    counter.dataset.count = String(d.achievements.length);
    counter.dataset.done = "0";
  }

  /* ---------------- gallery + lightbox ---------------- */
  function renderGalleryFilters(d) {
    $("#galleryFilters").innerHTML = d.galleryCategories
      .map(
        (c) =>
          `<button class="chip${c === state.galleryFilter ? " is-active" : ""}" type="button" data-gallery-filter="${esc(c)}">${esc(c)}</button>`
      )
      .join("");
  }

  function renderGallery(d) {
    state.galleryItems = d.gallery.filter(
      (g) => state.galleryFilter === "All" || g.category === state.galleryFilter
    );
    const box = $("#gallery");
    box.innerHTML = state.galleryItems
      .map(
        (g, i) => `
      <button class="gal" type="button" data-ratio="${esc(g.ratio)}" data-gallery-index="${i}" aria-label="Buka foto ${esc(g.title)}">
        <div class="gal__media">
          ${g.image ? `<img src="${esc(g.image)}" alt="${esc(g.title)}" loading="lazy" />` : `<div class="gal__ph">${ICONS.camera}</div>`}
          <div class="gal__overlay">
            <span class="gal__cat">${esc(g.category)}</span>
            <span class="gal__title">${esc(g.title)}</span>
          </div>
        </div>
      </button>`
      )
      .join("");
  }

  function openLightbox(index) {
    const items = state.galleryItems;
    if (!items.length) return;
    state.lightboxIndex = (index + items.length) % items.length;
    const g = items[state.lightboxIndex];
    $("#lbStage").innerHTML = g.image
      ? `<img src="${esc(g.image)}" alt="${esc(g.title)}" />`
      : `<div class="gal__ph">${ICONS.camera}<span class="ph__hint">Foto menyusul</span></div>`;
    $("#lbTitle").textContent = g.title;
    $("#lbCat").textContent = g.category;
    openModal("#lightbox");
  }

  /* ---------------- stories ---------------- */
  function renderStories(d) {
    $("#storiesList").innerHTML = d.stories
      .map(
        (s, i) => `
      <article class="story" data-reveal style="--d:${i * 80}ms">
        <div>
          <div class="story__index">${esc(s.number)}</div>
          <div class="story__kicker">DENERA Story #${esc(s.number)}</div>
          <h3 class="story__name">${esc(s.name)}</h3>
          <p class="story__role">${esc(s.role)}</p>
        </div>
        <div>
          <blockquote class="story__quote">“${esc(s.quote)}”</blockquote>
          <div class="story__body">${s.body.map((p) => `<p>${esc(p)}</p>`).join("")}</div>
        </div>
      </article>`
      )
      .join("");
    $$("#storiesList [data-reveal]").forEach(observeNew);
  }

  /* ---------------- dreams / orbit ---------------- */
  const RING = {
    Indonesia: 0.34,
    Asia: 0.5,
    "Middle East": 0.5,
    Europe: 0.66,
    Australia: 0.66,
    Other: 0.8
  };
  const ANGLE_OFFSET = {
    Indonesia: -0.5,
    Asia: 0.9,
    "Middle East": 2.2,
    Europe: 3.4,
    Australia: 4.6,
    Other: 5.6
  };

  function renderOrbit(d) {
    const groups = {};
    d.dreams.forEach((x) => {
      (groups[x.region] = groups[x.region] || []).push(x);
    });

    const nodes = [];
    Object.keys(groups).forEach((region) => {
      const ring = RING[region] != null ? RING[region] : 0.8;
      const base = ANGLE_OFFSET[region] != null ? ANGLE_OFFSET[region] : 0;
      const items = groups[region];
      items.forEach((item, idx) => {
        const angle = base + (idx / Math.max(items.length, 1)) * (Math.PI * 1.35) + 0.35;
        const r = ring * 46;
        const x = 50 + r * Math.cos(angle);
        const y = 50 + r * Math.sin(angle);
        nodes.push(
          `<div class="orbit__node" style="--x:${x.toFixed(2)}%;--y:${y.toFixed(2)}%">
            <button class="orbit__dot" type="button" data-dream="${esc(item.id)}" aria-label="${esc(item.name)} — ${esc(item.location)}" style="--delay:${(idx % 5) * 0.4}s"></button>
            <span class="orbit__label">${esc(item.location.split(",")[0])}</span>
          </div>`
        );
      });
    });
    $("#orbitNodes").innerHTML = nodes.join("");

    $("#orbitLegend").innerHTML = d.dreamRegions
      .map(
        (r) =>
          `<button type="button" data-region="${esc(r)}" class="${r === state.orbitFilter ? "is-active" : ""}">${esc(r)}</button>`
      )
      .join("");

    const first = d.dreams.find((x) => x.region === state.orbitFilter) || d.dreams[0];
    if (first) renderDreamCard(first);
  }

  function renderDreamCard(dream) {
    if (!dream) return;
    $("#dreamCard").innerHTML = `
      <h3 class="dream-card__name">${esc(dream.name)}</h3>
      <dl style="margin:0.7rem 0 0">
        <div class="dream-card__row"><dt>University</dt><dd>${esc(dream.university)}</dd></div>
        <div class="dream-card__row"><dt>Major</dt><dd>${esc(dream.major)}</dd></div>
        <div class="dream-card__row"><dt>Location</dt><dd>${esc(dream.location)}</dd></div>
      </dl>
      <p class="dream-card__dream">“${esc(dream.dream)}”</p>`;
  }

  function renderChapter(d) {
    $("#chapterGrid").innerHTML = d.dreams
      .map(
        (x, i) => `
      <article class="card chapter" data-reveal style="--d:${Math.min(i, 8) * 55}ms">
        <span class="chapter__region">${esc(x.region)}</span>
        <h3 class="chapter__name">${esc(x.name)}</h3>
        <p class="chapter__uni">${esc(x.university)}</p>
        <p class="chapter__major">${esc(x.major)}</p>
        <p class="chapter__loc">${ICONS.pin}<span>${esc(x.location)}</span></p>
        <p class="chapter__dream">${esc(x.dream)}</p>
      </article>`
      )
      .join("");
    $$("#chapterGrid [data-reveal]").forEach(observeNew);
  }

  /* ---------------- announcements ---------------- */
  function renderAnnouncements(d) {
    const order = { ongoing: 0, upcoming: 1, completed: 2 };
    const list = d.announcements
      .slice()
      .sort((a, b) => (order[a.status] ?? 3) - (order[b.status] ?? 3) || b.date.localeCompare(a.date));
    $("#announceList").innerHTML = list
      .map(
        (a) => `
      <article class="card announce">
        <div class="announce__top">
          <span class="badge badge--${esc(a.status)}">${esc(a.status.toUpperCase())}</span>
          <span class="announce__date">${esc(fmtDate(a.date))}</span>
        </div>
        <h3 class="announce__title">${esc(a.title)}</h3>
        <p class="announce__desc">${esc(a.desc)}</p>
        <span class="announce__tag">${esc(a.tag)}</span>
      </article>`
      )
      .join("");
  }

  /* ---------------- calendar ---------------- */
  function eventMap() {
    const map = {};
    state.data.events.forEach((e) => {
      const key = String(e.date).slice(0, 10);
      (map[key] = map[key] || []).push({ title: e.title, type: e.type, desc: e.desc, birthday: false });
    });
    state.data.birthdays.forEach((b) => {
      const d = parseDate(b.date);
      const mmdd = String(d.getMonth() + 1).padStart(2, "0") + "-" + String(d.getDate()).padStart(2, "0");
      const key = `${state.calYear}-${mmdd}`;
      (map[key] = map[key] || []).push({ title: "Ulang tahun " + b.name, type: "Birthday", birthday: true });
    });
    return map;
  }

  function renderCalendar() {
    const d = state.data;
    const monthEl = $("#calMonth");
    monthEl.textContent = MONTHS[state.calMonth] + " " + state.calYear;

    const map = eventMap();
    const first = new Date(state.calYear, state.calMonth, 1);
    const startDow = (first.getDay() + 6) % 7; // Senin = 0
    const daysInMonth = new Date(state.calYear, state.calMonth + 1, 0).getDate();

    const today = new Date();
    const isThisMonth = today.getFullYear() === state.calYear && today.getMonth() === state.calMonth;

    let html = "";
    for (let i = 0; i < startDow; i++) html += `<button class="cal__day is-empty" type="button" tabindex="-1" aria-hidden="true"></button>`;

    for (let day = 1; day <= daysInMonth; day++) {
      const key = `${state.calYear}-${String(state.calMonth + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
      const evts = map[key] || [];
      const cls = [
        "cal__day",
        evts.length ? "has-event" : "",
        evts.some((e) => e.birthday) ? "is-birthday" : "",
        isThisMonth && today.getDate() === day ? "is-today" : "",
        state.calSelected === key ? "is-selected" : ""
      ]
        .filter(Boolean)
        .join(" ");
      html += `<button class="${cls}" type="button" data-day="${key}" aria-label="${day} ${MONTHS[state.calMonth]} ${state.calYear}${evts.length ? ", " + evts.length + " agenda" : ""}">${day}</button>`;
    }
    $("#calGrid").innerHTML = html;

    if (!state.calSelected) {
      const firstEvent = state.data.events
        .slice()
        .sort((a, b) => a.date.localeCompare(b.date))
        .find((e) => new Date(e.date) >= new Date(today.toDateString()));
      if (firstEvent) state.calSelected = String(firstEvent.date).slice(0, 10);
    }
    renderCalDetail();
  }

  function renderCalDetail() {
    const map = eventMap();
    const key = state.calSelected;
    const box = $("#calDetail");
    if (!key || !map[key]) {
      box.innerHTML = `<h4>Agenda</h4><p style="font-size:0.82rem;color:var(--ink-mute)">Pilih tanggal bertanda untuk melihat agenda.</p>`;
      return;
    }
    box.innerHTML =
      `<h4>${esc(fmtDate(key))}</h4>` +
      map[key]
        .map(
          (e) =>
            `<div class="cal__event"><b>${esc(e.title)}</b><span>${esc(e.birthday ? "Birthday" : e.type)}</span></div>` +
            (e.desc ? `<p style="font-size:0.78rem;color:var(--ink-mute);margin:0 0 0.3rem">${esc(e.desc)}</p>` : "")
        )
        .join("");
  }

  function initCalendar() {
    const today = new Date();
    state.calYear = today.getFullYear();
    state.calMonth = today.getMonth();
    renderCalendar();

    $("#calPrev").addEventListener("click", () => {
      state.calMonth -= 1;
      if (state.calMonth < 0) {
        state.calMonth = 11;
        state.calYear -= 1;
      }
      state.calSelected = null;
      renderCalendar();
    });
    $("#calNext").addEventListener("click", () => {
      state.calMonth += 1;
      if (state.calMonth > 11) {
        state.calMonth = 0;
        state.calYear += 1;
      }
      state.calSelected = null;
      renderCalendar();
    });
    $("#calGrid").addEventListener("click", (e) => {
      const btn = e.target.closest("[data-day]");
      if (!btn) return;
      state.calSelected = btn.dataset.day;
      renderCalendar();
    });
  }

  /* ---------------- birthdays + confetti ---------------- */
  function renderBirthdays(d) {
    const list = d.birthdays
      .map((b) => ({ ...b, d: parseDate(b.date) }))
      .sort((a, b) => a.d.getMonth() - b.d.getMonth() || a.d.getDate() - b.d.getDate());
    $("#bdayGrid").innerHTML = list
      .map(
        (b, i) => `
      <button class="card bday" type="button" data-bday="${i}" data-reveal style="--d:${Math.min(i, 8) * 45}ms">
        <span class="bday__icon" aria-hidden="true">🎂</span>
        <span>
          <span class="bday__name">${esc(b.name)}</span>
          <span class="bday__date">${esc(b.d.getDate() + " " + MONTHS_SHORT[b.d.getMonth()])}</span>
        </span>
      </button>`
      )
      .join("");
    $$("#bdayGrid [data-reveal]").forEach(observeNew);

    $("#bdayGrid").addEventListener("click", (e) => {
      const btn = e.target.closest("[data-bday]");
      if (!btn) return;
      const b = list[Number(btn.dataset.bday)];
      toast(`Selamat ulang tahun, ${b.name}! 🎉`, 3600);
      if (!reduceMotion) confettiBurst();
    });
  }

  /* ---------------- quotes ---------------- */
  function renderQuotes(d) {
    $("#quoteWall").innerHTML = d.quotes
      .map(
        (q, i) => `
      <article class="card qcard" data-reveal style="--d:${Math.min(i, 8) * 50}ms">
        <p class="qcard__text">“${esc(q.text)}”</p>
        <span class="qcard__author">${esc(q.author)}</span>
      </article>`
      )
      .join("");
    $$("#quoteWall [data-reveal]").forEach(observeNew);

    $("#randomQuoteBtn").addEventListener("click", () => {
      const q = d.quotes[Math.floor(Math.random() * d.quotes.length)];
      $("#quoteSpotlight").textContent = `“${q.text}” — ${q.author}`;
    });
  }

  /* ---------------- countdown ---------------- */
  function initCountdown(d) {
    const target = new Date(d.config.countdown.target).getTime();
    const timer = $("#cdTimer");
    const dateEl = $("#cdDate");
    dateEl.textContent = d.config.countdown.label + " · " + fmtDate(d.config.countdown.target);

    const units = [
      ["Days", "days"],
      ["Hours", "hours"],
      ["Minutes", "minutes"],
      ["Seconds", "seconds"]
    ];
    timer.innerHTML = units
      .map(([label, key]) => `<div class="cd-unit"><b data-cd="${key}">00</b><span>${label}</span></div>`)
      .join("");

    const pad = (n) => String(Math.max(0, n)).padStart(2, "0");
    const tick = () => {
      const diff = target - Date.now();
      if (diff <= 0) {
        timer.querySelectorAll("[data-cd]").forEach((el) => (el.textContent = "00"));
        dateEl.textContent = "The next chapter has begun.";
        clearInterval(handle);
        return;
      }
      const s = Math.floor(diff / 1000);
      const set = (k, v) => {
        const el = timer.querySelector(`[data-cd="${k}"]`);
        if (el) el.textContent = pad(v);
      };
      set("days", Math.floor(s / 86400));
      set("hours", Math.floor((s % 86400) / 3600));
      set("minutes", Math.floor((s % 3600) / 60));
      set("seconds", s % 60);
    };
    tick();
    const handle = setInterval(tick, 1000);
  }

  /* ---------------- yearbook ---------------- */
  function renderYearbook(d) {
    const pages = d.yearbook.pages;
    const box = $("#bookPages");
    box.innerHTML = pages
      .map((p, i) => {
        let inner = "";
        if (p.type === "cover") {
          inner = `<img class="page__cover-logo" src="assets/denera-mark.webp" alt="Lencana DENERA" loading="lazy" />
            <h3 class="page__title">${esc(p.title)}</h3>
            <p class="page__script">${esc(p.subtitle)}</p>
            <p class="page__kicker">${esc(p.note)}</p>`;
        } else if (p.type === "class") {
          inner = `<span class="page__kicker">Chapter 01</span>
            <h3 class="page__title">${esc(p.title)}</h3>
            <div class="page__photo">${p.image ? `<img src="${esc(p.image)}" alt="${esc(p.title)}" loading="lazy" />` : `<div class="gal__ph">${ICONS.camera}<span class="ph__hint">Class photo</span></div>`}</div>
            <p class="page__text">${esc(p.text)}</p>`;
        } else if (p.type === "list") {
          inner = `<span class="page__kicker">Chapter 02</span>
            <h3 class="page__title">${esc(p.title)}</h3>
            <p class="page__text">${esc(p.text)}</p>
            <ul class="page__names">${d.members.map((m) => `<li>${esc(m.name)} <span style="color:var(--gold);font-size:0.66rem;letter-spacing:0.12em">${esc(m.role)}</span></li>`).join("")}</ul>`;
        } else if (p.type === "memories") {
          inner = `<span class="page__kicker">Chapter 03</span>
            <h3 class="page__title">${esc(p.title)}</h3>
            <p class="page__text">${esc(p.text)}</p>
            <div class="page__mini-grid">${d.gallery.slice(0, 8).map((g) => `<div class="page__mini">${esc(g.title)}</div>`).join("")}</div>`;
        } else if (p.type === "achievements") {
          inner = `<span class="page__kicker">Chapter 04</span>
            <h3 class="page__title">${esc(p.title)}</h3>
            <p class="page__text">${esc(p.text)}</p>
            <ul class="page__ach">${d.achievements.slice(0, 6).map((a) => `<li><b>${esc(a.title)}</b><span style="color:var(--gold)">${esc(a.year)}</span></li>`).join("")}</ul>`;
        } else if (p.type === "messages") {
          inner = `<span class="page__kicker">Chapter 05</span>
            <h3 class="page__title">${esc(p.title)}</h3>
            <p class="page__text">${esc(p.text)}</p>
            <div style="display:grid;gap:0.6rem;width:100%;max-width:560px">${d.quotes.slice(0, 3).map((q) => `<p class="page__text" style="font-family:var(--font-display);font-style:italic;color:var(--gold-soft)">“${esc(q.text)}”</p>`).join("")}</div>`;
        } else {
          inner = `<span class="page__kicker">The Last Page</span>
            <h3 class="page__title">${esc(p.title)}</h3>
            <p class="page__text">${esc(p.text)}</p>
            <p class="page__script">DENERA · The Fourth Generation of PDF Ulya</p>`;
        }
        return `<div class="page page--${esc(p.type)}${i === 0 ? " is-active" : ""}" data-page="${i}" ${i === 0 ? "" : 'aria-hidden="true"'}>${inner}</div>`;
      })
      .join("");

    $("#bookDots").innerHTML = pages
      .map((_, i) => `<button type="button" data-book-dot="${i}" class="${i === 0 ? "is-active" : ""}" aria-label="Halaman ${i + 1}"></button>`)
      .join("");

    updateBook();
    $("#bookPrev").addEventListener("click", () => goBook(-1));
    $("#bookNext").addEventListener("click", () => goBook(1));
    $("#bookDots").addEventListener("click", (e) => {
      const b = e.target.closest("[data-book-dot]");
      if (b) {
        state.bookPage = Number(b.dataset.bookDot);
        updateBook();
      }
    });
  }

  function goBook(dir) {
    const total = state.data.yearbook.pages.length;
    state.bookPage = (state.bookPage + dir + total) % total;
    updateBook();
  }

  function updateBook() {
    const total = state.data.yearbook.pages.length;
    $$("#bookPages .page").forEach((p, i) => {
      const active = i === state.bookPage;
      p.classList.toggle("is-active", active);
      if (active) p.removeAttribute("aria-hidden");
      else p.setAttribute("aria-hidden", "true");
    });
    $("#bookCounter").textContent =
      String(state.bookPage + 1).padStart(2, "0") + " / " + String(total).padStart(2, "0");
    $$("#bookDots button").forEach((b, i) => b.classList.toggle("is-active", i === state.bookPage));
  }

  /* ---------------- guestbook ---------------- */
  const GB_KEY = "denera_guestbook_v1";

  function gbRead() {
    try {
      const raw = localStorage.getItem(GB_KEY);
      if (raw) return JSON.parse(raw);
    } catch (err) {
      /* storage tidak tersedia */
    }
    return state.data.guestbookSeed.slice();
  }

  function gbWrite(list) {
    try {
      localStorage.setItem(GB_KEY, JSON.stringify(list));
    } catch (err) {
      /* storage penuh / diblokir — pesan tetap tampil di sesi ini */
    }
  }

  function renderGuestbook() {
    const list = gbRead();
    $("#guestList").innerHTML = list.length
      ? list
          .map(
            (m) => `
      <article class="gmsg">
        <div class="gmsg__top">
          <span class="gmsg__name">${esc(m.name)}</span>
          <span class="gmsg__date">${esc(fmtDate(m.date))}</span>
        </div>
        <p class="gmsg__text">${esc(m.message)}</p>
      </article>`
          )
          .join("")
      : `<p class="empty-note">Belum ada pesan. Jadilah yang pertama.</p>`;
  }

  function initGuestbook() {
    renderGuestbook();
    $("#guestForm").addEventListener("submit", (e) => {
      e.preventDefault();
      const name = $("#gbName").value.trim();
      const message = $("#gbMessage").value.trim();
      if (!name || !message) return;
      const list = gbRead();
      const now = new Date();
      const iso = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`;
      list.unshift({ name: name.slice(0, 60), message: message.slice(0, 500), date: iso });
      gbWrite(list);
      renderGuestbook();
      $("#guestForm").reset();
      toast("Terima kasih, pesanmu sudah tersimpan.", 3000);
    });
  }

  /* ---------------- footer ---------------- */
  function renderFooter(d) {
    $("#footerMenu").innerHTML = d.nav.map((n) => `<li><a href="${esc(n.href)}">${esc(n.label)}</a></li>`).join("");

    const c = d.contact;
    $("#footerContact").innerHTML = `
      <li><a href="mailto:${esc(c.email)}">${esc(c.email)}</a></li>
      <li>${esc(c.address)}</li>`;
    $("#year").textContent = d.site.year;

    const socials = [
      ["instagram", c.instagram, "Instagram"],
      ["tiktok", c.tiktok, "TikTok"],
      ["youtube", c.youtube, "YouTube"],
      ["mail", "mailto:" + c.email, "Email"]
    ].filter((s) => s[1]);

    $("#footerSocials").innerHTML = socials
      .map(
        ([icon, href, label]) =>
          `<a href="${esc(href)}" target="_blank" rel="noopener noreferrer" aria-label="${esc(label)}">${ICONS[icon]}</a>`
      )
      .join("");
  }

  /* ---------------- modals ---------------- */
  let lastFocused = null;

  function openModal(sel) {
    const modal = $(sel);
    if (!modal) return;
    lastFocused = document.activeElement;
    modal.hidden = false;
    requestAnimationFrame(() => modal.classList.add("is-open"));
    document.body.classList.add("is-locked");
    const focusable = modal.querySelector("button, [href], input, textarea");
    if (focusable) focusable.focus({ preventScroll: true });
  }

  function closeModal(modal) {
    if (!modal) return;
    modal.classList.remove("is-open");
    document.body.classList.remove("is-locked");
    setTimeout(() => {
      modal.hidden = true;
    }, 380);
    if (lastFocused && lastFocused.focus) lastFocused.focus({ preventScroll: true });
  }

  function initModals() {
    $$(".modal").forEach((modal) => {
      modal.addEventListener("click", (e) => {
        if (e.target === modal || e.target.closest("[data-close]")) closeModal(modal);
      });
    });
    window.addEventListener("keydown", (e) => {
      const open = $$(".modal.is-open");
      if (!open.length) return;
      if (e.key === "Escape") closeModal(open[open.length - 1]);
      if (open.some((m) => m.id === "lightbox")) {
        if (e.key === "ArrowRight") openLightbox(state.lightboxIndex + 1);
        if (e.key === "ArrowLeft") openLightbox(state.lightboxIndex - 1);
      }
    });
    $("#lbNext").addEventListener("click", () => openLightbox(state.lightboxIndex + 1));
    $("#lbPrev").addEventListener("click", () => openLightbox(state.lightboxIndex - 1));
  }

  /* ---------------- confetti ---------------- */
  function confettiBurst(strength = 1) {
    const canvas = $("#confetti");
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = window.innerWidth * dpr;
    canvas.height = window.innerHeight * dpr;
    canvas.style.width = window.innerWidth + "px";
    canvas.style.height = window.innerHeight + "px";
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    canvas.classList.add("is-on");

    const colors = ["#D9B66F", "#F0D9A0", "#4FA3D1", "#F8FAFC", "#124E78"];
    const count = Math.round(90 * strength);
    const parts = [];
    for (let i = 0; i < count; i++) {
      parts.push({
        x: window.innerWidth / 2 + (Math.random() - 0.5) * window.innerWidth * 0.5,
        y: window.innerHeight * 0.42 + (Math.random() - 0.5) * 90,
        vx: (Math.random() - 0.5) * 7,
        vy: -Math.random() * 9 - 2,
        w: 3 + Math.random() * 5,
        h: 6 + Math.random() * 7,
        rot: Math.random() * Math.PI,
        vr: (Math.random() - 0.5) * 0.28,
        color: colors[Math.floor(Math.random() * colors.length)],
        life: 0
      });
    }

    let raf = null;
    const start = performance.now();
    const draw = (now) => {
      const elapsed = now - start;
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
      parts.forEach((p) => {
        p.vy += 0.22;
        p.vx *= 0.995;
        p.x += p.vx;
        p.y += p.vy;
        p.rot += p.vr;
        p.life += 1;
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rot);
        ctx.globalAlpha = Math.max(0, 1 - elapsed / 2600);
        ctx.fillStyle = p.color;
        ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
        ctx.restore();
      });
      if (elapsed < 2600) raf = requestAnimationFrame(draw);
      else {
        cancelAnimationFrame(raf);
        ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
        canvas.classList.remove("is-on");
      }
    };
    raf = requestAnimationFrame(draw);
  }

  /* ---------------- event wiring ---------------- */
  function wireEvents() {
    $("#memberFilters").addEventListener("click", (e) => {
      const b = e.target.closest("[data-member-filter]");
      if (!b) return;
      state.memberFilter = b.dataset.memberFilter;
      renderMemberFilters(state.data);
      renderMembers(state.data);
    });

    let searchTimer = null;
    $("#memberSearch").addEventListener("input", (e) => {
      clearTimeout(searchTimer);
      const v = e.target.value;
      searchTimer = setTimeout(() => {
        state.memberQuery = v;
        renderMembers(state.data);
      }, 140);
    });

    $("#activityFilters").addEventListener("click", (e) => {
      const b = e.target.closest("[data-activity-filter]");
      if (!b) return;
      state.activityFilter = b.dataset.activityFilter;
      renderActivityFilters(state.data);
      renderActivities(state.data);
    });

    $("#activitiesGrid").addEventListener("click", (e) => {
      const b = e.target.closest("[data-activity]");
      if (b) openActivity(b.dataset.activity);
    });

    $("#achFilters").addEventListener("click", (e) => {
      const b = e.target.closest("[data-ach-filter]");
      if (!b) return;
      state.achFilter = b.dataset.achFilter;
      renderAchFilters(state.data);
      renderAchievements(state.data);
    });

    $("#galleryFilters").addEventListener("click", (e) => {
      const b = e.target.closest("[data-gallery-filter]");
      if (!b) return;
      state.galleryFilter = b.dataset.galleryFilter;
      renderGalleryFilters(state.data);
      renderGallery(state.data);
    });

    $("#gallery").addEventListener("click", (e) => {
      const b = e.target.closest("[data-gallery-index]");
      if (b) openLightbox(Number(b.dataset.galleryIndex));
    });

    $("#orbitNodes").addEventListener("click", (e) => {
      const b = e.target.closest("[data-dream]");
      if (!b) return;
      const dream = state.data.dreams.find((x) => x.id === b.dataset.dream);
      if (!dream) return;
      $$(".orbit__dot").forEach((d) => d.classList.remove("is-active"));
      b.classList.add("is-active");
      renderDreamCard(dream);
    });

    $("#orbitLegend").addEventListener("click", (e) => {
      const b = e.target.closest("[data-region]");
      if (!b) return;
      state.orbitFilter = b.dataset.region;
      $$("#orbitLegend button").forEach((x) => x.classList.toggle("is-active", x === b));
      const dream = state.data.dreams.find((x) => x.region === state.orbitFilter);
      if (dream) renderDreamCard(dream);
    });
  }

  /* ---------------- boot ---------------- */
  async function boot() {
    let data;
    try {
      data = await loadData();
    } catch (err) {
      console.error(err);
      toast("Data DENERA gagal dimuat.");
      return;
    }
    state.data = data;

    renderAbout(data);
    renderTimeline(data);
    renderMemberFilters(data);
    renderMembers(data);
    renderOrg(data);
    renderActivityFilters(data);
    renderActivities(data);
    renderAchFilters(data);
    renderAchievements(data);
    renderGalleryFilters(data);
    renderGallery(data);
    renderStories(data);
    renderOrbit(data);
    renderChapter(data);
    renderAnnouncements(data);
    renderBirthdays(data);
    renderQuotes(data);
    renderYearbook(data);
    renderFooter(data);
    initCalendar();
    initCountdown(data);
    initGuestbook();

    initNav();
    initHero();
    initModals();
    wireEvents();
    initReveal();
    animateCounters();

    document.documentElement.classList.add("is-ready");
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})();
