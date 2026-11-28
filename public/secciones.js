// Menú desplegable y pantallas de Mandamientos, Sacramentos, Salmos, Novena, Oraciones, guías de celebración y Diario.
import { MANDAMIENTOS, SACRAMENTOS, SALMOS, SALMOS_NOTA, SALMOS_TEMAS, NOVENA, ORACIONES } from "./data/devocionario.js";
import { dibujaDiario } from "./diario.js";
import { dibujaVelada, dibujaNovenario } from "./guias.js";
import { dibujaAusencia } from "./ausencia.js";
import { dibujaRosario } from "./rosario.js";

const $ = (id) => document.getElementById(id);
const el = (tag, cls, txt) => { const e = document.createElement(tag); if (cls) e.className = cls; if (txt != null) e.textContent = txt; return e; };
const ico = (d) => `<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${d}</svg>`;

const LS = {
  get: (k) => { try { return localStorage.getItem(k); } catch (_) { return null; } },
  set: (k, v) => { try { localStorage.setItem(k, v); } catch (_) {} }
};

// Iconos y datos del menú
const SECCIONES = {
  oraciones: { titulo: "Oraciones católicas", sub: "Las oraciones de siempre, para rezar y aprender", color: "#7be0c3", icono: ico('<path d="M12 3v18M7 8h10"/>'), dibuja: dibujaOraciones },
  mandamientos: { titulo: "Mandamientos", sub: "Los diez mandamientos de la Ley de Dios", color: "#ffb02e", icono: ico('<rect x="4" y="3" width="7" height="18" rx="3"/><rect x="13" y="3" width="7" height="18" rx="3"/><path d="M7.5 8v.01M16.5 8v.01M7.5 12v.01M16.5 12v.01"/>'), dibuja: dibujaMandamientos },
  sacramentos: { titulo: "Sacramentos", sub: "Los siete signos de la gracia de Dios", color: "#ff6b8b", icono: ico('<path d="M7 4h10l-1 6a4 4 0 0 1-8 0z"/><path d="M12 14v5M8.5 20h7"/>'), dibuja: dibujaSacramentos },
  salmos: { titulo: "Salmos", sub: "Oraciones del pueblo de Dios para cada momento", color: "#46c2ff", icono: ico('<path d="M5 20V5a2 2 0 0 1 2-2h11v15H7a2 2 0 0 0-2 2z"/><path d="M5 20a2 2 0 0 0 2 2h11"/><path d="M10 8h5"/>'), dibuja: dibujaSalmos },
  rosario: { titulo: "Rosario y Vía Crucis", sub: "Paso a paso, con contador de Avemarías", color: "#ff8fb3", icono: ico('<circle cx="12" cy="5" r="1.6"/><circle cx="7" cy="8" r="1.6"/><circle cx="17" cy="8" r="1.6"/><circle cx="5.5" cy="13.5" r="1.6"/><circle cx="18.5" cy="13.5" r="1.6"/><circle cx="9" cy="18" r="1.6"/><circle cx="15" cy="18" r="1.6"/><path d="M12 20.5v1.5"/>'), dibuja: (c) => dibujaRosario(c, { hoy: () => hoy() }) },
  novena: { titulo: "Novena al Niño Jesús", sub: "Nueve días de oración con el Divino Niño", color: "#b98cff", icono: ico('<path d="M12 3l2.5 5.6 6.1.6-4.6 4.1 1.4 6-5.4-3.2L6.6 19.3l1.4-6L3.4 9.2l6.1-.6z"/>'), dibuja: dibujaNovena },
  ausencia: { titulo: "Sin sacerdote: guía para laicos", sub: "Palabra dominical, emergencias, velorio y enfermos", color: "#ffd45e", icono: ico('<path d="M12 3l8 3v5c0 5-3.5 8.5-8 10-4.5-1.5-8-5-8-10V6z"/><path d="M12 8v6M9 11h6"/>'), dibuja: (c) => dibujaAusencia(c, { hoy: () => hoy(), ir: (id) => abrirSeccion(id) }) },
  velada: { titulo: "Velada al Niño Dios o Virgen", sub: "Guía completa para dirigir una velada sin sacerdote", color: "#ff9a5c", icono: ico('<path d="M12 3c2 3 4 4.5 4 7.5a4 4 0 0 1-8 0C8 7.500 10 6 12 3z"/><path d="M9 21h6M12 15v6"/>'), dibuja: dibujaVelada },
  novenario: { titulo: "Novenario por un difunto", sub: "Las nueve noches de oración por un familiar", color: "#8fb8ff", icono: ico('<path d="M20 14.5A8 8 0 1 1 9.500 4a6.500 6.500 0 0 0 10.500 10.500z"/>'), dibuja: (c) => dibujaNovenario(c, ctxDiario) },
  diario: { titulo: "Mi diario espiritual", sub: "Intenciones, gratitud, reflexiones y hábitos de oración", color: "#ffd45e", icono: ico('<path d="M6 3h11a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6z"/><path d="M6 3v18M10 8h6M10 12h6M10 16h3"/>'), dibuja: (c) => dibujaDiario(c, ctxDiario) }
};
let ctxDiario = { hoy: () => new Date(), reflexionHoy: () => null };

