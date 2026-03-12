const WA = "250700000000",
  CAFE = "Akabaraza Café";

/* NAV */
window.addEventListener("scroll", () =>
  document.getElementById("navbar").classList.toggle("solid", scrollY > 70),
);
function toggleMob() {
  document.getElementById("mobMenu").classList.toggle("open");
}

/* CURSOR */
const cur = document.getElementById("cur"),
  ring = document.getElementById("curRing");
document.addEventListener("mousemove", (e) => {
  cur.style.left = e.clientX + "px";
  cur.style.top = e.clientY + "px";
  ring.style.left = e.clientX + "px";
  ring.style.top = e.clientY + "px";
});
document.querySelectorAll("a,button,.gi,.bento-card").forEach((el) => {
  el.addEventListener("mouseenter", () => {
    ring.style.width = "60px";
    ring.style.height = "60px";
    ring.style.borderColor = "rgba(200,104,42,.6)";
  });
  el.addEventListener("mouseleave", () => {
    ring.style.width = "40px";
    ring.style.height = "40px";
    ring.style.borderColor = "rgba(200,104,42,.35)";
  });
});

/* SMOOTH SCROLL */
document.querySelectorAll('a[href^="#"]').forEach((a) => {
  a.addEventListener("click", (e) => {
    const t = document.querySelector(a.getAttribute("href"));
    if (t) {
      e.preventDefault();
      t.scrollIntoView({ behavior: "smooth" });
    }
  });
});

/* MENU DATA */
const MD = {
  coffee: [
    {
      n: "Rwandan Arabica Pour Over",
      d: "Single-origin Rwandan beans, slow-dripped to perfection — bright citrus notes with honey finish",
      p: "RWF 3,000",
      img: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=500&q=75",
      t: "Signature",
    },
    {
      n: "Signature Café Latte",
      d: "Double espresso with velvety steamed milk and seasonal latte art",
      p: "RWF 3,500",
      img: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=500&q=75",
      t: "Favourite",
    },
    {
      n: "Ethiopian Cold Brew",
      d: "24-hour cold-steeped East African blend — smooth, chocolatey, naturally sweet",
      p: "RWF 4,000",
      img: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=500&q=75",
      t: "Cold",
    },
  ],
  food: [
    {
      n: "Avocado Toast with Isombe Pesto",
      d: "Toasted sourdough, ripe Rwandan avocado, house-made cassava leaf pesto, chili flakes",
      p: "RWF 6,500",
      img: "https://images.unsplash.com/photo-1504753793650-d4a2b783c15e?w=500&q=75",
      t: "Vegan",
    },
    {
      n: "Rwandan Breakfast Plate",
      d: "Fried egg, sautéed plantain, avocado, beans, fresh tomato relish",
      p: "RWF 7,500",
      img: "https://images.unsplash.com/photo-1482049016688-2d3e1b311543?w=500&q=75",
      t: "Classic",
    },
    {
      n: "Club Sandwich & Chips",
      d: "Triple-decker with grilled chicken, local cheese, tomato, lettuce, house sauce",
      p: "RWF 8,500",
      img: "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=500&q=75",
      t: "Popular",
    },
  ],
  pastries: [
    {
      n: "Honey Glazed Mandazi",
      d: "Traditional Rwandan fried dough with local bee honey glaze and cinnamon sugar",
      p: "RWF 1,500",
      img: "https://images.unsplash.com/photo-1551218808-94e220e084d2?w=500&q=75",
      t: "Local",
    },
    {
      n: "Passion Fruit Croissant",
      d: "Buttery Viennoiserie filled with local passion fruit curd and whipped cream",
      p: "RWF 3,200",
      img: "https://images.unsplash.com/photo-1551218808-94e220e084d2?w=500&q=75",
      t: "Seasonal",
    },
    {
      n: "Chocolate Brownie",
      d: "Dark Rwandan cacao, salted caramel drizzle, served warm with vanilla cream",
      p: "RWF 2,800",
      img: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=500&q=75",
      t: "Favourite",
    },
  ],
  cold: [
    {
      n: "Hibiscus Lemonade",
      d: "Fresh hibiscus flowers, lemon, mint, honey — served iced",
      p: "RWF 2,500",
      img: "https://images.unsplash.com/photo-1544145945-f90425340c7e?w=500&q=75",
      t: "Refreshing",
    },
    {
      n: "Mango Smoothie",
      d: "Three local mango varieties, banana, passion fruit, no added sugar",
      p: "RWF 3,500",
      img: "https://images.unsplash.com/photo-1497034825429-c343d7c6a68f?w=500&q=75",
      t: "Vegan",
    },
    {
      n: "Iced Spiced Chai",
      d: "East African masala chai concentrate, oat milk, cinnamon, cardamom, over ice",
      p: "RWF 3,000",
      img: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=500&q=75",
      t: "Spiced",
    },
  ],
};

