// Fondos vectoriales ORIGINALES para cada figura (sin imágenes con derechos de autor).
// arte(id, {periodo, seed, motivo, variante, uid}) devuelve un <svg> listo para insertar.
// Cada día cambia la figura, el motivo decorativo (8), el matiz del cielo (5) y las posiciones aleatorias.

const PIEL = "#f3d3b0", ORO = "#ffd45e", ORO2 = "#e3a008";
let U = "a"; // prefijo de ids para evitar choques entre varios SVG en la misma página

const hex = (h) => [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16));
export const mezcla = (a, b, t) => {
  const A = hex(a), B = hex(b);
  return "#" + A.map((v, i) => Math.round(v + (B[i] - v) * t).toString(16).padStart(2, "0")).join("");
};

function prng(seed) {
  let t = (Math.imul(seed, 2654435761) ^ 0x9e3779b9) >>> 0;
  return () => {
    t = (t + 0x6d2b79f5) >>> 0;
    let r = Math.imul(t ^ (t >>> 15), 1 | t);
    r ^= r + Math.imul(r ^ (r >>> 7), 61 | r);
    return ((r ^ (r >>> 14)) >>> 0) / 4294967296;
  };
}

const PAL = {
  dios: { cielo: ["#ffe08a", "#ff9a3c", "#6a2fd8"] },
  jesus: { cielo: ["#ffb199", "#ff5e7e", "#6b1d6e"], manto: "#c8283f", tunica: "#fff7f0" },
  misericordia: { cielo: ["#aeeaff", "#5a8cff", "#1c2a8f"], manto: "#fffdf5", tunica: "#fffdf5" },
  resucitado: { cielo: ["#fff3b0", "#ffb347", "#e8590c"], manto: "#fffaf0", tunica: "#ffe9a8" },
  espiritu: { cielo: ["#ffcf70", "#ff7e5f", "#6a2c91"] },
  maria: { cielo: ["#bfe3ff", "#4a90e2", "#1b2f7a"], manto: "#2f6fdd", tunica: "#ffffff" },
  cisne: { cielo: ["#fff3b0", "#ffa06b", "#3d2a8f"], manto: "#7a35d6", tunica: "#fff2d6" },
  guadalupe: { cielo: ["#ffd6e7", "#ffb36b", "#2b1a6b"], manto: "#1f9d8f", tunica: "#e86fa3" },
  quinche: { cielo: ["#ffd1f0", "#ff7aa8", "#4a1d96"], manto: "#e8478f", tunica: "#fff0f6" },
  merced: { cielo: ["#e0f7ff", "#74c0fc", "#1c4e9e"], manto: "#f7f4e8", tunica: "#ffffff" },
  carmen: { cielo: ["#ffdca8", "#e8793a", "#3d1f6e"], manto: "#6b3f1d", tunica: "#f4e6cb" },
  fatima: { cielo: ["#e8fbff", "#8fd3ff", "#2a3f9e"], manto: "#ffffff", tunica: "#ffffff" },
  lourdes: { cielo: ["#d9f2ff", "#6fd0ff", "#1d5fa6"], manto: "#ffffff", tunica: "#ffffff" },
  dolorosa: { cielo: ["#e0c3ff", "#9b5de5", "#1b1040"], manto: "#241d4a", tunica: "#6b3fa0" },
  narcisa: { cielo: ["#ffe0f0", "#f78fb3", "#3b2a7a"], manto: "#2d2640", tunica: "#2d2640" },
  marianita: { cielo: ["#fff0f6", "#ff9ecb", "#5a2d9c"], manto: "#7b4a2a", tunica: "#7b4a2a" },
  jose: { cielo: ["#ffe8b0", "#f4a261", "#264653"], manto: "#8d5a2b", tunica: "#3d7ea6" },
  nino: { cielo: ["#ffe6f2", "#ffb3de", "#5c4bd6"], manto: "#ffffff", tunica: "#ffffff" },
  miguel: { cielo: ["#c4e0ff", "#3f88e8", "#101c4f"], manto: "#2a5bd7", tunica: "#f4d35e" },
  francisco: { cielo: ["#d8f3dc", "#74c69d", "#1b4332"], manto: "#7a4f2a", tunica: "#7a4f2a" },
  josegregorio: { cielo: ["#dff1ff", "#8ec5f0", "#1d3557"], manto: "#f4f4f4", tunica: "#f4f4f4" },
  teresita: { cielo: ["#fff0e6", "#ffb3c1", "#6a2c70"], manto: "#ffffff", tunica: "#6b4a2b" },
  senor: { cielo: ["#ffd9a0", "#d9822b", "#3b1d4f"] },
  santisimo: { cielo: ["#fff3c4", "#e8b84a", "#4a2c6e"] },
  rosario: { cielo: ["#e3e0ff", "#8f86f0", "#241a66"] },
  cruz: { cielo: ["#ffb199", "#ff3d6e", "#1a0b2e"] }
};
const TINTES = ["#ff9a3c", "#ff5e7e", "#7b5cff", "#2ec4b6", "#ffd166"];