let hoy = () => new Date();
let seccionAbierta = null;

// ---------- Menú desplegable ----------
function iniciarMenu() {
  const lista = $("menuLista");
  for (const [id, s] of Object.entries(SECCIONES)) {
    if (id === "diario") lista.appendChild(el("p", "menu-sep", "Mi espacio"));
    const b = el("button", "menu-item");
    b.type = "button"; b.setAttribute("role", "menuitem"); b.dataset.sec = id;
    b.innerHTML = `<span class="menu-ico" style="--c:${s.color}">${s.icono}</span><span class="menu-tx"><b>${s.titulo}</b><small>${s.sub}</small></span><svg class="menu-go" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9 6l6 6-6 6"/></svg>`;
    b.addEventListener("click", () => { cerrarMenu(); abrirSeccion(id); });
    lista.appendChild(b);
  }
  $("btnMenu").addEventListener("click", (e) => { e.stopPropagation(); $("menu").hidden ? abrirMenu() : cerrarMenu(); });
  document.addEventListener("click", (e) => { if (!$("menu").hidden && !$("menu").contains(e.target)) cerrarMenu(); });
  document.addEventListener("keydown", (e) => {
    if (e.key !== "Escape") return;
    if (seccionAbierta) cerrarSeccion(); else if (!$("menu").hidden) { cerrarMenu(); $("btnMenu").focus(); }
  });
}
function abrirMenu() { $("menu").hidden = false; $("btnMenu").setAttribute("aria-expanded", "true"); $("menuLista").querySelector("button").focus(); }
function cerrarMenu() { $("menu").hidden = true; $("btnMenu").setAttribute("aria-expanded", "false"); }

// ---------- Pantalla de sección ----------
export function abrirSeccion(id) {
  const s = SECCIONES[id];
  if (!s) return;
  seccionAbierta = id;
  $("seccionTitulo").textContent = s.titulo;
  $("seccionSub").textContent = s.sub;
  $("seccionIco").innerHTML = s.icono;
  $("seccionIco").style.setProperty("--c", s.color);
  const cuerpo = $("seccionCuerpo");
  cuerpo.replaceChildren();
  s.dibuja(cuerpo);
  cuerpo.scrollTop = 0;
  const sec = $("seccion");
  sec.hidden = false;
  requestAnimationFrame(() => sec.classList.add("abierta"));
  try { history.pushState({ sec: id }, ""); } catch (_) {}
  $("btnAtras").focus({ preventScroll: true });
}
function cerrarSeccion() {
  if (!seccionAbierta) return;
  if (history.state && history.state.sec) { history.back(); return; } // popstate se encarga
  ocultarSeccion();
}
function ocultarSeccion() {
  if (!seccionAbierta) return;
  seccionAbierta = null;
  const sec = $("seccion");
  sec.classList.remove("abierta");
  setTimeout(() => { if (!seccionAbierta) sec.hidden = true; }, 280);
  $("btnMenu").focus({ preventScroll: true });
}

export function iniciarSecciones(opts = {}) {
  if (opts.hoy) hoy = opts.hoy;
  ctxDiario = { hoy, reflexionHoy: opts.reflexionHoy || (() => null) };
  iniciarMenu();
  $("btnAtras").addEventListener("click", cerrarSeccion);
  // Letra grande para leer en voz alta (se recuerda en este dispositivo)
  const aplicaLetra = (on) => { $("seccion").classList.toggle("letra-grande", on); $("btnLetra").setAttribute("aria-pressed", on); };
  aplicaLetra(LS.get("letra_grande") === "1");
  $("btnLetra").addEventListener("click", () => { const on = !$("seccion").classList.contains("letra-grande"); LS.set("letra_grande", on ? "1" : "0"); aplicaLetra(on); });
  // Desplegables: solo uno abierto a la vez en cada pantalla (el evento "toggle" no sube, por eso se captura).
  $("seccionCuerpo").addEventListener("toggle", (e) => {
    const d = e.target;
    if (!(d instanceof HTMLDetailsElement) || !d.open || !d.classList.contains("acordeon")) return;
    for (const o of $("seccionCuerpo").querySelectorAll("details.acordeon[open]")) if (o !== d) o.open = false;
    requestAnimationFrame(() => d.scrollIntoView({ block: "start", behavior: "smooth" }));
  }, true);
  window.addEventListener("popstate", () => { if (seccionAbierta) ocultarSeccion(); });
}

