// Rosario guiado, Vía Crucis y letanías. Paso a paso, con contador de Avemarías, para dirigir con calma.
import { MISTERIOS, DIA_MISTERIOS, DIAS, LETANIA, OFRECER, VIACRUCIS, JACULATORIA, SALVE, PADRENUESTRO, AVEMARIA, GLORIA, CREDO } from "./data/rosario.js";
import { el, LS, ROLES, pestanas, botonCopiar, linea, listaPuntos } from "./guias.js";

const AM1 = AVEMARIA.split("Santa María")[0].trim();
const AM2 = "Santa María" + AVEMARIA.split("Santa María")[1];
const ORACION_FINAL = "Oremos. Oh Dios, cuyo Hijo único, con su vida, muerte y resurrección, nos alcanzó el premio de la salvación eterna, concédenos que, meditando estos misterios del Santísimo Rosario de la Virgen María, imitemos lo que contienen y alcancemos lo que prometen. Por Jesucristo, nuestro Señor. Amén.";

function lineas(parent, partes) {
  const v = [];
  for (const x of partes) parent.appendChild(linea(x, null, v));
  for (const p of v) p.textContent = p._raw;
}

// Presentador paso a paso. pasos: [{ etq, titulo, partes, nodos(parent), cuenta, cuentaEtq }]
function stepper(panel, pasos, clave) {
  let i = Math.min(Math.max(parseInt(LS.get(clave) || "0", 10) || 0, 0), pasos.length - 1);
  const marco = el("section", "card step");
  const barra = el("div", "sp-barra");
  const prog = el("div", "sp-prog"); const relleno = el("span"); prog.appendChild(relleno);
  const num = el("p", "sp-num");
  barra.append(num, prog);
  const cuerpo = el("div", "sp-cuerpo");
  const nav = el("div", "sp-nav");
  const ant = el("button", "mini", "‹ Anterior"); ant.type = "button";
  const sig = el("button", "btn", "Siguiente ›"); sig.type = "button";
  const ini = el("button", "mini", "Empezar de nuevo"); ini.type = "button";
  nav.append(ant, sig);
  marco.append(barra, cuerpo, nav);
  const ac = el("div", "acciones");
  ac.appendChild(ini);
  panel.append(marco, ac);

  const pinta = () => {
    const p = pasos[i];
    LS.set(clave, String(i));
    num.textContent = `Paso ${i + 1} de ${pasos.length}`;
    relleno.style.width = `${((i + 1) / pasos.length) * 100}%`;
    cuerpo.replaceChildren();
    if (p.etq) cuerpo.appendChild(el("p", "acc-pre", p.etq));
    cuerpo.appendChild(el("h3", "sp-tit", p.titulo));
    if (p.partes) lineas(cuerpo, p.partes);
    if (p.nodos) p.nodos(cuerpo);
    if (p.cuenta) {
      let n = 0;
      const cont = el("div", "contador");
      const num2 = el("p", "cont-num", `0 de ${p.cuenta}`);
      const b = el("button", "btn-contar", p.cuentaEtq || "Rezado ✓"); b.type = "button";
      b.addEventListener("click", () => {
        if (n < p.cuenta) n++;
        num2.textContent = `${n} de ${p.cuenta}`;
        b.classList.toggle("completo", n >= p.cuenta);
        if (n >= p.cuenta) b.textContent = "¡Completo! Toca Siguiente";
      });
      cont.append(num2, b);
      cuerpo.appendChild(cont);
    }
    ant.disabled = i === 0;
    sig.textContent = i === pasos.length - 1 ? "Terminar ✓" : "Siguiente ›";
    marco.scrollIntoView({ block: "nearest" });
  };
  ant.addEventListener("click", () => { if (i > 0) { i--; pinta(); } });
  sig.addEventListener("click", () => { if (i < pasos.length - 1) { i++; pinta(); } else { i = 0; pinta(); } });
  ini.addEventListener("click", () => { i = 0; pinta(); });
  pinta();
}

