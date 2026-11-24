import { contenido, bienvenida, estado } from "./motor.js";
import { arte } from "./art.js";
import { iniciarSecciones } from "./secciones.js";

const $ = (id) => document.getElementById(id);

// ---- Reloj (para probar: ?fecha=2026-12-25&hora=21:00) ----
const params = new URLSearchParams(location.search);
const FIJA = (() => {
  const f = params.get("fecha"), h = params.get("hora") || "08:00";
  if (!f && !params.get("hora")) return null;
  const base = f ? f.split("-").map(Number) : [new Date().getFullYear(), new Date().getMonth() + 1, new Date().getDate()];
  const [hh, mm] = h.split(":").map(Number);
  return new Date(base[0], base[1] - 1, base[2], hh || 0, mm || 0);
})();
const ahora = () => (FIJA ? new Date(FIJA.getTime() + (performance.now() - T0)) : new Date());
const T0 = performance.now();

// ---- Fondo con imagen real (opcional) ----
// img/fotos.json define qué figuras usan imagen real. Formatos aceptados por figura:
//   "cisne"                                   -> archivo propio img/cisne.jpg
//   "maria": {"src": "https://…", "credito": "…"}  -> imagen enlazada (ej. Wikimedia Commons)
// Si la imagen no carga (sin conexión o enlace roto), se queda el arte vectorial: nunca se ve vacío.
const fotosDisponibles = fetch("img/fotos.json")
  .then((r) => (r.ok ? r.json() : {}))
  .then((j) => {
    const m = {};
    if (Array.isArray(j)) j.forEach((id) => (m[id] = { src: `img/${id}.jpg` }));
    else Object.entries(j || {}).forEach(([id, v]) => (m[id] = typeof v === "string" ? { src: v } : v));
    return m;
  })
  .catch(() => ({}));
async function pintarArte(contenedor, id, opts) {
  contenedor.innerHTML = arte(id, opts);
  const f = (await fotosDisponibles)[id];
  if (!f || !f.src) return;
  const im = new Image();
  im.alt = ""; im.decoding = "async"; im.referrerPolicy = "no-referrer";
  im.onload = () => {
    if (!contenedor.isConnected) return;
    im.className = "foto";
    if (f.pos) im.style.objectPosition = f.pos;
    // zoom: solo en la tarjeta de oración (el texto tapa la parte baja); sube la imagen para que se vea el rostro
    if (f.zoom && contenedor.closest(".tarjeta")) {
      const py = parseFloat((f.pos || "50% 50%").split(" ")[1]) / 100;
      im.style.position = "absolute"; im.style.left = "0"; im.style.width = "100%";
      im.style.height = f.zoom * 100 + "%"; im.style.top = -(f.zoom - 1) * 100 * py + "%";
    }
    contenedor.replaceChildren(im);
    if (f.credito) {
      const c = document.createElement("small");
      c.className = "credito"; c.textContent = f.credito;
      contenedor.appendChild(c);
    }
  };
  im.src = f.src;
}

// ---- Render ----
let claveActual = "";
const fmtFecha = new Intl.DateTimeFormat("es", { weekday: "long", day: "numeric", month: "long" });

function render(forzar = false) {
  const d = ahora();
  const est = estado(d);
  const c = contenido(d, est.que);
  const clave = `${d.toDateString()}|${est.que}`;

  document.body.dataset.periodo = est.periodo;
  const f = fmtFecha.format(d);
  $("fechaTxt").textContent = f.charAt(0).toUpperCase() + f.slice(1);
  $("momentoTxt").textContent = est.que === "noche" ? "Oración de la noche" : "Oración de la mañana";

  // aviso de espera entre las 12:00 y las 20:00
  const av = $("aviso");
  if (est.espera !== null) {
    const h = Math.floor(est.espera / 60), m = est.espera % 60;
    const t = h ? `${h} h ${String(m).padStart(2, "0")} min` : `${m} min`;
    av.innerHTML = `Oración de gratitud a las <b>20:00</b> · faltan <b>${t}</b>`;
    av.hidden = false;
  } else av.hidden = true;

  if (clave === claveActual && !forzar) return;
  claveActual = clave;

  $("chipFigura").textContent = c.figuraNombre;
  const esp = $("chipEsp");
  esp.hidden = !c.especial;
  if (c.especial) esp.textContent = "✦ " + c.especial.nombre;
  $("tituloOracion").textContent = c.titulo;
  $("textoOracion").replaceChildren(...c.parrafos.map((t) => Object.assign(document.createElement("p"), { textContent: t })));
  $("textoReflexion").textContent = c.reflexion;
  const cita = $("citaTxt");
  cita.hidden = !c.cita;
  cita.textContent = c.cita || "";
  $("propositoTxt").textContent = c.proposito;
  $("tOracion").querySelector(".texto").scrollTop = 0;
  $("tReflexion").querySelector(".texto").scrollTop = 0;

  pintarArte($("arte"), c.figuraId, { periodo: est.que, seed: c.seed, motivo: c.motivo, variante: c.variante });
  for (const t of document.querySelectorAll(".tarjeta")) { t.classList.remove("cambia"); void t.offsetWidth; t.classList.add("cambia"); }
}

