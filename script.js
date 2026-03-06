/* ── CONFIG ── */
const WA = '250785234933';
const CAFE = 'Akabaraza Café';

/* ── NAV ── */
const nav = document.getElementById('mainNav');
window.addEventListener('scroll', () => nav.classList.toggle('stuck', scrollY > 60));

/* ── MOBILE MENU ── */
function closeMob(){ document.getElementById('mobMenu').classList.remove('on') }

/* ── SMOOTH SCROLL ── */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const href = a.getAttribute('href');
    if(!href || href === '#') return;
    const t = document.querySelector(href);
    if(t){ e.preventDefault(); t.scrollIntoView({ behavior:'smooth' }); }
  });
});

/* ── MENU DATA ── */
const MENU = [
  { id:1,  name:'Full Rwandan Brunch Platter', cat:'brunch',    price:'RWF 9,500',  num:9500,  desc:'Eggs your way, fried plantain, isombe, ibitoki, fresh juice & house bread', img:'https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=500&q=75', badge:'Bestseller' },
  { id:2,  name:'Avocado & Egg Toast',          cat:'breakfast', price:'RWF 5,200',  num:5200,  desc:'Sourdough, smashed local avocado, poached egg, chili flakes & microgreens',  img:'https://images.unsplash.com/photo-1482049016688-2d3e1b311543?w=500&q=75', badge:'' },
  { id:3,  name:'Plantain Pancakes',            cat:'breakfast', price:'RWF 4,500',  num:4500,  desc:'Fluffy ripe plantain pancakes, honey drizzle, mixed berries & whipped cream', img:'https://images.unsplash.com/photo-1528207776546-365bb710ee93?w=500&q=75', badge:'' },
  { id:4,  name:'Rwandan Arabica Pour Over',    cat:'drinks',    price:'RWF 2,800',  num:2800,  desc:'Single-origin Eastern Province coffee, hand-poured to order',                 img:'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=500&q=75', badge:'Local' },
  { id:5,  name:'Hibiscus & Ginger Spritz',     cat:'drinks',    price:'RWF 2,200',  num:2200,  desc:'House-made hibiscus syrup, fresh ginger, sparkling water, mint — non-alcoholic', img:'https://images.unsplash.com/photo-1544145945-f90425340c7e?w=500&q=75', badge:'New' },
  { id:6,  name:'Café Latte — Rwandan Milk',    cat:'drinks',    price:'RWF 2,500',  num:2500,  desc:'Double espresso, steamed local fresh milk, optional flavour syrups',           img:'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=500&q=75', badge:'' },
  { id:7,  name:'Isombe & Cheese Wrap',         cat:'bites',     price:'RWF 4,000',  num:4000,  desc:'Cassava leaves, melted local cheese, tomato chutney in a soft flour wrap',    img:'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=500&q=75', badge:'Vegan' },
  { id:8,  name:'Passion Fruit Cheesecake',     cat:'sweets',    price:'RWF 3,800',  num:3800,  desc:'Creamy no-bake cheesecake, fresh passion fruit curd, digestive crust',         img:'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=500&q=75', badge:'' },
  { id:9,  name:'Ibitoki ya Shuke (Sweet Fries)',cat:'bites',    price:'RWF 3,200',  num:3200,  desc:'Sweet plantain fries, spiced aioli, fresh herbs — a Rwandan street-food twist', img:'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=500&q=75', badge:'Popular' },
];

/* ── SCROLL REVEAL OBSERVER — declared here so renderMenu can use it ── */
const observer = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if(e.isIntersecting){ e.target.classList.add('vis'); observer.unobserve(e.target); }
  });
}, { threshold: 0.08 });

/* ── RENDER MENU ── */
function renderMenu(cat){
  const grid = document.getElementById('menuGrid');
  const list = cat === 'all' ? MENU : MENU.filter(i => i.cat === cat);
  grid.innerHTML = list.map(item => `
    <div class="mc rv">
      <div class="mc-img">
        <img src="${item.img}" alt="${item.name}" loading="lazy"/>
        ${item.badge ? `<span class="mc-badge">${item.badge}</span>` : ''}
      </div>
      <div class="mc-body">
        <div class="mc-cat">${item.cat.charAt(0).toUpperCase()+item.cat.slice(1)}</div>
        <div class="mc-name">${item.name}</div>
        <div class="mc-desc">${item.desc}</div>
        <div class="mc-foot">
          <span class="mc-price">${item.price}</span>
          <button class="order-btn" onclick="openModal(${item.id})">
            <i class="fab fa-whatsapp"></i> Order
          </button>
        </div>
      </div>
    </div>
  `).join('');
  grid.querySelectorAll('.rv').forEach(el => observer.observe(el));
}
renderMenu('all');

/* ── FILTER TABS ── */
document.getElementById('tabs').addEventListener('click', e => {
  if(!e.target.classList.contains('tab')) return;
  document.querySelectorAll('.tab').forEach(b => b.classList.remove('on'));
  e.target.classList.add('on');
  renderMenu(e.target.dataset.cat);
});

/* ── MODAL ── */
let currentItem = null;

function openModal(id){
  currentItem = MENU.find(i => i.id === id);
  document.getElementById('mThumb').src   = currentItem.img;
  document.getElementById('mName').textContent  = currentItem.name;
  document.getElementById('mPrice').textContent = currentItem.price;
  document.getElementById('mCustomer').value    = '';
  document.getElementById('mQty').value         = '1';
  document.getElementById('mNote').value        = '';
  refreshLink();
  document.getElementById('oModal').classList.add('on');
  document.body.style.overflow = 'hidden';
}

function closeModal(){
  document.getElementById('oModal').classList.remove('on');
  document.body.style.overflow = '';
}

function refreshLink(){
  if(!currentItem) return;
  const name  = document.getElementById('mCustomer').value.trim() || 'Customer';
  const qty   = parseInt(document.getElementById('mQty').value);
  const note  = document.getElementById('mNote').value.trim();
  const total = (currentItem.num * qty).toLocaleString();

  document.getElementById('mTotal').textContent = `RWF ${total}`;

  /* Prefilled WhatsApp message */
  let msg = `Hello ${CAFE}! 👋\n\n`;
  msg += `🛒 *ORDER REQUEST*\n`;
  msg += `━━━━━━━━━━━━━━━━━\n`;
  msg += `🍽️  *${currentItem.name}*\n`;
  msg += `🔢  Qty: ${qty} portion${qty > 1 ? 's':''}\n`;
  msg += `💰  Unit: ${currentItem.price}\n`;
  msg += `💵  Total: RWF ${total}\n`;
  if(note) msg += `📝  Notes: ${note}\n`;
  msg += `━━━━━━━━━━━━━━━━━\n`;
  msg += `👤  Name: ${name}\n\n`;
  msg += `Please confirm my order. Thank you! 🙏`;

  document.getElementById('mWaLink').href =
    `https://wa.me/${WA}?text=${encodeURIComponent(msg)}`;
}

/* live update as user types */
['mCustomer','mQty','mNote'].forEach(id =>
  document.getElementById(id).addEventListener('input', refreshLink)
);

/* backdrop click closes */
document.getElementById('oModal').addEventListener('click', e => {
  if(e.target === document.getElementById('oModal')) closeModal();
});

/* observe all static .rv elements */
document.querySelectorAll('.rv').forEach(el => observer.observe(el));