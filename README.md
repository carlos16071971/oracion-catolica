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

## Publicar desde el celular (sin comandos)

El código se sube a GitHub desde Claude. Tú solo conectas Cloudflare **una vez**:

1. Entra a **dash.cloudflare.com** desde el celular e inicia sesión (o crea la cuenta gratis).
2. Menú ☰ → **Workers y Pages** → **Crear** → pestaña **Pages** → **Conectar con Git**.
3. Autoriza GitHub y elige el repositorio **oracion-catolica**.
4. Configura: *Nombre del proyecto* `oracion-catolica` · *Rama de producción* `main` · *Ajuste preestablecido* **Ninguno** · *Comando de compilación* (vacío) · *Directorio de salida* `public`.
5. Toca **Guardar e implementar**. En 1–2 minutos queda en `https://oracion-catolica.pages.dev`.

Desde entonces, cada actualización que se suba a GitHub se publica sola. La app muestra a los usuarios un aviso con la versión y el mensaje del cambio (`public/version.json`, historial en `CHANGELOG.md`).

**Instalar en el teléfono:** iPhone → Safari → Compartir → *Añadir a pantalla de inicio*. Android → Chrome → menú ⋮ → *Instalar aplicación*.

## Publicar desde un computador (automático, sin escribir comandos)

Haz **doble clic en `PUBLICAR.bat`** (Windows) o `PUBLICAR.command` (Mac/Linux). Requiere tener instalados [Node.js](https://nodejs.org) y [GitHub CLI](https://cli.github.com).

La primera vez el asistente:
1. abre el navegador para que inicies sesión en GitHub,
2. crea el repositorio privado `oracion-catolica` y sube el código,
3. te pide **un solo dato**: un token de Cloudflare (te indica dónde crearlo) y de ahí obtiene la cuenta, crea el proyecto de Pages y guarda los secretos,
4. despliega y te muestra el enlace: `https://oracion-catolica.pages.dev`.

Después, cada vez que hagas cambios, ejecuta el mismo archivo (o simplemente haz `git push`): GitHub Actions verifica el contenido y vuelve a desplegar solo. Para ver los pasos sin ejecutar nada: `npm run publicar -- --simulacro`.

Alternativa sin token: en Cloudflare → *Workers & Pages → Connect to Git*, elige el repo, directorio de salida `public`, sin build.

## Estructura

```
public/
  index.html  styles.css  app.js     interfaz
  motor.js                           calendario, horarios y composición de la oración
  art.js                             fondos vectoriales
  data/                              textos: figuras, mañana, noche, celebraciones, bienvenidas
  sw.js  manifest.webmanifest  icons/  PWA
scripts/verificar.mjs                pruebas de contenido
  scripts/publicar.mjs                 publicación automática (GitHub + Cloudflare)
```

## Nota sobre los textos

Las oraciones y reflexiones son composiciones originales de inspiración católica, con citas bíblicas de referencia. Antes de publicarlas ampliamente conviene que las revise un sacerdote o catequista para validar el tono doctrinal.