// ---- Bienvenida ----
function mostrarBienvenida() {
  const d = ahora();
  const est = estado(d);
  const b = bienvenida(d);
  const c = contenido(d, est.que);
  $("bienSaludo").textContent = b.saludo;
  $("bienTitulo").textContent = b.titulo;
  $("bienFrase").textContent = b.frase;
  $("despedidaTxt").textContent = b.despedida;
  pintarArte($("arteBien"), c.figuraId, { periodo: est.que, seed: c.seed + 500, motivo: (c.motivo + 3) % 8, variante: c.variante });
}
function entrar() {
  render(true);
  $("app").hidden = false;
  $("bienvenida").classList.add("oculta");
  setTimeout(() => { $("bienvenida").hidden = true; }, 700);
}

// ---- Salir (botón sin texto) ----
function salir() {
  const dsp = $("despedida");
  dsp.hidden = false; dsp.classList.remove("oculta");
  // En una PWA instalada el navegador suele impedir cerrar la ventana; si no puede, la pantalla de despedida queda visible.
  setTimeout(() => { try { window.close(); } catch (_) {} }, 2200);
}
$("btnSalir").addEventListener("click", salir);
iniciarSecciones({
  hoy: ahora,
  reflexionHoy: () => { const d = ahora(); const c = contenido(d, estado(d).que); return { titulo: c.titulo, reflexion: c.reflexion, proposito: c.proposito }; }
});
$("despedida").addEventListener("click", () => { $("despedida").hidden = true; });
$("btnEntrar").addEventListener("click", entrar);

mostrarBienvenida();
setInterval(() => { if (!$("app").hidden) render(); }, 20000);
document.addEventListener("visibilitychange", () => { if (!document.hidden && !$("app").hidden) render(); });

// ---- Service worker (funciona sin conexión) ----
if ("serviceWorker" in navigator && location.protocol.startsWith("http") && !FIJA) {
  const habiaControlador = !!navigator.serviceWorker.controller;
  navigator.serviceWorker.register("sw.js").then((reg) => {
    // Busca una versión nueva de la app al volver a abrirla y cada 15 min mientras está abierta
    const buscar = () => reg.update().catch(() => {});
    document.addEventListener("visibilitychange", () => { if (!document.hidden) buscar(); });
    setInterval(buscar, 15 * 60 * 1000);
  }).catch(() => {});
  // Un service worker nuevo tomó el control = hay versión nueva instalada en este equipo
  navigator.serviceWorker.addEventListener("controllerchange", () => { if (habiaControlador) aplicarActualizacion(null); });
}

// ---- Versión y avisos de actualización ----
const LS = {
  get: (k) => { try { return localStorage.getItem(k); } catch (_) { return null; } },
  set: (k, v) => { try { localStorage.setItem(k, v); } catch (_) {} }
};
let versionActual = null;
async function leerVersion() {
  try {
    const r = await fetch("version.json?t=" + Date.now(), { cache: "no-store" });
    return r.ok ? await r.json() : null;
  } catch (_) { return null; }
}
function toast(titulo, mensaje, boton, accion) {
  $("toastTit").textContent = titulo;
  $("toastMsg").textContent = mensaje;
  $("toastBtn").textContent = boton;
  $("toastBtn").onclick = () => { $("toast").hidden = true; accion && accion(); };
  $("toast").hidden = false;
}
const fmtVer = (v) => `v${v.version} · ${new Date(v.fecha + "T12:00:00").toLocaleDateString("es", { day: "numeric", month: "short", year: "numeric" })}`;
async function iniciarVersion() {
  const v = await leerVersion();
  if (!v) return;
  versionActual = v;
  $("bienVersion").textContent = fmtVer(v);
  const vista = LS.get("ver");
  if (vista && vista !== v.version) toast(`¡App actualizada a la ${fmtVer(v)}!`, v.mensaje, "Entendido");
  LS.set("ver", v.version);
}
let recargando = false;
// Actualización automática: en segundo plano recarga de inmediato; si la persona está leyendo, avisa y recarga en pocos segundos.
function aplicarActualizacion(v) {
  if (recargando) return;
  recargando = true;
  const recargar = () => location.reload();
  if (document.hidden) return recargar();
  toast(v ? `Actualizando a la v${v.version}…` : "Actualizando la aplicación…", v ? v.mensaje : "Hay una versión nueva; se aplicará en unos segundos.", "Ahora", recargar);
  setTimeout(recargar, 6000);
}
async function buscarActualizacion() {
  const v = await leerVersion();
  if (v && versionActual && v.version !== versionActual.version) aplicarActualizacion(v);
}
iniciarVersion();
setInterval(buscarActualizacion, 5 * 60 * 1000);
document.addEventListener("visibilitychange", () => { if (!document.hidden) buscarActualizacion(); });

// ---- Instalar en la pantalla de inicio (iPhone y Android) ----
(() => {
  const ios = /iphone|ipad|ipod/i.test(navigator.userAgent);
  const instalada = navigator.standalone || matchMedia("(display-mode: standalone)").matches;
  if (instalada || FIJA) return;
  const caja = $("instalar");
  if (ios) {
    $("instalarTxt").textContent = "Para instalarla: toca Compartir y luego «Añadir a pantalla de inicio».";
    caja.hidden = false;
  }
  window.addEventListener("beforeinstallprompt", (e) => {
    e.preventDefault();
    $("instalarTxt").textContent = "Instálala como app en tu teléfono.";
    $("btnInstalar").hidden = false; caja.hidden = false;
    $("btnInstalar").onclick = async () => { e.prompt(); await e.userChoice; caja.hidden = true; };
  });
})();