// ---------- Mandamientos ----------
function dibujaMandamientos(c) {
  const intro = el("section", "card card-intro");
  intro.append(el("p", "intro-etq", "Jesús los resume así"), el("p", "intro-cita", `«${MANDAMIENTOS.resumen}»`), el("p", "intro-ref", `— ${MANDAMIENTOS.resumenCita}`));
  c.appendChild(intro);
  let n = 0;
  for (const g of MANDAMIENTOS.grupos) {
    const sec = el("section", "grupo");
    sec.appendChild(el("h3", "grupo-tit", g.titulo));
    for (const [formula, vivir] of g.items) {
      n++;
      const card = el("article", "card item");
      card.appendChild(el("span", "num", String(n)));
      const cu = el("div", "item-cu");
      cu.append(el("h4", "item-tit", formula));
      const p = el("p", "item-txt");
      p.append(el("b", null, "Para vivirlo hoy: "), document.createTextNode(vivir));
      cu.appendChild(p);
      card.appendChild(cu);
      sec.appendChild(card);
    }
    c.appendChild(sec);
  }
  c.appendChild(el("p", "pie", "Formulación catequética tradicional · Éxodo 20,1-17 y Deuteronomio 5,6-21"));
}

// ---------- Sacramentos ----------
function dibujaSacramentos(c) {
  const intro = el("section", "card card-intro");
  intro.append(el("p", "intro-txt", SACRAMENTOS.intro));
  c.appendChild(intro);
  let n = 0;
  for (const g of SACRAMENTOS.grupos) {
    const sec = el("section", "grupo");
    sec.appendChild(el("h3", "grupo-tit", g.titulo));
    for (const s of g.items) {
      n++;
      const d = el("details", "card acordeon");
      const sm = el("summary");
      sm.append(el("span", "num", String(n)), el("span", "acc-tit", s.n), chevron());
      d.appendChild(sm);
      const cu = el("div", "acc-cu");
      cu.append(campo("Qué es", s.que), campo("Signo", s.signo));
      d.appendChild(cu);
      sec.appendChild(d);
    }
    c.appendChild(sec);
  }
}

function campo(etq, txt) {
  const p = el("p", "campo");
  p.append(el("b", null, etq), document.createTextNode(txt));
  return p;
}
function chevron() {
  const s = el("span", "chev");
  s.innerHTML = `<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M6 9l6 6 6-6"/></svg>`;
  return s;
}

// ---------- Salmos ----------
function dibujaSalmos(c) {
  const intro = el("section", "card card-intro");
  intro.appendChild(el("p", "intro-txt", SALMOS_NOTA));
  c.appendChild(intro);
  const filtros = el("div", "filtros");
  filtros.setAttribute("role", "tablist");
  const lista = el("div", "grupo");
  const pintar = (tema) => {
    lista.replaceChildren();
    for (const s of SALMOS.filter((x) => tema === "todos" || x.t.includes(tema))) {
      const d = el("details", "card acordeon");
      const sm = el("summary");
      const tit = el("span", "acc-tit");
      tit.append(el("small", "acc-pre", `Salmo ${s.n}`), document.createTextNode(s.titulo));
      sm.append(el("span", "num num-s", String(s.n)), tit, chevron());
      d.appendChild(sm);
      const cu = el("div", "acc-cu");
      cu.appendChild(el("p", "salmo-txt", s.txt));
      const tags = el("div", "tags");
      for (const t of s.t) tags.appendChild(el("span", "tag", SALMOS_TEMAS.find((x) => x[0] === t)[1]));
      cu.appendChild(tags);
      d.appendChild(cu);
      lista.appendChild(d);
    }
  };
  for (const [id, nombre] of SALMOS_TEMAS) {
    const b = el("button", "filtro" + (id === "todos" ? " activo" : ""), nombre);
    b.type = "button"; b.setAttribute("role", "tab"); b.setAttribute("aria-selected", id === "todos");
    b.addEventListener("click", () => {
      for (const x of filtros.children) { x.classList.remove("activo"); x.setAttribute("aria-selected", "false"); }
      b.classList.add("activo"); b.setAttribute("aria-selected", "true");
      pintar(id);
    });
    filtros.appendChild(b);
  }
  c.append(filtros, lista);
  pintar("todos");
}

// ---------- Novena ----------
function diaSugerido() {
  const d = hoy();
  if (d.getMonth() === 11 && d.getDate() >= 16 && d.getDate() <= 24) return d.getDate() - 15; // Novena de Navidad
  const g = parseInt(LS.get("novena_dia"), 10);
  return g >= 1 && g <= 9 ? g : 1;
}
function hechos() { try { const a = JSON.parse(LS.get("novena_ok") || "[]"); return Array.isArray(a) ? a : []; } catch (_) { return []; } }