// ---------- átomos ----------
const estrella = (x, y, s, o = 1, c = "#fff") =>
  `<path d="M${x} ${y - s}Q${x} ${y} ${x + s} ${y}Q${x} ${y} ${x} ${y + s}Q${x} ${y} ${x - s} ${y}Q${x} ${y} ${x} ${y - s}Z" fill="${c}" opacity="${o}"/>`;
const rosa = (x, y, s, c) => {
  let p = "";
  for (let i = 0; i < 5; i++) p += `<circle cx="${(7 * Math.cos(i * 1.2566)).toFixed(1)}" cy="${(7 * Math.sin(i * 1.2566)).toFixed(1)}" r="6.5" fill="#fff" opacity=".3"/>`;
  return `<g transform="translate(${x} ${y}) scale(${s})"><circle r="13" fill="${c}"/>${p}<circle r="5" fill="#000" opacity=".16"/><path d="M-3 0A3 3 0 1 1 3 0A5 5 0 1 1-5 0" fill="none" stroke="#fff" stroke-width="1.3" opacity=".85"/></g>`;
};
const lirio = (x, y, s, c = "#fff") =>
  `<g transform="translate(${x} ${y}) scale(${s})"><path d="M0 0C-20-30-16-62 0-80C16-62 20-30 0 0Z" fill="${c}" opacity=".95"/><path d="M0 0C-36-14-50-40-42-58C-24-46-8-22 0 0Z" fill="${c}" opacity=".8"/><path d="M0 0C36-14 50-40 42-58C24-46 8-22 0 0Z" fill="${c}" opacity=".8"/><path d="M0 0V50" stroke="#3a9d5d" stroke-width="4"/><circle cy="-30" r="2.6" fill="${ORO}"/></g>`;
const ave = (x, y, s, c = "#fff") =>
  `<path transform="translate(${x} ${y}) scale(${s})" d="M0 0Q-9-10-24-4Q-12-3 0 5Q12-3 24-4Q9-10 0 0Z" fill="${c}" opacity=".92"/>`;
const corona = (x, y) =>
  `<path d="M${x - 22} ${y}L${x - 17} ${y - 18}L${x - 8} ${y - 6}L${x} ${y - 22}L${x + 8} ${y - 6}L${x + 17} ${y - 18}L${x + 22} ${y}Z" fill="${ORO}" stroke="${ORO2}" stroke-width="1.5"/>`;
const corazon = (x, y, s, c = "#e63946") =>
  `<path transform="translate(${x} ${y}) scale(${s})" d="M0 26C-30 2-18-22 0-8C18-22 30 2 0 26Z" fill="${c}"/>`;
const cara = (x, y) =>
  `<ellipse cx="${x}" cy="${y}" rx="20" ry="26" fill="${PIEL}"/><ellipse cx="${x}" cy="${y + 9}" rx="14" ry="10" fill="#e6b88f" opacity=".28"/>`;
