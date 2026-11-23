# Oración Católica

PWA (HTML/CSS/JS sin dependencias) que muestra una **oración con su reflexión** para cada amanecer y cada noche, todo el año, con fondos artísticos de Dios, Jesús, la Virgen María y los santos.

## Cómo se comporta

| Hora local | Qué muestra |
|---|---|
| 00:00 – 11:59 | Oración de la mañana: bendiciones de un nuevo día |
| 12:00 – 19:59 | La oración de la mañana sigue visible, con aviso y cuenta regresiva hasta las 20:00 |
| 20:00 – 23:59 | Oración de la noche: gratitud por haber aprovechado y disfrutado las bendiciones del día |

- Pantalla única con **dos tarjetas**: la oración (con la figura de fondo) y su reflexión (con cita bíblica y un propósito).
- **Bienvenida distinta cada día** al entrar (saludo según la hora + título + frase; 20 × 19 combinaciones = 380 días sin repetir).
- Botón **Salir** solo con icono. Muestra una despedida y, si el navegador lo permite, cierra la ventana (en una PWA instalada el sistema suele impedirlo; la pantalla de despedida queda y se vuelve tocándola).
- Funciona **sin conexión** (service worker) y se puede instalar en el teléfono.

### Celebraciones con oraciones propias (mañana y noche)

Día de la Madre · Día del Padre · Nacimiento del Niño Jesús (24 dic) · Navidad (25 dic) · Fin de año (31 dic) · y además Año Nuevo, Viernes Santo, Domingo de Pascua, Inmaculada Concepción (8 dic), Virgen de Guadalupe (12 dic) y Fieles Difuntos (2 nov).

Fechas calculadas para **Ecuador**: Día de la Madre = 2.º domingo de mayo, Día del Padre = 3.er domingo de junio. Para otro país cambia las dos líneas `diaDeLaMadre` / `diaDelPadre` en `public/motor.js`.

### Cómo se evita repetir oraciones

Cada oración se arma con 5 conjuntos de tamaño **17, 21, 61, 13 y 23** (apertura, figura que intercede, intención, cierre, propósito). Como no comparten divisores, ninguna combinación se repite en un año (`npm run verificar` lo comprueba para 2026 y 2028, bisiesto). Las **intenciones y reflexiones** (61 por momento del día) son el núcleo temático y sí rotan unas 6 veces al año, con distinta figura, apertura, cierre y propósito.

### Fondos

Son ilustraciones vectoriales originales (`public/art.js`): 21 figuras (Dios Padre, Jesús Sagrado Corazón, Divina Misericordia, Cristo Resucitado, Espíritu Santo, María Inmaculada, Virgen del Cisne, de Guadalupe, del Quinche, de la Merced, del Carmen, de Fátima, de Lourdes, Dolorosa, Santa Narcisa de Jesús, Santa Mariana de Jesús, San José, Divino Niño, San Miguel, San Francisco, Santa Teresita) + Cristo Crucificado para Viernes Santo. Cada día cambia la figura, 1 de 8 motivos decorativos, 1 de 5 matices del cielo y las posiciones. Para usar **fotos propias** mira `public/img/LEEME.txt`.

## Probar en local

```bash
npm run dev            # http://localhost:8787
npm run verificar      # comprueba 366 días sin repetir, celebraciones y horarios
```

Simular fecha y hora: `http://localhost:8787/?fecha=2026-12-25&hora=21:00`

## Subir a GitHub

```bash
gh auth login
gh repo create oracion-catolica --private --source=. --push
# o, sin gh:
git remote add origin https://github.com/TU_USUARIO/oracion-catolica.git && git push -u origin main
```

## Desplegar en Cloudflare Pages

**Opción A — conectar el repositorio (más simple, despliega en cada push):**
Cloudflare → *Workers & Pages* → *Create* → *Pages* → *Connect to Git* → elige el repo.
Framework: *None* · Build command: *(vacío)* · Build output directory: `public`.

**Opción B — GitHub Actions** (`.github/workflows/deploy.yml`, ya incluido): crea en GitHub los secretos `CLOUDFLARE_API_TOKEN` (permiso *Cloudflare Pages · Edit*) y `CLOUDFLARE_ACCOUNT_ID`, y crea el proyecto una vez con `npx wrangler pages project create oracion-catolica --production-branch=main`.

**Opción C — subida directa:** `npm run deploy` o sube la carpeta `public/` como zip en el panel.

Tras desplegar: *Purge Cache* y recarga forzada para evitar ver una versión vieja.

## Estructura

```
public/
  index.html  styles.css  app.js     interfaz
  motor.js                           calendario, horarios y composición de la oración
  art.js                             fondos vectoriales
  data/                              textos: figuras, mañana, noche, celebraciones, bienvenidas
  sw.js  manifest.webmanifest  icons/  PWA
scripts/verificar.mjs                pruebas de contenido
```

## Nota sobre los textos

Las oraciones y reflexiones son composiciones originales de inspiración católica, con citas bíblicas de referencia. Antes de publicarlas ampliamente conviene que las revise un sacerdote o catequista para validar el tono doctrinal.