function dibujaNovena(c) {
  const intro = el("section", "card card-intro");
  intro.appendChild(el("p", "intro-txt", NOVENA.intro));
  const progreso = el("p", "progreso");
  intro.appendChild(progreso);
  const dias = el("div", "dias");
  dias.setAttribute("role", "tablist");
  const cuerpo = el("div", "novena-cu");
  c.append(intro, dias, cuerpo);

  let actual = diaSugerido();
  const pintar = () => {
    LS.set("novena_dia", String(actual));
    const ok = hechos();
    progreso.textContent = ok.length ? `Llevas ${ok.length} de 9 días rezados.` : "Aún no has marcado ningún día.";
    dias.replaceChildren();
    for (let i = 1; i <= 9; i++) {
      const b = el("button", "dia" + (i === actual ? " activo" : "") + (ok.includes(i) ? " hecho" : ""));
      b.type = "button"; b.setAttribute("role", "tab"); b.setAttribute("aria-selected", i === actual);
      b.setAttribute("aria-label", `Día ${i}${ok.includes(i) ? ", rezado" : ""}`);
      b.innerHTML = `<small>Día</small><b>${i}</b>${ok.includes(i) ? '<i aria-hidden="true">✓</i>' : ""}`;
      b.addEventListener("click", () => { actual = i; pintar(); cuerpo.scrollIntoView({ block: "nearest" }); });
      dias.appendChild(b);
    }
    const d = NOVENA.dias[actual - 1];
    cuerpo.replaceChildren();
    const t = el("section", "card dia-tit");
    t.append(el("p", "intro-etq", `Día ${actual} de 9`), el("h3", "dia-h", d.t));
    cuerpo.appendChild(t);
    const paso = (etq, txt, extra) => {
      const s = el("section", "card paso" + (extra ? " " + extra : ""));
      s.append(el("h4", "paso-etq", etq), el("p", "paso-txt", txt));
      cuerpo.appendChild(s);
    };
    paso("Señal de la cruz", NOVENA.senal);
    paso("Oración inicial", NOVENA.inicial);
    paso("Consideración del día", d.c);
    paso("Petición", d.p, "paso-pet");
    paso("Para continuar", "Reza un Padrenuestro, un Avemaría y un Gloria.");
    paso("Oración final", NOVENA.final);
    cuerpo.appendChild(el("p", "jaculatoria", NOVENA.jaculatoria));
    const marca = el("button", "boton-marca" + (ok.includes(actual) ? " hecho" : ""));
    marca.type = "button";
    marca.textContent = ok.includes(actual) ? `✓ Día ${actual} rezado (toca para desmarcar)` : `Marcar el día ${actual} como rezado`;
    marca.addEventListener("click", () => {
      const a = hechos();
      const i = a.indexOf(actual);
      if (i >= 0) a.splice(i, 1); else a.push(actual);
      LS.set("novena_ok", JSON.stringify(a));
      if (i < 0 && actual < 9) actual++;
      pintar();
    });
    cuerpo.appendChild(marca);
  };
  pintar();
}

// ---------- Oraciones católicas ----------
function dibujaOraciones(c) {
  const intro = el("section", "card card-intro");
  intro.appendChild(el("p", "intro-txt", ORACIONES.intro));
  c.appendChild(intro);
  for (const g of ORACIONES.grupos) {
    const sec = el("section", "grupo");
    sec.appendChild(el("h3", "grupo-tit", g.titulo));
    for (const o of g.items) {
      const d = el("details", "card acordeon");
      const sm = el("summary");
      const tit = el("span", "acc-tit");
      if (o.cita) tit.appendChild(el("small", "acc-pre", o.cita));
      tit.appendChild(document.createTextNode(o.n));
      sm.append(tit, chevron());
      d.appendChild(sm);
      const cu = el("div", "acc-cu acc-cu-ancho");
      if (o.nota) cu.appendChild(el("p", "nota", o.nota));
      for (const t of o.txt) cu.appendChild(el("p", "salmo-txt", t));
      const cp = el("button", "mini", "Copiar"); cp.type = "button";
      cp.addEventListener("click", async () => {
        const texto = `${o.n}\n\n${o.txt.join("\n\n")}`;
        try { await navigator.clipboard.writeText(texto); cp.textContent = "¡Copiada!"; } catch (_) { cp.textContent = "No se pudo copiar"; }
        setTimeout(() => { cp.textContent = "Copiar"; }, 2000);
      });
      cu.appendChild(el("div", "acciones")).appendChild(cp);
      d.appendChild(cu);
      sec.appendChild(d);
    }
    c.appendChild(sec);
  }
}
