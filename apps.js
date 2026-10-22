const $ = (s, r = document) => r.querySelector(s), $$ = (s, r = document) => [...r.querySelectorAll(s)];
const esc = s => String(s == null ? '' : s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const money = n => (n < 0 ? '-$' : '$') + Math.abs(Number(n || 0)).toFixed(2);
const fdate = d => new Date(d).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' });
/* Rasmlar internetdan olinmaydi: gradient SVG o'zimizda yasaladi */
const img = (seed, w = 640, h = 400) => {
    let n = 0; String(seed).split('').forEach(c => { n = (n * 31 + c.charCodeAt(0)) % 360; });
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="hsl(${n},70%,22%)"/><stop offset="1" stop-color="hsl(${(n + 60) % 360},75%,45%)"/></linearGradient></defs><rect width="100%" height="100%" fill="url(#g)"/><circle cx="${w * .8}" cy="${h * .25}" r="${h * .35}" fill="hsl(${(n + 120) % 360},80%,60%)" opacity=".18"/></svg>`;
    return 'data:image/svg+xml,' + encodeURIComponent(svg).replace(/\(/g, '%28').replace(/\)/g, '%29').replace(/'/g, '%27');
};
/* Har bir o'yin uchun o'zimizda chizilgan muqova (internet kerak emas) */
function coverArt(title, cat, seed, opt) {
    opt = opt || {}; const n = (seed * 47 + 13) % 360, n2 = (n + 70) % 360, t = String(title).replace(/&/g, '&amp;').replace(/</g, '&lt;');
    const a = `hsl(${n},70%,16%)`, b = `hsl(${n2},80%,42%)`, c = `hsl(${(n + 150) % 360},90%,62%)`, d = `hsl(${n2},90%,70%)`;
    const M = {
        Action: `<polygon points="360,0 470,0 250,400 140,400" fill="${c}" opacity=".30"/><polygon points="500,0 540,0 320,400 280,400" fill="${d}" opacity=".35"/><polygon points="120,0 150,0 -40,400 -70,400" fill="${c}" opacity=".25"/>`,
        Adventure: `<circle cx="470" cy="120" r="60" fill="${d}" opacity=".85"/><polygon points="0,400 0,260 120,150 230,270 330,190 470,330 560,240 640,320 640,400" fill="${a}" opacity=".85"/><polygon points="0,400 0,330 100,260 220,350 360,280 500,380 640,300 640,400" fill="#000" opacity=".35"/>`,
        Racing: `<polygon points="290,150 350,150 640,400 0,400" fill="#000" opacity=".45"/><polygon points="316,150 324,150 330,400 310,400" fill="${d}" opacity=".7"/><rect x="40" y="90" width="150" height="5" fill="${c}" opacity=".6"/><rect x="450" y="70" width="170" height="5" fill="${c}" opacity=".6"/><rect x="480" y="120" width="120" height="4" fill="${d}" opacity=".5"/>`,
        Horror: `<circle cx="470" cy="110" r="70" fill="#f4efe0" opacity=".9"/><circle cx="445" cy="100" r="14" fill="#cfc7ae" opacity=".7"/><polygon points="0,400 0,300 40,230 60,300 110,210 140,310 200,270 230,330 300,280 340,340 420,290 470,340 560,260 600,320 640,280 640,400" fill="#05030a"/>`,
        Shooting: `<circle cx="470" cy="170" r="120" fill="none" stroke="${c}" stroke-width="4" opacity=".8"/><circle cx="470" cy="170" r="70" fill="none" stroke="${c}" stroke-width="4" opacity=".8"/><circle cx="470" cy="170" r="18" fill="${d}"/><path d="M470 20V320M320 170H620" stroke="${c}" stroke-width="3" opacity=".7"/>`,
        Simulation: `<g opacity=".5" fill="${c}">${[0, 1, 2, 3, 4].map(i => [0, 1, 2, 3].map(j => `<polygon points="${330 + i * 56 - j * 30},${70 + j * 36 + i * 14} ${358 + i * 56 - j * 30},${56 + j * 36 + i * 14} ${386 + i * 56 - j * 30},${70 + j * 36 + i * 14} ${358 + i * 56 - j * 30},${84 + j * 36 + i * 14}" opacity="${.35 + ((i + j) % 3) * .25}"/>`).join('')).join('')}</g>`,
        Strategy: `<g fill="none" stroke="${c}" stroke-width="3" opacity=".6">${[0, 1, 2, 3, 4].map(i => [0, 1, 2].map(j => `<polygon points="${340 + i * 56 + (j % 2) * 28},${60 + j * 50} ${368 + i * 56 + (j % 2) * 28},${44 + j * 50} ${396 + i * 56 + (j % 2) * 28},${60 + j * 50} ${396 + i * 56 + (j % 2) * 28},${90 + j * 50} ${368 + i * 56 + (j % 2) * 28},${106 + j * 50} ${340 + i * 56 + (j % 2) * 28},${90 + j * 50}"/>`).join('')).join('')}</g><circle cx="480" cy="110" r="22" fill="${d}"/>`,
        Puzzle: `<rect x="360" y="40" width="60" height="60" rx="8" fill="${c}" opacity=".8"/><rect x="420" y="40" width="60" height="60" rx="8" fill="${d}" opacity=".8"/><rect x="420" y="100" width="60" height="60" rx="8" fill="${c}" opacity=".6"/><rect x="480" y="100" width="60" height="60" rx="8" fill="${d}" opacity=".6"/><rect x="480" y="160" width="60" height="60" rx="8" fill="${c}" opacity=".45"/>`,
        Multiplayer: `<circle cx="400" cy="130" r="38" fill="${c}" opacity=".85"/><path d="M335 250a65 65 0 0 1 130 0z" fill="${c}" opacity=".85"/><circle cx="500" cy="150" r="30" fill="${d}" opacity=".85"/><path d="M448 250a52 52 0 0 1 104 0z" fill="${d}" opacity=".85"/>`,
        Indie: `<g fill="${c}">${[[360, 60], [400, 60], [440, 60], [440, 100], [440, 140], [480, 140], [520, 140], [520, 180]].map(p => `<rect x="${p[0]}" y="${p[1]}" width="36" height="36" opacity=".8"/>`).join('')}</g><rect x="560" y="180" width="36" height="36" fill="${d}"/>`
    };
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 400"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${a}"/><stop offset="1" stop-color="${b}"/></linearGradient><radialGradient id="r" cx=".75" cy=".3" r=".6"><stop offset="0" stop-color="${d}" stop-opacity=".45"/><stop offset="1" stop-color="${d}" stop-opacity="0"/></radialGradient><linearGradient id="s" x1="0" y1="0" x2="0" y2="1"><stop offset=".45" stop-color="#000" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity=".75"/></linearGradient></defs><rect width="640" height="400" fill="url(#g)"/><rect width="640" height="400" fill="url(#r)"/>${M[cat] || M.Indie}<rect width="640" height="400" fill="url(#s)"/>${opt.notitle ? '' : `<text x="28" y="360" font-family="Arial,Helvetica,sans-serif" font-weight="900" font-size="${t.length > 14 ? 42 : 52}" fill="#fff" stroke="#000" stroke-opacity=".4" stroke-width="2" paint-order="stroke" letter-spacing="1">${t.toUpperCase()}</text><text x="30" y="385" font-family="Arial,sans-serif" font-size="18" font-weight="700" fill="${d}" letter-spacing="4">${String(cat).toUpperCase()}</text>`}</svg>`;
    return 'data:image/svg+xml,' + encodeURIComponent(svg).replace(/\(/g, '%28').replace(/\)/g, '%29').replace(/'/g, '%27');
}

const ICONS = {
    home: '<path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>',
    compass: '<circle cx="12" cy="12" r="10"/><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"/>',
    gamepad: '<line x1="6" x2="10" y1="12" y2="12"/><line x1="8" x2="8" y1="10" y2="14"/><line x1="15" x2="15.01" y1="13" y2="13"/><line x1="18" x2="18.01" y1="11" y2="11"/><rect width="20" height="12" x="2" y="6" rx="2"/>',
    library: '<path d="m16 6 4 14"/><path d="M12 6v14"/><path d="M8 8v12"/><path d="M4 4v16"/>',
    heart: '<path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>',
    wallet: '<path d="M19 7V4a1 1 0 0 0-1-1H5a2 2 0 0 0 0 4h15a1 1 0 0 1 1 1v4h-3a2 2 0 0 0 0 4h3a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1"/><path d="M3 5v14a2 2 0 0 0 2 2h15a1 1 0 0 0 1-1v-4"/>',
    receipt: '<path d="M4 2v20l2-1 2 1 2-1 2 1 2-1 2 1 2-1 2 1V2l-2 1-2-1-2 1-2-1-2 1-2-1-2 1Z"/><path d="M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8"/><path d="M12 17.5v-11"/>',
    bell: '<path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/>',
    user: '<path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>',
    palette: '<circle cx="13.5" cy="6.5" r=".5"/><circle cx="17.5" cy="10.5" r=".5"/><circle cx="8.5" cy="7.5" r=".5"/><circle cx="6.5" cy="12.5" r=".5"/><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z"/>',
    settings: '<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/>',
    help: '<circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="4"/><path d="m4.93 4.93 4.24 4.24"/><path d="m14.83 9.17 4.24-4.24"/><path d="m14.83 14.83 4.24 4.24"/><path d="m9.17 14.83-4.24 4.24"/>',
    shield: '<path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/>',
    star: '<polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>'
};
const ic = (n, fill) => `<svg class="i${fill ? ' f' : ''}" viewBox="0 0 24 24" aria-hidden="true">${ICONS[n] || ''}</svg>`;
const stars = r => `<span class="stars">${[1, 2, 3, 4, 5].map(n => ic('star', n <= Math.round(r))).join('')}</span>`;

const T = {
    en: { home: 'Home', discover: 'Discover', games: 'Games', library: 'My Library', wishlist: 'Wishlist', wallet: 'Wallet', transactions: 'Transactions', notifications: 'Notifications', profile: 'Profile', appearance: 'Appearance', settings: 'Settings', help: 'Help Center', admin: 'Admin' },
    uz: { home: 'Bosh sahifa', discover: 'Kashf etish', games: "O'yinlar", library: 'Kutubxonam', wishlist: 'Istaklar', wallet: 'Hamyon', transactions: 'Tranzaksiyalar', notifications: 'Bildirishnomalar', profile: 'Profil', appearance: 'Ko‘rinish', settings: 'Sozlamalar', help: 'Yordam markazi', admin: 'Admin' },
    ru: { home: 'Главная', discover: 'Обзор', games: 'Игры', library: 'Библиотека', wishlist: 'Желаемое', wallet: 'Кошелёк', transactions: 'Операции', notifications: 'Уведомления', profile: 'Профиль', appearance: 'Оформление', settings: 'Настройки', help: 'Поддержка', admin: 'Админ' }
};
const lang = () => localStorage.getItem('lang') || 'en';
const t = k => (T[lang()] || T.en)[k] || k;
const NAV = [['home', 'home'], ['discover', 'compass'], ['games', 'gamepad'], ['library', 'library'], ['wishlist', 'heart'], ['wallet', 'wallet'], ['transactions', 'receipt'], ['notifications', 'bell'], ['profile', 'user'], ['appearance', 'palette'], ['settings', 'settings'], ['help', 'help']];

const S = { user: null, profile: null, games: [], owned: new Map(), wish: new Set(), notes: [], txs: [], deps: [], page: 1, q: '', cat: 'All', sort: 'popular' };
const CATS = ['Action', 'Adventure', 'Racing', 'Horror', 'Shooting', 'Simulation', 'Strategy', 'Puzzle', 'Multiplayer', 'Indie'];
const NAMES = ['Neon Outlaws', 'Void Runner', 'Crimson Apex', 'Hollow Manor', 'Iron Meridian', 'Pixel Harvest', 'Skyforge Tactics', 'Prism Break', 'Last Signal', 'Turbo Drift X', 'Shadow Ledger', 'Orbital Siege', 'Mist Valley', 'Gridlock Kings', 'Ember Crown', 'Night Courier', 'Rust & Rails', 'Quantum Maze', 'Arena Zero', 'Paper Lanterns', 'Titan Breach', 'Salt Road', 'Echo Station', 'Rally Ghost', 'Glass Citadel', 'Moth Garden', 'Bunker 13', 'Star Merchant', 'Dune Pilot', 'Cobalt Heist', 'Frostbite Run', 'Tiny Kingdoms'];
const DEMO_GAMES = NAMES.map((n, i) => ({ id: i + 1, title: n, category: CATS[i % 10], price: [3, 5, 8, 12, 15, 20, 25, 30, 40, 50][(i * 7) % 10] - (i % 3 ? 0.01 : 0), rating: +(3.6 + ((i * 37) % 14) / 10).toFixed(1), popularity: (i * 53) % 100, released: new Date(Date.now() - i * 9 * 864e5).toISOString(), cover: coverArt(n, CATS[i % 10], i), description: `${n} is a ${CATS[i % 10].toLowerCase()} experience with tight controls, striking neon visuals and a campaign built for short sessions or long nights.`, is_demo: true }));

/* ---------- Local database (faqat brauzer, hech qaysi saytga ulanmaydi) ---------- */
const DB_KEY = 'sologm_db_v1', SESSION_KEY = 'sologm_session';
const DEMO = false;
const hashPw = str => { let h1 = 0xdeadbeef, h2 = 0x41c6ce57; for (let i = 0; i < str.length; i++) { const c = str.charCodeAt(i); h1 = Math.imul(h1 ^ c, 2654435761); h2 = Math.imul(h2 ^ c, 1597334677); } h1 = Math.imul(h1 ^ (h1 >>> 16), 2246822507) ^ Math.imul(h2 ^ (h2 >>> 13), 3266489909); h2 = Math.imul(h2 ^ (h2 >>> 16), 2246822507) ^ Math.imul(h1 ^ (h1 >>> 13), 3266489909); return (4294967296 * (2097151 & h2) + (h1 >>> 0)).toString(36) + str.length; };
const uid = () => Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
let DB = null;
function loadDB() {
    try { DB = JSON.parse(localStorage.getItem(DB_KEY)); } catch (e) { DB = null; }
    if (!DB || !DB.users) DB = { users: {}, games: null, purchases: [], wishlists: [], notifications: [], txs: [], deps: [], reviews: [], tickets: [], seq: 1 };
    if (!DB.games) DB.games = DEMO_GAMES.map(g => Object.assign({}, g));
}
function saveDB() { try { localStorage.setItem(DB_KEY, JSON.stringify(DB)); } catch (e) { toast('Xotira to\'lgan. Kichikroq rasm tanlang.', 'err'); } }
const nextId = () => DB.seq++;
const addNote = (user_id, title, body) => DB.notifications.unshift({ id: nextId(), user_id, title, body, read: false, created_at: new Date().toISOString() });

const BGS = [
    ['Neon city', `url(${img('neoncity', 1600, 900)})`], ['Cyber alley', `url(${img('cyberalley', 1600, 900)})`], ['Galaxy', `url(${img('galaxy', 1600, 900)})`], ['Nebula', `url(${img('nebula77', 1600, 900)})`],
    ['Mountains', `url(${img('mountain5', 1600, 900)})`], ['Forest', `url(${img('forest9', 1600, 900)})`], ['Supercar', `url(${img('supercar', 1600, 900)})`], ['Race track', `url(${img('racetrack', 1600, 900)})`],
    ['Gaming desk', `url(${img('gamingdesk', 1600, 900)})`], ['Arcade', `url(${img('arcade3', 1600, 900)})`],
    ['Violet haze', 'linear-gradient(135deg,#1e1b4b,#6d28d9 55%,#be185d)'], ['Crimson', 'linear-gradient(135deg,#0a0713,#7f1d1d 70%,#ff3d6e)'], ['Ocean', 'linear-gradient(135deg,#020617,#0c4a6e 60%,#38bdf8)'],
    ['Aurora', 'radial-gradient(circle at 20% 20%,#34d399 0,transparent 40%),radial-gradient(circle at 80% 30%,#8b5cf6 0,transparent 45%),#05030c'], ['Minimal dark', '#0a0713']
];

function toast(m, type = '') { const e = document.createElement('div'); e.className = 'toast ' + type; e.textContent = m; $('#toasts').append(e); setTimeout(() => e.remove(), 4200); }
function modal(html) { const b = $('#modal .box'); b.innerHTML = html; $('#modal').hidden = false; }
const closeModal = () => $('#modal').hidden = true;
const busy = (btn, on) => { if (btn) { btn.disabled = on; btn.dataset.t = btn.dataset.t || btn.textContent; btn.textContent = on ? 'Kuting...' : btn.dataset.t; } };
const NICK_OK = /^[A-Za-z0-9_](?:[A-Za-z0-9_-]{0,18}[A-Za-z0-9_])$/;
const errMsg = e => (e && e.message) || 'Xatolik yuz berdi. Qayta urinib ko\'ring.';
function applyBg(bg) {
    const b = bg || {}, r = document.documentElement.style;
    $('#bg').style.background = b.css ? `${b.css} center/cover` : '';
    r.setProperty('--dim', (b.dim == null ? .55 : b.dim)); r.setProperty('--blur', ((b.blur == null ? 0 : b.blur)) + 'px');
}

async function loadAll() {
    const u = DB.users[S.user.key];
    if (!u) { toast('Akkaunt topilmadi. Qayta kiring.', 'err'); return false; }
    const id = u.id;
    S.profile = u; S.games = DB.games.map(x => Object.assign({}, x, { cover: x.is_demo ? coverArt(x.title, x.category, x.id - 1) : (x.cover || coverArt(x.title, x.category, x.id)), popularity: x.popularity || 0 }));
    S.owned = new Map(DB.purchases.filter(x => x.user_id === id).map(x => [x.game_id, x.created_at]));
    S.wish = new Set(DB.wishlists.filter(x => x.user_id === id).map(x => x.game_id));
    S.notes = DB.notifications.filter(x => x.user_id === id);
    S.txs = DB.txs.filter(x => x.user_id === id); S.deps = DB.deps.filter(x => x.user_id === id);
    applyBg(u.bg); document.documentElement.dataset.theme = (u.bg && u.bg.theme) || 'dark';
    return true;
}
const G = id => S.games.find(x => x.id == id);
const owns = id => S.owned.has(+id);

function card(g) {
    const fav = S.wish.has(g.id);
    return `<article class="card"><div class="cover" style="background-image:url(${esc(g.cover)})"><span class="tag">${esc(g.category)}</span><button class="fav ${fav ? 'on' : ''}" data-act="fav" data-id="${g.id}" aria-label="Favorite">${ic('heart', fav)}</button></div>
  <div class="cb"><div class="row between"><h3>${esc(g.title)}</h3><span class="price">${money(g.price)}</span></div><div class="small muted">${esc(g.category)} · ${stars(g.rating)} ${g.rating}</div><p>${esc(g.description).slice(0, 90)}...</p>
  <div class="row"><a class="ghost sm" href="#/game/${g.id}">Details</a>${owns(g.id) ? `<button class="btn sm" data-act="play" data-id="${g.id}">▶ Play</button>` : `<button class="ghost sm" data-act="play" data-id="${g.id}">▶ Demo</button><button class="btn sm" data-act="buy" data-id="${g.id}">Buy</button>`}</div></div></article>`;
}
const gameRow = (title, list) => `<h2>${title}</h2><div class="grid">${list.map(card).join('') || '<p class="muted">Nothing here yet.</p>'}</div>`;
const statusPill = s => `<span class="st ${s}">${s}</span>`;
const isAdmin = () => (S.profile && S.profile.role) === 'admin';

const P = {};
P.home = () => {
    const f = [...S.games].sort((a, b) => b.popularity - a.popularity)[0];
    return `<div class="hero" style="background-image:url(${img('herobanner', 1400, 600)})"><div><h1>Play bigger. Spend smarter.</h1><p>${f ? `Today's featured: <b>${esc(f.title)}</b> - ${esc(f.description)}` : ''}</p><a class="btn" href="#/games">Browse games</a></div></div>
  <div class="stats"><div class="panel stat"><span class="muted">Balance</span><b>${money((S.profile ? S.profile.balance : 0))}</b></div><div class="panel stat"><span class="muted">Games owned</span><b>${S.owned.size}</b></div><div class="panel stat"><span class="muted">Wishlist</span><b>${S.wish.size}</b></div></div>
  ${gameRow('New releases', [...S.games].sort((a, b) => new Date(b.released) - new Date(a.released)).slice(0, 4))}${gameRow('Top rated', [...S.games].sort((a, b) => b.rating - a.rating).slice(0, 4))}`;
};
P.discover = () => {
    const by = (c, n = 4) => S.games.filter(g => g.category === c).slice(0, n); const day = S.games[new Date().getDate() % S.games.length];
    const fav = [...S.wish].map(id => (G(id) || {}).category)[0] || 'Action';
    return `<h1>Discover</h1>${day ? `<div class="hero" style="background-image:url(${esc(day.cover)});min-height:220px"><div><span class="pill">Daily feature</span><h2>${esc(day.title)}</h2><a class="btn" href="#/game/${day.id}">See details</a></div></div>` : ''}
  ${gameRow('Featured', S.games.filter(g => g.rating >= 4.5).slice(0, 4))}${gameRow('Trending', [...S.games].sort((a, b) => b.popularity - a.popularity).slice(0, 4))}${gameRow(`Recommended - more ${fav}`, by(fav))}
  <h2>Popular genres</h2><div class="chips">${CATS.map(c => `<a class="chip" href="#/games?cat=${c}">${c}</a>`).join('')}</div>`;
};
P.games = () => {
    const per = 12; let l = S.games.filter(g => (S.cat === 'All' || g.category === S.cat) && g.title.toLowerCase().includes(S.q.toLowerCase()));
    const srt = { price: (a, b) => a.price - b.price, rating: (a, b) => b.rating - a.rating, popular: (a, b) => b.popularity - a.popularity, newest: (a, b) => new Date(b.released) - new Date(a.released) }[S.sort]; l.sort(srt);
    const shown = l.slice(0, S.page * per);
    return `<h1>Games</h1><div class="row"><select id="sort" style="max-width:200px"><option value="popular">Most popular</option><option value="price">Price: low to high</option><option value="rating">Top rated</option><option value="newest">Newest</option></select><span class="muted small">${l.length} results</span></div>
  <div class="chips">${['All', ...CATS].map(c => `<button class="chip ${S.cat === c ? 'on' : ''}" data-act="cat" data-id="${c}">${c}</button>`).join('')}</div>
  <div class="grid">${shown.map(card).join('') || '<p class="muted">No games match. Clear the search or pick another category.</p>'}</div>
  ${shown.length < l.length ? '<p style="text-align:center;margin-top:20px"><button class="ghost" data-act="more">Load more</button></p>' : ''}`;
};
P.game = id => {
    const g = G(id); if (!g) return '<h1>Game not found</h1><a href="#/games">Back to games</a>';
    const rel = S.games.filter(x => x.category === g.category && x.id !== g.id).slice(0, 4);
    return `<div class="hero" style="background-image:url(${esc(g.cover)})"><div><span class="pill">${esc(g.category)}</span><h1>${esc(g.title)}</h1><p>${stars(g.rating)} ${g.rating} · ${esc(g.category)}</p></div></div>
  <div class="split" style="margin-top:20px"><div class="panel"><h3>About</h3><p>${esc(g.description)}</p><div class="gal">${[1, 2, 3].map(i => `<div style="background-image:url(${coverArt(g.title, g.category, g.id * 3 + i, { notitle: true })})"></div>`).join('')}</div>
  <h3 style="margin-top:18px">Qanday o\'ynaladi</h3><p class="muted small">${esc(PLAY_HELP[PLAY[g.category] ? g.category : 'Indie'])}</p>
  <h3 style="margin-top:18px">Reviews</h3><div id="reviews" class="muted small">Loading...</div></div>
  <div class="panel"><div class="price" style="font-size:32px">${money(g.price)}</div><p class="muted small">Platform: PC · ${esc(g.category)}</p><div class="row" style="margin-top:12px">${owns(g.id) ? `<button class="btn" data-act="play" data-id="${g.id}">▶ Play</button><span class="pill" style="background:#34d39933;color:var(--grn)">In your library</span>` : `<button class="btn" data-act="buy" data-id="${g.id}">Buy now</button><button class="ghost" data-act="play" data-id="${g.id}">▶ Try demo (60s)</button>`}<button class="ghost" data-act="fav" data-id="${g.id}">${ic('heart', S.wish.has(g.id))} ${S.wish.has(g.id) ? 'Saved' : 'Wishlist'}</button></div>
  <p class="hint" style="margin-top:14px">Rekordingiz: ${(DB.scores && DB.scores[S.profile.id + ':' + g.id]) || 0}</p></div></div>${gameRow('Related games', rel)}`;
};
P.library = () => {
    const l = S.games.filter(g => owns(g.id));
    return `<h1>My Library</h1>${l.length ? `<div class="grid">${l.map(g => `<article class="card"><div class="cover" style="background-image:url(${esc(g.cover)})"></div><div class="cb"><h3>${esc(g.title)}</h3><span class="small muted">Purchased ${fdate(S.owned.get(g.id))}</span><div class="row"><span class="st approved">Ready</span><button class="btn sm" data-act="play" data-id="${g.id}">▶ Play</button></div></div></article>`).join('')}</div>` : '<div class="panel"><p>Your library is empty. <a href="#/games">Find your first game</a>.</p></div>'}`;
};
P.wishlist = () => `<h1>Wishlist</h1>${gameRow('Saved games', S.games.filter(g => S.wish.has(g.id)))}`;
const bonusPct = a => a >= 100 ? 20 : a >= 50 ? 15 : a >= 20 ? 10 : a >= 10 ? 5 : 0;
P.wallet = () => {
    const dep = S.txs.filter(x => x.type === 'deposit' && x.status === 'approved').reduce((s, x) => s + +x.amount, 0), sp = S.txs.filter(x => x.type === 'purchase').reduce((s, x) => s + Math.abs(x.amount), 0);
    return `<h1>Wallet</h1><div class="stats"><div class="panel stat"><span class="muted">Balance</span><b>${money((S.profile ? S.profile.balance : 0))}</b></div><div class="panel stat"><span class="muted">Total deposits</span><b>${money(dep)}</b></div><div class="panel stat"><span class="muted">Total spending</span><b>${money(sp)}</b></div></div>
  <button class="btn" data-act="deposit">${ic('wallet')} Deposit funds</button><h2>Deposit requests</h2>${txTable(S.deps.map(d => ({ created_at: d.created_at, type: 'deposit', amount: d.amount, status: d.status, ref: d.reference })))}`;
};
const txTable = rows => `<div class="panel" style="overflow:auto"><table><tr><th>Date</th><th>Type</th><th>Amount</th><th>Status</th><th>Reference</th></tr>${rows.map(r => `<tr><td>${fdate(r.created_at)}</td><td>${esc(r.type)}</td><td>${money(r.amount)}</td><td>${statusPill(r.status)}</td><td class="muted small">${esc(r.ref || '-')}</td></tr>`).join('') || '<tr><td colspan=5 class="muted">No records yet.</td></tr>'}</table></div>`;
P.transactions = () => `<h1>Activity & Transactions</h1><div class="chips">${['all', 'deposit', 'purchase', 'bonus', 'refund'].map(f => `<button class="chip ${(S.txf || 'all') === f ? 'on' : ''}" data-act="txf" data-id="${f}">${f}</button>`).join('')}</div>${txTable(S.txs.filter(x => (S.txf || 'all') === 'all' || x.type === S.txf))}`;
P.notifications = () => `<div class="row between"><h1>Notifications</h1><button class="ghost" data-act="readall">Mark all as read</button></div><div class="panel">${noteList(S.notes) || '<p class="muted">You are all caught up.</p>'}</div>`;
const noteList = l => l.map(n => `<div class="note ${n.read ? '' : 'un'}" data-act="read" data-id="${n.id}"><div><b>${esc(n.title)}</b><div class="small muted">${esc(n.body)}</div><div class="small muted">${new Date(n.created_at).toLocaleString()}</div></div></div>`).join('');
P.profile = () => {
    const p = S.profile || {}, av = p.avatar_url ? `<img class="av" style="width:90px;height:90px" src="${esc(p.avatar_url)}" id="avprev">` : `<span class="av" style="width:90px;height:90px;font-size:34px" id="avprev">${esc((p.nickname || '?')[0]).toUpperCase()}</span>`;
    return `<h1>Profile</h1><div class="split"><div class="panel"><div class="row">${av}<label class="ghost sm">Change picture<input type="file" id="avfile" accept="image/png,image/jpeg,image/webp" hidden></label></div>
  <form id="f-prof" class="form"><label class="small muted">Full name<input name="full_name" value="${esc(p.full_name)}" placeholder="Optional"></label><label class="small muted">Nickname (your login name)<input value="${esc(p.nickname)}" disabled></label><button class="btn">Save changes</button></form></div>
  <div class="panel"><div class="stat"><span class="muted">Balance</span><b>${money(p.balance)}</b></div><p class="small muted">Member since ${p.created_at ? fdate(p.created_at) : '-'}</p><p class="small muted">Games: ${S.owned.size} · Favorites: ${S.wish.size}</p><h3 style="margin-top:12px">Recent activity</h3>${S.txs.slice(0, 5).map(x => `<div class="small">${fdate(x.created_at)} - ${esc(x.type)} ${money(x.amount)}</div>`).join('') || '<p class="muted small">No activity yet.</p>'}</div></div>
  <h2>Security</h2><form id="f-pw" class="panel form" style="max-width:420px"><input name="pw" type="password" placeholder="New password (min 6)" minlength="6" required><input name="pw2" type="password" placeholder="Confirm new password" required><button class="btn">Change password</button></form>`;
};
P.appearance = () => {
    const b = (S.profile && S.profile.bg) || {};
    return `<h1>Appearance</h1><div class="panel"><div class="row"><button class="chip" data-act="theme">Toggle light / dark</button><button class="ghost sm" data-act="bgreset">Reset background</button></div>
  <div class="row" style="margin-top:14px"><label class="small muted" style="flex:1">Overlay darkness<input type="range" id="dim" min="0" max="90" value="${((b.dim == null ? .55 : b.dim)) * 100}"></label><label class="small muted" style="flex:1">Blur<input type="range" id="blur" min="0" max="20" value="${(b.blur == null ? 0 : b.blur)}"></label></div></div>
  <h2>Presets</h2><div class="bgs">${BGS.map((x, i) => `<div class="bgp ${b.css === x[1] ? 'on' : ''}" data-act="bg" data-id="${i}" style="background:${x[1]} center/cover">${x[0]}</div>`).join('')}</div>
  <h2>Custom image</h2><div class="panel"><input type="file" id="bgfile" accept="image/png,image/jpeg,image/webp"><p class="small muted">PNG, JPG or WebP, max 4 MB. Faqat shu brauzerda saqlanadi.</p></div>`;
};
P.settings = () => `<h1>Settings</h1><div class="split"><div class="panel"><h3>Language</h3><div class="chips">${[['en', 'English'], ['uz', 'Oʻzbekcha'], ['ru', 'Русский']].map(l => `<button class="chip ${lang() === l[0] ? 'on' : ''}" data-act="lang" data-id="${l[0]}">${l[1]}</button>`).join('')}</div>
  <h3>Notifications</h3>${['Purchases & deposits', 'New games', 'Announcements'].map(x => `<label class="row"><input type="checkbox" style="width:auto" checked> ${x}</label>`).join('')}</div>
  <div class="panel"><h3>Privacy</h3><label class="row"><input type="checkbox" style="width:auto"> Show my library on my public profile</label><label class="row"><input type="checkbox" style="width:auto" checked> Appear in nickname search</label><p class="small muted">Account and security options are on the <a href="#/profile">Profile</a> page. Preferences here are stored on this device; sync them to a profile column when you need cross-device settings.</p>
  <button class="ghost" data-act="logout" style="margin-top:12px">Log out</button></div></div>`;
P.help = () => `<h1>Help Center</h1><div class="split"><div class="panel"><h3>FAQ</h3>${[['How do deposits work?', 'Submit a request with your payment reference. An administrator verifies it and credits your balance. Nothing is credited until approved.'], ['Why is my deposit pending?', 'Manual deposits are reviewed by staff. Pending is normal until the payment is confirmed.'], ['Can I get a refund?', 'Contact support with your purchase date and game title.'], ['Are demo games playable?', 'No. Demo entries are labelled and have no build attached.']].map(f => `<details><summary><b>${f[0]}</b></summary><p class="muted small">${f[1]}</p></details>`).join('')}</div>
  <form id="f-help" class="panel form"><h3>Contact support</h3><input name="subject" placeholder="Subject" required><textarea name="message" rows="5" placeholder="How can we help?" required></textarea><button class="btn">Send ticket</button></form></div><h2>Your tickets</h2><div class="panel" id="tickets" class="muted">Loading...</div>`;
P.admin = () => `<h1>Admin</h1><div class="stats" id="astats"></div><div class="split"><div class="panel"><h3>Pending deposits</h3><div id="apend">Loading...</div><h3 style="margin-top:16px">Games</h3><div id="agames"></div></div><div class="panel"><h3>Add game</h3><form id="f-game" class="form"><input name="title" placeholder="Title" required><select name="category">${CATS.map(c => `<option>${c}</option>`).join('')}</select><input name="price" type="number" step="0.01" min="0.5" max="100" placeholder="Price" required><input name="cover" placeholder="Cover image URL"><textarea name="description" rows="3" placeholder="Description" required></textarea><button class="btn">Add game</button></form>
<h3 style="margin-top:16px">Announcement</h3><form id="f-ann" class="form"><input name="title" placeholder="Title" required><textarea name="body" rows="2" placeholder="Message" required></textarea><button class="btn">Send to all users</button></form></div></div>`;

function nav() {
    const items = [...NAV, ...(isAdmin() ? [['admin', 'shield']] : [])];
    $('#nav').innerHTML = items.map(([k, i]) => `<a href="#/${k}" data-k="${k}" title="${t(k)}"><span class="ic">${ic(i)}</span><span class="lb">${t(k)}</span></a>`).join('');
    $('#badge').hidden = true;
    const p = S.profile; $('#userbtn').innerHTML = `<span class="av">${esc(((p && p.nickname) || 'G')[0]).toUpperCase()}</span><span class="lb">${esc((p && p.nickname) || 'Guest')}</span>`;
    const u = S.notes.filter(n => !n.read).length; $('#cnt').textContent = u; $('#cnt').hidden = !u;
}
async function route() {
    if (!S.user) return;
    const [path, qs] = (location.hash.slice(2) || 'home').split('?'), [pg, arg] = path.split('/');
    if (qs) { const c = new URLSearchParams(qs).get('cat'); if (c) { S.cat = c; S.page = 1; } history.replaceState(null, '', '#/' + pg); }
    const fn = P[pg] || P.home;
    $('#main').innerHTML = pg === 'admin' && !isAdmin() ? '<h1>Access denied</h1><p class="muted">Administrators only.</p>' : fn(arg);
    $$('#nav a').forEach(a => a.classList.toggle('on', a.dataset.k === pg || (pg === 'game' && a.dataset.k === 'games')));
    document.body.classList.remove('navopen'); window.scrollTo(0, 0);
    if (pg === 'games') $('#sort').value = S.sort;
    if (pg === 'game') loadReviews(arg); if (pg === 'help') loadTickets(); if (pg === 'admin' && isAdmin()) loadAdmin();
    nav();
}
async function loadReviews(id) {
    const el = $('#reviews'); if (!el) return;
    const data = DB.reviews.filter(r => r.game_id == id).sort((x, y) => y.id - x.id).slice(0, 10);
    const form = owns(id) ? `<form id="f-review" data-game="${+id}" class="form"><select name="rating">${[5, 4, 3, 2, 1].map(n => `<option value="${n}">${n} star${n > 1 ? 's' : ''}</option>`).join('')}</select><textarea name="body" rows="2" maxlength="500" placeholder="Qisqa sharh yozing" required></textarea><button class="btn sm">Yuborish</button></form>` : '';
    el.innerHTML = (data.map(r => `<p>${stars(r.rating)} ${esc(r.body)}</p>`).join('') || 'Hozircha sharh yo\'q.') + form;
}
async function loadTickets() {
    const el = $('#tickets'); if (!el) return;
    const data = DB.tickets.filter(x => x.user_id === S.profile.id).sort((x, y) => y.id - x.id);
    el.innerHTML = data.map(x => `<div class="row between"><span>${esc(x.subject)}</span>${statusPill(x.status === 'open' ? 'pending' : 'approved')}</div>`).join('') || '<span class="muted">Hozircha murojaat yo\'q.</span>';
}
async function loadAdmin() {
    const pend = DB.deps.filter(d => d.status === 'pending');
    $('#astats').innerHTML = [['Users', Object.keys(DB.users).length], ['Pending deposits', pend.length], ['Sales', money(DB.purchases.reduce((s, x) => s + +x.price, 0))]].map(x => `<div class="panel stat"><span class="muted">${x[0]}</span><b>${x[1]}</b></div>`).join('');
    $('#apend').innerHTML = pend.map(d => `<div class="row between" style="margin:8px 0"><span class="small">${money(d.amount)} · ${esc(d.method)} · ${esc(d.reference)}</span><span><button class="btn sm" data-act="rev" data-id="${d.id}" data-ok="1">Approve</button> <button class="ghost sm" data-act="rev" data-id="${d.id}" data-ok="0">Reject</button></span></div>`).join('') || '<span class="muted">No pending requests.</span>';
    $('#agames').innerHTML = S.games.map(g => `<div class="row between" style="margin:6px 0"><span class="small">${esc(g.title)} - ${money(g.price)}</span><span><button class="ghost sm" data-act="gprice" data-id="${g.id}">Price</button> <button class="ghost sm" data-act="gdel" data-id="${g.id}">Delete</button></span></div>`).join('') || '<span class="muted">No games yet.</span>';
}

async function toggleFav(id) {
    id = +id; const me = S.profile.id;
    if (S.wish.has(id)) { DB.wishlists = DB.wishlists.filter(w => !(w.user_id === me && w.game_id === id)); S.wish.delete(id); }
    else { DB.wishlists.push({ user_id: me, game_id: id }); S.wish.add(id); }
    saveDB(); route();
}
function buy(id) {
    const g = G(id); if (owns(id)) return toast('You already own this game.');
    const bal = +S.profile.balance, ok = bal >= g.price;
    modal(`<h3>Confirm purchase</h3><p>${esc(g.title)}</p><p class="price">${money(g.price)}</p><p class="muted">Your balance: ${money(bal)}</p>${ok ? '' : '<p class="hint">Insufficient balance. Add funds first.</p>'}<div class="row" style="margin-top:14px">${ok ? `<button class="btn" id="okbuy">Pay ${money(g.price)}</button>` : '<a class="btn" href="#/wallet" id="gowallet">Go to wallet</a>'}<button class="ghost" data-act="close">Cancel</button></div>`);
    if ($('#okbuy')) $('#okbuy').addEventListener('click', async e => {
        const me = DB.users[S.user.key], gm = DB.games.find(x => x.id == id);
        if (!gm) return toast('O\'yin topilmadi.', 'err');
        if (DB.purchases.some(p => p.user_id === me.id && p.game_id === gm.id)) return toast('Bu o\'yin sizda bor.', 'err');
        if (me.balance < gm.price) return toast('Balans yetarli emas.', 'err');
        me.balance = +(me.balance - gm.price).toFixed(2);
        DB.purchases.push({ id: nextId(), user_id: me.id, game_id: gm.id, price: gm.price, created_at: new Date().toISOString() });
        DB.txs.unshift({ id: nextId(), user_id: me.id, type: 'purchase', amount: -gm.price, status: 'approved', ref: 'game:' + gm.id, created_at: new Date().toISOString() });
        addNote(me.id, 'Purchase complete', 'You bought ' + gm.title + ' for $' + gm.price);
        saveDB(); closeModal(); toast('Purchase complete!', 'ok'); await loadAll(); route();
    });
    if ($('#gowallet')) $('#gowallet').addEventListener('click', closeModal);
}
function depositForm() {
    modal(`<h3>Deposit funds</h3><form id="f-dep" class="form"><input name="amount" id="amt" type="number" min="3" max="1000" step="0.01" placeholder="Amount (USD, min 3)" required>
  <select name="method"><option>Manual bank / card transfer</option><option>Uzcard / Humo (manual)</option></select>
  <div class="hint" id="bonus">Enter an amount to see your bonus.</div>
  <div class="row"><button class="btn">Pul qo'shish</button><button type="button" class="ghost" data-act="close">Cancel</button></div></form>`);
    $('#amt').oninput = e => { const a = +e.target.value, p = bonusPct(a); $('#bonus').innerHTML = a >= 3 ? `Bonus ${p}% = ${money(a * p / 100)} · You will receive <b>${money(a * (1 + p / 100))}</b> right now` : 'Minimum deposit is $3.00.'; };
}
async function setBg(patch) {
    const bg = Object.assign({}, S.profile.bg || {}, patch); S.profile.bg = bg; applyBg(bg); saveDB();
}
const formObj = f => { const o = {}; new FormData(f).forEach((v, k) => { o[k] = v; }); return o; };
const lim = f => f && f.size <= 8 * 1048576 && /^image\/(png|jpe?g|webp)$/.test(f.type) ? true : (toast('PNG, JPG yoki WebP (8 MB gacha) tanlang.', 'err'), false);
/* Rasm serverga yuborilmaydi: kichraytirilib brauzer xotirasida saqlanadi */
function upload(file) {
    return new Promise((ok, fail) => {
        const fr = new FileReader(); fr.onerror = () => fail({ message: 'Rasmni o\'qib bo\'lmadi.' });
        fr.onload = () => {
            const im = new Image(); im.onerror = () => fail({ message: 'Rasm noto\'g\'ri.' });
            im.onload = () => { const k = Math.min(1, 900 / Math.max(im.width, im.height)), c = document.createElement('canvas'); c.width = Math.round(im.width * k); c.height = Math.round(im.height * k); c.getContext('2d').drawImage(im, 0, 0, c.width, c.height); ok(c.toDataURL('image/jpeg', .8)); };
            im.src = fr.result;
        };
        fr.readAsDataURL(file);
    });
}

document.addEventListener('click', async e => {
    const el = e.target.closest('[data-act]'); if (!el) { if (!e.target.closest('.bellwrap')) $('#dd').hidden = true; return; }
    const a = el.dataset.act, id = el.dataset.id;
    if (a === 'fav') toggleFav(id); else if (a === 'buy') buy(id); else if (a === 'close') closeModal(); else if (a === 'deposit') depositForm();
    else if (a === 'cat') { S.cat = id; S.page = 1; route(); } else if (a === 'more') { S.page++; route(); } else if (a === 'txf') { S.txf = id; route(); }
    else if (a === 'lang') { localStorage.setItem('lang', id); route(); }
    else if (a === 'play') playGame(id); else if (a === 'logout') { closePlayer(); localStorage.removeItem(SESSION_KEY); start(null); }
    else if (a === 'theme') { const th = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark'; document.documentElement.dataset.theme = th; setBg({ theme: th }); }
    else if (a === 'bg') { setBg({ css: BGS[id][1] }); route(); } else if (a === 'bgreset') { S.profile.bg = { theme: document.documentElement.dataset.theme }; applyBg(S.profile.bg); saveDB(); route(); }
    else if (a === 'read' || a === 'readall') {
        S.notes.forEach(n => { if (a === 'readall' || n.id == id) n.read = true; }); saveDB(); route(); renderDD();
    } else if (a === 'gdel' || a === 'gprice') {
        const g = DB.games.find(x => x.id == id); if (!g) return;
        if (a === 'gdel') { if (!confirm('Delete this game?')) return; if (DB.purchases.some(p => p.game_id == id)) return toast('This game has purchases and cannot be deleted.', 'err'); DB.games = DB.games.filter(x => x.id != id); }
        else { const v = parseFloat(prompt('New price (USD):')); if (!(v >= 0.5 && v <= 100)) return toast('Enter a price from 0.5 to 100.', 'err'); g.price = v; }
        saveDB(); toast('Saved.', 'ok'); await loadAll(); loadAdmin();
    } else if (a === 'rev') {
        const d = DB.deps.find(x => x.id == id); if (!d || d.status !== 'pending') return toast('Request not pending', 'err');
        const ok = el.dataset.ok === '1', u = Object.values(DB.users).find(x => x.id === d.user_id), now = new Date().toISOString();
        d.status = ok ? 'approved' : 'rejected';
        if (ok && u) {
            u.balance = +(u.balance + d.amount + d.bonus).toFixed(2);
            DB.txs.unshift({ id: nextId(), user_id: u.id, type: 'deposit', amount: d.amount, status: 'approved', ref: 'dep:' + d.id, created_at: now });
            if (d.bonus > 0) DB.txs.unshift({ id: nextId(), user_id: u.id, type: 'bonus', amount: d.bonus, status: 'approved', ref: 'bonus:' + d.id, created_at: now });
            addNote(u.id, 'Deposit approved', '$' + (d.amount + d.bonus) + ' was added to your balance.');
        } else if (u) addNote(u.id, 'Deposit rejected', 'We could not verify reference ' + d.reference + '. Contact support.');
        saveDB(); toast('Deposit reviewed.', 'ok'); loadAdmin();
    }
});
document.addEventListener('submit', async e => {
    e.preventDefault(); const f = e.target, d = formObj(f), btn = $('button:not([type=button])', f), msg = $('#auth-msg');
    const run = async fn => { busy(btn, true); try { await fn(); } catch (x) { toast(errMsg(x), 'err'); if (f.id === 'f-login') { msg.className = 'msg'; msg.textContent = errMsg(x); } } busy(btn, false); };
    const me = () => DB.users[S.user.key];
    if (f.id === 'f-login') run(async () => {
        const nick = d.nick.trim(), key = nick.toLowerCase();
        if (!NICK_OK.test(nick)) throw { message: 'Nickname: 2-20 ta belgi, harf, raqam, _ yoki -' };
        if (d.password.length < 6) throw { message: 'Parol kamida 6 ta belgidan iborat bo\'lsin.' };
        const u = DB.users[key];
        if (u) {
            if (u.pass !== hashPw(d.password)) throw { message: 'Nickname yoki parol noto\'g\'ri.' };
        } else {
            DB.users[key] = { id: uid(), nickname: nick, pass: hashPw(d.password), full_name: '', avatar_url: '', balance: 0, role: Object.keys(DB.users).length ? 'user' : 'admin', bg: {}, created_at: new Date().toISOString() };
            addNote(DB.users[key].id, 'Xush kelibsiz!', 'Akkauntingiz yaratildi.');
            saveDB(); toast('Xush kelibsiz! Akkaunt yaratildi.', 'ok');
        }
        localStorage.setItem(SESSION_KEY, key); msg.textContent = ''; f.reset(); await start(key);
    });
    else if (f.id === 'f-prof') run(async () => { me().full_name = d.full_name; saveDB(); toast('Profile saved.', 'ok'); nav(); });
    else if (f.id === 'f-pw') { if (d.pw !== d.pw2) return toast('Parollar mos emas.', 'err'); run(async () => { me().pass = hashPw(d.pw); saveDB(); f.reset(); toast('Parol yangilandi.', 'ok'); }); }
    else if (f.id === 'f-dep') run(async () => {
        const amt = +d.amount;
        if (!(amt >= 3 && amt <= 1000)) throw { message: 'Summa 3 dan 1000 gacha bo\'lsin.' };
        const bonus = +(amt * bonusPct(amt) / 100).toFixed(2), now = new Date().toISOString(), id = nextId(), u = me();
        u.balance = +(u.balance + amt + bonus).toFixed(2);
        DB.deps.unshift({ id, user_id: u.id, amount: amt, bonus, method: String(d.method).slice(0, 60), reference: 'instant-' + id, status: 'approved', created_at: now });
        DB.txs.unshift({ id: nextId(), user_id: u.id, type: 'deposit', amount: amt, status: 'approved', ref: 'dep:' + id, created_at: now });
        if (bonus > 0) DB.txs.unshift({ id: nextId(), user_id: u.id, type: 'bonus', amount: bonus, status: 'approved', ref: 'bonus:' + id, created_at: now });
        addNote(u.id, 'Balans to\'ldirildi', '$' + (amt + bonus).toFixed(2) + ' hisobingizga qo\'shildi.');
        saveDB(); closeModal(); toast('Balans to\'ldirildi: +' + money(amt + bonus), 'ok'); await loadAll(); route();
    });
    else if (f.id === 'f-help') run(async () => { DB.tickets.unshift({ id: nextId(), user_id: S.profile.id, subject: d.subject, message: d.message, status: 'open', created_at: new Date().toISOString() }); saveDB(); f.reset(); toast('Ticket sent.', 'ok'); loadTickets(); });
    else if (f.id === 'f-game') run(async () => { DB.games.push({ id: nextId() + 1000, title: d.title, category: d.category, price: +d.price, rating: 4, popularity: 0, description: d.description, cover: d.cover || null, is_demo: false, released: new Date().toISOString() }); saveDB(); f.reset(); toast('Game added.', 'ok'); await loadAll(); loadAdmin(); });
    else if (f.id === 'f-review') run(async () => {
        const gid = +f.dataset.game; if (DB.reviews.some(r => r.user_id === S.profile.id && r.game_id === gid)) throw { message: 'You already reviewed this game.' };
        DB.reviews.push({ id: nextId(), user_id: S.profile.id, game_id: gid, rating: +d.rating, body: d.body, created_at: new Date().toISOString() }); saveDB(); toast('Review posted.', 'ok'); loadReviews(gid);
    });
    else if (f.id === 'f-ann') run(async () => { Object.values(DB.users).forEach(u => addNote(u.id, d.title, d.body)); saveDB(); f.reset(); toast('Announcement sent.', 'ok'); await loadAll(); nav(); });
});
document.addEventListener('change', async e => {
    const el = e.target;
    if (el.id === 'sort') { S.sort = el.value; route(); }
    if (el.id === 'avfile' && lim(el.files[0])) { try { S.profile.avatar_url = await upload(el.files[0]); saveDB(); toast('Rasm yangilandi.', 'ok'); route(); nav(); } catch (x) { toast(errMsg(x), 'err'); } }
    if (el.id === 'bgfile' && lim(el.files[0])) { try { const url = await upload(el.files[0]); setBg({ css: `url(${url})` }); route(); } catch (x) { toast(errMsg(x), 'err'); } }
});
document.addEventListener('input', e => { if (!S.profile && !DEMO) return; if (e.target.id === 'dim' || e.target.id === 'blur') { const v = { dim: $('#dim').value / 100, blur: +$('#blur').value }; applyBg(Object.assign({}, (S.profile && S.profile.bg) || {}, v)); clearTimeout(window._bt); window._bt = setTimeout(() => setBg(v), 400); } });
$('#gsearch').addEventListener('input', e => { S.q = e.target.value; S.page = 1; if (!location.hash.startsWith('#/games')) location.hash = '#/games'; else route(); });
$('#collapse').onclick = () => document.body.classList.toggle('collapsed'); $('#burger').onclick = () => document.body.classList.toggle('navopen');
$('#modal').onclick = e => { if (e.target.id === 'modal') closeModal(); };
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });
$('#userbtn').onclick = () => location.hash = '#/profile';
function renderDD() { $('#dd').innerHTML = noteList(S.notes.slice(0, 6)) + '<a class="small" style="display:block;padding:8px" href="#/notifications">View all</a>'; nav(); }
$('#bell').onclick = e => { e.stopPropagation(); renderDD(); $('#dd').hidden = !$('#dd').hidden; };

/* ================= O'ynaladigan mini-o'yinlar (hammasi brauzerda) ================= */
const PLAY = {}, PLAY_HELP = {
    Action: 'Strelkalar / A D yoki barmoq bilan suring. Tushayotgan bloklardan qoching.',
    Adventure: 'Strelkalar / WASD yoki sichqoncha bilan yuring. Sariq sharlarni yig\'ing, qizil dushmandan qoching.',
    Racing: 'Chap / o\'ng strelka yoki ekranning chap / o\'ng tomoniga bosing. Mashinalardan qoching.',
    Horror: 'Qorong\'ida chiroq bilan kalitlarni toping. Sichqoncha yoki WASD. Arvohga tegib ketmang!',
    Shooting: 'Nishonlarga sichqoncha bilan bosing (yoki tegining). 30 soniya vaqt bor.',
    Simulation: 'Dalani bosib tanga yig\'ing, yaxshilanishlar sotib oling.',
    Strategy: 'Krestik-nolik: siz X siz. Kompyuterga qarshi g\'alaba qozoning.',
    Puzzle: 'Bir xil juft kartalarni toping. Kam yurish va kam vaqt = ko\'p ball.',
    Multiplayer: 'O\'ng: ↑ ↓ yoki barmoq. 2 o\'yinchi rejimida chap: W S. 5 ochkogacha.',
    Indie: 'Strelkalar / WASD yoki surib (swipe) boshqaring. Olmalarni yeng, devor va o\'zingizga tegmang.'
};
const mkCanvas = stage => { const c = document.createElement('canvas'); c.width = 640; c.height = 400; c.className = 'gcanvas'; c.style.touchAction = 'none'; stage.appendChild(c); return [c, c.getContext('2d')]; };
const loop = fn => { let id, last = performance.now(), dead = false; const f = t => { if (dead) return; const dt = Math.min(.05, (t - last) / 1000); last = t; fn(dt); id = requestAnimationFrame(f); }; id = requestAnimationFrame(f); return () => { dead = true; cancelAnimationFrame(id); }; };
const keyState = () => { const st = {}, kk = ['arrowup', 'arrowdown', 'arrowleft', 'arrowright', ' ']; const d = e => { const k = e.key.toLowerCase(); st[k] = true; if (kk.includes(k)) e.preventDefault(); }, u = e => { st[e.key.toLowerCase()] = false; }; addEventListener('keydown', d); addEventListener('keyup', u); return { st, off() { removeEventListener('keydown', d); removeEventListener('keyup', u); } }; };
const ptr = (c, cb) => { const h = e => { const r = c.getBoundingClientRect(); cb((e.clientX - r.left) / r.width * 640, (e.clientY - r.top) / r.height * 400, e); }; c.addEventListener('pointermove', h); c.addEventListener('pointerdown', h); };
const txt = (x, s, px, py, size, col, al) => { x.fillStyle = col || '#fff'; x.font = '700 ' + size + 'px Arial,sans-serif'; x.textAlign = al || 'left'; x.fillText(s, px, py); };

/* 1. Action - tushayotgan bloklardan qochish */
PLAY.Action = (stage, ctl) => {
    const [c, x] = mkCanvas(stage), k = keyState(); let px = 320, t = 0, sc = 0, en = [], sp = 0, dead = false;
    ptr(c, mx => px = mx);
    const stop = loop(dt => {
        if (dead) return; t += dt; sc += dt * 10; ctl.score(sc);
        if (k.st.arrowleft || k.st.a) px -= 380 * dt; if (k.st.arrowright || k.st.d) px += 380 * dt; px = Math.max(18, Math.min(622, px));
        sp -= dt; if (sp <= 0) { sp = Math.max(.15, .65 - t * .012); const w = 24 + Math.random() * 46; en.push({ x: Math.random() * (640 - w), y: -40, w, h: w * .55, v: 170 + t * 7 + Math.random() * 90 }); }
        en.forEach(e => e.y += e.v * dt); en = en.filter(e => e.y < 420);
        x.fillStyle = '#0a0713'; x.fillRect(0, 0, 640, 400);
        x.fillStyle = '#ffffff22'; for (let i = 0; i < 40; i++) x.fillRect((i * 97) % 640, (i * 53 + t * 60) % 400, 2, 2);
        x.fillStyle = '#ff3d6e'; en.forEach(e => x.fillRect(e.x, e.y, e.w, e.h));
        x.fillStyle = '#38bdf8'; x.beginPath(); x.moveTo(px, 350); x.lineTo(px + 18, 384); x.lineTo(px - 18, 384); x.fill();
        if (en.some(e => px + 14 > e.x && px - 14 < e.x + e.w && 384 > e.y && 354 < e.y + e.h)) { dead = true; ctl.over(); }
    });
    return () => { stop(); k.off(); };
};

/* 2. Adventure - sharlarni yig'ish */
PLAY.Adventure = (stage, ctl) => {
    const [c, x] = mkCanvas(stage), k = keyState(); let p = { x: 320, y: 200 }, tg = null, orbs = [], foes = [{ x: 40, y: 40, v: 60 }], sc = 0, t = 0, dead = false;
    const orb = () => ({ x: 30 + Math.random() * 580, y: 30 + Math.random() * 340 }); orbs.push(orb(), orb(), orb());
    ptr(c, (mx, my) => tg = { x: mx, y: my });
    const stop = loop(dt => {
        if (dead) return; t += dt; let dx = 0, dy = 0;
        if (k.st.arrowleft || k.st.a) dx--; if (k.st.arrowright || k.st.d) dx++; if (k.st.arrowup || k.st.w) dy--; if (k.st.arrowdown || k.st.s) dy++;
        if (dx || dy) { tg = null; p.x += dx * 230 * dt; p.y += dy * 230 * dt; }
        else if (tg) { const vx = tg.x - p.x, vy = tg.y - p.y, d = Math.hypot(vx, vy); if (d > 4) { p.x += vx / d * 230 * dt; p.y += vy / d * 230 * dt; } }
        p.x = Math.max(12, Math.min(628, p.x)); p.y = Math.max(12, Math.min(388, p.y));
        orbs = orbs.filter(o => { if (Math.hypot(o.x - p.x, o.y - p.y) < 20) { sc++; ctl.score(sc); if (sc % 4 === 0) foes.push({ x: Math.random() * 640, y: Math.random() < .5 ? 0 : 400, v: 55 }); return false; } return true; });
        while (orbs.length < 3) orbs.push(orb());
        foes.forEach(f => { const vx = p.x - f.x, vy = p.y - f.y, d = Math.hypot(vx, vy) || 1, v = f.v + t * 1.5; f.x += vx / d * v * dt; f.y += vy / d * v * dt; });
        x.fillStyle = '#0d1a14'; x.fillRect(0, 0, 640, 400); x.strokeStyle = '#ffffff0d'; for (let i = 0; i < 640; i += 40) { x.beginPath(); x.moveTo(i, 0); x.lineTo(i, 400); x.stroke(); } for (let i = 0; i < 400; i += 40) { x.beginPath(); x.moveTo(0, i); x.lineTo(640, i); x.stroke(); }
        x.fillStyle = '#facc15'; orbs.forEach(o => { x.beginPath(); x.arc(o.x, o.y, 9, 0, 7); x.fill(); });
        x.fillStyle = '#ff3d6e'; foes.forEach(f => { x.beginPath(); x.arc(f.x, f.y, 13, 0, 7); x.fill(); });
        x.fillStyle = '#34d399'; x.beginPath(); x.arc(p.x, p.y, 12, 0, 7); x.fill();
        if (foes.some(f => Math.hypot(f.x - p.x, f.y - p.y) < 23)) { dead = true; ctl.over(); }
    });
    return () => { stop(); k.off(); };
};

/* 3. Racing - 3 qatorli yo'l */
PLAY.Racing = (stage, ctl) => {
    const [c, x] = mkCanvas(stage), k = keyState(), LX = [200, 320, 440]; let lane = 1, px = 320, cars = [], sp = 0, t = 0, dist = 0, dead = false, off = 0;
    const move = d => { lane = Math.max(0, Math.min(2, lane + d)); };
    const kd = e => { const kk = e.key.toLowerCase(); if (kk === 'arrowleft' || kk === 'a') move(-1); if (kk === 'arrowright' || kk === 'd') move(1); }; addEventListener('keydown', kd);
    c.addEventListener('pointerdown', e => { const r = c.getBoundingClientRect(); move((e.clientX - r.left) / r.width < .5 ? -1 : 1); });
    const stop = loop(dt => {
        if (dead) return; t += dt; const v = 260 + t * 9; dist += v * dt / 20; ctl.score(dist); off = (off + v * dt) % 80;
        px += (LX[lane] - px) * Math.min(1, dt * 14);
        sp -= dt; if (sp <= 0) { sp = Math.max(.32, .9 - t * .01); cars.push({ l: Math.floor(Math.random() * 3), y: -70, h: 62 }); }
        cars.forEach(q => q.y += v * .75 * dt); cars = cars.filter(q => q.y < 440);
        x.fillStyle = '#10151c'; x.fillRect(0, 0, 640, 400); x.fillStyle = '#1b2430'; x.fillRect(130, 0, 380, 400);
        x.fillStyle = '#ffffffaa'; for (let i = -1; i < 6; i++) { x.fillRect(255, i * 80 + off, 6, 40); x.fillRect(379, i * 80 + off, 6, 40); }
        x.fillStyle = '#facc15'; x.fillRect(126, 0, 6, 400); x.fillRect(508, 0, 6, 400);
        cars.forEach(q => { x.fillStyle = '#ff3d6e'; x.fillRect(LX[q.l] - 22, q.y, 44, q.h); x.fillStyle = '#0006'; x.fillRect(LX[q.l] - 16, q.y + 12, 32, 14); });
        x.fillStyle = '#38bdf8'; x.fillRect(px - 22, 318, 44, 62); x.fillStyle = '#0a0713aa'; x.fillRect(px - 16, 330, 32, 14);
        if (cars.some(q => Math.abs(LX[q.l] - px) < 38 && q.y + q.h > 318 && q.y < 380)) { dead = true; ctl.over(); }
    });
    return () => { stop(); k.off(); removeEventListener('keydown', kd); };
};

/* 4. Horror - qorong'ida kalit qidirish */
PLAY.Horror = (stage, ctl) => {
    const [c, x] = mkCanvas(stage), k = keyState(); let p = { x: 320, y: 200 }, tg = null, key = null, g = { x: 40, y: 40 }, sc = 0, t = 0, dead = false;
    const nk = () => { key = { x: 40 + Math.random() * 560, y: 40 + Math.random() * 320 }; if (Math.hypot(key.x - p.x, key.y - p.y) < 120) nk(); }; nk();
    ptr(c, (mx, my) => tg = { x: mx, y: my });
    const stop = loop(dt => {
        if (dead) return; t += dt; let dx = 0, dy = 0;
        if (k.st.arrowleft || k.st.a) dx--; if (k.st.arrowright || k.st.d) dx++; if (k.st.arrowup || k.st.w) dy--; if (k.st.arrowdown || k.st.s) dy++;
        if (dx || dy) { tg = null; p.x += dx * 170 * dt; p.y += dy * 170 * dt; } else if (tg) { const vx = tg.x - p.x, vy = tg.y - p.y, d = Math.hypot(vx, vy); if (d > 4) { p.x += vx / d * 170 * dt; p.y += vy / d * 170 * dt; } }
        p.x = Math.max(10, Math.min(630, p.x)); p.y = Math.max(10, Math.min(390, p.y));
        const gv = 38 + sc * 7 + t * .6, vx = p.x - g.x, vy = p.y - g.y, d = Math.hypot(vx, vy) || 1; g.x += vx / d * gv * dt; g.y += vy / d * gv * dt;
        if (Math.hypot(key.x - p.x, key.y - p.y) < 18) { sc++; ctl.score(sc); nk(); }
        x.fillStyle = '#1a1620'; x.fillRect(0, 0, 640, 400); x.strokeStyle = '#ffffff10'; for (let i = 0; i < 640; i += 64) { x.beginPath(); x.moveTo(i, 0); x.lineTo(i, 400); x.stroke(); }
        x.fillStyle = '#facc15'; x.beginPath(); x.arc(key.x, key.y, 8, 0, 7); x.fill(); x.fillRect(key.x + 6, key.y - 2, 14, 4);
        x.fillStyle = '#e8e4ff'; x.beginPath(); x.arc(g.x, g.y - 4, 16, Math.PI, 0); x.lineTo(g.x + 16, g.y + 16); x.lineTo(g.x + 8, g.y + 10); x.lineTo(g.x, g.y + 16); x.lineTo(g.x - 8, g.y + 10); x.lineTo(g.x - 16, g.y + 16); x.fill();
        x.fillStyle = '#000'; x.fillRect(g.x - 8, g.y - 8, 4, 6); x.fillRect(g.x + 4, g.y - 8, 4, 6);
        const gr = x.createRadialGradient(p.x, p.y, 20, p.x, p.y, 120); gr.addColorStop(0, 'rgba(0,0,0,0)'); gr.addColorStop(1, 'rgba(0,0,0,.97)'); x.fillStyle = gr; x.fillRect(0, 0, 640, 400);
        x.fillStyle = '#34d399'; x.beginPath(); x.arc(p.x, p.y, 7, 0, 7); x.fill();
        if (Math.hypot(g.x - p.x, g.y - p.y) < 20) { dead = true; ctl.over(); }
    });
    return () => { stop(); k.off(); };
};

/* 5. Shooting - nishonlarga otish */
PLAY.Shooting = (stage, ctl) => {
    const [c, x] = mkCanvas(stage); let ts = [], sp = 0, left = 30, sc = 0, shots = 0, hits = 0, m = { x: 320, y: 200 }, dead = false, fx = [];
    c.style.cursor = 'crosshair';
    ptr(c, (mx, my, e) => { m = { x: mx, y: my }; if (e.type === 'pointerdown' && !dead) { shots++; let hit = null; for (let i = ts.length - 1; i >= 0; i--) { if (Math.hypot(ts[i].x - mx, ts[i].y - my) < ts[i].r) { hit = ts[i]; break; } } if (hit) { hits++; sc += Math.round(200 / hit.r); ts = ts.filter(q => q !== hit); fx.push({ x: hit.x, y: hit.y, t: .3 }); ctl.score(sc); } } });
    const stop = loop(dt => {
        if (dead) return; left -= dt; if (left <= 0) { dead = true; ctl.over('Aniqlik: ' + (shots ? Math.round(hits / shots * 100) : 0) + '%'); return; }
        sp -= dt; if (sp <= 0) { sp = .55; const r = 16 + Math.random() * 24, dir = Math.random() < .5 ? 1 : -1; ts.push({ x: dir > 0 ? -r : 640 + r, y: 50 + Math.random() * 280, r, v: dir * (90 + Math.random() * 140) }); }
        ts.forEach(q => q.x += q.v * dt); ts = ts.filter(q => q.x > -60 && q.x < 700); fx.forEach(f => f.t -= dt); fx = fx.filter(f => f.t > 0);
        x.fillStyle = '#0c1424'; x.fillRect(0, 0, 640, 400); x.fillStyle = '#16233d'; x.fillRect(0, 340, 640, 60);
        ts.forEach(q => { [['#fff', 1], ['#ff3d6e', .66], ['#fff', .33]].forEach(a => { x.fillStyle = a[0]; x.beginPath(); x.arc(q.x, q.y, q.r * a[1], 0, 7); x.fill(); }); });
        fx.forEach(f => { x.strokeStyle = '#facc15'; x.lineWidth = 3; x.beginPath(); x.arc(f.x, f.y, 30 * (1 - f.t / .3) + 8, 0, 7); x.stroke(); });
        x.strokeStyle = '#34d399'; x.lineWidth = 2; x.beginPath(); x.arc(m.x, m.y, 14, 0, 7); x.moveTo(m.x - 22, m.y); x.lineTo(m.x + 22, m.y); x.moveTo(m.x, m.y - 22); x.lineTo(m.x, m.y + 22); x.stroke();
        txt(x, 'Vaqt: ' + Math.ceil(left), 14, 28, 20, '#fff');
    });
    return stop;
};

/* 6. Simulation - ferma (clicker) */
PLAY.Simulation = (stage, ctl) => {
    let coins = 0, total = 0, per = 1, auto = 0, cp = 15, ca = 25;
    stage.innerHTML = '<div class="sim"><div class="simf" id="simf" role="button" tabindex="0"><span>🌾</span><small>Bosing!</small></div><div class="sim2"><b id="simc"></b><span id="simi" class="muted small"></span><button class="btn sm" id="simp"></button><button class="btn sm" id="sima"></button></div></div>';
    const $s = id => stage.querySelector('#' + id), draw = () => { $s('simc').textContent = '🪙 ' + Math.floor(coins); $s('simi').textContent = 'Har bosishda +' + per + ' · avto +' + auto + '/s'; $s('simp').textContent = 'Kuchli o\'roq: ' + cp + ' 🪙'; $s('sima').textContent = 'Avto-yig\'uvchi: ' + ca + ' 🪙'; ctl.score(total); };
    $s('simf').onclick = () => { coins += per; total += per; draw(); };
    $s('simp').onclick = () => { if (coins >= cp) { coins -= cp; per++; cp = Math.round(cp * 1.6); draw(); } };
    $s('sima').onclick = () => { if (coins >= ca) { coins -= ca; auto++; ca = Math.round(ca * 1.7); draw(); } };
    const iv = setInterval(() => { coins += auto; total += auto; draw(); }, 1000); draw();
    return () => clearInterval(iv);
};

/* 7. Strategy - krestik-nolik */
PLAY.Strategy = (stage, ctl) => {
    let b, wins = 0, draws = 0, lock = false, tm; const L = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]];
    stage.innerHTML = '<div class="ttt"><p id="tmsg" class="muted"></p><div class="tg" id="tg"></div></div>';
    const win = (q, m) => L.some(l => l.every(i => q[i] === m)), full = q => q.every(Boolean);
    const mm = (q, m) => { if (win(q, 'O')) return { s: 1 }; if (win(q, 'X')) return { s: -1 }; if (full(q)) return { s: 0 }; let best = { s: m === 'O' ? -2 : 2 }; q.forEach((v, i) => { if (v) return; q[i] = m; const r = mm(q, m === 'O' ? 'X' : 'O'); q[i] = ''; if (m === 'O' ? r.s > best.s : r.s < best.s) best = { s: r.s, i }; }); return best; };
    const draw = msg => { stage.querySelector('#tg').innerHTML = b.map((v, i) => `<button data-i="${i}" class="tc ${v}">${v}</button>`).join(''); stage.querySelector('#tmsg').textContent = msg || ('G\'alabalar: ' + wins + ' · Durang: ' + draws); ctl.score(wins * 10 + draws * 3); };
    const reset = () => { b = Array(9).fill(''); lock = false; draw(); };
    const end = m => { lock = true; draw(m); tm = setTimeout(reset, 1400); };
    stage.querySelector('#tg').onclick = e => {
        const i = e.target.dataset.i; if (i === undefined || lock || b[i]) return; b[i] = 'X';
        if (win(b, 'X')) { wins++; return end('Siz yutdingiz! 🎉'); } if (full(b)) { draws++; return end('Durang'); }
        const empty = b.map((v, j) => v ? -1 : j).filter(j => j > -1); const mv = Math.random() < .7 ? mm(b.slice(), 'O').i : empty[Math.floor(Math.random() * empty.length)];
        b[mv] = 'O'; if (win(b, 'O')) { draw(); return end('Kompyuter yutdi'); } if (full(b)) { draws++; return end('Durang'); } draw();
    };
    reset(); return () => clearTimeout(tm);
};

