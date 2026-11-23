// Publica TODO automáticamente: GitHub + Cloudflare Pages. Sin escribir comandos a mano.
//   Primera vez: crea el repositorio, conecta Cloudflare, guarda los secretos y despliega.
//   Después:     guarda tus cambios y los sube; GitHub Actions despliega solo.
// Uso: npm run publicar   (o doble clic en PUBLICAR.bat / PUBLICAR.command)
//      npm run publicar -- --simulacro   (muestra los pasos sin ejecutar nada)
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import readline from "node:readline";

const RAIZ = join(dirname(fileURLToPath(import.meta.url)), "..");
const SIM = process.argv.includes("--simulacro");
const PROYECTO = "oracion-catolica";
const win = process.platform === "win32";

const paso = (t) => console.log(`\n▶ ${t}`);
const ok = (t) => console.log(`  ✓ ${t}`);
const falla = (t) => { console.error(`\n✗ ${t}`); process.exit(1); };

function run(cmd, args, { inherit = false, input } = {}) {
  if (SIM) { console.log(`  [simulacro] ${cmd} ${args.map((a) => (a.length > 40 ? "…" : a)).join(" ")}`); return { status: 0, stdout: "" }; }
  const r = spawnSync(cmd, args, { cwd: RAIZ, encoding: "utf8", stdio: inherit ? "inherit" : "pipe", input, shell: win });
  return { status: r.status ?? 1, stdout: (r.stdout || "").trim(), stderr: (r.stderr || "").trim() };
}

function preguntar(q, oculto = false) {
  return new Promise((res) => {
    const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
    if (oculto) { process.stdout.write(q); rl._writeToOutput = () => {}; }
    let hecho = false;
    rl.on("close", () => { if (!hecho) res(""); });
    rl.question(oculto ? "" : q, (a) => { hecho = true; rl.close(); if (oculto) console.log(""); res(a.trim()); });
  });
}

async function cf(ruta, token, metodo = "GET", cuerpo) {
  const r = await fetch("https://api.cloudflare.com/client/v4" + ruta, {
    method: metodo,
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    body: cuerpo ? JSON.stringify(cuerpo) : undefined
  });
  return r.json().catch(() => ({ success: false, errors: [{ message: "Respuesta inválida" }] }));
}

console.log("✝  Oración Católica — publicación automática" + (SIM ? "  (SIMULACRO)" : ""));

// 1) Herramientas
paso("Revisando herramientas");
if (run("git", ["--version"]).status !== 0) falla("Falta instalar Git: https://git-scm.com/downloads");
if (run("gh", ["--version"]).status !== 0) falla("Falta instalar GitHub CLI: https://cli.github.com  (instálalo y vuelve a ejecutar este archivo)");
ok("git y gh disponibles");

// 2) Sesión de GitHub (abre el navegador solo la primera vez)
paso("Iniciando sesión en GitHub");
if (run("gh", ["auth", "status"]).status !== 0) {
  console.log("  Se abrirá el navegador: inicia sesión y autoriza.");
  if (run("gh", ["auth", "login", "--web", "--git-protocol", "https", "--scopes", "repo,workflow"], { inherit: true }).status !== 0) falla("No se pudo iniciar sesión en GitHub.");
}
run("gh", ["auth", "setup-git"]);
ok("sesión de GitHub lista");

// 3) Repositorio
paso("Preparando el repositorio");
const tieneOrigin = run("git", ["remote", "get-url", "origin"]).status === 0;
let primeraVez = !tieneOrigin;
if (primeraVez) {
  const c = run("gh", ["repo", "create", PROYECTO, "--private", "--source=.", "--remote=origin"]);
  if (c.status !== 0) falla("No se pudo crear el repositorio: " + (c.stderr || c.stdout));
  ok(`repositorio privado «${PROYECTO}» creado en tu cuenta`);
} else ok("el repositorio ya existe");