const manos = (x, y) =>
  `<path d="M${x - 9} ${y}L${x} ${y + 36}L${x + 9} ${y}Q${x} ${y - 13} ${x - 9} ${y}Z" fill="${PIEL}"/>`;
const aur = (x, y, r) =>
  `<circle cx="${x}" cy="${y}" r="${r + 18}" fill="${ORO}" opacity=".22"/><circle cx="${x}" cy="${y}" r="${r}" fill="url(#${U}aur)" stroke="${ORO2}" stroke-width="2.5"/>`;
const llama = (x, y, s) =>
  `<g transform="translate(${x} ${y}) scale(${s})"><path d="M0 0C-12-18 4-30 0-52C20-34 22-12 0 0Z" fill="#ff7a18"/><path d="M0 0C-6-10 2-18 0-30C10-20 12-8 0 0Z" fill="${ORO}"/></g>`;
const rayosCuerpo = (cx, cy, n = 28) => {
  let s = "";
  for (let i = 0; i < n; i++) {
    const a = (i * 2 * Math.PI) / n;
    s += `<path d="M${cx} ${cy}L${cx + 340 * Math.cos(a)} ${cy + 340 * Math.sin(a)}" stroke="${ORO}" stroke-width="${i % 2 ? 2 : 4}" opacity=".38"/>`;
  }
  return s;
};

// ---------- motivos de fondo ----------
const MOTIVOS = [
  // 0 rayos
  (r, luz) => {
    let s = "";
    const n = 18;
    for (let i = 0; i < n; i++) {
      const a = (i * 2 * Math.PI) / n, b = a + (Math.PI / n) * 0.55;
      s += `<path d="M200 89L${200 + 700 * Math.cos(a)} ${89 + 700 * Math.sin(a)}L${200 + 700 * Math.cos(b)} ${89 + 700 * Math.sin(b)}Z" fill="${luz}" opacity=".17"/>`;
    }
    return s;
  },
  // 1 estrellas
  (r) => { let s = ""; for (let i = 0; i < 36; i++) s += estrella(r() * 400, r() * 430, 3 + r() * 9, 0.4 + r() * 0.6); return s; },
  // 2 rosas
  (r) => {
    const c = ["#ff6b81", "#ff9ff3", "#ffd1dc", "#e84393", "#ffb3c1"];
    let s = "";
    for (let i = 0; i < 24; i++) s += rosa(r() * 400, 40 + r() * 480, 0.5 + r() * 0.8, c[Math.floor(r() * 5)]);
    return s;
  },
  // 3 nubes
  (r) => {
    let s = "";
    for (let i = 0; i < 9; i++) {
      const x = r() * 400, y = 300 + r() * 250, w = 60 + r() * 90;
      s += `<g opacity="${0.35 + r() * 0.35}" fill="#fff"><ellipse cx="${x}" cy="${y}" rx="${w}" ry="${w * 0.32}"/><ellipse cx="${x - w * 0.4}" cy="${y - w * 0.18}" rx="${w * 0.45}" ry="${w * 0.3}"/><ellipse cx="${x + w * 0.35}" cy="${y - w * 0.2}" rx="${w * 0.5}" ry="${w * 0.32}"/></g>`;
    }
    return s;
  },
  // 4 lirios
  (r) => { let s = ""; for (let i = 0; i < 9; i++) s += lirio(r() * 400, 470 + r() * 90, 0.6 + r() * 0.5); return s; },
  // 5 aves
  (r) => { let s = ""; for (let i = 0; i < 14; i++) s += ave(r() * 400, 40 + r() * 360, 0.5 + r() * 0.9); return s; },
  // 6 anillos de luz
  (r, luz) => {
    let s = "";
    for (let i = 1; i <= 7; i++) s += `<circle cx="200" cy="89" r="${i * 62}" fill="none" stroke="${luz}" stroke-width="${i % 2 ? 2 : 5}" opacity="${0.32 - i * 0.03}"/>`;
    for (let i = 0; i < 18; i++) s += estrella(r() * 400, r() * 400, 2 + r() * 4, 0.7);
    return s;
  },
  // 7 destellos
  (r, luz) => { let s = ""; for (let i = 0; i < 26; i++) s += `<circle cx="${r() * 400}" cy="${r() * 560}" r="${4 + r() * 22}" fill="${luz}" opacity="${0.08 + r() * 0.2}"/>`; return s; }
];