function renderMenu(tab) {
  document.getElementById("bentoGrid").innerHTML = MD[tab]
    .map(
      (i) => `
    <div class="bento-card">
      <div class="bc-img"><img src="${i.img}" alt="${i.n}" loading="lazy"/><span class="bc-badge">${i.t}</span></div>
      <div class="bc-body">
        <div class="bc-name">${i.n}</div>
        <div class="bc-desc">${i.d}</div>
        <div class="bc-foot">
          <span class="bc-price">${i.p}</span>
          <button class="bc-order" onclick="orderItem('${i.n.replace(/'/g, "\\'")}','${i.p}','${i.d.replace(/'/g, "\\'")}')"><i class="fab fa-whatsapp"></i> Order</button>
        </div>
      </div>
    </div>`,
    )
    .join("");
}
renderMenu("coffee");
document.getElementById("menuTabs").addEventListener("click", (e) => {
  if (!e.target.classList.contains("mtab")) return;
  document
    .querySelectorAll(".mtab")
    .forEach((b) => b.classList.remove("active"));
  e.target.classList.add("active");
  renderMenu(e.target.dataset.tab);
});

function orderItem(name, price, desc) {
  const msg = `Hello ${CAFE}! 👋\n\n☕ *ORDER REQUEST*\n━━━━━━━━━━━━\n🍽️  *${name}*\n📋  ${desc}\n💰  ${price}\n━━━━━━━━━━━━\nPlease confirm my order. Thank you! 🙏`;
  window.open(`https://wa.me/${WA}?text=${encodeURIComponent(msg)}`, "_blank");
}

function downloadMenuWA() {
  const msg = `Hello ${CAFE}! 👋\n\nI'd like to receive the *complete menu* — all items, prices & seasonal specials — on WhatsApp. Thank you! 🙏`;
  window.open(`https://wa.me/${WA}?text=${encodeURIComponent(msg)}`, "_blank");
}

function submitContact(e) {
  e.preventDefault();
  const name = document.getElementById("cfName").value.trim();
  const phone = document.getElementById("cfPhone").value.trim();
  const subject = document.getElementById("cfSubject").value.trim();
  const msg = document.getElementById("cfMsg").value.trim();
  let wa = `Hello ${CAFE}! 👋\n\n📩 *NEW MESSAGE*\n━━━━━━━━━━━━\n👤  Name: ${name}\n`;
  if (phone) wa += `📱  Phone: ${phone}\n`;
  if (subject) wa += `📌  Subject: ${subject}\n`;
  wa += `💬  Message: ${msg}\n━━━━━━━━━━━━\nThank you! 🙏`;
  window.open(`https://wa.me/${WA}?text=${encodeURIComponent(wa)}`, "_blank");
}

