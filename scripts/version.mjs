// Sube la versión y registra el mensaje de la actualización (lo muestra la app a los usuarios).
// Uso: node scripts/version.mjs "Qué cambió"            → sube el último número (1.1.0 → 1.1.1)
//      node scripts/version.mjs "Qué cambió" --menor     → 1.1.0 → 1.2.0
import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const raiz = join(dirname(fileURLToPath(import.meta.url)), "..");
const arch = join(raiz, "public", "version.json");
const mensaje = process.argv.slice(2).find((a) => !a.startsWith("--"));
if (!mensaje) { console.error('Falta el mensaje. Ejemplo: node scripts/version.mjs "Nuevas oraciones de Cuaresma"'); process.exit(1); }

const v = JSON.parse(readFileSync(arch, "utf8"));
const [a, b, c] = v.version.split(".").map(Number);
v.version = process.argv.includes("--menor") ? `${a}.${b + 1}.0` : `${a}.${b}.${c + 1}`;
const hoy = new Date();
v.fecha = `${hoy.getFullYear()}-${String(hoy.getMonth() + 1).padStart(2, "0")}-${String(hoy.getDate()).padStart(2, "0")}`;
v.mensaje = mensaje;
writeFileSync(arch, JSON.stringify(v, null, 2) + "\n");

const cl = join(raiz, "CHANGELOG.md");
const previo = existsSync(cl) ? readFileSync(cl, "utf8").replace(/^# Historial de versiones\n\n/, "") : "";
writeFileSync(cl, `# Historial de versiones\n\n## ${v.version} — ${v.fecha}\n${mensaje}\n\n${previo}`);
console.log(`Versión ${v.version}: ${mensaje}`);