// ---------- cuerpos ----------
function virgen(p, o = {}) {
  let s = aur(200, 135, 62);
  if (o.rayos) s = rayosCuerpo(200, 310) + s;
  s += `<path d="M200 98C150 104 118 170 110 270L88 470H312L290 270C282 170 250 104 200 98Z" fill="${p.manto}" stroke="#0002"/>`;
  if (o.estrellasManto) for (const [x, y] of [[140, 220], [260, 220], [128, 310], [272, 310], [118, 390], [282, 390], [160, 150], [240, 150]]) s += estrella(x, y, 6, 1, ORO);
  s += `<path d="M200 178C176 192 170 270 148 470H252C230 270 224 192 200 178Z" fill="${p.tunica}" stroke="#0002"/>`;
  if (o.faja) s += `<path d="M160 300Q200 318 240 300L240 318Q200 336 160 318Z" fill="${o.faja}"/>`;
  s += cara(200, 142);
  s += `<path d="M178 128Q200 100 222 128Q214 116 200 114Q186 116 178 128Z" fill="${p.manto}"/>`;
  s += manos(200, 236);
  if (o.corona) s += corona(200, 106);
  if (o.estrellas) for (let i = 0; i < 12; i++) { const a = Math.PI + (i / 11) * Math.PI; s += estrella(200 + 76 * Math.cos(a), 135 + 76 * Math.sin(a), 6, 1, ORO); }
  if (o.luna) s += `<path d="M108 480Q200 548 292 480Q200 512 108 480Z" fill="#eceef7" stroke="#0002"/>`;
  if (o.escapulario) s += `<rect x="184" y="198" width="32" height="56" rx="3" fill="#6b3f1d" stroke="#0003"/>`;
  if (o.rosario) s += `<path d="M200 258Q146 330 170 430" fill="none" stroke="#fff" stroke-width="5" stroke-dasharray="1 8" stroke-linecap="round"/><path d="M170 432V452M162 441H178" stroke="#fff" stroke-width="3"/>`;
  if (o.rosas) s += rosa(150, 478, 1.1, ORO) + rosa(250, 478, 1.1, ORO);
  if (o.espadas) {
    s += corazon(200, 262, 0.9);
    for (let i = -3; i <= 3; i++) s += `<path d="M${200 + i * 17} 190L${200 + i * 3} 262" stroke="#dfe6ee" stroke-width="3"/><path d="M${194 + i * 17} 192H${206 + i * 17}" stroke="${ORO}" stroke-width="3"/>`;
  }
  return s;
}

function cono(p, o = {}) {
  let s = rayosCuerpo(200, 320, 30) + aur(200, 135, 62);
  s += `<path d="M200 96C150 104 132 160 128 232L200 214L272 232C268 160 250 104 200 96Z" fill="${p.manto}" stroke="#0002"/>`;
  s += `<path d="M200 150L96 470H304Z" fill="${p.tunica}" stroke="#0002"/>`;
  for (const y of [270, 320, 370, 420]) { const w = (y - 150) * 0.325; s += `<path d="M${200 - w} ${y}L200 ${y - 22}L${200 + w} ${y}" fill="none" stroke="${ORO}" stroke-width="4" opacity=".95"/>`; }
  s += cara(200, 140) + corona(200, 108);
  s += `<path d="M178 128Q200 100 222 128Q214 116 200 114Q186 116 178 128Z" fill="${p.manto}"/>`;
  s += manos(200, 214);
  if (o.cisne)
    s += `<g transform="translate(318 470)"><ellipse rx="42" ry="17" fill="#fff" stroke="#0002"/><path d="M-30-4C-58-30-34-72-8-60" fill="none" stroke="#fff" stroke-width="12" stroke-linecap="round"/><circle cx="-6" cy="-60" r="8" fill="#fff"/><path d="M0-60L16-56L0-54Z" fill="#f2a900"/><path d="M-10 0Q10-18 34-4" fill="none" stroke="#0002" stroke-width="2"/></g>`;
  if (o.rosas) s += rosa(86, 478, 1.1, "#ff6b81") + rosa(314, 478, 1.1, "#ff6b81");
  return s;
}

