// Verifica el contenido: longitudes coprimas, 366 días únicos, celebraciones y horarios.
// Uso: node scripts/verificar.mjs
import { contenido, bienvenida, especialDe, estado, pascua, enesimoDomingo } from "../public/motor.js";
import { FIGURAS } from "../public/data/figuras.js";
import * as MA from "../public/data/manana.js";
import * as NO from "../public/data/noche.js";
import { TITULOS, FRASES } from "../public/data/bienvenida.js";
import { ESPECIALES } from "../public/data/especiales.js";
import { VELADA, NOVENARIO } from "../public/data/guias.js";
import { AUSENCIA } from "../public/data/ausencia.js";
import { MISTERIOS, VIACRUCIS, LETANIA } from "../public/data/rosario.js";
import { domingoLiturgico } from "../public/ausencia.js";
import { MANDAMIENTOS, SACRAMENTOS, SALMOS, SALMOS_TEMAS, NOVENA, ORACIONES } from "../public/data/devocionario.js";

let fallos = 0;
const ok = (c, msg) => { if (!c) { fallos++; console.error("✗", msg); } else console.log("✓", msg); };
const mcd = (a, b) => (b ? mcd(b, a % b) : a);

// 0) Guía para laicos, Rosario y Vía Crucis
{
  const ROLES_OK = new Set(["guia", "todos", "lector", "canto", "nota"]);
  const TOK = new Set(["nombre", "el", "o", "lo", "hijo", "domingo", "lec1", "salmo", "lec2", "evangelio", "reflexion", "lectura"]);
  const rutas = [["palabra", AUSENCIA.palabra.pasos], ["velorio", AUSENCIA.velorio.oracion], ["sepultura", AUSENCIA.velorio.sepultura], ["visita", AUSENCIA.enfermos.visita]];
  let rolesMal = 0, tokMal = 0, vacios = 0;
  const revisa = (partes) => { for (const x of partes) { if (!ROLES_OK.has(x.r)) rolesMal++; if (!x.t || !x.t.trim()) vacios++; for (const m of x.t.matchAll(/\{(\w+)\}/g)) if (!TOK.has(m[1])) tokMal++; } };
  for (const [, lista] of rutas) for (const p of lista) { if (!p.n || !(p.min > 0)) vacios++; if (!p.comunion) revisa(p.partes); }
  revisa(AUSENCIA.palabra.comunionSi.partes); revisa(AUSENCIA.palabra.comunionNo.partes); revisa(AUSENCIA.emergencias.moribundo.oraciones); revisa(AUSENCIA.emergencias.moribundo.alMorir);
  ok(rolesMal === 0 && vacios === 0, "Guía para laicos: roles válidos y sin pasos vacíos");
  ok(tokMal === 0, "Guía para laicos: solo variables conocidas");
  ok(AUSENCIA.palabra.pasos.filter((p) => p.comunion).length === 1 && AUSENCIA.palabra.pasos.length >= 12, "Celebración de la Palabra: pasos completos y un solo punto de Comunión");
  ok(AUSENCIA.emergencias.bautismo.pasos.length >= 6 && AUSENCIA.limites.puede.length >= 5 && AUSENCIA.limites.nopuede.length >= 5, "Emergencias y límites presentes");
  ok(Object.keys(MISTERIOS).length === 4 && Object.values(MISTERIOS).every((m) => m.lista.length === 5 && m.lista.every((x) => x.length === 4 && x.every(Boolean))), "Rosario: 4 series de 5 misterios completos");
  ok(VIACRUCIS.estaciones.length === 14 && VIACRUCIS.estaciones.every((e) => e[0] && e[1]), "Vía Crucis: 14 estaciones");
  ok(LETANIA.maria.length >= 40, "Letanía lauretana presente");
  // Calendario litúrgico: fechas conocidas
  const ch = (f, txt, ciclo) => { const d = domingoLiturgico(new Date(f + "T12:00:00")); ok(d.nombre.includes(txt) && d.ciclo === ciclo, `Calendario ${f}: ${d.nombre} · ciclo ${d.ciclo} (esperado «${txt}», ${ciclo})`); };
  ch("2026-11-29", "primer domingo de Adviento", "B");
  ch("2026-04-05", "Pascua de la Resurrección", "A");
  ch("2026-03-29", "Domingo de Ramos", "A");
  ch("2026-05-24", "Pentecostés", "A");
  ch("2026-11-22", "Rey del Universo", "A");
  ch("2026-12-13", "tercer domingo de Adviento", "B");
  ch("2026-03-15", "cuarto domingo de Cuaresma", "A");
  ch("2026-05-31", "Santísima Trinidad", "A");
  ch("2026-06-07", "10.º domingo del Tiempo Ordinario", "A");
  ch("2026-02-08", "5.º domingo del Tiempo Ordinario", "A");
  ch("2025-12-28", "Sagrada Familia", "A");
  ch("2027-01-10", "Bautismo del Señor", "B");
  ch("2026-11-15", "33.º domingo del Tiempo Ordinario", "A");
}

