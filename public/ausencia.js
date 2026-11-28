// «Sin sacerdote: guía para laicos». Herramientas para catequistas y personas que dirigen la oración
// cuando el párroco no está. Los datos (parroquia, teléfono, nombre, lecturas) se guardan solo en este teléfono.
import { AUSENCIA } from "./data/ausencia.js";
import { el, LS, chevron, ROLES, pestanas, botonCopiar, linea, checklist, listaPuntos } from "./guias.js";
import { pascua } from "./motor.js";

const DIA = 86400000;
const MESES = ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"];
const ORD = ["", "primer", "segundo", "tercer", "cuarto", "quinto", "sexto", "séptimo", "octavo"];
const fechaLarga = (d) => `${["domingo", "lunes", "martes", "miércoles", "jueves", "viernes", "sábado"][d.getDay()]} ${d.getDate()} de ${MESES[d.getMonth()]} de ${d.getFullYear()}`;
const dia0 = (d) => new Date(d.getFullYear(), d.getMonth(), d.getDate());
const suma = (d, n) => new Date(d.getFullYear(), d.getMonth(), d.getDate() + n);
const dif = (a, b) => Math.round((dia0(a) - dia0(b)) / DIA);

// ---------- Calendario litúrgico (domingo que corresponde) ----------
function adviento(y) {
  const d24 = new Date(y, 11, 24);
  return suma(suma(d24, -d24.getDay()), -21); // primer domingo de Adviento
}
function domingoSiguiente(d) { const x = dia0(d); return suma(x, (7 - x.getDay()) % 7); }

export function domingoLiturgico(d) {
  const s = dia0(d);
  const y = s.getFullYear();
  const adv = adviento(y);
  const ly = s >= adv ? y : y - 1;
  const ciclo = ["A", "B", "C"][ly % 3];
  const P = pascua(y);
  const cenizas = suma(P, -46);
  const ramos = suma(P, -7);
  const pentecostes = suma(P, 49);
  const cristoRey = suma(adv, -7);
  let nombre, color;
  if (s >= adv) {
    if (s < new Date(y, 11, 25)) {
      const n = dif(s, adv) / 7 + 1;
      nombre = `${ORD[n]} domingo de Adviento`;
      color = n === 3 ? "Rosa" : "Morado";
    } else { nombre = "domingo de Navidad (Sagrada Familia)"; color = "Blanco"; }
  } else if (s < cenizas) {
    const enero = (d) => new Date(y, 0, d);
    let e = enero(2); e = suma(e, -e.getDay() + (e.getDay() === 0 ? 0 : 7)); // domingo entre el 2 y el 8 de enero
    if (e.getDate() > 8) e = suma(e, -7);
    if (s.getMonth() === 0 && s <= e) { nombre = s.getTime() === e.getTime() ? "Epifanía del Señor" : "domingo del tiempo de Navidad"; color = "Blanco"; }
    else {
      const b0 = e.getDate() >= 7 ? e : suma(e, 7);
      if (s.getTime() === b0.getTime() && e.getDate() < 7) { nombre = "Bautismo del Señor"; color = "Blanco"; }
      else { const n = 1 + dif(s, b0) / 7; nombre = `${n}.º domingo del Tiempo Ordinario`; color = "Verde"; }
    }
  } else if (s < ramos) {
    const n = dif(s, suma(P, -42)) / 7 + 1;
    nombre = `${ORD[n]} domingo de Cuaresma`; color = n === 4 ? "Rosa" : "Morado";
  } else if (s.getTime() === ramos.getTime()) { nombre = "Domingo de Ramos"; color = "Rojo"; }
  else if (s.getTime() === P.getTime()) { nombre = "Domingo de Pascua de la Resurrección"; color = "Blanco"; }
  else if (s < pentecostes) { const n = dif(s, P) / 7 + 1; nombre = `${ORD[n]} domingo de Pascua`; color = "Blanco"; }
  else if (s.getTime() === pentecostes.getTime()) { nombre = "Domingo de Pentecostés"; color = "Rojo"; }
  else if (s.getTime() === suma(P, 56).getTime()) { nombre = "Santísima Trinidad"; color = "Blanco"; }
  else if (s.getTime() === cristoRey.getTime()) { nombre = "Nuestro Señor Jesucristo, Rey del Universo"; color = "Blanco"; }
  else { const n = 34 - dif(cristoRey, s) / 7; nombre = `${n}.º domingo del Tiempo Ordinario`; color = "Verde"; }
  return { fecha: s, nombre, ciclo, color };
}