function monje(p, o = {}) {
  const hab = o.habito || p.manto;
  let s = aur(200, 138, 62);
  if (o.alas) s += o.alas;
  s += `<path d="M200 96C160 100 150 150 150 192L106 470H294L250 192C250 150 240 100 200 96Z" fill="${hab}" stroke="#0002"/>`;
  if (o.capa) s += `<path d="M150 192Q200 250 250 192L268 470H132Z" fill="${o.capa}" opacity=".96" stroke="#0002"/>`;
  if (o.pelo) s += `<path d="M175 134C166 92 234 92 225 134L228 170Q200 152 172 170Z" fill="#5b3a1a"/>`;
  if (o.velo) s += `<path d="M174 130Q200 84 226 130L246 216H154Z" fill="${o.velo}" stroke="#0002"/>`;
  else if (!o.pelo) s += `<path d="M166 136Q200 80 234 136Q216 118 200 118Q184 118 166 136Z" fill="${hab}" stroke="#0002"/>`;
  s += cara(200, 146);
  if (o.barba) s += `<path d="M180 154Q200 204 220 154Q200 170 180 154Z" fill="#5b3a1a"/>`;
  if (o.cuerda) s += `<path d="M152 300Q200 318 248 300" fill="none" stroke="#f1e3c8" stroke-width="6"/><path d="M204 312L198 392" stroke="#f1e3c8" stroke-width="5"/>`;
  s += manos(200, 246);
  if (o.corona) s += corona(200, 112);
  if (o.escudo) s += `<path d="M180 212h40v30q0 22-20 30q-20-8-20-30z" fill="#fff" stroke="#c0392b" stroke-width="3"/><path d="M200 214v56M184 232h32" stroke="#c0392b" stroke-width="5"/>`;
  if (o.cruzMano) s += `<rect x="236" y="262" width="7" height="50" fill="#a9764a" stroke="#0003"/><rect x="226" y="274" width="27" height="7" fill="#a9764a" stroke="#0003"/>`;
  if (o.rosasMano) s += rosa(158, 330, 1, "#ff8fab") + rosa(242, 330, 1, "#ff8fab") + rosa(200, 360, 1, "#ffc2d1");
  if (o.lirio) s += `<path d="M246 470V300" stroke="#3a9d5d" stroke-width="5"/>` + lirio(246, 330, 0.5);
  if (o.baston) s += `<path d="M268 478V190" stroke="#8d5a2b" stroke-width="8" stroke-linecap="round"/>` + lirio(268, 226, 0.6);
  if (o.aves) s += ave(110, 250, 1.1) + ave(300, 210, 0.9) + ave(80, 320, 0.8);
  return s;
}