// 1) Tamaños de los conjuntos y que sean coprimos (garantiza que no se repita la combinación)
const lens = { aperturas: MA.APERTURAS.length, figuras: FIGURAS.length, temas: MA.TEMAS.length, cierres: MA.CIERRES.length, propositos: MA.PROPOSITOS.length };
console.log("Tamaños mañana:", lens);
console.log("Tamaños noche:", { aperturas: NO.APERTURAS.length, temas: NO.TEMAS.length, cierres: NO.CIERRES.length, propositos: NO.PROPOSITOS.length });
const L = [lens.aperturas, lens.figuras, lens.temas, lens.cierres, lens.propositos];
let coprimos = true;
for (let i = 0; i < L.length; i++) for (let j = i + 1; j < L.length; j++) if (mcd(L[i], L[j]) !== 1) coprimos = false;
ok(coprimos, "Los tamaños de los conjuntos son coprimos entre sí");
ok(NO.APERTURAS.length === MA.APERTURAS.length && NO.TEMAS.length === MA.TEMAS.length && NO.CIERRES.length === MA.CIERRES.length && NO.PROPOSITOS.length === MA.PROPOSITOS.length, "Mañana y noche tienen los mismos tamaños");
ok(mcd(TITULOS.length, FRASES.length) === 1 && TITULOS.length * FRASES.length >= 366, "Bienvenidas: títulos × frases cubren 366 días sin repetir");
ok(MA.TEMAS.every((t) => t.length === 4 && t[1] && t[2]) && NO.TEMAS.every((t) => t.length === 4 && t[1] && t[2]), "Todos los temas tienen título, oración y reflexión");

// 2) Año completo (2028 es bisiesto = 366 días) sin repeticiones. Se excluyen los días de celebración.
for (const año of [2026, 2028]) {
  const vistos = { manana: new Map(), noche: new Map(), bien: new Map(), arte: new Map() };
  let dias = 0, especiales = [];
  for (let d = new Date(año, 0, 1); d.getFullYear() === año; d = new Date(año, d.getMonth(), d.getDate() + 1)) {
    dias++;
    const esp = especialDe(d);
    if (esp) especiales.push(`${d.toISOString().slice(5, 10)}=${esp}`);
    for (const que of ["manana", "noche"]) {
      const c = contenido(d, que);
      const texto = c.parrafos.join(" ") + "|" + c.reflexion + "|" + c.proposito;
      if (vistos[que].has(texto)) fallos++, console.error("✗ repetido", que, d.toDateString(), "=", vistos[que].get(texto));
      vistos[que].set(texto, d.toDateString());
      if (!c.especial) {
        const k = `${que}|${c.figuraId}|${c.motivo}|${c.variante}`;
        if (vistos.arte.has(k)) fallos++, console.error("✗ fondo repetido", k, d.toDateString(), vistos.arte.get(k));
        vistos.arte.set(k, d.toDateString());
      }
    }
    const b = bienvenida(d);
    const kb = b.titulo + "|" + b.frase;
    if (!b.especial && vistos.bien.has(kb)) fallos++, console.error("✗ bienvenida repetida", d.toDateString());
    vistos.bien.set(kb, d.toDateString());
  }
  ok(dias === (año === 2028 ? 366 : 365), `${año}: ${dias} días recorridos`);
  ok(vistos.manana.size === dias && vistos.noche.size === dias, `${año}: ${vistos.manana.size} oraciones de mañana y ${vistos.noche.size} de noche, todas distintas`);
  console.log(`   celebraciones ${año}:`, especiales.join(", "));
}

// 3) Fechas de celebraciones (Ecuador)
const f = (y, m, d) => new Date(y, m - 1, d);
ok(pascua(2026).getMonth() === 3 && pascua(2026).getDate() === 5, "Pascua 2026 = 5 de abril");
ok(pascua(2027).getMonth() === 2 && pascua(2027).getDate() === 28, "Pascua 2027 = 28 de marzo");
ok(especialDe(f(2026, 5, 10)) === "madre", "Día de la Madre 2026 = domingo 10 de mayo (2.º domingo)");
ok(especialDe(f(2027, 5, 9)) === "madre", "Día de la Madre 2027 = domingo 9 de mayo");
ok(especialDe(f(2026, 6, 21)) === "padre", "Día del Padre 2026 = domingo 21 de junio (3.er domingo)");
ok(especialDe(f(2027, 6, 20)) === "padre", "Día del Padre 2027 = domingo 20 de junio");
ok(especialDe(f(2026, 12, 24)) === "nacimiento" && especialDe(f(2026, 12, 25)) === "navidad", "24 dic = Nacimiento; 25 dic = Navidad");
ok(especialDe(f(2026, 12, 31)) === "findeano" && especialDe(f(2027, 1, 1)) === "anonuevo", "31 dic = Fin de año; 1 ene = Año Nuevo");
ok(especialDe(f(2026, 4, 3)) === "viernessanto" && especialDe(f(2026, 4, 5)) === "pascua", "Viernes Santo y Pascua 2026");
ok(especialDe(f(2026, 11, 23)) === null, "23 nov 2026 es un día normal");
for (const k of Object.keys(ESPECIALES)) ok(ESPECIALES[k].manana.oracion.length >= 2 && ESPECIALES[k].noche.oracion.length >= 2, `Celebración «${k}» tiene oración de mañana y de noche`);