// Cómo se dice en voz alta: «el primer domingo de Adviento», «la solemnidad de…»
function dicho(n) {
  if (/^Santísima|^Nuestro Señor|^Epifanía/.test(n)) return "la solemnidad de " + (/^Santísima/.test(n) ? "la " : "") + n;
  if (/^Bautismo/.test(n)) return "la fiesta del " + n;
  return "el " + n;
}
const telLimpio = (t) => (t || "").replace(/[^\d+]/g, "");

// Sustituye los datos de la persona y de la celebración en los textos
function creaSub(datos) {
  return (t) => {
    if (t == null) return "";
    const f = datos.sexo === "f";
    const nombre = (datos.nombre || "").trim() || (f ? "nuestra hermana" : "nuestro hermano");
    const hueco = (v, txt) => (v && v.trim() ? v.trim() : txt);
    return t
      .replace(/\{nombre\}/g, nombre)
      .replace(/\{el\}/g, f ? "ella" : "él")
      .replace(/\{o\}/g, f ? "a" : "o")
      .replace(/\{lo\}/g, f ? "la" : "lo")
      .replace(/\{hijo\}/g, f ? "hija" : "hijo")
      .replace(/\{domingo\}/g, datos.domingo || "domingo")
      .replace(/\{lec1\}/g, hueco(datos.lec1, "(Aquí se lee la primera lectura del domingo. Escríbela o pégala en la pestaña «Domingo sin Misa» → «Lecturas».)"))
      .replace(/\{salmo\}/g, hueco(datos.salmo, "(Aquí se reza el salmo responsorial del domingo, con su estribillo.)"))
      .replace(/\{lec2\}/g, hueco(datos.lec2, "(Aquí se lee la segunda lectura del domingo, si la hay.)"))
      .replace(/\{evangelio\}/g, hueco(datos.evangelio, "(Aquí se proclama el Evangelio del domingo.)"))
      .replace(/\{reflexion\}/g, hueco(datos.reflexion, "(Aquí se lee la homilía o reflexión que dejó el párroco. Si no hay, usa la guía de preguntas de abajo.)"))
      .replace(/\{lectura\}/g, hueco(datos.lectura, "(Aquí se lee el texto bíblico elegido. Puedes escribirlo o pegarlo arriba.)"));
  };
}

// Lista de pasos con rol (guía/todos/lector/canto/nota) en desplegables
function pasosAcordeon(lista, sub, vivos, { copiar, extra } = {}) {
  const cont = el("div", "grupo");
  lista.forEach((p, i) => {
    const d = el("details", "card acordeon");
    const sm = el("summary");
    const tit = el("span", "acc-tit");
    tit.append(el("small", "acc-pre", `Paso ${i + 1} · ${p.min} min`), document.createTextNode(p.n));
    sm.append(el("span", "num", String(i + 1)), tit, chevron());
    d.appendChild(sm);
    const cu = el("div", "acc-cu acc-cu-ancho");
    const partes = typeof p.partes === "function" ? p.partes() : p.partes;
    for (const x of partes) cu.appendChild(linea(x, sub, vivos));
    if (extra) extra(p, cu);
    const texto = () => `${i + 1}. ${p.n}\n\n` + (typeof p.partes === "function" ? p.partes() : p.partes).map((x) => (x.r === "nota" ? `(${sub(x.t)})` : `${ROLES[x.r]}: ${sub(x.t)}`)).join("\n\n");
    cu.appendChild(el("div", "acciones")).appendChild(botonCopiar(texto, "Copiar este paso"));
    d.appendChild(cu);
    cont.appendChild(d);
  });
  return cont;
}
const textoCompleto = (lista, sub) => lista.map((p, i) => `${i + 1}. ${p.n}\n\n` + (typeof p.partes === "function" ? p.partes() : p.partes).map((x) => (x.r === "nota" ? `(${sub(x.t)})` : `${ROLES[x.r]}: ${sub(x.t)}`)).join("\n\n")).join("\n\n———\n\n");

