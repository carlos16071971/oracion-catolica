// Guías de celebración: Velada al Niño Dios / Virgen patrona y Novenario por un familiar difunto.
// Los datos personales (nombre del difunto, de la imagen, del pueblo, progreso) se guardan solo en este dispositivo.
import { VELADA, NOVENARIO } from "./data/guias.js";

const el = (tag, cls, txt) => { const e = document.createElement(tag); if (cls) e.className = cls; if (txt != null) e.textContent = txt; return e; };
const LS = {
  get: (k) => { try { return localStorage.getItem(k); } catch (_) { return null; } },
  set: (k, v) => { try { localStorage.setItem(k, v); } catch (_) {} },
  del: (k) => { try { localStorage.removeItem(k); } catch (_) {} }
};
const leerJSON = (k, def) => { try { const v = JSON.parse(LS.get(k)); return v == null ? def : v; } catch (_) { return def; } };
function chevron() {
  const s = el("span", "chev");
  s.innerHTML = `<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M6 9l6 6 6-6"/></svg>`;
  return s;
}

const ROLES = { guia: "Guía", todos: "Todos", lector: "Lector", canto: "Canto", nota: "Nota" };

// Pestañas como las de Salmos (filtros). Devuelve { barra, panel, ir }.
function pestanas(lista, inicial, pintar) {
  const barra = el("div", "filtros");
  barra.setAttribute("role", "tablist");
  const panel = el("div", "gpanel");
  const ir = (id) => {
    for (const b of barra.children) { const on = b.dataset.id === id; b.classList.toggle("activo", on); b.setAttribute("aria-selected", on); }
    panel.replaceChildren();
    pintar(id, panel);
  };
  for (const [id, nombre] of lista) {
    const b = el("button", "filtro", nombre);
    b.type = "button"; b.dataset.id = id; b.setAttribute("role", "tab");
    b.addEventListener("click", () => { ir(id); barra.scrollIntoView({ block: "nearest" }); });
    barra.appendChild(b);
  }
  return { barra, panel, ir: () => ir(inicial) };
}

function botonCopiar(obtener, etq = "Copiar") {
  const b = el("button", "mini", etq);
  b.type = "button";
  b.addEventListener("click", async () => {
    try { await navigator.clipboard.writeText(obtener()); b.textContent = "¡Copiado!"; } catch (_) { b.textContent = "No se pudo copiar"; }
    setTimeout(() => { b.textContent = etq; }, 2000);
  });
  return b;
}

// Línea con rol (Guía / Todos / Lector / Canto / Nota). Su texto se actualiza con los datos de la persona.
function linea(parte, resolver, vivos) {
  const d = el("div", `linea rol-${parte.r}`);
  if (parte.r !== "nota") d.appendChild(el("span", "rol", ROLES[parte.r]));
  const p = el("p", "linea-tx");
  p._raw = parte.t;
  vivos.push(p);
  d.appendChild(p);
  return d;
}

function checklist(grupos, clave, contenedor) {
  const hechos = new Set(leerJSON(clave, []));
  const guardar = () => LS.set(clave, JSON.stringify([...hechos]));
  grupos.forEach((g, gi) => {
    const sec = el("section", "card");
    const total = g.items.length;
    const cab = el("h4", "paso-etq", g.titulo);
    const cuenta = el("span", "cuenta");
    cab.appendChild(cuenta);
    sec.appendChild(cab);
    const ul = el("div", "chk-lista");
    const actualizar = () => { cuenta.textContent = ` · ${g.items.filter((_, ii) => hechos.has(`${gi}-${ii}`)).length}/${total}`; };
    g.items.forEach((txt, ii) => {
      const id = `${gi}-${ii}`;
      const lab = el("label", "chk");
      const inp = el("input");
      inp.type = "checkbox"; inp.checked = hechos.has(id);
      inp.addEventListener("change", () => { inp.checked ? hechos.add(id) : hechos.delete(id); guardar(); actualizar(); });
      lab.append(inp, el("span", "chk-caja"), el("span", "chk-tx", txt));
      ul.appendChild(lab);
    });
    actualizar();
    sec.appendChild(ul);
    contenedor.appendChild(sec);
  });
}

