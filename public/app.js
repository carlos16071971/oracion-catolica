import { contenido, bienvenida, estado } from "./motor.js";
import { arte } from "./art.js";

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

// ---- Fondo con foto opcional: si existe /img/<figura>.jpg se usa sobre el arte vectorial ----
// La lista img/fotos.json indica qué figuras tienen foto propia (por defecto ninguna), así no hay peticiones 404.
const fotosDisponibles = fetch("img/fotos.json").then((r) => (r.ok ? r.json() : [])).catch(() => []);
async function fotoDe(id) {
  const lista = await fotosDisponibles;
  return Array.isArray(lista) && lista.includes(id) ? `img/${id}.jpg` : null;
}
async function pintarArte(contenedor, id, opts) {
  contenedor.innerHTML = arte(id, opts);
  const url = await fotoDe(id);
  if (url && contenedor.isConnected) {
    const im = document.createElement("img");
    im.src = url; im.alt = ""; im.decoding = "async";
    contenedor.replaceChildren(im);
  }
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
  cita.textContent = c.cita ? "— " + c.cita : "";
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
$("despedida").addEventListener("click", () => { $("despedida").hidden = true; });
$("btnEntrar").addEventListener("click", entrar);

mostrarBienvenida();
setInterval(() => { if (!$("app").hidden) render(); }, 20000);
document.addEventListener("visibilitychange", () => { if (!document.hidden && !$("app").hidden) render(); });

// ---- Service worker (funciona sin conexión) ----
if ("serviceWorker" in navigator && location.protocol.startsWith("http") && !FIJA) {
  navigator.serviceWorker.register("sw.js").catch(() => {});
}