// 4) Horarios
const h = (hh, mm = 0) => new Date(2026, 10, 23, hh, mm);
const t = (d) => { const e = estado(d); return `${e.periodo}/${e.que}/${e.espera}`; };
ok(t(h(0, 0)) === "manana/manana/null" && t(h(11, 59)) === "manana/manana/null", "00:00–11:59 → oración de la mañana");
ok(t(h(12, 0)).startsWith("tarde/manana/480") && t(h(16, 13)).startsWith("tarde/manana/227"), "12:00–19:59 → espera (cuenta regresiva a las 20:00)");
ok(t(h(20, 0)) === "noche/noche/null" && t(h(23, 59)) === "noche/noche/null", "20:00–23:59 → oración de la noche");

// 5) Menú: mandamientos, sacramentos, salmos y novena
ok(MANDAMIENTOS.grupos.flatMap((g) => g.items).length === 10, "Hay 10 mandamientos");
ok(SACRAMENTOS.grupos.flatMap((g) => g.items).length === 7, "Hay 7 sacramentos");
ok(new Set(SALMOS.map((x) => x.n)).size === SALMOS.length && SALMOS.every((x) => x.txt.length > 80 && x.t.length), `Salmos sin repetir y con texto (${SALMOS.length})`);
const temas = SALMOS_TEMAS.map((x) => x[0]);
ok(SALMOS.every((x) => x.t.every((t) => temas.includes(t))), "Los temas de los salmos existen en los filtros");
ok(NOVENA.dias.length === 9 && NOVENA.dias.every((d) => d.t && d.c && d.p), "La novena tiene 9 días completos");

const oraciones = ORACIONES.grupos.flatMap((g) => g.items).map((o) => o.n);
for (const n of ["Persignarse", "Padrenuestro", "Avemaría", "Gloria", "Credo", "Ángel de la Guarda", "Acto de contrición", "San Miguel", "familia", "enfermos"]) ok(oraciones.some((o) => o.includes(n)), `Oraciones católicas incluye «${n}»`);
ok(ORACIONES.grupos.flatMap((g) => g.items).every((o) => o.txt.length && o.txt.every((t) => t.length > 20)), "Todas las oraciones tienen texto");

// Guías de celebración (velada y novenario)
{
  const textos = (o) => JSON.stringify(o);
  ok(VELADA.pasos.length >= 12 && VELADA.pasos.every((p) => p.n && p.min > 0 && p.partes.length > 0), "La velada tiene todos sus pasos");
  ok(VELADA.pasos.every((p) => p.partes.every((x) => ["guia", "todos", "lector", "canto", "nota"].includes(x.r) && (typeof x.t === "string" ? x.t.length > 3 : x.t.n && x.t.v))), "Cada línea de la velada tiene rol válido y versión para Niño y Virgen");
  ok(VELADA.lecturas.n.length > 0 && VELADA.lecturas.v.length > 0, "La velada tiene lecturas para Niño y Virgen");
  ok(!/\{(?!imagen\}|pueblo\})\w+\}/.test(textos(VELADA)), "La velada solo usa las variables {imagen} y {pueblo}");
  ok(VELADA.detalle.length === VELADA.programa.length && VELADA.detalle.length === VELADA.pasos.length && VELADA.detalle.every((d) => d.hacer.length && d.ejemplo && d.alegria && d.evitar.length), "Cada punto del programa tiene su ficha (qué hacer, ejemplo, alegría y qué evitar)");
  ok(VELADA.claves.length >= 5, "La velada tiene sus claves para una noche feliz");
  ok(NOVENARIO.noches.length === 9 && NOVENARIO.noches.every((n) => n.t && n.cita && n.resumen && n.reflexion && n.oracion && n.peticion && n.obra), "El novenario tiene 9 noches completas");
  ok(new Set(NOVENARIO.noches.map((n) => n.cita)).size === 9, "Las 9 noches tienen lecturas distintas");
  ok(!/\{(?!nombre\}|lo\}|el\}|o\}|hermano\})\w+\}/.test(textos(NOVENARIO)), "El novenario solo usa variables conocidas");
}

console.log(fallos ? `\n${fallos} fallo(s)` : "\nTodo correcto");
process.exit(fallos ? 1 : 0);