/* 8. Puzzle - xotira kartalari */
PLAY.Puzzle = (stage, ctl) => {
    const sym = ['◆', '●', '▲', '■', '★', '♥', '♣', '☀'], cols = ['#38bdf8', '#ff3d6e', '#34d399', '#facc15', '#a78bfa', '#fb7185', '#4ade80', '#fb923c'];
    let deck = sym.concat(sym).map((s, i) => ({ s, c: cols[i % 8], o: false, m: false })).sort(() => Math.random() - .5), open = [], moves = 0, t0 = Date.now(), lock = false, tm;
    stage.innerHTML = '<div class="mem"><p id="mmsg" class="muted"></p><div class="mg" id="mg"></div></div>';
    const draw = () => { stage.querySelector('#mg').innerHTML = deck.map((d, i) => `<button data-i="${i}" class="mc ${d.o || d.m ? 'up' : ''}" style="color:${d.c}">${d.o || d.m ? d.s : '?'}</button>`).join(''); stage.querySelector('#mmsg').textContent = 'Yurishlar: ' + moves; };
    stage.querySelector('#mg').onclick = e => {
        const i = e.target.dataset.i; if (i === undefined || lock || deck[i].o || deck[i].m) return; deck[i].o = true; open.push(+i); draw();
        if (open.length === 2) { moves++; lock = true; const [a, b] = open; tm = setTimeout(() => { if (deck[a].s === deck[b].s) deck[a].m = deck[b].m = true; deck[a].o = deck[b].o = false; open = []; lock = false; draw(); if (deck.every(d => d.m)) { const sec = Math.round((Date.now() - t0) / 1000), sc = Math.max(10, 1000 - moves * 20 - sec * 5); ctl.score(sc); ctl.over(moves + ' yurish, ' + sec + ' soniya'); } }, 650); }
    };
    draw(); return () => clearTimeout(tm);
};