// 4) Cloudflare (solo si aún no hay secretos guardados)
const secretos = run("gh", ["secret", "list"]).stdout;
if (SIM || !secretos.includes("CLOUDFLARE_API_TOKEN")) {
  paso("Conectando con Cloudflare");
  let token = process.env.CLOUDFLARE_API_TOKEN || "";
  if (!token) {
    console.log("  Necesito un token de Cloudflare (una sola vez):");
    console.log("   1. Abre https://dash.cloudflare.com/profile/api-tokens → «Create Token» → «Create Custom Token»");
    console.log("   2. Permiso: Account · Cloudflare Pages · Edit   (Account Resources: tu cuenta)");
    console.log("   3. Copia el token y pégalo aquí (no se muestra al pegarlo).");
    token = SIM ? "" : await preguntar("  Token de Cloudflare: ", true);
  }
  if (SIM) token = token || "token-simulado";
  if (!token) falla("No se ingresó el token.");

  let cuenta = "cuenta-simulada";
  if (!SIM) {
    const v = await cf("/user/tokens/verify", token);
    if (!v.success) falla("Cloudflare rechazó el token. Revisa que lo copiaste completo.");
    const a = await cf("/accounts?per_page=20", token);
    const lista = a.result || [];
    if (!lista.length) falla("El token no tiene acceso a ninguna cuenta. Agrega «Account Resources» al token.");
    if (lista.length === 1) cuenta = lista[0].id;
    else {
      lista.forEach((x, i) => console.log(`   ${i + 1}. ${x.name}`));
      const n = Number(await preguntar("  Elige la cuenta (número): "));
      if (!lista[n - 1]) falla("Número de cuenta inválido.");
      cuenta = lista[n - 1].id;
    }
    ok("token válido y cuenta encontrada");
    const p = await cf(`/accounts/${cuenta}/pages/projects`, token, "POST", { name: PROYECTO, production_branch: "main" });
    if (p.success) ok(`proyecto de Cloudflare Pages «${PROYECTO}» creado`);
    else if (JSON.stringify(p.errors).includes("8000002") || /already exists/i.test(JSON.stringify(p.errors))) ok("el proyecto de Cloudflare Pages ya existía");
    else falla("No se pudo crear el proyecto en Cloudflare: " + JSON.stringify(p.errors) + "\n  (¿el token incluye el permiso «Cloudflare Pages · Edit»?)");
  }
  for (const [n, v] of [["CLOUDFLARE_API_TOKEN", token], ["CLOUDFLARE_ACCOUNT_ID", cuenta]]) {
    if (run("gh", ["secret", "set", n], { input: v }).status !== 0) falla(`No se pudo guardar el secreto ${n} en GitHub.`);
  }
  ok("secretos guardados en GitHub");
}

// 5) Guardar cambios y subir (esto dispara el despliegue automático)
paso("Subiendo la aplicación");
run("git", ["branch", "-M", "main"]);
if (run("git", ["status", "--porcelain"]).stdout) {
  run("git", ["add", "-A"]);
  const f = new Date().toISOString().slice(0, 16).replace("T", " ");
  if (run("git", ["commit", "-q", "-m", `Actualización ${f}`]).status !== 0) falla("No se pudieron guardar los cambios (git commit).");
  ok("cambios guardados");
}
const push = run("git", ["push", "-u", "origin", "main"]);
if (push.status !== 0) falla("No se pudo subir a GitHub: " + (push.stderr || push.stdout));
ok("código en GitHub");

// 6) Esperar el despliegue
paso("Desplegando en Cloudflare Pages");
if (!SIM) {
  await new Promise((r) => setTimeout(r, 6000));
  const id = run("gh", ["run", "list", "--workflow", "deploy.yml", "--limit", "1", "--json", "databaseId", "-q", ".[0].databaseId"]).stdout;
  if (id) {
    const w = run("gh", ["run", "watch", id, "--exit-status"], { inherit: true });
    if (w.status !== 0) falla("El despliegue falló. Mira el detalle con:  gh run view --log-failed");
  }
}
console.log(`\n✅ Listo. Tu app: https://${PROYECTO}.pages.dev`);
console.log("   De ahora en adelante, cada vez que ejecutes este archivo (o hagas push) se actualiza sola.");