function cristo(p, tipo) {
  let s = aur(200, 135, 58);
  if (tipo === "resucitado") s = rayosCuerpo(200, 300, 32) + s;
  s += `<path d="M200 100C172 100 160 138 166 190L96 262L114 282L168 242L152 470H248L232 242L286 282L304 262L234 190C240 138 228 100 200 100Z" fill="${p.manto}" stroke="#0002"/>`;
  s += `<path d="M186 190H214L228 470H172Z" fill="${p.tunica}" stroke="#0002"/>`;
  s += `<path d="M178 128C172 98 228 98 222 128L228 178Q200 160 172 178Z" fill="#6b3f1f"/>`;
  s += cara(200, 142);
  s += `<path d="M200 82V112M200 160V176M148 135H174M226 135H252" stroke="${tipo === "sagrado" || tipo === "resucitado" ? "#c8283f" : "#d6a21a"}" stroke-width="7" opacity=".9"/>`;
  s += `<circle cx="99" cy="274" r="9" fill="${PIEL}"/><circle cx="301" cy="274" r="9" fill="${PIEL}"/>`;
  if (tipo === "sagrado") {
    for (let i = 0; i < 14; i++) { const a = (i * 2 * Math.PI) / 14; s += `<path d="M${200 + 28 * Math.cos(a)} ${242 + 28 * Math.sin(a)}L${200 + 46 * Math.cos(a)} ${242 + 46 * Math.sin(a)}" stroke="${ORO}" stroke-width="3"/>`; }
    s += corazon(200, 228, 0.85) + `<ellipse cx="200" cy="242" rx="27" ry="23" fill="none" stroke="#2b7a3d" stroke-width="3" stroke-dasharray="3 3"/>` + llama(200, 220, 0.5) + `<path d="M200 192V214M193 200H207" stroke="#fff" stroke-width="3"/>`;
  } else if (tipo === "misericordia") {
    s += `<path d="M200 245L156 470H200Z" fill="#d0021b" opacity=".55"/><path d="M200 245L200 470H244Z" fill="#dff4ff" opacity=".75"/>` + corazon(200, 228, 0.5, "#fff");
  } else {
    s += `<circle cx="99" cy="274" r="3.5" fill="#c8283f"/><circle cx="301" cy="274" r="3.5" fill="#c8283f"/>`;
    s += `<path d="M312 478V120" stroke="${ORO2}" stroke-width="5"/><path d="M312 126L376 144L312 170Z" fill="#fff" stroke="#0003"/><path d="M334 138V160M324 148H346" stroke="#c8283f" stroke-width="4"/>`;
  }
  return s;
}

const dios = () =>
  `${rayosCuerpo(200, 190, 36)}${aur(200, 190, 112)}<path d="M200 66L306 254H94Z" fill="#fff8d8" stroke="${ORO2}" stroke-width="4"/><path d="M200 104L278 240H122Z" fill="#ffe27a" opacity=".6"/><text x="200" y="222" font-family="Georgia,'Times New Roman',serif" font-size="50" text-anchor="middle" fill="#6a2fd8" font-weight="700">Α Ω</text>
  <g fill="#fff" opacity=".9"><ellipse cx="110" cy="330" rx="90" ry="26"/><ellipse cx="290" cy="350" rx="100" ry="28"/><ellipse cx="200" cy="400" rx="120" ry="30"/></g>`;

const espiritu = () => {
  let s = aur(200, 170, 74);
  s += `<g transform="translate(200 170)" stroke="#0002"><path d="M-10 0C-50-70-120-60-140-20C-100-30-60-10-20 30Z" fill="#fff"/><path d="M10 0C50-70 120-60 140-20C100-30 60-10 20 30Z" fill="#fff"/><path d="M-16 48L0 104L16 48Z" fill="#fff"/><ellipse cy="15" rx="25" ry="40" fill="#fff"/><circle cy="-30" r="14" fill="#fff"/><path d="M-4-26H4L0-15Z" fill="#f2a900" stroke="none"/></g>`;
  for (let i = 0; i < 7; i++) s += llama(200 + (i - 3) * 52, 330 + Math.abs(i - 3) * 12, 1.2);
  return s;
};

const nino = () =>
  `${aur(200, 122, 50)}<g transform="translate(200 216) scale(1.3)"><path d="M0-40C-34-34-44 40-58 112H58C44 40 34-34 0-40Z" fill="#fff" stroke="#0002"/><path d="M-30-22L-72 6M30-22L72 6" stroke="${PIEL}" stroke-width="13" stroke-linecap="round"/><circle cy="-72" r="30" fill="${PIEL}"/><path d="M-28-78C-26-108 26-108 28-78C20-94-20-94-28-78Z" fill="#7a4a21"/><path d="M-9-62Q0-55 9-62" fill="none" stroke="#b5683c" stroke-width="2.5" stroke-linecap="round"/></g>`;