/* 9. Multiplayer - Pong (2 o'yinchi yoki kompyuterga qarshi) */
PLAY.Multiplayer = (stage, ctl) => {
    const [c, x] = mkCanvas(stage), k = keyState(); let two = false, L = 170, R = 170, b, sl = 0, sr = 0, dead = false;
    const serve = d => { b = { x: 320, y: 200, vx: 280 * d, vy: (Math.random() * 2 - 1) * 180 }; }; serve(1);
    const btn = document.createElement('button'); btn.className = 'ghost sm pmode'; btn.textContent = 'Rejim: kompyuterga qarshi (bosing - 2 o\'yinchi)'; btn.onclick = () => { two = !two; btn.textContent = two ? 'Rejim: 2 o\'yinchi (bosing - kompyuter)' : 'Rejim: kompyuterga qarshi (bosing - 2 o\'yinchi)'; }; stage.appendChild(btn);
    ptr(c, (mx, my) => R = my - 30);
    const stop = loop(dt => {
        if (dead) return;
        if (k.st.arrowup) R -= 340 * dt; if (k.st.arrowdown) R += 340 * dt;
        if (two) { if (k.st.w) L -= 340 * dt; if (k.st.s) L += 340 * dt; } else L += Math.max(-250 * dt, Math.min(250 * dt, b.y - 30 - L));
        L = Math.max(0, Math.min(340, L)); R = Math.max(0, Math.min(340, R));
        b.x += b.vx * dt; b.y += b.vy * dt; if (b.y < 6 || b.y > 394) { b.vy *= -1; b.y = Math.max(6, Math.min(394, b.y)); }
        if (b.vx < 0 && b.x < 28 && b.x > 12 && b.y > L - 4 && b.y < L + 64) { b.vx = Math.abs(b.vx) * 1.06; b.vy += (b.y - L - 30) * 4; }
        if (b.vx > 0 && b.x > 612 && b.x < 628 && b.y > R - 4 && b.y < R + 64) { b.vx = -Math.abs(b.vx) * 1.06; b.vy += (b.y - R - 30) * 4; }
        if (b.x < -10) { sr++; ctl.score(sr * 10); serve(1); } if (b.x > 650) { sl++; serve(-1); }
        x.fillStyle = '#0a1020'; x.fillRect(0, 0, 640, 400); x.fillStyle = '#ffffff22'; for (let i = 0; i < 400; i += 28) x.fillRect(318, i, 4, 14);
        x.fillStyle = '#ff3d6e'; x.fillRect(14, L, 12, 60); x.fillStyle = '#38bdf8'; x.fillRect(614, R, 12, 60); x.fillStyle = '#fff'; x.beginPath(); x.arc(b.x, b.y, 7, 0, 7); x.fill();
        txt(x, sl, 280, 50, 36, '#ff3d6e', 'center'); txt(x, sr, 360, 50, 36, '#38bdf8', 'center');
        if (sl >= 5 || sr >= 5) { dead = true; ctl.over(sr >= 5 ? 'O\'ng o\'yinchi yutdi' : 'Chap o\'yinchi yutdi'); }
    });
    return () => { stop(); k.off(); };
};