function listaPuntos(items, cls) {
  const ul = el("ul", "lista-pts" + (cls ? " " + cls : ""));
  for (const t of items) ul.appendChild(el("li", null, t));
  return ul;
}

// =====================================================================
//  VELADA
// =====================================================================
export function dibujaVelada(c) {
  let modo = LS.get("velada_modo") === "v" ? "v" : "n";
  const datos = { imagen: LS.get("velada_imagen") || "", pueblo: LS.get("velada_pueblo") || "" };
  let vivos = [];

  const defImagen = () => (modo === "n" ? "Niño Dios" : "María");
  const sub = (t) => {
    if (t == null) return "";
    const s = typeof t === "string" ? t : t[modo];
    return s
      .replace(/\{imagen\}/g, (datos.imagen || "").trim() || defImagen())
      .replace(/\{pueblo\}/g, (datos.pueblo || "").trim() || "nuestra comunidad");
  };
  const refrescar = () => { for (const p of vivos) p.textContent = sub(p._raw); };

  const intro = el("section", "card card-intro");
  const introTx = el("p", "intro-txt");
  introTx._raw = VELADA.intro; vivos.push(introTx);
  intro.appendChild(introTx);

  // Datos de la velada
  const cfg = el("section", "card cfg");
  cfg.appendChild(el("h4", "paso-etq", "Tu velada"));
  const chips = el("div", "cfg-chips");
  const btnN = el("button", "mini", "Niño Dios"); btnN.type = "button";
  const btnV = el("button", "mini", "Virgen patrona"); btnV.type = "button";
  chips.append(btnN, btnV);
  const lblImg = el("label", "form-etq");
  const inImg = el("input", "campo-txt"); inImg.type = "text"; inImg.maxLength = 60; inImg.autocomplete = "off"; inImg.value = datos.imagen;
  const lblPue = el("label", "form-etq", "Pueblo o comunidad");
  const inPue = el("input", "campo-txt"); inPue.type = "text"; inPue.maxLength = 60; inPue.autocomplete = "off"; inPue.placeholder = "Ej.: Valencia, Quevedo, La Familia"; inPue.value = datos.pueblo;
  const pista = el("p", "cfg-pista", "Con estos datos las oraciones y los textos se completan solos. Se guardan solo en este teléfono.");
  cfg.append(chips, lblImg, inImg, lblPue, inPue, pista);
  const marcarModo = () => {
    btnN.classList.toggle("fuerte", modo === "n"); btnV.classList.toggle("fuerte", modo === "v");
    btnN.setAttribute("aria-pressed", modo === "n"); btnV.setAttribute("aria-pressed", modo === "v");
    lblImg.textContent = modo === "n" ? "Nombre de la imagen del Niño" : "Nombre de la Virgen (lo que va después de «Virgen»)";
    inImg.placeholder = modo === "n" ? "Ej.: Divino Niño, Niño Jesús de Praga" : "Ej.: del Cisne, de Guadalupe, de la Merced";
  };

  const bar = pestanas([["preparar", "Preparar"], ["guion", "Guion paso a paso"], ["recursos", "Recursos"], ["consejos", "Consejos"]], "preparar", (id, panel) => {
    vivos = vivos.filter((p) => p.isConnected || p === introTx);
    if (id === "preparar") pintaPreparar(panel);
    else if (id === "guion") pintaGuion(panel);
    else if (id === "recursos") pintaRecursos(panel);
    else pintaConsejos(panel);
    refrescar();
  });

  const repintar = () => { const act = bar.barra.querySelector(".activo"); const b = [...bar.barra.children].find((x) => x.dataset.id === (act ? act.dataset.id : "preparar")); b.click(); };
  const cambiaModo = (m) => { modo = m; LS.set("velada_modo", m); marcarModo(); repintar(); };
  btnN.addEventListener("click", () => cambiaModo("n"));
  btnV.addEventListener("click", () => cambiaModo("v"));
  inImg.addEventListener("input", () => { datos.imagen = inImg.value; LS.set("velada_imagen", datos.imagen); refrescar(); });
  inPue.addEventListener("input", () => { datos.pueblo = inPue.value; LS.set("velada_pueblo", datos.pueblo); refrescar(); });

  c.append(intro, cfg, bar.barra, bar.panel);
  marcarModo();
  bar.ir();

  // ---------- Preparar ----------
  function pintaPreparar(panel) {
    const L = VELADA.limites;
    const lim = el("section", "card card-intro");
    lim.appendChild(el("h4", "paso-etq", L.titulo));
    const si = el("div", "dos"); si.append(el("p", "dos-tit si", "Sí puedes"), listaPuntos(L.puede));
    const no = el("div", "dos"); no.append(el("p", "dos-tit no", "No puedes"), listaPuntos(L.nopuede));
    const cs = el("div", "dos"); cs.append(el("p", "dos-tit", "Ten presente"), listaPuntos(L.consejos));
    lim.append(si, no, cs);
    panel.appendChild(lim);

    const roles = el("section", "card");
    roles.appendChild(el("h4", "paso-etq", "Quién hace qué"));
    const dl = el("dl", "roles");
    for (const [r, d] of VELADA.roles) { dl.append(el("dt", null, r), el("dd", null, d)); }
    roles.appendChild(dl);
    panel.appendChild(roles);

    panel.appendChild(el("h3", "grupo-tit", "Lista de preparación (marca lo que ya tienes)"));
    checklist(VELADA.preparacion, "velada_chk", panel);

    const prog = el("section", "card");
    const total = VELADA.programa.reduce((a, [, m]) => a + m, 0);
    prog.appendChild(el("h4", "paso-etq", `Programa de la velada · unos ${total} minutos`));
    const ol = el("ol", "programa");
    VELADA.programa.forEach(([n, m]) => { const li = el("li"); li.append(el("span", "pr-n", n), el("span", "pr-m", `${m} min`)); ol.appendChild(li); });
    prog.appendChild(ol);
    panel.appendChild(prog);
  }

  // ---------- Guion ----------
  function textoPaso(p, i) {
    const lineas = p.partes.map((x) => (x.r === "nota" ? `(${sub(x.t)})` : `${ROLES[x.r]}: ${sub(x.t)}`));
    return `${i + 1}. ${p.n}\n\n${lineas.join("\n\n")}`;
  }
  function pintaGuion(panel) {
    const nota = el("section", "card card-intro");
    nota.appendChild(el("p", "intro-txt", "Toca cada paso para abrirlo. Lo que dice el guía, todos o el lector está marcado; las notas son indicaciones para ti y no se leen en voz alta."));
    const acc = el("div", "acciones");
    const abrir = el("button", "mini", "Abrir todos"); abrir.type = "button";
    const cerrar = el("button", "mini", "Cerrar todos"); cerrar.type = "button";
    acc.append(abrir, cerrar, botonCopiar(() => VELADA.pasos.map(textoPaso).join("\n\n———\n\n"), "Copiar guion completo"));
    nota.appendChild(acc);
    panel.appendChild(nota);
    const lista = el("div", "grupo");
    VELADA.pasos.forEach((p, i) => {
      const d = el("details", "card acordeon");
      const sm = el("summary");
      const tit = el("span", "acc-tit");
      tit.append(el("small", "acc-pre", `Paso ${i + 1} · ${p.min} min`), document.createTextNode(p.n));
      sm.append(el("span", "num", String(i + 1)), tit, chevron());
      d.appendChild(sm);
      const cu = el("div", "acc-cu acc-cu-ancho");
      for (const x of p.partes) cu.appendChild(linea(x, sub, vivos));
      cu.appendChild(el("div", "acciones")).appendChild(botonCopiar(() => textoPaso(p, i), "Copiar este paso"));
      d.appendChild(cu);
      lista.appendChild(d);
    });
    panel.appendChild(lista);
    abrir.addEventListener("click", () => lista.querySelectorAll("details").forEach((x) => (x.open = true)));
    cerrar.addEventListener("click", () => lista.querySelectorAll("details").forEach((x) => (x.open = false)));
  }

  // ---------- Recursos ----------
  function pintaRecursos(panel) {
    const lec = el("section", "card");
    lec.appendChild(el("h4", "paso-etq", "Lecturas bíblicas sugeridas"));
    const dl = el("dl", "roles");
    for (const [cita, desc] of VELADA.lecturas[modo]) dl.append(el("dt", null, cita), el("dd", null, desc));
    lec.appendChild(dl);
    panel.appendChild(lec);

    const can = el("section", "card");
    can.appendChild(el("h4", "paso-etq", "Cantos sugeridos"));
    can.appendChild(listaPuntos(VELADA.recursos.cantos[modo]));
    can.appendChild(el("p", "nota", VELADA.recursos.notaCantos));
    panel.appendChild(can);

    if (modo === "v") {
      const sa = el("section", "card");
      sa.appendChild(el("h4", "paso-etq", "Salve (texto tradicional)"));
      for (const t of VELADA.recursos.salve) sa.appendChild(el("p", "salmo-txt", t));
      sa.appendChild(el("div", "acciones")).appendChild(botonCopiar(() => `Salve\n\n${VELADA.recursos.salve.join("\n\n")}`));
      panel.appendChild(sa);
    }

    const pl = el("section", "card");
    pl.appendChild(el("h4", "paso-etq", "Plan corto (unos 45 minutos)"));
    pl.appendChild(listaPuntos(VELADA.recursos.plan45));
    panel.appendChild(pl);

    const ot = el("section", "card");
    ot.appendChild(el("h4", "paso-etq", "Las oraciones de siempre"));
    ot.appendChild(el("p", "salmo-txt", "El Padrenuestro, el Avemaría, el Gloria, el Credo y las demás oraciones básicas están en «Oraciones católicas», en el menú."));
    panel.appendChild(ot);
  }

  // ---------- Consejos ----------
  function pintaConsejos(panel) {
    for (const [titulo, items] of VELADA.consejos) {
      const s = el("section", "card");
      s.appendChild(el("h4", "paso-etq", titulo));
      s.appendChild(listaPuntos(items));
      panel.appendChild(s);
    }
  }
}