function miguel(p) {
  const ala = `<path d="M170 190C60 90 10 230 50 370C90 330 118 340 150 300Z" fill="#fff" stroke="#0002"/><path d="M60 250C80 240 100 250 110 280M50 300C75 290 100 300 112 320" fill="none" stroke="#0002" stroke-width="2"/>`;
  let s = aur(200, 128, 50) + ala + `<g transform="translate(400 0) scale(-1 1)">${ala}</g>`;
  s += `<path d="M156 330H244L270 440H130Z" fill="${p.manto}" stroke="#0002"/><path d="M160 180H240L250 330H150Z" fill="${p.tunica}" stroke="${ORO2}" stroke-width="2"/>`;
  s += `<ellipse cx="200" cy="128" rx="30" ry="34" fill="#f4c430"/>` + cara(200, 134);
  s += `<path d="M240 200L296 232" stroke="${PIEL}" stroke-width="12" stroke-linecap="round"/><path d="M296 80V440" stroke="#e8eef5" stroke-width="9"/><path d="M272 150H320" stroke="${ORO}" stroke-width="9" stroke-linecap="round"/>`;
  s += `<path d="M104 200h52v42q0 30-26 40q-26-10-26-40z" fill="${p.manto}" stroke="${ORO}" stroke-width="3"/><path d="M130 206v66M110 232h40" stroke="${ORO}" stroke-width="5"/>`;
  return s;
}

const custodia = () => {
  let s = rayosCuerpo(200, 170, 36) + aur(200, 170, 96);
  for (let i = 0; i < 24; i++) { const a = (i * 2 * Math.PI) / 24, r1 = 70, r2 = i % 2 ? 92 : 112; s += `<path d="M${200 + r1 * Math.cos(a)} ${170 + r1 * Math.sin(a)}L${200 + r2 * Math.cos(a)} ${170 + r2 * Math.sin(a)}" stroke="${ORO2}" stroke-width="5" stroke-linecap="round"/>`; }
  s += `<circle cx="200" cy="170" r="58" fill="#fff" stroke="${ORO2}" stroke-width="6"/><path d="M200 140V200M170 166H230" stroke="${ORO}" stroke-width="8" stroke-linecap="round"/>`;
  s += `<path d="M200 228V380M176 276H224M170 330H230" stroke="${ORO2}" stroke-width="10" stroke-linecap="round"/><path d="M120 440Q200 372 280 440Z" fill="${ORO}" stroke="${ORO2}" stroke-width="4"/>`;
  return s;
};

const rosario = () => {
  let s = aur(200, 210, 60);
  const cx = 200, cy = 210, R = 100;
  for (let i = 0; i < 28; i++) { const a = (i * 2 * Math.PI) / 28 - Math.PI / 2; s += `<circle cx="${cx + R * Math.cos(a)}" cy="${cy + R * Math.sin(a)}" r="${i % 7 === 0 ? 10 : 6.5}" fill="${i % 7 === 0 ? "#7a2230" : "#a33a47"}" stroke="#0003"/>`; }
  s += `<path d="M200 310V350" stroke="#0003" stroke-width="2"/>`;
  for (let i = 0; i < 4; i++) s += `<circle cx="200" cy="${322 + i * 15}" r="6" fill="#a33a47" stroke="#0003"/>`;
  s += `<rect x="190" y="386" width="20" height="80" rx="3" fill="#c9ced6" stroke="#0004"/><rect x="170" y="408" width="60" height="18" rx="3" fill="#c9ced6" stroke="#0004"/>`;
  return s;
};

const cruz = () =>
  `${rayosCuerpo(200, 230, 32)}${aur(200, 230, 120)}<path d="M0 470Q120 410 200 438Q290 410 400 470V560H0Z" fill="#1a0b2e" opacity=".9"/><rect x="187" y="110" width="26" height="340" rx="4" fill="#7a4a21" stroke="#0003"/><rect x="128" y="168" width="144" height="24" rx="4" fill="#7a4a21" stroke="#0003"/><path d="M130 180L270 180" stroke="${ORO}" stroke-width="2" opacity=".6"/>`;