/* 10. Indie - Ilon */
PLAY.Indie = (stage, ctl) => {
    const [c, x] = mkCanvas(stage), k = keyState(), S0 = 20, CW = 32, CH = 20; let sn = [{ x: 10, y: 10 }, { x: 9, y: 10 }, { x: 8, y: 10 }], dir = { x: 1, y: 0 }, nd = dir, ap, sc = 0, acc = 0, dead = false, sx, sy;
    const place = () => { do { ap = { x: Math.floor(Math.random() * CW), y: Math.floor(Math.random() * CH) }; } while (sn.some(s => s.x === ap.x && s.y === ap.y)); }; place();
    const turn = (dx, dy) => { if (dx !== -dir.x || dy !== -dir.y) nd = { x: dx, y: dy }; };
    const kd = e => { const kk = e.key.toLowerCase(); if (kk === 'arrowup' || kk === 'w') turn(0, -1); if (kk === 'arrowdown' || kk === 's') turn(0, 1); if (kk === 'arrowleft' || kk === 'a') turn(-1, 0); if (kk === 'arrowright' || kk === 'd') turn(1, 0); }; addEventListener('keydown', kd);
    c.addEventListener('pointerdown', e => { sx = e.clientX; sy = e.clientY; }); c.addEventListener('pointerup', e => { if (sx == null) return; const dx = e.clientX - sx, dy = e.clientY - sy; if (Math.max(Math.abs(dx), Math.abs(dy)) > 20) { if (Math.abs(dx) > Math.abs(dy)) turn(dx > 0 ? 1 : -1, 0); else turn(0, dy > 0 ? 1 : -1); } sx = null; });
    const stop = loop(dt => {
        if (dead) return; acc += dt; const step = Math.max(.06, .13 - sc * .002);
        while (acc >= step && !dead) {
            acc -= step; dir = nd; const h = { x: sn[0].x + dir.x, y: sn[0].y + dir.y };
            if (h.x < 0 || h.y < 0 || h.x >= CW || h.y >= CH || sn.some(s => s.x === h.x && s.y === h.y)) { dead = true; ctl.over(); break; }
            sn.unshift(h); if (h.x === ap.x && h.y === ap.y) { sc++; ctl.score(sc); place(); } else sn.pop();
        }
        x.fillStyle = '#0c1220'; x.fillRect(0, 0, 640, 400);
        x.fillStyle = '#ff3d6e'; x.beginPath(); x.arc(ap.x * S0 + 10, ap.y * S0 + 10, 8, 0, 7); x.fill();
        sn.forEach((s, i) => { x.fillStyle = i ? '#34d399' : '#a7f3d0'; x.fillRect(s.x * S0 + 1, s.y * S0 + 1, S0 - 2, S0 - 2); });
    });
    return () => { stop(); k.off(); removeEventListener('keydown', kd); };
};