// =====================================================================
//  NOVENARIO POR UN DIFUNTO
// =====================================================================
export function dibujaNovenario(c, ctx = {}) {
  const hoy = ctx.hoy || (() => new Date());
  const est = {
    nombre: LS.get("novenario_nombre") || "",
    sexo: LS.get("novenario_sexo") === "a" ? "a" : "o",
    inicio: LS.get("novenario_inicio") || ""
  };
  let vivos = [];
  const sub = (t) => {
    if (t == null) return "";
    const f = est.sexo === "a";
    const nombre = (est.nombre || "").trim() || (f ? "nuestra hermana" : "nuestro hermano");
    return String(t)
      .replace(/\{nombre\}/g, nombre)
      .replace(/\{lo\}/g, f ? "la" : "lo")
      .replace(/\{el\}/g, f ? "ella" : "él")
      .replace(/\{o\}/g, f ? "a" : "o")
      .replace(/\{hermano\}/g, f ? "hermana" : "hermano");
  };
  const refrescar = () => { for (const p of vivos) p.textContent = sub(p._raw); };
  const raw = (cls, t) => { const p = el("p", cls); p._raw = t; vivos.push(p); return p; };
  const fechaDe = (i) => {
    const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(est.inicio || "");
    if (!m) return null;
    return new Date(+m[1], +m[2] - 1, +m[3] + (i - 1));
  };
  const corta = (d) => `${d.getDate()}/${d.getMonth() + 1}`;
  const larga = (d) => { try { return d.toLocaleDateString("es-EC", { weekday: "long", day: "numeric", month: "long" }); } catch (_) { return corta(d); } };

  const intro = el("section", "card card-intro");
  intro.appendChild(el("p", "intro-txt", NOVENARIO.intro));

  const cfg = el("section", "card cfg");
  cfg.appendChild(el("h4", "paso-etq", "Datos del novenario"));
  const lblN = el("label", "form-etq", "Nombre del familiar fallecido");
  const inN = el("input", "campo-txt"); inN.type = "text"; inN.maxLength = 70; inN.autocomplete = "off"; inN.placeholder = "Ej.: Juan Pérez"; inN.value = est.nombre;
  const chips = el("div", "cfg-chips");
  const bO = el("button", "mini", "Él"); bO.type = "button";
  const bA = el("button", "mini", "Ella"); bA.type = "button";
  chips.append(bO, bA);
  const lblF = el("label", "form-etq", "Primera noche (opcional, para ver las fechas)");
  const inF = el("input", "campo-txt"); inF.type = "date"; inF.value = est.inicio;
  cfg.append(lblN, inN, el("p", "form-etq", "Se trata de"), chips, lblF, inF, el("p", "cfg-pista", "El nombre y el avance se guardan solo en este teléfono. Con ellos las oraciones se adaptan solas."));
  const marcaSexo = () => { bO.classList.toggle("fuerte", est.sexo === "o"); bA.classList.toggle("fuerte", est.sexo === "a"); bO.setAttribute("aria-pressed", est.sexo === "o"); bA.setAttribute("aria-pressed", est.sexo === "a"); };

  let actual = 1;
  const diaSug = () => {
    const f0 = fechaDe(1);
    if (f0) {
      const h = hoy();
      const d = Math.floor((new Date(h.getFullYear(), h.getMonth(), h.getDate()) - f0) / 86400000) + 1;
      if (d >= 1 && d <= 9) return d;
    }
    const g = parseInt(LS.get("novenario_noche"), 10);
    return g >= 1 && g <= 9 ? g : 1;
  };
  actual = diaSug();
  const hechos = () => leerJSON("novenario_ok", []).filter((n) => Number.isInteger(n));

  const bar = pestanas([["guia", "Guía"], ["noches", "Las 9 noches"], ["cierre", "Cierre y después"], ["acompanar", "Acompañar"]], "noches", (id, panel) => {
    vivos = vivos.filter((p) => p.isConnected);
    if (id === "guia") pintaGuia(panel);
    else if (id === "noches") pintaNoches(panel);
    else if (id === "cierre") pintaCierre(panel);
    else pintaAcompanar(panel);
    refrescar();
  });
  const repintar = () => { const act = bar.barra.querySelector(".activo"); const b = [...bar.barra.children].find((x) => x.dataset.id === (act ? act.dataset.id : "noches")); b.click(); };

  inN.addEventListener("input", () => { est.nombre = inN.value; LS.set("novenario_nombre", est.nombre); refrescar(); });
  bO.addEventListener("click", () => { est.sexo = "o"; LS.set("novenario_sexo", "o"); marcaSexo(); refrescar(); });
  bA.addEventListener("click", () => { est.sexo = "a"; LS.set("novenario_sexo", "a"); marcaSexo(); refrescar(); });
  inF.addEventListener("change", () => { est.inicio = inF.value; LS.set("novenario_inicio", est.inicio); actual = diaSug(); repintar(); });

  c.append(intro, cfg, bar.barra, bar.panel);
  marcaSexo();
  bar.ir();

  // ---------- Guía ----------
  function pintaGuia(panel) {
    const s = el("section", "card card-intro");
    s.appendChild(el("h4", "paso-etq", "Qué es el novenario"));
    s.appendChild(el("p", "intro-txt", NOVENARIO.sentido));
    panel.appendChild(s);

    panel.appendChild(el("h3", "grupo-tit", "Preparación (marca lo que ya tienes)"));
    checklist(NOVENARIO.preparacion, "novenario_chk", panel);

    const o = el("section", "card");
    o.appendChild(el("h4", "paso-etq", "Orden de cada noche"));
    const ol = el("ol", "programa");
    NOVENARIO.orden.forEach((t) => { const li = el("li"); li.appendChild(el("span", "pr-n", t)); ol.appendChild(li); });
    o.appendChild(ol);
    o.appendChild(el("p", "nota", NOVENARIO.comun.opcional));
    panel.appendChild(o);

    const r = el("section", "card");
    r.appendChild(el("h4", "paso-etq", "Empezar de nuevo"));
    r.appendChild(el("p", "salmo-txt", "Borra el nombre, las fechas y el avance de este novenario para preparar otro."));
    const b = el("button", "mini peligro", "Empezar un novenario nuevo"); b.type = "button";
    let armado = false, t = null;
    b.addEventListener("click", () => {
      if (!armado) { armado = true; b.textContent = "Toca otra vez para confirmar"; t = setTimeout(() => { armado = false; b.textContent = "Empezar un novenario nuevo"; }, 3500); return; }
      clearTimeout(t);
      for (const k of ["novenario_nombre", "novenario_sexo", "novenario_inicio", "novenario_ok", "novenario_noche", "novenario_chk"]) LS.del(k);
      est.nombre = ""; est.sexo = "o"; est.inicio = "";
      inN.value = ""; inF.value = ""; marcaSexo(); actual = 1;
      repintar();
    });
    r.appendChild(el("div", "acciones")).appendChild(b);
    panel.appendChild(r);
  }

  // ---------- Las 9 noches ----------
  function pintaNoches(panel) {
    const progreso = el("p", "progreso claro");
    const dias = el("div", "dias");
    dias.setAttribute("role", "tablist");
    const cuerpo = el("div", "novena-cu");
    panel.append(progreso, dias, cuerpo);

    const pintar = () => {
      LS.set("novenario_noche", String(actual));
      vivos = vivos.filter((p) => p.isConnected);
      const ok = hechos();
      progreso.textContent = ok.length ? `Llevan ${ok.length} de 9 noches rezadas.` : "Aún no han marcado ninguna noche.";
      dias.replaceChildren();
      for (let i = 1; i <= 9; i++) {
        const f = fechaDe(i);
        const b = el("button", "dia" + (i === actual ? " activo" : "") + (ok.includes(i) ? " hecho" : ""));
        b.type = "button"; b.setAttribute("role", "tab"); b.setAttribute("aria-selected", i === actual);
        b.setAttribute("aria-label", `Noche ${i}${f ? ", " + larga(f) : ""}${ok.includes(i) ? ", rezada" : ""}`);
        b.innerHTML = `<small>Noche</small><b>${i}</b>${f ? `<em>${corta(f)}</em>` : ""}${ok.includes(i) ? '<i aria-hidden="true">✓</i>' : ""}`;
        b.addEventListener("click", () => { actual = i; pintar(); cuerpo.scrollIntoView({ block: "nearest" }); });
        dias.appendChild(b);
      }
      cuerpo.replaceChildren();
      const n = NOVENARIO.noches[actual - 1];
      const C = NOVENARIO.comun;
      const f = fechaDe(actual);

      const t = el("section", "card dia-tit");
      t.append(el("p", "intro-etq", `Noche ${actual} de 9${f ? " · " + larga(f) : ""}`), el("h3", "dia-h", n.t));
      cuerpo.appendChild(t);

      const paso = (etq, extra) => { const s = el("section", "card paso" + (extra ? " " + extra : "")); s.appendChild(el("h4", "paso-etq", etq)); cuerpo.appendChild(s); return s; };
      const lineas = (s, partes) => { for (const x of partes) s.appendChild(linea(x, sub, vivos)); };

      lineas(paso("Señal de la cruz y acogida"), C.acogida);
      paso("Oración inicial").appendChild(raw("paso-txt", C.inicial));
      const lec = paso("Palabra de Dios");
      lec.appendChild(el("p", "cita-pill", n.cita));
      lec.appendChild(raw("paso-txt", n.resumen));
      lec.appendChild(el("p", "nota", "Lee el texto completo en tu Biblia, en la lectura señalada, y guarda un minuto de silencio."));
      paso("Reflexión").appendChild(raw("paso-txt", n.reflexion));
      paso("Un recuerdo agradecido").appendChild(raw("paso-txt", C.recuerdo));
      paso("Oración de esta noche", "paso-pet").appendChild(raw("paso-txt", n.oracion));

      const pet = paso("Peticiones");
      pet.appendChild(el("p", "nota", `Después de cada petición todos responden: «${C.respuesta}»`));
      for (const t of [n.peticion, ...C.peticiones]) pet.appendChild(raw("paso-txt pet-li", t));

      const rez = paso("Rezamos juntos");
      rez.append(el("h5", "sub-etq", "Padrenuestro"), raw("paso-txt", C.padrenuestro), el("h5", "sub-etq", "Avemaría"), raw("paso-txt", C.avemaria), el("h5", "sub-etq", "Eterno descanso"), raw("paso-txt linea-tx", C.eterno));

      paso("Para vivir hoy").appendChild(raw("paso-txt", n.obra));
      paso("Oración final").appendChild(raw("paso-txt", C.final));
      lineas(paso("Bendición"), C.bendicion);

      if (actual === 9) {
        const s = paso(NOVENARIO.cierre.titulo, "paso-pet");
        lineas(s, NOVENARIO.cierre.partes);
      }
      cuerpo.appendChild(el("div", "acciones")).appendChild(botonCopiar(() => cuerpo.innerText, "Copiar esta noche"));

      const marca = el("button", "boton-marca" + (ok.includes(actual) ? " hecho" : ""));
      marca.type = "button";
      marca.textContent = ok.includes(actual) ? `✓ Noche ${actual} rezada (toca para desmarcar)` : `Marcar la noche ${actual} como rezada`;
      marca.addEventListener("click", () => {
        const a = hechos(); const i = a.indexOf(actual);
        if (i >= 0) a.splice(i, 1); else a.push(actual);
        LS.set("novenario_ok", JSON.stringify(a));
        if (i < 0 && actual < 9) actual++;
        pintar();
      });
      cuerpo.appendChild(marca);
      refrescar();
    };
    pintar();
  }

  // ---------- Cierre y después ----------
  function pintaCierre(panel) {
    const cr = el("section", "card card-intro");
    cr.appendChild(el("h4", "paso-etq", NOVENARIO.cierre.titulo));
    for (const x of NOVENARIO.cierre.partes) cr.appendChild(linea(x, sub, vivos));
    panel.appendChild(cr);
    panel.appendChild(el("h3", "grupo-tit", "Después de los nueve días"));
    for (const [t, d] of NOVENARIO.despues) {
      const s = el("section", "card");
      s.appendChild(el("h4", "paso-etq", t));
      s.appendChild(raw("paso-txt", d));
      panel.appendChild(s);
    }
  }

  // ---------- Acompañar ----------
  function pintaAcompanar(panel) {
    const A = NOVENARIO.acompanar;
    const a = el("section", "card"); a.appendChild(el("h4", "paso-etq", "Qué ayuda al acompañar")); a.appendChild(listaPuntos(A.si)); panel.appendChild(a);
    const b = el("section", "card"); b.appendChild(el("h4", "paso-etq", "Mejor evitar")); b.appendChild(listaPuntos(A.no)); panel.appendChild(b);
    const c2 = el("section", "card card-intro"); c2.appendChild(el("h4", "paso-etq", "Si el dolor pesa demasiado")); c2.appendChild(el("p", "intro-txt", A.ayuda)); panel.appendChild(c2);
  }
}