const DIBUJO = {
  dios: () => dios(),
  jesus: (p) => cristo(p, "sagrado"),
  misericordia: (p) => cristo(p, "misericordia"),
  resucitado: (p) => cristo(p, "resucitado"),
  espiritu: () => espiritu(),
  maria: (p) => virgen(p, { estrellas: true, luna: true, faja: "#4a90e2" }),
  cisne: (p) => cono(p, { cisne: true }),
  guadalupe: (p) => virgen(p, { rayos: true, estrellasManto: true, luna: true, faja: "#2a2a2a" }),
  quinche: (p) => cono(p, { rosas: true }),
  merced: (p) => monje(p, { habito: "#f7f4e8", velo: "#ffffff", escudo: true, corona: true }),
  carmen: (p) => virgen(p, { escapulario: true, corona: true }),
  fatima: (p) => virgen(p, { corona: true, rosario: true }),
  lourdes: (p) => virgen(p, { faja: "#6fb7ff", rosas: true, rosario: true }),
  dolorosa: (p) => virgen(p, { espadas: true }),
  narcisa: (p) => monje(p, { velo: "#f7f3ea", cruzMano: true }),
  marianita: (p) => monje(p, { velo: "#f7f3ea", lirio: true }),
  jose: (p) => monje(p, { habito: p.tunica, capa: p.manto, pelo: true, barba: true, baston: true }),
  nino: () => nino(),
  miguel: (p) => miguel(p),
  francisco: (p) => monje(p, { cuerda: true, aves: true }),
  josegregorio: (p) => monje(p, { habito: "#f4f4f4", pelo: true, barba: true }),
  teresita: (p) => monje(p, { habito: p.tunica, velo: "#f4f1ea", rosasMano: true }),
  senor: () => cruz(),
  santisimo: () => custodia(),
  rosario: () => rosario(),
  cruz: () => cruz()
};

// ---------- composición ----------
let contador = 0;
export function arte(id, o = {}) {
  const { periodo = "manana", seed = 1, motivo = 0, variante = 0 } = o;
  U = "g" + ++contador + "_";
  const noche = periodo === "noche";
  const pal = PAL[id] || PAL.maria;
  const cielo = noche ? pal.cielo.map((c) => mezcla(c, "#0a0f35", 0.6)) : pal.cielo;
  const luz = noche ? "#dfe6ff" : "#fff6c2";
  const r = prng(seed * 97 + id.length);
  const dibuja = DIBUJO[id] || DIBUJO.maria;
  const tinte = TINTES[variante % 5];
  let s = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 560" preserveAspectRatio="xMidYMin slice" aria-hidden="true" focusable="false">`;
  s += `<defs><linearGradient id="${U}c" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${cielo[0]}"/><stop offset=".5" stop-color="${cielo[1]}"/><stop offset="1" stop-color="${cielo[2]}"/></linearGradient>`;
  s += `<radialGradient id="${U}aur"><stop offset="0" stop-color="#fffbe0"/><stop offset=".6" stop-color="${ORO}"/><stop offset="1" stop-color="${ORO2}"/></radialGradient>`;
  s += `<radialGradient id="${U}t" cx=".5" cy=".25" r=".8"><stop offset="0" stop-color="${tinte}" stop-opacity="${noche ? 0.3 : 0.42}"/><stop offset="1" stop-color="${tinte}" stop-opacity="0"/></radialGradient></defs>`;
  s += `<rect width="400" height="560" fill="url(#${U}c)"/><rect width="400" height="560" fill="url(#${U}t)"/>`;
  if (noche) { for (let i = 0; i < 40; i++) s += estrella(r() * 400, r() * 340, 1.5 + r() * 4, 0.35 + r() * 0.6); s += `<path d="M44 70a26 26 0 1 0 30 34a21 21 0 1 1-30-34z" fill="#fff8d6" opacity=".92"/>`; }
  s += MOTIVOS[motivo % 8](r, luz);
  s += `<g transform="translate(24 -30) scale(.88)">${dibuja(pal)}</g>`;
  s += `</svg>`;
  return s;
}
