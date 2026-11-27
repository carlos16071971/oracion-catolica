// Motor de la app: calendario, horarios y composición de la oración del día.
// Sin dependencias del navegador, así se puede verificar con Node (scripts/verificar.mjs).
import { FIGURAS, PORID } from "./data/figuras.js";
import * as MA from "./data/manana.js";
import * as NO from "./data/noche.js";
import { ESPECIALES } from "./data/especiales.js";
import { TITULOS, FRASES, DESPEDIDAS } from "./data/bienvenida.js";

// ---- Horarios (hora local del dispositivo) ----
export const HORA_FIN_MANANA = 12; // la oración de la mañana se muestra hasta las 12:00
export const HORA_INICIO_NOCHE = 20; // la oración de la noche se muestra desde las 20:00

// ---- Calendario ----
export const diaDelAnio = (d) => {
  const ini = Date.UTC(d.getFullYear(), 0, 0);
  const hoy = Date.UTC(d.getFullYear(), d.getMonth(), d.getDate());
  return Math.round((hoy - ini) / 86400000); // 1..366
};

// Domingo de Pascua (algoritmo gregoriano de Meeus/Jones/Butcher)
export function pascua(y) {
  const a = y % 19, b = Math.floor(y / 100), c = y % 100;
  const d = Math.floor(b / 4), e = b % 4, f = Math.floor((b + 8) / 25);
  const g = Math.floor((b - f + 1) / 3), h = (19 * a + b - d - g + 15) % 30;
  const i = Math.floor(c / 4), k = c % 4, l = (32 + 2 * e + 2 * i - h - k) % 7;
  const m = Math.floor((a + 11 * h + 22 * l) / 451);
  const mes = Math.floor((h + l - 7 * m + 114) / 31);
  const dia = ((h + l - 7 * m + 114) % 31) + 1;
  return new Date(y, mes - 1, dia);
}

// n-ésimo domingo de un mes (mes 0-11)
export function enesimoDomingo(y, mes, n) {
  const primero = new Date(y, mes, 1).getDay(); // 0 = domingo
  const dia = 1 + ((7 - primero) % 7) + (n - 1) * 7;
  return new Date(y, mes, dia);
}

const mismoDia = (a, b) => a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();

// Ecuador: Día de la Madre = 2.º domingo de mayo; Día del Padre = 3.er domingo de junio.
// Si usas la app en otro país, ajusta estas dos líneas (p. ej. México: 10 de mayo).
const diaDeLaMadre = (y) => enesimoDomingo(y, 4, 2);
const diaDelPadre = (y) => enesimoDomingo(y, 5, 3);

export function especialDe(d) {
  const y = d.getFullYear(), m = d.getMonth(), dd = d.getDate();
  if (m === 11 && dd === 24) return "nacimiento";
  if (m === 11 && dd === 25) return "navidad";
  if (m === 11 && dd === 31) return "findeano";
  if (m === 0 && dd === 1) return "anonuevo";
  if (m === 11 && dd === 8) return "inmaculada";
  if (m === 11 && dd === 12) return "guadalupe";
  if (m === 10 && dd === 2) return "difuntos";
  if (mismoDia(d, diaDeLaMadre(y))) return "madre";
  if (mismoDia(d, diaDelPadre(y))) return "padre";
  const p = pascua(y);
  if (mismoDia(d, p)) return "pascua";
  if (mismoDia(d, new Date(y, p.getMonth(), p.getDate() - 2))) return "viernessanto";
  return null;
}

// 'manana' (00:00–11:59), 'tarde' (12:00–19:59, espera), 'noche' (20:00–23:59)
export function periodoDe(d) {
  const h = d.getHours();
  if (h < HORA_FIN_MANANA) return "manana";
  if (h < HORA_INICIO_NOCHE) return "tarde";
  return "noche";
}

// ---- Composición de la oración ----
const mod = (n, m) => ((n % m) + m) % m;

// que = 'manana' | 'noche'
export function contenido(d, que) {
  const noche = que === "noche";
  const dia = diaDelAnio(d);
  const P = noche ? NO : MA;
  const esp = especialDe(d);
  const variante = mod(dia + Math.floor(dia / FIGURAS.length), 5); // matiz del cielo: 5 variantes (el desfase evita que quede atado a la figura)
  const base = {
    etiqueta: noche ? "Oración de la noche" : "Oración de la mañana",
    seed: dia * 2 + (noche ? 1 : 0),
    variante,
    dia
  };

  if (esp) {
    const e = ESPECIALES[esp];
    const t = noche ? e.noche : e.manana;
    return {
      ...base,
      que,
      especial: { clave: esp, nombre: e.nombre, saludo: e.saludo },
      titulo: t.titulo,
      figuraId: e.fig,
      figuraNombre: PORID[e.fig].nombre,
      motivo: e.motivo,
      parrafos: t.oracion,
      reflexion: t.reflexion,
      cita: "",
      proposito: t.proposito
    };
  }

  const fig = FIGURAS[mod(dia + (noche ? 10 : 0), FIGURAS.length)];
  const tema = P.TEMAS[mod(dia, P.TEMAS.length)];
  return {
    ...base,
    que,
    especial: null,
    titulo: tema[0],
    figuraId: fig.id,
    figuraNombre: fig.nombre,
    motivo: mod(dia + (FIGURAS.length % 8 === 0 ? Math.floor(dia / FIGURAS.length) : 0) + (noche ? 3 : 0), 8), // el desfase solo hace falta cuando FIGURAS no es coprimo con 8
    parrafos: [
      P.APERTURAS[mod(dia, P.APERTURAS.length)] + " " + (noche ? fig.n : fig.m),
      tema[1],
      P.CIERRES[mod(dia, P.CIERRES.length)]
    ],
    reflexion: tema[2],
    cita: tema[3],
    proposito: P.PROPOSITOS[mod(dia, P.PROPOSITOS.length)]
  };
}

// ---- Bienvenida (distinta cada día del año) ----
export function bienvenida(d) {
  const dia = diaDelAnio(d);
  const h = d.getHours();
  const saludo = h >= 5 && h < 12 ? "Buenos días" : h >= 12 && h < 20 ? "Buenas tardes" : "Buenas noches";
  const esp = especialDe(d);
  return {
    saludo,
    titulo: esp ? ESPECIALES[esp].saludo : TITULOS[mod(dia, TITULOS.length)],
    frase: FRASES[mod(dia, FRASES.length)],
    despedida: DESPEDIDAS[mod(dia, DESPEDIDAS.length)],
    especial: esp
  };
}

// Qué mostrar ahora: { que: 'manana'|'noche', espera: null | minutos hasta las 20:00 }
export function estado(d) {
  const p = periodoDe(d);
  if (p === "noche") return { periodo: p, que: "noche", espera: null };
  if (p === "manana") return { periodo: p, que: "manana", espera: null };
  const objetivo = new Date(d.getFullYear(), d.getMonth(), d.getDate(), HORA_INICIO_NOCHE, 0, 0);
  return { periodo: p, que: "manana", espera: Math.max(0, Math.ceil((objetivo - d) / 60000)) };
}
