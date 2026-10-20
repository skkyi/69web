/* ===== الإعدادات: عدّل الروابط والملفات من هنا فقط ===== */
const CONFIG = {
  links: {
    server: "https://discord.gg/qt5MecChDf",
    support: "https://creators.sa/sauddv",
    tutorial: "https://discord.gg/RQxymajUGb"
  },
  /* لإضافة خانة جديدة في صفحة التحميل: أضف عنصراً جديداً هنا فقط */
  tiles: [
    { title: "مقاطع بجودة عالية", href: "high-quality-videos.html" },
    { soon: true },
    { soon: true },
    { soon: true },
    { soon: true },
    { soon: true }
  ],
  /* ملفات صفحة المقاطع بجودة عالية */
  videoFiles: [
    { title: "Topaz Video AI", desc: "لتعديل الجوده وتحسينها", href: "https://www.mediafire.com/file/hq8m0mrxk27r4dk/Topaz_Video_AI_v3.0.5_dis_%2540.ssaud.zip/file" },
    { title: "blur", desc: "لتعديل الجوده وتحسينها", href: "https://www.mediafire.com/file/ffomomtddmapa68/blur-Windows-Installer-x64_dis_%2540.ssaud_.exe/file" }
  ]
};

/* ===== شاشة الترحيب ===== */
(function () {
  const intro = document.getElementById("intro-screen");
  if (!intro) return;
  const hide = () => intro.classList.add("hide");
  window.addEventListener("load", () => setTimeout(hide, 1100));
  setTimeout(hide, 3500);
})();

/* ===== جزيئات الكانفاس ===== */
(function () {
  const c = document.getElementById("particleCanvas");
  if (!c) return;
  const ctx = c.getContext("2d");
  let w, h, dpr, pts = [];
  const mouse = { x: -9999, y: -9999 };
  function resize() {
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    w = window.innerWidth; h = window.innerHeight;
    c.width = w * dpr; c.height = h * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    const n = Math.min(110, Math.floor((w * h) / 14000));
    pts = Array.from({ length: n }, () => ({
      x: Math.random() * w, y: Math.random() * h,
      vx: (Math.random() - .5) * .25, vy: (Math.random() - .5) * .25,
      r: Math.random() * 1.4 + .6
    }));
  }
  window.addEventListener("resize", resize);
  window.addEventListener("mousemove", e => { mouse.x = e.clientX; mouse.y = e.clientY; });
  window.addEventListener("mouseleave", () => { mouse.x = mouse.y = -9999; });
  function frame() {
    ctx.clearRect(0, 0, w, h);
    for (const p of pts) {
      const dx = p.x - mouse.x, dy = p.y - mouse.y, d = Math.hypot(dx, dy);
      if (d < 120 && d > 0) { p.x += (dx / d) * 0.8; p.y += (dy / d) * 0.8; }
      p.x += p.vx; p.y += p.vy;
      if (p.x < 0 || p.x > w) p.vx *= -1;
      if (p.y < 0 || p.y > h) p.vy *= -1;
      ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(255,255,255,.75)"; ctx.fill();
    }
    for (let i = 0; i < pts.length; i++) {
      for (let j = i + 1; j < pts.length; j++) {
        const d = Math.hypot(pts[i].x - pts[j].x, pts[i].y - pts[j].y);
        if (d < 110) {
          ctx.strokeStyle = "rgba(255,255,255," + (0.16 * (1 - d / 110)) + ")";
          ctx.lineWidth = .6; ctx.beginPath();
          ctx.moveTo(pts[i].x, pts[i].y); ctx.lineTo(pts[j].x, pts[j].y); ctx.stroke();
        }
      }
      const dm = Math.hypot(pts[i].x - mouse.x, pts[i].y - mouse.y);
      if (dm < 160) {
        ctx.strokeStyle = "rgba(255,255,255," + (0.3 * (1 - dm / 160)) + ")";
        ctx.beginPath(); ctx.moveTo(pts[i].x, pts[i].y); ctx.lineTo(mouse.x, mouse.y); ctx.stroke();
      }
    }
    requestAnimationFrame(frame);
  }
  resize(); frame();
})();

/* ===== آلة الكتابة ===== */
(function () {
  const el = document.getElementById("typed");
  if (!el) return;

  // Maxaawwan sadii kanneen wal-jijjiiranii barreeffaman
  const texts = [
    '#69 Web',
    'Developed by Dis @.ssaud',
    'print("hello world")'
  ];

  let textIndex = 0;
  let charIndex = 0;
  let isDeleting = false;

  function typeEffect() {
    const currentText = texts[textIndex];

    if (isDeleting) {
      // Haxaa'uu (Erase)
      charIndex--;
    } else {
      // Barreessuu (Type)
      charIndex++;
    }

    // Bareeffama qulqulluu fi cursor itti dabaluu
    el.innerHTML = currentText.substring(0, charIndex) + '<span class="cursor"></span>';

    // Saffisa barreessuu fi haxaa'uu
    let typeSpeed = isDeleting ? 40 : 80;

    if (!isDeleting && charIndex === currentText.length) {
      // Maxaan guutuu ta'ee yoo barreeffame, xiqqoo eegaa
      typeSpeed = 2500;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      // Yoo haxaawamee xumurame, gara maxaa itti aanutti darbi
      isDeleting = false;
      textIndex = (textIndex + 1) % texts.length;
      typeSpeed = 500;
    }

    setTimeout(typeEffect, typeSpeed);
  }

  // Jalqabsiisuu
  setTimeout(typeEffect, 1000);
})();

/* ===== توليد خانات صفحة التحميل ===== */
(function () {
  const grid = document.getElementById("tilesGrid");
  if (!grid) return;
  CONFIG.tiles.forEach((t, idx) => {
    const el = document.createElement(t.soon ? "div" : "a");
    el.className = "glass tile" + (t.soon ? " soon" : "");
    el.style.animationDelay = idx * 0.08 + "s";
    if (t.soon) {
      el.textContent = "...";
      const b = document.createElement("span");
      b.className = "badge";
      b.innerHTML = '<span class="dot"></span><span>قريباً</span>';
      el.appendChild(b);
    } else {
      el.textContent = t.title; el.href = t.href;
    }
    grid.appendChild(el);
  });
})();

/* ===== بطاقات تنزيل ملفات المونتاج ===== */
(function () {
  const row = document.getElementById("dlRow");
  if (!row) return;
  CONFIG.videoFiles.forEach((f, idx) => {
    const card = document.createElement("div");
    card.className = "glass dl-card";
    card.style.animationDelay = idx * 0.1 + "s";
    const h = document.createElement("h3"); h.textContent = f.title;
    const p = document.createElement("p"); p.textContent = f.desc;
    const a = document.createElement("a");
    a.className = "btn"; a.textContent = "تنزيل الملف"; a.href = f.href; a.setAttribute("download", "");
    card.append(h, p, a); row.appendChild(card);
  });
})();