/* ═══ IMMERSIVE LIGHTBOX ═══ */
const IMGS = [
  {
    src: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=1600&q=85",
    alt: "Latte Art",
  },
  {
    src: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=1600&q=85",
    alt: "Coffee Beans",
  },
  {
    src: "https://images.unsplash.com/photo-1445116572660-236099ec97a0?w=1800&q=85",
    alt: "Café Interior",
  },
  {
    src: "https://images.unsplash.com/photo-1551218808-94e220e084d2?w=1600&q=85",
    alt: "Artisan Pastries",
  },
  {
    src: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=1600&q=85",
    alt: "Cold Brew",
  },
  {
    src: "https://images.unsplash.com/photo-1504753793650-d4a2b783c15e?w=1600&q=85",
    alt: "Avocado Toast",
  },
  {
    src: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=1600&q=85",
    alt: "Signature Drinks",
  },
];
let lbCur = 0;
function buildStrip() {
  document.getElementById("lbStrip").innerHTML = IMGS.map(
    (img, i) => `
    <div class="lb-thumb${i === lbCur ? " active" : ""}" onclick="lbGo(${i})">
      <img src="${img.src.replace(/w=\d+/, "w=80")}" alt="${img.alt}" loading="lazy"/>
    </div>`,
  ).join("");
}
function lbUpdateBg() {
  document.getElementById("lbBgBlur").style.backgroundImage =
    `url('${IMGS[lbCur].src.replace(/w=\d+/, "w=400")}')`;
}
function lbUpdateProgress() {
  document.getElementById("lbProgress").style.width =
    `${((lbCur + 1) / IMGS.length) * 100}%`;
}
function lbGo(idx, dir = 0) {
  const newIdx = ((idx % IMGS.length) + IMGS.length) % IMGS.length;
  const el = document.getElementById("lbImg");
  el.style.setProperty(
    "--lb-dir",
    dir > 0 ? "30px" : dir < 0 ? "-30px" : "0px",
  );
  el.classList.add("fade");
  setTimeout(() => {
    lbCur = newIdx;
    el.src = IMGS[lbCur].src;
    el.alt = IMGS[lbCur].alt;
    document.getElementById("lbCap").textContent = IMGS[lbCur].alt;
    document.getElementById("lbCounter").textContent =
      `${lbCur + 1} / ${IMGS.length}`;
    el.classList.remove("fade");
    lbUpdateBg();
    lbUpdateProgress();
    document
      .querySelectorAll(".lb-thumb")
      .forEach((t, i) => t.classList.toggle("active", i === lbCur));
    const s = document.getElementById("lbStrip");
    if (s.children[lbCur])
      s.children[lbCur].scrollIntoView({
        block: "nearest",
        inline: "center",
        behavior: "smooth",
      });
  }, 280);
}
function openLightbox(idx) {
  lbCur = idx;
  const el = document.getElementById("lbImg");
  el.src = IMGS[lbCur].src;
  el.alt = IMGS[lbCur].alt;
  document.getElementById("lbCap").textContent = IMGS[lbCur].alt;
  document.getElementById("lbCounter").textContent =
    `${lbCur + 1} / ${IMGS.length}`;
  buildStrip();
  lbUpdateBg();
  lbUpdateProgress();
  const bd = document.getElementById("lbBackdrop");
  bd.style.display = "flex";
  requestAnimationFrame(() => bd.classList.add("open"));
  document.body.style.overflow = "hidden";
}
function closeLB() {
  const bd = document.getElementById("lbBackdrop");
  bd.classList.remove("open");
  setTimeout(() => (bd.style.display = "none"), 350);
  document.body.style.overflow = "";
}
document.getElementById("lbClose").onclick = closeLB;
document.getElementById("lbPrev").onclick = () => lbGo(lbCur - 1, -1);
document.getElementById("lbNext").onclick = () => lbGo(lbCur + 1, 1);
document.getElementById("lbBackdrop").addEventListener("click", (e) => {
  if (e.target === document.getElementById("lbBackdrop")) closeLB();
});
document.addEventListener("keydown", (e) => {
  if (document.getElementById("lbBackdrop").style.display !== "flex") return;
  if (e.key === "ArrowLeft") lbGo(lbCur - 1, -1);
  if (e.key === "ArrowRight") lbGo(lbCur + 1, 1);
  if (e.key === "Escape") closeLB();
});
let lbTouchX = null;
document.getElementById("lbBackdrop").addEventListener(
  "touchstart",
  (e) => {
    lbTouchX = e.touches[0].clientX;
  },
  { passive: true },
);
document.getElementById("lbBackdrop").addEventListener("touchend", (e) => {
  if (lbTouchX === null) return;
  const dx = e.changedTouches[0].clientX - lbTouchX;
  if (Math.abs(dx) > 50) {
    dx < 0 ? lbGo(lbCur + 1, 1) : lbGo(lbCur - 1, -1);
  }
  lbTouchX = null;
});
document
  .querySelectorAll(".gi")
  .forEach((el, i) => el.addEventListener("click", () => openLightbox(i)));

/* SCROLL REVEAL */
const rv = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add("revealed");
        rv.unobserve(e.target);
      }
    });
  },
  { threshold: 0.1 },
);
document.querySelectorAll(".fade-up").forEach((el) => rv.observe(el));