function listaLetania(parent) {
  const intro = (t) => parent.appendChild(el("p", "nota", t));
  for (const [g, t] of LETANIA.inicio) parent.appendChild(linea({ r: "guia", t: g }, null, [])).querySelector(".linea-tx").textContent = g;
  intro("Después de cada invocación, todos responden:");
  const grupo = (titulo, items, resp) => {
    parent.appendChild(el("p", "sub-etq", titulo));
    const ul = el("ul", "lista-pts"); for (const t of items) ul.appendChild(el("li", null, t)); parent.appendChild(ul);
    parent.appendChild(el("p", "resp", resp));
  };
  grupo("A Dios", LETANIA.trinidad, "Todos: Ten piedad de nosotros.");
  grupo("A la Virgen María", LETANIA.maria, "Todos: Ruega por nosotros.");
  parent.appendChild(el("p", "sub-etq", "Cordero de Dios"));
  const ul = el("ul", "lista-pts"); for (const t of LETANIA.cordero) ul.appendChild(el("li", null, t)); parent.appendChild(ul);
  parent.appendChild(el("p", "sub-etq", "Oración"));
  for (const t of LETANIA.versiculo) parent.appendChild(el("p", "salmo-txt", t));
  parent.appendChild(el("p", "salmo-txt", LETANIA.oracion));
}

function rosarioPasos(clave) {
  const M = MISTERIOS[clave];
  const pasos = [
    { etq: "Antes de empezar", titulo: "Ofrecemos el Rosario", partes: [
      { r: "guia", t: `Hoy rezamos los ${M.nombre.toLowerCase()}. Pongamos nuestras intenciones en manos de María.` },
      { r: "nota", t: "Ofrece el Rosario por alguna de estas intenciones, o por las que cada uno lleva en el corazón:" }
    ], nodos: (c) => c.appendChild(listaPuntos(OFRECER)) },
    { etq: "Inicio", titulo: "Señal de la cruz y Credo", partes: [
      { r: "guia", t: "Por la señal de la santa cruz, de nuestros enemigos líbranos, Señor, Dios nuestro. En el nombre del Padre, y del Hijo, y del Espíritu Santo." },
      { r: "todos", t: "Amén." },
      { r: "todos", t: CREDO }
    ]},
    { etq: "Inicio", titulo: "Padrenuestro", partes: [{ r: "todos", t: PADRENUESTRO }] },
    { etq: "Inicio", titulo: "Tres Avemarías", partes: [
      { r: "nota", t: "Por el aumento de la fe, de la esperanza y de la caridad." },
      { r: "guia", t: AM1 }, { r: "todos", t: AM2 }
    ], cuenta: 3, cuentaEtq: "Avemaría rezada ✓" },
    { etq: "Inicio", titulo: "Gloria", partes: [{ r: "todos", t: GLORIA }] }
  ];
  M.lista.forEach(([nombre, cita, fruto, med], k) => {
    const ord = ["Primer", "Segundo", "Tercer", "Cuarto", "Quinto"][k];
    pasos.push({ etq: `${M.nombre} · ${k + 1} de 5`, titulo: `${ord} misterio: ${nombre}`, partes: [
      { r: "guia", t: `${ord} misterio: ${nombre}.` },
      { r: "nota", t: `Texto bíblico: ${cita}. Fruto del misterio: ${fruto}.` },
      { r: "guia", t: med },
      { r: "nota", t: "Haz un breve silencio para meditar." }
    ]});
    pasos.push({ etq: `${k + 1}.º misterio`, titulo: "Padrenuestro", partes: [{ r: "todos", t: PADRENUESTRO }] });
    pasos.push({ etq: `${k + 1}.º misterio`, titulo: "Diez Avemarías", partes: [{ r: "guia", t: AM1 }, { r: "todos", t: AM2 }], cuenta: 10, cuentaEtq: "Avemaría rezada ✓" });
    pasos.push({ etq: `${k + 1}.º misterio`, titulo: "Gloria y jaculatoria", partes: [{ r: "todos", t: GLORIA }, { r: "todos", t: JACULATORIA }] });
  });
  pasos.push({ etq: "Final", titulo: "Salve", partes: [{ r: "todos", t: SALVE }] });
  pasos.push({ etq: "Final", titulo: "Letanía de la Virgen (opcional)", nodos: listaLetania });
  pasos.push({ etq: "Final", titulo: "Oración final", partes: [{ r: "guia", t: ORACION_FINAL }, { r: "guia", t: "Que el Señor nos bendiga, nos guarde de todo mal y nos lleve a la vida eterna." }, { r: "todos", t: "Amén." }] });
  return pasos;
}

