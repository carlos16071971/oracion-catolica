"""Capturas en móvil para revisar la interfaz. Uso: python3 scripts/capturas.py [carpeta_salida]"""
import os, sys, subprocess, time
from playwright.sync_api import sync_playwright

AQUI = os.path.dirname(os.path.abspath(__file__))
RAIZ = os.path.join(AQUI, "..", "public")
SALIDA = sys.argv[1] if len(sys.argv) > 1 else os.path.join(AQUI, "..", "shots")
os.makedirs(SALIDA, exist_ok=True)

srv = subprocess.Popen([sys.executable, "-m", "http.server", "8799", "-d", RAIZ], stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
time.sleep(1)
CASOS = [
    ("manana", "2026-11-24", "07:30"),
    ("tarde", "2026-11-23", "16:13"),
    ("noche", "2026-11-23", "21:00"),
    ("navidad", "2026-12-25", "08:00"),
    ("nochebuena", "2026-12-24", "21:00"),
    ("madre", "2027-05-09", "09:00"),
    ("guadalupe_mañana", "2026-12-12", "09:00"),
]
try:
    with sync_playwright() as p:
        b = p.chromium.launch(executable_path="/usr/bin/google-chrome", args=["--no-sandbox"])
        errores = []
        for nombre, f, h in CASOS:
            ctx = b.new_context(viewport={"width": 390, "height": 800}, device_scale_factor=2, locale="es-EC")
            pg = ctx.new_page()
            pg.on("pageerror", lambda e: errores.append(str(e)))
            pg.on("console", lambda m: errores.append(m.text) if m.type == "error" else None)
            pg.goto(f"http://localhost:8799/index.html?fecha={f}&hora={h}")
            pg.wait_for_timeout(1700)
            pg.screenshot(path=os.path.join(SALIDA, f"{nombre}_0_bienvenida.png"))
            pg.click("#btnEntrar")
            pg.wait_for_timeout(1500)
            pg.screenshot(path=os.path.join(SALIDA, f"{nombre}_1_app.png"))
            ctx.close()
        # figuras: una captura de cada figura (mañana) para revisar los dibujos
        ctx = b.new_context(viewport={"width": 390, "height": 800}, device_scale_factor=1)
        pg = ctx.new_page()
        pg.goto("http://localhost:8799/index.html?fecha=2026-03-01&hora=08:00")
        pg.wait_for_timeout(500)
        pg.click("#btnEntrar")
        ids = pg.evaluate("""async () => { const m = await import('./data/figuras.js'); return [...m.FIGURAS.map(f=>f.id),'cruz']; }""")
        for i, fid in enumerate(ids):
            pg.evaluate("""async (fid) => { const a = await import('./art.js'); document.getElementById('arte').innerHTML = a.arte(fid,{periodo: %s, seed: 7, motivo: 6, variante: 1}); }""" % ("'manana'"), fid)
            pg.wait_for_timeout(120)
            pg.locator("#arte").screenshot(path=os.path.join(SALIDA, f"fig_{i:02d}_{fid}.png"))
        # salir
        pg.click("#btnSalir")
        pg.wait_for_timeout(1200)
        pg.screenshot(path=os.path.join(SALIDA, "despedida.png"))
        b.close()
    print("errores de consola/página:", errores if errores else "ninguno")
finally:
    srv.terminate()
