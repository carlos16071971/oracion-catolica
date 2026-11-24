// Mi diario espiritual: intenciones, gratitud, reflexiones, propósitos, hábitos de oración e historial.
// Todo se guarda solo en este dispositivo (localStorage). Incluye copia de seguridad (exportar / importar).

const CLAVE = "diario_v1";
const TIPOS = {
  intencion: { nombre: "Intención", plural: "Intenciones", color: "#46c2ff" },
  gracias: { nombre: "Gratitud", plural: "Gratitud", color: "#ffd45e" },
  reflexion: { nombre: "Reflexión", plural: "Reflexiones", color: "#b98cff" },
  proposito: { nombre: "Propósito", plural: "Propósitos", color: "#5ee0a0" }
};
const HABITOS = [
  ["manana", "Oración de la mañana"],
  ["noche", "Oración de la noche"],
  ["rosario", "Santo Rosario"],
  ["biblia", "Lectura de la Palabra"],
  ["misa", "Misa o comunión espiritual"]
];
const PESTANAS = [["hoy", "Hoy"], ["intencion", "Intenciones"], ["gracias", "Gratitud"], ["reflexion", "Reflexiones"], ["proposito", "Propósitos"], ["habitos", "Hábitos"], ["historial", "Historial"]];

const el = (tag, cls, txt) => { const e = document.createElement(tag); if (cls) e.className = cls; if (txt != null) e.textContent = txt; return e; };
const svg = (d, w = 18) => `<svg viewBox="0 0 24 24" width="${w}" height="${w}" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${d}</svg>`;

// ---------- Datos ----------
function leer() {
  try {
    const d = JSON.parse(localStorage.getItem(CLAVE));
    if (d && Array.isArray(d.entradas) && d.habitos && typeof d.habitos === "object") return d;
  } catch (_) {}
  return { entradas: [], habitos: {} };
}
let datos = leer();
let errorGuardado = false;
function guardar() {
  try { localStorage.setItem(CLAVE, JSON.stringify(datos)); errorGuardado = false; }
  catch (_) { errorGuardado = true; }
}
const nuevoId = () => Date.now().toString(36) + Math.random().toString(36).slice(2, 6);

// ---------- Fechas ----------
const pad = (n) => String(n).padStart(2, "0");
const iso = (d) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
const deIso = (s) => new Date(s + "T12:00:00");
const sumaDias = (s, n) => { const d = deIso(s); d.setDate(d.getDate() + n); return iso(d); };
const fmtLargo = new Intl.DateTimeFormat("es", { weekday: "long", day: "numeric", month: "long" });
const fmtCorto = new Intl.DateTimeFormat("es", { weekday: "short", day: "numeric", month: "short" });
const may = (t) => t.charAt(0).toUpperCase() + t.slice(1);
function etiquetaFecha(f, hoy) {
  if (f === hoy) return "Hoy";
  if (f === sumaDias(hoy, -1)) return "Ayer";
  return may(fmtCorto.format(deIso(f)).replace(".", ""));
}

// ---------- Cálculos ----------
const tieneOracion = (f) => (datos.habitos[f] || []).length > 0;
function rachaActual(hoy) {
  let f = tieneOracion(hoy) ? hoy : sumaDias(hoy, -1), n = 0;
  while (tieneOracion(f)) { n++; f = sumaDias(f, -1); }
  return n;
}
function mejorRacha() {
  const dias = Object.keys(datos.habitos).filter(tieneOracion).sort();
  let mejor = 0, act = 0, prev = null;
  for (const f of dias) { act = prev && sumaDias(prev, 1) === f ? act + 1 : 1; mejor = Math.max(mejor, act); prev = f; }
  return mejor;
}
function alternarHabito(f, id) {
  const a = new Set(datos.habitos[f] || []);
  a.has(id) ? a.delete(id) : a.add(id);
  if (a.size) datos.habitos[f] = [...a]; else delete datos.habitos[f];
  guardar();
}