/* ---------- O'yin oynasi ---------- */
let playing = null;
function closePlayer() { if (!playing) return; try { playing.cleanup && playing.cleanup(); } catch (e) { } clearTimeout(playing.demoTm); clearInterval(playing.clock); saveBest(); removeEventListener('keydown', playing.esc); playing.el.remove(); playing = null; }
function saveBest() {
    if (!playing || !S.profile) return; const key = S.profile.id + ':' + playing.g.id; DB.scores = DB.scores || {};
    const v = Math.floor(playing.cur); if (v > (DB.scores[key] || 0)) { DB.scores[key] = v; saveDB(); }
}
function playGame(id) {
    const g = G(id); if (!g) return; closePlayer();
    const kind = PLAY[g.category] ? g.category : 'Indie', owned = owns(g.id); let left = 60;
    const el = document.createElement('div'); el.id = 'player';
    el.innerHTML = `<div class="pbar"><b>${esc(g.title)}</b><span class="muted small">${owned ? '' : 'DEMO · 60 soniya'}</span><span class="grow"></span><span>Ball: <i id="psc">0</i></span><span>Rekord: <i id="pbest">0</i></span><button class="ghost sm" id="prs">Qayta</button><button class="btn sm" id="pcl">Yopish</button></div><div class="pstage" id="pstage"></div><p class="phelp muted small">${esc(PLAY_HELP[kind])}</p>`;
    document.body.appendChild(el);
    const st = el.querySelector('#pstage'), key = S.profile.id + ':' + g.id; DB.scores = DB.scores || {};
    playing = { g, el, cur: 0, cleanup: null, esc: e => { if (e.key === 'Escape') closePlayer(); } };
    addEventListener('keydown', playing.esc);
    const best = () => Math.max(DB.scores[key] || 0, Math.floor(playing.cur)), upd = () => { el.querySelector('#psc').textContent = Math.floor(playing.cur); el.querySelector('#pbest').textContent = best(); };
    const ctl = { score: n => { playing.cur = n; upd(); }, over: msg => { if (!playing || playing.el !== el) return; saveBest(); upd(); clearInterval(playing.clock); show(`<h2>Tugadi!</h2><p>Ball: <b>${Math.floor(playing.cur)}</b> · Rekord: <b>${best()}</b></p>${msg ? `<p class="muted">${esc(msg)}</p>` : ''}<button class="btn" id="pgo">Yana o'ynash</button>`); } };
    const show = html => { const o = document.createElement('div'); o.className = 'pover'; o.innerHTML = `<div>${html}</div>`; st.appendChild(o); const b = o.querySelector('#pgo'); if (b) b.onclick = begin; };
    function begin() {
        if (playing.cleanup) try { playing.cleanup(); } catch (e) { } clearTimeout(playing.demoTm); clearInterval(playing.clock); st.innerHTML = ''; playing.cur = 0; upd();
        playing.cleanup = PLAY[kind](st, ctl);
        if (!owned) { if (left <= 0) return endDemo(); playing.clock = setInterval(() => { left--; el.querySelector('.pbar .muted').textContent = 'DEMO · ' + left + ' soniya'; if (left <= 0) endDemo(); }, 1000); }
    }
    function endDemo() { clearInterval(playing.clock); try { playing.cleanup && playing.cleanup(); } catch (e) { } playing.cleanup = null; saveBest(); upd(); st.innerHTML = ''; show(`<h2>Demo tugadi</h2><p>Ball: <b>${Math.floor(playing.cur)}</b></p><p class="muted">To'liq o'ynash uchun o'yinni sotib oling.</p><button class="btn" id="pbuy">Sotib olish - ${money(g.price)}</button>`); st.querySelector('#pbuy').onclick = () => { closePlayer(); buy(g.id); }; }
    el.querySelector('#pcl').onclick = closePlayer; el.querySelector('#prs').onclick = begin;
    upd(); show(`<h2>${esc(g.title)}</h2><p class="muted">${esc(PLAY_HELP[kind])}</p><button class="btn" id="pgo">Boshlash ▶</button>`);
}

let starting = false;
async function start(key) {
    if (starting) return; starting = true;
    try {
        S.user = key && DB.users[key] ? { key } : null;
        if (S.user) {
            if ((await loadAll()) === false) { localStorage.removeItem(SESSION_KEY); S.user = null; starting = false; return start(null); }
            $('#auth').hidden = true; $('#app').hidden = false; nav(); route();
        } else {
            Object.assign(S, { profile: null, games: [], owned: new Map(), wish: new Set(), notes: [], txs: [], deps: [] });
            history.replaceState(null, '', location.pathname); document.documentElement.dataset.theme = 'dark';
            $('#app').hidden = true; $('#auth').hidden = false; applyBg({});
        }
    } catch (x) { toast(errMsg(x), 'err'); }
    starting = false; if ($('#boot')) $('#boot').remove();
}
window.addEventListener('hashchange', route);
loadDB();
start(localStorage.getItem(SESSION_KEY));