// =====================================================================
export function dibujaAusencia(c, ctx = {}) {
  const hoy = () => (ctx.hoy ? ctx.hoy() : new Date());
  const datos = {
    nombre: LS.get("ausencia_nombre") || "", sexo: LS.get("ausencia_sexo") === "f" ? "f" : "m",
    lec1: LS.get("ausencia_lec1") || "", salmo: LS.get("ausencia_salmo") || "", lec2: LS.get("ausencia_lec2") || "",
    evangelio: LS.get("ausencia_evangelio") || "", reflexion: LS.get("ausencia_reflexion") || "", lectura: LS.get("ausencia_lectura") || "",
    domingo: "", comunion: LS.get("ausencia_comunion") === "1"
  };
  const sub = creaSub(datos);
  let vivos = [];
  const refrescar = () => { vivos = vivos.filter((p) => p.isConnected); for (const p of vivos) p.textContent = sub(p._raw); };

  // --- intro + parroquia ---
  const intro = el("section", "card card-intro");
  intro.appendChild(el("p", "intro-txt", AUSENCIA.intro));
  const par = el("section", "card cfg");
  par.appendChild(el("h4", "paso-etq", "Mi parroquia"));
  const inPar = el("input", "campo-txt"); inPar.type = "text"; inPar.maxLength = 80; inPar.autocomplete = "off"; inPar.placeholder = "Parroquia y nombre del párroco (opcional)"; inPar.value = LS.get("parroco_nombre") || "";
  const inTel = el("input", "campo-txt"); inTel.type = "tel"; inTel.inputMode = "tel"; inTel.maxLength = 24; inTel.autocomplete = "off"; inTel.placeholder = "Teléfono del párroco (para llamarlo rápido)"; inTel.value = LS.get("parroco_tel") || "";
  const llamar = el("a", "btn btn-llamar", "Llamar al párroco");
  const pistaTel = el("p", "cfg-pista", "Se guarda solo en este teléfono. Úsalo en emergencias o cuando necesites una autorización.");
  const marcaTel = () => { const t = telLimpio(inTel.value); llamar.hidden = !t; if (t) llamar.href = "tel:" + t; };
  inPar.addEventListener("input", () => LS.set("parroco_nombre", inPar.value));
  inTel.addEventListener("input", () => { LS.set("parroco_tel", inTel.value); marcaTel(); });
  par.append(inPar, inTel, llamar, pistaTel);
  marcaTel();

  const bar = pestanas(
    [["limites", "Qué puedo hacer"], ["domingo", "Domingo sin Misa"], ["emergencias", "Emergencias"], ["velorio", "Velorio y sepultura"], ["enfermos", "Enfermos"]],
    "limites",
    (id, panel) => {
      vivos = [];
      ({ limites: pintaLimites, domingo: pintaDomingo, emergencias: pintaEmergencias, velorio: pintaVelorio, enfermos: pintaEnfermos })[id](panel);
      refrescar();
    }
  );
  c.append(intro, par, bar.barra, bar.panel);
  bar.ir();

  // Datos de la persona (nombre, él/ella)
  function tarjetaPersona(panel, etq) {
    const cfg = el("section", "card cfg");
    cfg.appendChild(el("h4", "paso-etq", etq));
    const chips = el("div", "cfg-chips");
    const bm = el("button", "mini", "Él"); bm.type = "button";
    const bf = el("button", "mini", "Ella"); bf.type = "button";
    chips.append(bm, bf);
    const inN = el("input", "campo-txt"); inN.type = "text"; inN.maxLength = 60; inN.autocomplete = "off"; inN.placeholder = "Nombre (opcional)"; inN.value = datos.nombre;
    const marca = () => { bm.classList.toggle("fuerte", datos.sexo === "m"); bf.classList.toggle("fuerte", datos.sexo === "f"); bm.setAttribute("aria-pressed", datos.sexo === "m"); bf.setAttribute("aria-pressed", datos.sexo === "f"); };
    const poner = (s) => { datos.sexo = s; LS.set("ausencia_sexo", s); marca(); refrescar(); };
    bm.addEventListener("click", () => poner("m"));
    bf.addEventListener("click", () => poner("f"));
    inN.addEventListener("input", () => { datos.nombre = inN.value; LS.set("ausencia_nombre", datos.nombre); refrescar(); });
    cfg.append(chips, inN, el("p", "cfg-pista", "Las oraciones se adaptan al nombre y al género. Se guarda solo en este teléfono."));
    marca();
    panel.appendChild(cfg);
  }

  // Campo para pegar el texto bíblico elegido
  function campoLectura(panel, etq) {
    const cfg = el("section", "card cfg");
    cfg.appendChild(el("h4", "paso-etq", etq));
    const ta = el("textarea", "campo-txt campo-area"); ta.rows = 4; ta.placeholder = "Escribe o pega aquí el texto bíblico elegido (opcional)"; ta.value = datos.lectura;
    ta.addEventListener("input", () => { datos.lectura = ta.value; LS.set("ausencia_lectura", ta.value); refrescar(); });
    cfg.append(ta, el("p", "cfg-pista", "Lee de tu Biblia o leccionario. Así el texto aparece en su sitio dentro del guion."));
    panel.appendChild(cfg);
  }

  // ---------- Qué puedo hacer ----------
  function pintaLimites(panel) {
    const L = AUSENCIA.limites;
    const card = el("section", "card card-intro");
    card.appendChild(el("h4", "paso-etq", L.titulo));
    const a = el("div", "dos"); a.append(el("p", "dos-tit si", "Sí puedes"), listaPuntos(L.puede));
    const b = el("div", "dos"); b.append(el("p", "dos-tit no", "No puedes"), listaPuntos(L.nopuede));
    card.append(a, b);
    panel.appendChild(card);
    const ll = el("section", "card");
    ll.appendChild(el("h4", "paso-etq", "Llama al sacerdote cuando…"));
    ll.appendChild(listaPuntos(L.llamar));
    panel.appendChild(ll);
    const an = el("section", "card");
    an.appendChild(el("h4", "paso-etq", "Antes de dirigir"));
    an.appendChild(listaPuntos(L.antes));
    panel.appendChild(an);
  }

  // ---------- Domingo sin Misa ----------
  function pintaDomingo(panel) {
    const P = AUSENCIA.palabra;
    panel.appendChild(Object.assign(el("section", "card card-intro"), {})).appendChild(el("p", "intro-txt", P.intro));

    // Qué domingo es
    const cal = el("section", "card cfg");
    cal.appendChild(el("h4", "paso-etq", "¿Qué domingo celebras?"));
    const inF = el("input", "campo-txt"); inF.type = "date";
    const fmt = (d) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
    const guardada = LS.get("ausencia_fecha");
    inF.value = guardada && /^\d{4}-\d{2}-\d{2}$/.test(guardada) && new Date(guardada + "T12:00:00") >= suma(dia0(hoy()), -1) ? guardada : fmt(domingoSiguiente(hoy()));
    const res = el("p", "dom-res");
    const col = el("p", "cfg-pista");
    const calcula = () => {
      let f = new Date(inF.value + "T12:00:00");
      if (isNaN(f)) { res.textContent = ""; col.textContent = ""; datos.domingo = ""; return; }
      if (f.getDay() !== 0) { f = domingoSiguiente(f); inF.value = fmt(f); }
      const dl = domingoLiturgico(f);
      res.textContent = `${dl.nombre.charAt(0).toUpperCase() + dl.nombre.slice(1)} · ciclo ${dl.ciclo}`;
      col.textContent = `${fechaLarga(f)} · color litúrgico: ${dl.color}. Comprueba la fecha en el calendario de tu diócesis.`;
      datos.domingo = dicho(dl.nombre);
      refrescar();
    };
    inF.addEventListener("input", () => { LS.set("ausencia_fecha", inF.value); calcula(); });
    cal.append(inF, res, col);
    panel.appendChild(cal);
    calcula();

    // Lecturas
    const lec = el("section", "card cfg");
    lec.appendChild(el("h4", "paso-etq", "Lecturas del domingo"));
    lec.appendChild(el("p", "cfg-pista", "Busca las lecturas en tu leccionario, en la hoja que te dé la parroquia o en una fuente oficial. Escríbelas o pégalas aquí para que salgan en su lugar dentro del guion."));
    const web = el("a", "mini", "Abrir lecturas del día (Vatican News)");
    web.href = "https://www.vaticannews.va/es/evangelio-de-hoy.html"; web.target = "_blank"; web.rel = "noopener noreferrer";
    lec.appendChild(el("div", "acciones")).appendChild(web);
    for (const [k, etq] of [["lec1", "Primera lectura"], ["salmo", "Salmo responsorial"], ["lec2", "Segunda lectura (si hay)"], ["evangelio", "Evangelio"], ["reflexion", "Homilía o reflexión del párroco (si la dejó)"]]) {
      lec.appendChild(el("label", "form-etq", etq));
      const ta = el("textarea", "campo-txt campo-area"); ta.rows = 3; ta.value = datos[k];
      ta.addEventListener("input", () => { datos[k] = ta.value; LS.set("ausencia_" + k, ta.value); refrescar(); });
      lec.appendChild(ta);
    }
    const limp = el("button", "mini peligro", "Borrar las lecturas"); limp.type = "button";
    let seguro = false;
    limp.addEventListener("click", () => {
      if (!seguro) { seguro = true; limp.textContent = "Toca otra vez para borrar"; setTimeout(() => { seguro = false; limp.textContent = "Borrar las lecturas"; }, 3000); return; }
      for (const k of ["lec1", "salmo", "lec2", "evangelio", "reflexion"]) { datos[k] = ""; LS.set("ausencia_" + k, ""); }
      bar.barra.querySelector('[data-id="domingo"]').click();
    });
    lec.appendChild(el("div", "acciones")).appendChild(limp);
    panel.appendChild(lec);

    panel.appendChild(el("h3", "grupo-tit", "Preparación (marca lo que ya tienes)"));
    checklist(P.preparacion, "ausencia_chk_palabra", panel);

    // Comunión
    const com = el("section", "card cfg");
    com.appendChild(el("h4", "paso-etq", "¿Habrá Comunión?"));
    const chips = el("div", "cfg-chips");
    const bNo = el("button", "mini", "No (comunión espiritual)"); bNo.type = "button";
    const bSi = el("button", "mini", "Sí, con ministro autorizado"); bSi.type = "button";
    chips.append(bNo, bSi);
    const aviso = el("p", "cfg-pista");
    const marcaCom = () => {
      bNo.classList.toggle("fuerte", !datos.comunion); bSi.classList.toggle("fuerte", datos.comunion);
      bNo.setAttribute("aria-pressed", !datos.comunion); bSi.setAttribute("aria-pressed", datos.comunion);
      aviso.textContent = datos.comunion ? P.comunionSi.aviso : P.comunionNo.aviso;
    };
    com.append(chips, aviso);
    panel.appendChild(com);
    marcaCom();

    // Guion
    const cab = el("section", "card card-intro");
    cab.appendChild(el("h4", "paso-etq", "Guion de la celebración"));
    cab.appendChild(el("p", "intro-txt", "Toca un paso para abrirlo (se abre uno a la vez). Lo marcado como Guía, Todos o Lector se dice en voz alta; las notas son indicaciones para ti."));
    const acc = el("div", "acciones");
    cab.appendChild(acc);
    panel.appendChild(cab);
    const holder = el("div");
    panel.appendChild(holder);
    const pintaGuion = () => {
      const lista = P.pasos.map((p) => (p.comunion ? { ...p, n: datos.comunion ? "Comunión" : "Comunión espiritual", partes: () => (datos.comunion ? P.comunionSi.partes : P.comunionNo.partes) } : p));
      holder.replaceChildren(pasosAcordeon(lista, sub, vivos));
      acc.replaceChildren(botonCopiar(() => textoCompleto(lista, sub), "Copiar el guion completo"));
      refrescar();
    };
    bNo.addEventListener("click", () => { datos.comunion = false; LS.set("ausencia_comunion", "0"); marcaCom(); pintaGuion(); });
    bSi.addEventListener("click", () => { datos.comunion = true; LS.set("ausencia_comunion", "1"); marcaCom(); pintaGuion(); });
    pintaGuion();

    // Guía de reflexión
    const R = P.reflexion;
    const r = el("section", "card");
    r.appendChild(el("h4", "paso-etq", R.titulo));
    r.appendChild(el("p", "nota", R.nota));
    const ol = el("ol", "lista-pts");
    for (const q of R.preguntas) ol.appendChild(el("li", null, q));
    r.appendChild(ol);
    r.appendChild(el("p", "sub-etq", "Para empezar con tus palabras"));
    r.appendChild(el("p", "salmo-txt", R.modelo));
    panel.appendChild(r);
  }

  // ---------- Emergencias ----------
  function pintaEmergencias(panel) {
    const E = AUSENCIA.emergencias;
    const top = el("section", "card card-intro urgente");
    top.appendChild(el("h4", "paso-etq", "Lo primero"));
    top.appendChild(el("p", "intro-txt", E.intro));
    const ol = el("ol", "lista-pts");
    for (const t of E.orden) ol.appendChild(el("li", null, t));
    top.appendChild(ol);
    const tel = telLimpio(inTel.value);
    if (tel) { const a = el("a", "btn btn-llamar", "Llamar al párroco"); a.href = "tel:" + tel; top.appendChild(el("div", "acciones")).appendChild(a); }
    else top.appendChild(el("p", "cfg-pista", "Guarda el teléfono del párroco arriba, en «Mi parroquia», para llamarlo con un solo toque."));
    panel.appendChild(top);

    tarjetaPersona(panel, "Persona (opcional)");

    // Bautismo
    const B = E.bautismo;
    const bd = el("details", "card acordeon");
    const sm = el("summary");
    const tit = el("span", "acc-tit"); tit.append(el("small", "acc-pre", "Cualquiera puede hacerlo"), document.createTextNode(B.titulo));
    sm.append(el("span", "num", "1"), tit, chevron());
    bd.appendChild(sm);
    const cu = el("div", "acc-cu acc-cu-ancho");
    cu.appendChild(el("h5", "ficha-etq", "Quién y cuándo")); cu.appendChild(listaPuntos(B.quien));
    cu.appendChild(el("h5", "ficha-etq", "Cómo se hace"));
    const ol2 = el("ol", "lista-pts"); for (const t of B.pasos) ol2.appendChild(el("li", null, t));
    cu.appendChild(ol2);
    cu.appendChild(el("p", "nota", B.despues));
    const f = el("div", "formula");
    f.appendChild(el("b", null, "Fórmula"));
    const fp = el("p", null); fp._raw = "«{nombre}, yo te bautizo en el nombre del Padre, y del Hijo, y del Espíritu Santo.»"; vivos.push(fp); f.appendChild(fp);
    cu.appendChild(f);
    cu.appendChild(el("div", "acciones")).appendChild(botonCopiar(() => `${B.titulo}\n\n` + B.quien.join("\n") + "\n\n" + B.pasos.map((t, i) => `${i + 1}. ${t}`).join("\n") + `\n\n${B.despues}`, "Copiar instrucciones"));
    bd.appendChild(cu);
    panel.appendChild(bd);

    // Moribundo
    const M = E.moribundo;
    const md = el("details", "card acordeon");
    const sm2 = el("summary");
    const tit2 = el("span", "acc-tit"); tit2.append(el("small", "acc-pre", "Con calma y ternura"), document.createTextNode(M.titulo));
    sm2.append(el("span", "num", "2"), tit2, chevron());
    md.appendChild(sm2);
    const cu2 = el("div", "acc-cu acc-cu-ancho");
    cu2.appendChild(el("h5", "ficha-etq", "Cómo acompañar")); cu2.appendChild(listaPuntos(M.consejos));
    cu2.appendChild(el("h5", "ficha-etq", "Oración de encomendación"));
    for (const x of M.oraciones) cu2.appendChild(linea(x, sub, vivos));
    cu2.appendChild(el("h5", "ficha-etq", "Cuando fallece"));
    for (const x of M.alMorir) cu2.appendChild(linea(x, sub, vivos));
    const t2 = () => [...M.oraciones, ...M.alMorir].map((x) => (x.r === "nota" ? `(${sub(x.t)})` : `${ROLES[x.r]}: ${sub(x.t)}`)).join("\n\n");
    cu2.appendChild(el("div", "acciones")).appendChild(botonCopiar(t2, "Copiar oraciones"));
    md.appendChild(cu2);
    panel.appendChild(md);

    // Confesión
    const C = E.confesion;
    const cd = el("details", "card acordeon");
    const sm3 = el("summary");
    const tit3 = el("span", "acc-tit"); tit3.append(el("small", "acc-pre", "No puedes absolver"), document.createTextNode(C.titulo));
    sm3.append(el("span", "num", "3"), tit3, chevron());
    cd.appendChild(sm3);
    const cu3 = el("div", "acc-cu acc-cu-ancho");
    cu3.appendChild(listaPuntos(C.puntos));
    cu3.appendChild(el("h5", "ficha-etq", "Acto de contrición"));
    cu3.appendChild(el("p", "salmo-txt", C.acto));
    cu3.appendChild(el("div", "acciones")).appendChild(botonCopiar(() => C.acto, "Copiar la oración"));
    cd.appendChild(cu3);
    panel.appendChild(cd);
  }

  // ---------- Velorio y sepultura ----------
  function pintaVelorio(panel) {
    const V = AUSENCIA.velorio;
    panel.appendChild(el("section", "card card-intro")).appendChild(el("p", "intro-txt", V.intro));
    tarjetaPersona(panel, "El difunto o la difunta");
    campoLectura(panel, "Lectura para el velorio");
    const cs = el("section", "card");
    cs.appendChild(el("h4", "paso-etq", "Consejos"));
    cs.appendChild(listaPuntos(V.consejos));
    if (ctx.ir) { const b = el("button", "mini", "Ir al Novenario por un difunto"); b.type = "button"; b.addEventListener("click", () => ctx.ir("novenario")); cs.appendChild(el("div", "acciones")).appendChild(b); }
    panel.appendChild(cs);

    panel.appendChild(el("h3", "grupo-tit", "Oración en el velorio · unos 20 minutos"));
    const bar1 = el("div", "acciones");
    bar1.appendChild(botonCopiar(() => textoCompleto(V.oracion, sub), "Copiar toda la oración"));
    panel.appendChild(bar1);
    panel.appendChild(pasosAcordeon(V.oracion, sub, vivos));

    panel.appendChild(el("h3", "grupo-tit", "Despedida en el cementerio"));
    const bar2 = el("div", "acciones");
    bar2.appendChild(botonCopiar(() => textoCompleto(V.sepultura, sub), "Copiar toda la despedida"));
    panel.appendChild(bar2);
    panel.appendChild(pasosAcordeon(V.sepultura, sub, vivos));
  }

  // ---------- Enfermos ----------
  function pintaEnfermos(panel) {
    const E = AUSENCIA.enfermos;
    panel.appendChild(el("section", "card card-intro")).appendChild(el("p", "intro-txt", E.intro));
    tarjetaPersona(panel, "La persona enferma");
    campoLectura(panel, "Lectura para la visita");
    panel.appendChild(el("h3", "grupo-tit", "Qué llevar y cómo ir"));
    const ll = el("section", "card"); ll.appendChild(el("h4", "paso-etq", "Qué llevar")); ll.appendChild(listaPuntos(E.llevar)); panel.appendChild(ll);
    const cs = el("section", "card"); cs.appendChild(el("h4", "paso-etq", "Consejos para la visita")); cs.appendChild(listaPuntos(E.consejos)); panel.appendChild(cs);

    panel.appendChild(el("h3", "grupo-tit", "Oración con el enfermo · unos 10 minutos"));
    const b = el("div", "acciones"); b.appendChild(botonCopiar(() => textoCompleto(E.visita, sub), "Copiar toda la oración"));
    panel.appendChild(b);
    panel.appendChild(pasosAcordeon(E.visita, sub, vivos));

    const C = E.comunion;
    const cc = el("section", "card card-intro");
    cc.appendChild(el("h4", "paso-etq", C.titulo));
    cc.appendChild(listaPuntos(C.puntos));
    panel.appendChild(cc);
  }
}