// ---------- Pantalla ----------
export function dibujaDiario(c, ctx) {
  datos = leer();
  let pestana = "hoy";
  let filtroInt = "abiertas";
  let filtroHist = "todos";
  let busqueda = "";
  let refPendiente = null;
  const hoy = () => iso(ctx.hoy());

  const cont = el("div", "diario");
  c.appendChild(cont);

  function pintar(mantenerFoco) {
    cont.replaceChildren();
    cont.appendChild(barra());
    if (errorGuardado) cont.appendChild(Object.assign(el("p", "aviso-error", "No se pudo guardar en este dispositivo. Revisa que el navegador permita guardar datos del sitio."), {}));
    const p = el("div", "panel");
    cont.appendChild(p);
    ({ hoy: panelHoy, intencion: panelIntenciones, gracias: panelGracias, reflexion: panelReflexiones, proposito: panelPropositos, habitos: panelHabitos, historial: panelHistorial })[pestana](p);
    if (!mantenerFoco) c.parentElement && (c.scrollTop = 0);
  }
  const ir = (t) => { pestana = t; pintar(); };

  function barra() {
    const b = el("div", "filtros");
    b.setAttribute("role", "tablist");
    for (const [id, nombre] of PESTANAS) {
      const x = el("button", "filtro" + (id === pestana ? " activo" : ""), nombre);
      x.type = "button"; x.setAttribute("role", "tab"); x.setAttribute("aria-selected", id === pestana);
      x.addEventListener("click", () => ir(id));
      b.appendChild(x);
    }
    return b;
  }

  // ----- piezas reutilizables -----
  function formulario({ etiqueta, ph, filas = 3, boton = "Guardar", ayuda, alGuardar }) {
    const card = el("section", "card form");
    const lab = el("label", "form-etq", etiqueta);
    const ta = el("textarea", "campo-txt");
    ta.rows = filas; ta.placeholder = ph; ta.maxLength = 2000; ta.id = "f" + nuevoId();
    lab.htmlFor = ta.id;
    const fila = el("div", "form-fila");
    const bt = el("button", "btn", boton); bt.type = "button";
    const ok = el("span", "form-ok");
    bt.addEventListener("click", () => {
      const t = ta.value.trim();
      if (!t) { ta.focus(); return; }
      alGuardar(t);
    });
    fila.append(bt, ok);
    card.append(lab, ta);
    if (ayuda) card.appendChild(ayuda);
    card.appendChild(fila);
    return card;
  }
  function agregar(tipo, texto, extra = {}) {
    datos.entradas.unshift({ id: nuevoId(), tipo, texto, fecha: hoy(), creado: Date.now(), ...extra });
    guardar();
  }
  function vacio(txt) { return el("p", "vacio", txt); }

  function tarjetaEntrada(e, { fecha = false, tipo = false } = {}) {
    const card = el("article", "card entrada");
    const t = TIPOS[e.tipo];
    const cab = el("div", "entrada-cab");
    if (tipo) { const bd = el("span", "badge", t.nombre); bd.style.setProperty("--c", t.color); cab.appendChild(bd); }
    if (fecha) cab.appendChild(el("span", "entrada-fecha", etiquetaFecha(e.fecha, hoy())));
    if (e.tipo === "intencion" && e.hecho) { const r = el("span", "badge ok", "Respondida"); cab.appendChild(r); }
    if (cab.children.length) card.appendChild(cab);

    if (e.tipo === "proposito") {
      const fila = el("div", "prop-fila");
      const chk = el("button", "check" + (e.hecho ? " on" : ""));
      chk.type = "button"; chk.setAttribute("role", "checkbox"); chk.setAttribute("aria-checked", !!e.hecho);
      chk.setAttribute("aria-label", e.hecho ? "Propósito cumplido" : "Marcar propósito como cumplido");
      chk.innerHTML = svg('<path d="M5 12.5l4.5 4.5L19 7.5"/>', 18);
      chk.addEventListener("click", () => { e.hecho = !e.hecho; guardar(); pintar(true); });
      fila.append(chk, Object.assign(el("p", "entrada-txt" + (e.hecho ? " tachado" : ""), e.texto)));
      card.appendChild(fila);
    } else {
      if (e.ref) card.appendChild(el("p", "entrada-ref", "Sobre: " + e.ref));
      card.appendChild(el("p", "entrada-txt", e.texto));
    }

    const acc = el("div", "acciones");
    if (e.tipo === "intencion") {
      const r = el("button", "mini" + (e.hecho ? "" : " fuerte"), e.hecho ? "Reabrir" : "Marcar respondida");
      r.type = "button";
      r.addEventListener("click", () => { e.hecho = !e.hecho; e.fechaHecho = e.hecho ? hoy() : undefined; guardar(); pintar(true); });
      acc.appendChild(r);
    }
    const ed = el("button", "mini", "Editar"); ed.type = "button";
    ed.addEventListener("click", () => editar(card, e));
    const bo = el("button", "mini peligro", "Borrar"); bo.type = "button";
    let t0 = 0;
    bo.addEventListener("click", () => {
      if (Date.now() - t0 < 3500 && t0) { datos.entradas = datos.entradas.filter((x) => x.id !== e.id); guardar(); pintar(true); return; }
      t0 = Date.now(); bo.textContent = "¿Seguro? Toca otra vez";
      setTimeout(() => { if (bo.isConnected) { bo.textContent = "Borrar"; t0 = 0; } }, 3500);
    });
    acc.append(ed, bo);
    card.appendChild(acc);
    return card;
  }
  function editar(card, e) {
    card.replaceChildren();
    const ta = el("textarea", "campo-txt"); ta.value = e.texto; ta.rows = 4; ta.maxLength = 2000;
    ta.setAttribute("aria-label", "Editar texto");
    const g = el("button", "btn", "Guardar cambios"); g.type = "button";
    const x = el("button", "mini", "Cancelar"); x.type = "button";
    g.addEventListener("click", () => { const t = ta.value.trim(); if (!t) { ta.focus(); return; } e.texto = t; guardar(); pintar(true); });
    x.addEventListener("click", () => pintar(true));
    const f = el("div", "form-fila"); f.append(g, x);
    card.append(ta, f);
    ta.focus();
  }
  function listaPorFecha(lista, opciones) {
    const frag = document.createDocumentFragment();
    let ult = null, grupo = null;
    for (const e of lista) {
      if (e.fecha !== ult) { ult = e.fecha; frag.appendChild(el("h3", "grupo-tit", etiquetaFecha(e.fecha, hoy()))); grupo = null; }
      frag.appendChild(tarjetaEntrada(e, opciones));
    }
    return frag;
  }
  const entradasDe = (tipo) => datos.entradas.filter((e) => e.tipo === tipo);

  function botonesHabito(f, grande) {
    const g = el("div", grande ? "habitos-grid" : "habitos-grid");
    const marcados = datos.habitos[f] || [];
    for (const [id, nombre] of HABITOS) {
      const on = marcados.includes(id);
      const b = el("button", "habito" + (on ? " on" : ""));
      b.type = "button"; b.setAttribute("role", "checkbox"); b.setAttribute("aria-checked", on);
      b.innerHTML = `<span class="habito-ck">${svg('<path d="M5 12.5l4.5 4.5L19 7.5"/>', 16)}</span><span>${nombre}</span>`;
      b.addEventListener("click", () => { alternarHabito(f, id); pintar(true); });
      g.appendChild(b);
    }
    return g;
  }

  // ----- Hoy -----
  function panelHoy(p) {
    const h = hoy();
    const saludo = el("section", "card card-intro");
    saludo.append(el("p", "intro-etq", may(fmtLargo.format(ctx.hoy()))), el("p", "intro-txt", "Un momento con Dios para anotar lo que llevas en el corazón. Lo que escribas queda guardado solo en este teléfono."));
    p.appendChild(saludo);

    const hab = el("section", "card");
    const hechos = (datos.habitos[h] || []).length;
    hab.append(el("h4", "paso-etq", "Mi oración de hoy"));
    const barraP = el("div", "barra"); const rel = el("span"); rel.style.width = (hechos / HABITOS.length) * 100 + "%"; barraP.appendChild(rel);
    hab.append(el("p", "progreso", `${hechos} de ${HABITOS.length} momentos de oración`), barraP, botonesHabito(h));
    p.appendChild(hab);

    const abiertas = entradasDe("intencion").filter((e) => !e.hecho).length;
    const gr7 = entradasDe("gracias").filter((e) => e.fecha >= sumaDias(h, -6)).length;
    const st = el("section", "stats");
    for (const [n, t] of [[rachaActual(h), "Días seguidos"], [abiertas, "Intenciones abiertas"], [gr7, "Gratitudes (7 días)"]]) {
      const d = el("div", "stat"); d.append(el("b", null, String(n)), el("small", null, t)); st.appendChild(d);
    }
    p.appendChild(st);

    const props = entradasDe("proposito").filter((e) => e.fecha === h);
    const pc = el("section", "card");
    pc.appendChild(el("h4", "paso-etq", "Mis propósitos de hoy"));
    if (props.length) { for (const e of props) pc.appendChild(el("p", "mini-linea" + (e.hecho ? " tachado" : ""), (e.hecho ? "✓ " : "• ") + e.texto)); }
    else pc.appendChild(el("p", "item-txt", "Todavía no has anotado un propósito para hoy."));
    const ir1 = el("button", "mini fuerte", "Anotar un propósito"); ir1.type = "button"; ir1.addEventListener("click", () => ir("proposito"));
    pc.appendChild(el("div", "acciones")).appendChild(ir1);
    p.appendChild(pc);

    const at = el("section", "atajos");
    for (const [t, txt] of [["intencion", "Nueva intención"], ["gracias", "Dar gracias"], ["reflexion", "Escribir reflexión"], ["historial", "Ver historial"]]) {
      const b = el("button", "atajo", txt); b.type = "button";
      if (TIPOS[t]) b.style.setProperty("--c", TIPOS[t].color);
      b.addEventListener("click", () => ir(t));
      at.appendChild(b);
    }
    p.appendChild(at);
  }

  // ----- Intenciones -----
  function panelIntenciones(p) {
    p.appendChild(formulario({
      etiqueta: "¿Por quién o por qué quieres orar?", ph: "Ej.: por la salud de mi abuela, por un trabajo, por la paz en mi familia…",
      boton: "Guardar intención", alGuardar: (t) => { agregar("intencion", t); pintar(true); }
    }));
    const todas = entradasDe("intencion");
    const ab = todas.filter((e) => !e.hecho), re = todas.filter((e) => e.hecho);
    const fl = el("div", "filtros");
    for (const [id, n, k] of [["abiertas", "Abiertas", ab.length], ["respondidas", "Respondidas", re.length]]) {
      const b = el("button", "filtro" + (filtroInt === id ? " activo" : ""), `${n} (${k})`); b.type = "button";
      b.addEventListener("click", () => { filtroInt = id; pintar(true); });
      fl.appendChild(b);
    }
    p.appendChild(fl);
    const lista = filtroInt === "abiertas" ? ab : re;
    if (!lista.length) p.appendChild(vacio(filtroInt === "abiertas" ? "No tienes intenciones abiertas. Escribe la primera arriba." : "Aquí aparecerán las intenciones que Dios te responda. ¡Da gracias por cada una!"));
    else p.appendChild(listaPorFecha(lista, { fecha: false }));
  }

  // ----- Gratitud -----
  function panelGracias(p) {
    p.appendChild(formulario({
      etiqueta: "Hoy le doy gracias a Dios por…", ph: "Ej.: por mi familia, por la salud, por el alimento de hoy…",
      filas: 2, boton: "Guardar agradecimiento", alGuardar: (t) => { agregar("gracias", t); pintar(true); }
    }));
    const l = entradasDe("gracias");
    if (!l.length) p.appendChild(vacio("Anota hoy tres cosas por las que quieras agradecer a Dios."));
    else p.appendChild(listaPorFecha(l, {}));
  }

  // ----- Reflexiones -----
  function panelReflexiones(p) {
    const r = ctx.reflexionHoy();
    if (r) {
      const card = el("section", "card card-intro");
      card.append(el("p", "intro-etq", "La reflexión de hoy"), el("p", "intro-txt", r.reflexion));
      const b = el("button", "mini fuerte", refPendiente ? "✓ Escribirás sobre esta reflexión" : "Escribir sobre esta reflexión"); b.type = "button";
      b.addEventListener("click", () => { refPendiente = r.titulo; pintar(true); });
      card.appendChild(el("div", "acciones")).appendChild(b);
      p.appendChild(card);
    }
    p.appendChild(formulario({
      etiqueta: "Mi reflexión personal", ph: "¿Qué te dijo Dios hoy? ¿Qué aprendiste, qué te pide?",
      filas: 6, boton: "Guardar reflexión",
      alGuardar: (t) => { agregar("reflexion", t, refPendiente ? { ref: refPendiente } : {}); refPendiente = null; pintar(true); }
    }));
    const l = entradasDe("reflexion");
    if (!l.length) p.appendChild(vacio("Tus reflexiones quedarán aquí, para releerlas cuando quieras."));
    else p.appendChild(listaPorFecha(l, {}));
  }

  // ----- Propósitos -----
  function panelPropositos(p) {
    const r = ctx.reflexionHoy();
    if (r && r.proposito) {
      const ya = entradasDe("proposito").some((e) => e.fecha === hoy() && e.texto === r.proposito);
      const card = el("section", "card card-intro");
      card.append(el("p", "intro-etq", "Propósito sugerido para hoy"), el("p", "intro-txt", r.proposito));
      const b = el("button", "mini fuerte", ya ? "✓ Ya está en tus propósitos" : "Agregar a mis propósitos"); b.type = "button"; b.disabled = ya;
      b.addEventListener("click", () => { agregar("proposito", r.proposito, { hecho: false }); pintar(true); });
      card.appendChild(el("div", "acciones")).appendChild(b);
      p.appendChild(card);
    }
    p.appendChild(formulario({
      etiqueta: "Mi propósito de hoy", ph: "Ej.: rezar el rosario, perdonar a alguien, ayudar a un vecino…",
      filas: 2, boton: "Guardar propósito", alGuardar: (t) => { agregar("proposito", t, { hecho: false }); pintar(true); }
    }));
    const l = entradasDe("proposito");
    if (!l.length) p.appendChild(vacio("Un propósito pequeño y concreto cada día cambia la vida."));
    else {
      const cumplidos = l.filter((e) => e.hecho).length;
      p.appendChild(el("p", "progreso claro", `Has cumplido ${cumplidos} de ${l.length} propósitos.`));
      p.appendChild(listaPorFecha(l, {}));
    }
  }

  // ----- Hábitos -----
  function panelHabitos(p) {
    const h = hoy();
    const top = el("section", "card");
    top.append(el("h4", "paso-etq", "Hoy"), botonesHabito(h));
    p.appendChild(top);

    const mes = h.slice(0, 7);
    const diasMes = Object.keys(datos.habitos).filter((f) => f.startsWith(mes) && tieneOracion(f)).length;
    const st = el("section", "stats");
    for (const [n, t] of [[rachaActual(h), "Racha actual"], [mejorRacha(), "Mejor racha"], [diasMes, "Días este mes"]]) {
      const d = el("div", "stat"); d.append(el("b", null, String(n)), el("small", null, t)); st.appendChild(d);
    }
    p.appendChild(st);

    const sem = el("section", "card");
    sem.appendChild(el("h4", "paso-etq", "Últimos 7 días (toca para marcar o corregir)"));
    const dias = Array.from({ length: 7 }, (_, i) => sumaDias(h, i - 6));
    const tabla = el("div", "semana");
    tabla.appendChild(el("span", "sem-vacio"));
    for (const f of dias) tabla.appendChild(el("span", "sem-dia" + (f === h ? " hoy" : ""), "DLMMJVS"[deIso(f).getDay()]));
    for (const [id, nombre] of HABITOS) {
      tabla.appendChild(el("span", "sem-nombre", nombre));
      for (const f of dias) {
        const on = (datos.habitos[f] || []).includes(id);
        const b = el("button", "sem-celda" + (on ? " on" : "")); b.type = "button";
        b.setAttribute("role", "checkbox"); b.setAttribute("aria-checked", on);
        b.setAttribute("aria-label", `${nombre}, ${may(fmtCorto.format(deIso(f)))}`);
        b.addEventListener("click", () => { alternarHabito(f, id); pintar(true); });
        tabla.appendChild(b);
      }
    }
    sem.appendChild(tabla);
    p.appendChild(sem);
  }

  // ----- Historial -----
  function panelHistorial(p) {
    const fl = el("div", "filtros");
    for (const [id, n] of [["todos", "Todo"], ...Object.entries(TIPOS).map(([k, v]) => [k, v.plural])]) {
      const b = el("button", "filtro" + (filtroHist === id ? " activo" : ""), n); b.type = "button";
      b.addEventListener("click", () => { filtroHist = id; pintar(true); });
      fl.appendChild(b);
    }
    p.appendChild(fl);
    const bus = el("input", "campo-bus"); bus.type = "search"; bus.placeholder = "Buscar en mi diario…"; bus.value = busqueda;
    bus.setAttribute("aria-label", "Buscar en mi diario");
    const res = el("div", "resultados");
    const pintarLista = () => {
      res.replaceChildren();
      const q = busqueda.trim().toLowerCase();
      const l = datos.entradas.filter((e) => (filtroHist === "todos" || e.tipo === filtroHist) && (!q || e.texto.toLowerCase().includes(q) || (e.ref || "").toLowerCase().includes(q)));
      if (!l.length) res.appendChild(vacio(datos.entradas.length ? "No hay resultados." : "Tu diario está vacío. Empieza con una intención o un agradecimiento."));
      else res.appendChild(listaPorFecha(l, { tipo: true }));
    };
    bus.addEventListener("input", () => { busqueda = bus.value; pintarLista(); });
    p.append(bus, res);
    pintarLista();
    p.appendChild(copiaSeguridad());
  }

  function copiaSeguridad() {
    const card = el("section", "card");
    card.append(el("h4", "paso-etq", "Copia de seguridad"), el("p", "item-txt", "Tu diario vive solo en este teléfono. Guarda una copia por si cambias de equipo o borras los datos del navegador."));
    const fila = el("div", "form-fila");
    const ex = el("button", "btn", "Guardar copia"); ex.type = "button";
    const im = el("button", "mini", "Restaurar copia"); im.type = "button";
    const msg = el("p", "form-ok");
    const inp = document.createElement("input"); inp.type = "file"; inp.accept = "application/json,.json"; inp.hidden = true;
    ex.addEventListener("click", () => {
      const blob = new Blob([JSON.stringify({ app: "oracion-catolica", version: 1, ...datos }, null, 1)], { type: "application/json" });
      const a = document.createElement("a"); a.href = URL.createObjectURL(blob); a.download = `diario-espiritual-${hoy()}.json`;
      document.body.appendChild(a); a.click(); a.remove(); setTimeout(() => URL.revokeObjectURL(a.href), 4000);
      msg.textContent = "Copia guardada.";
    });
    im.addEventListener("click", () => inp.click());
    inp.addEventListener("change", async () => {
      try {
        const d = JSON.parse(await inp.files[0].text());
        if (!d || !Array.isArray(d.entradas) || typeof d.habitos !== "object") throw new Error("formato");
        const ids = new Set(datos.entradas.map((e) => e.id));
        let nuevos = 0;
        for (const e of d.entradas) if (e && e.id && TIPOS[e.tipo] && typeof e.texto === "string" && /^\d{4}-\d{2}-\d{2}$/.test(e.fecha) && !ids.has(e.id)) { datos.entradas.push({ id: String(e.id), tipo: e.tipo, texto: e.texto.slice(0, 2000), fecha: e.fecha, creado: +e.creado || 0, hecho: !!e.hecho, ...(e.ref ? { ref: String(e.ref) } : {}) }); nuevos++; }
        datos.entradas.sort((a, b) => b.fecha.localeCompare(a.fecha) || b.creado - a.creado);
        const idsH = new Set(HABITOS.map((x) => x[0]));
        for (const [f, arr] of Object.entries(d.habitos)) if (/^\d{4}-\d{2}-\d{2}$/.test(f) && Array.isArray(arr)) datos.habitos[f] = [...new Set([...(datos.habitos[f] || []), ...arr.filter((x) => idsH.has(x))])];
        guardar(); pintar(true);
      } catch (_) { msg.textContent = "No se pudo leer ese archivo."; }
    });
    fila.append(ex, im);
    card.append(fila, msg, inp);
    return card;
  }

  pintar();
}