function viaCrucisPasos() {
  const V = VIACRUCIS;
  const pasos = [{ etq: "Inicio", titulo: "Comenzamos el Vía Crucis", partes: V.inicio }];
  V.estaciones.forEach(([tit, med], k) => {
    pasos.push({ etq: `Estación ${k + 1} de 14`, titulo: tit, partes: [
      ...V.responsorio,
      { r: "guia", t: `${k + 1}.ª estación: ${tit}.` },
      { r: "guia", t: med },
      { r: "nota", t: "Se reza un Padrenuestro, un Avemaría y un Gloria. Se hace un breve silencio y se pasa a la siguiente estación." },
      { r: "todos", t: "Señor, ten piedad de nosotros." }
    ]});
  });
  pasos.push({ etq: "Final", titulo: "Oración final", partes: V.final });
  return pasos;
}

export function dibujaRosario(c, ctx = {}) {
  const hoy = ctx.hoy ? ctx.hoy() : new Date();
  const dow = hoy.getDay();
  let clave = LS.get("rosario_clave");
  if (!MISTERIOS[clave]) clave = DIA_MISTERIOS[dow];

  const intro = el("section", "card card-intro");
  intro.appendChild(el("p", "intro-txt", "Para rezar con calma, solo o dirigiendo a otros. Cada paso te muestra qué decir; en las decenas, toca el botón por cada Avemaría para no perder la cuenta. Funciona sin conexión."));

  const sel = el("section", "card cfg");
  sel.appendChild(el("h4", "paso-etq", "Misterios"));
  const chips = el("div", "cfg-chips");
  const botones = {};
  for (const k of Object.keys(MISTERIOS)) {
    const b = el("button", "mini", MISTERIOS[k].nombre.replace("Misterios ", "").replace(/^./, (x) => x.toUpperCase())); b.type = "button";
    b.addEventListener("click", () => { clave = k; LS.set("rosario_clave", k); LS.set("rosario_pos_" + k, "0"); marca(); bar.barra.querySelector('[data-id="rosario"]').click(); });
    botones[k] = b; chips.appendChild(b);
  }
  const pista = el("p", "cfg-pista");
  sel.append(chips, pista);
  const marca = () => {
    for (const k in botones) { botones[k].classList.toggle("fuerte", k === clave); botones[k].setAttribute("aria-pressed", k === clave); }
    pista.textContent = `Hoy es ${DIAS[dow]}: se rezan los misterios ${DIA_MISTERIOS[dow]}. (${MISTERIOS[clave].nombre}: ${MISTERIOS[clave].dias}.) En los domingos de Adviento y Navidad se suelen rezar los gozosos, y en los de Cuaresma, los dolorosos.`;
  };

  const bar = pestanas([["rosario", "Rosario"], ["via", "Vía Crucis"], ["letania", "Letanías y Salve"]], "rosario", (id, panel) => {
    if (id === "rosario") { panel.appendChild(sel); marca(); stepper(panel, rosarioPasos(clave), "rosario_pos_" + clave); }
    else if (id === "via") {
      const n = el("section", "card card-intro");
      n.appendChild(el("p", "intro-txt", "Catorce estaciones para acompañar a Jesús en su camino a la cruz. Es una oración muy propia de la Cuaresma y de los viernes, y la puede dirigir cualquier laico."));
      panel.appendChild(n);
      stepper(panel, viaCrucisPasos(), "viacrucis_pos");
    } else {
      const s = el("section", "card");
      s.appendChild(el("h4", "paso-etq", "Salve (texto tradicional)"));
      for (const t of SALVE.split("\n\n")) s.appendChild(el("p", "salmo-txt", t));
      s.appendChild(el("div", "acciones")).appendChild(botonCopiar(() => SALVE, "Copiar la Salve"));
      panel.appendChild(s);
      const l = el("section", "card");
      l.appendChild(el("h4", "paso-etq", "Letanía de la Virgen (Lauretana)"));
      listaLetania(l);
      panel.appendChild(l);
    }
  });
  c.append(intro, bar.barra, bar.panel);
  bar.ir();
}
