"""Genera los iconos PNG de la PWA (mismo diseño que icons/icon.svg). Uso: python3 scripts/generar-iconos.py"""
import math, os
from PIL import Image, ImageDraw

AQUI = os.path.dirname(os.path.abspath(__file__))
SALIDA = os.path.join(AQUI, "..", "public", "icons")

def mezcla(a, b, t):
    return tuple(round(a[i] + (b[i] - a[i]) * t) for i in range(3))

def icono(n, redondeado=True, escala_cruz=1.0):
    S = n * 2  # supersampling
    im = Image.new("RGB", (S, S))
    px = im.load()
    c1, c2, c3 = (255, 179, 71), (255, 77, 109), (59, 28, 122)
    for y in range(S):
        t = y / (S - 1)
        col = mezcla(c1, c2, t / 0.5) if t < 0.5 else mezcla(c2, c3, (t - 0.5) / 0.5)
        for x in range(S):
            px[x, y] = col
    d = ImageDraw.Draw(im, "RGBA")
    cx, cy = S / 2, S * 0.45
    for ang in range(0, 360, 20):
        a = math.radians(ang)
        d.line([(cx, cy), (cx + S * math.cos(a), cy + S * math.sin(a))], fill=(255, 246, 194, 60), width=max(2, S // 70))
    r = S * 0.30 * escala_cruz
    d.ellipse([cx - r * 1.4, cy - r * 1.4, cx + r * 1.4, cy + r * 1.4], fill=(255, 212, 94, 70))
    d.ellipse([cx - r, cy - r, cx + r, cy + r], fill=(255, 226, 120, 255))
    d.ellipse([cx - r * .7, cy - r * .7, cx + r * .7, cy + r * .7], fill=(255, 245, 200, 255))
    k = S * 0.0781 * escala_cruz  # semiancho del brazo
    d.rounded_rectangle([cx - k / 2 * 1.0, cy - S * .195 * escala_cruz, cx + k / 2 * 1.0, cy + S * .195 * escala_cruz], radius=S // 60, fill=(59, 28, 122, 255))
    d.rounded_rectangle([cx - S * .129 * escala_cruz, cy - S * .095 * escala_cruz, cx + S * .129 * escala_cruz, cy - S * .095 * escala_cruz + S * .074 * escala_cruz], radius=S // 60, fill=(59, 28, 122, 255))
    d.pieslice([S * .19, S * .78, S * .81, S * 1.12], 180, 360, fill=(26, 16, 64, 140))
    im = im.resize((n, n), Image.LANCZOS)
    if redondeado:
        m = Image.new("L", (n, n), 0)
        ImageDraw.Draw(m).rounded_rectangle([0, 0, n - 1, n - 1], radius=int(n * .22), fill=255)
        out = Image.new("RGBA", (n, n), (0, 0, 0, 0))
        out.paste(im, (0, 0), m)
        return out
    return im

os.makedirs(SALIDA, exist_ok=True)
icono(192).save(os.path.join(SALIDA, "icon-192.png"))
icono(512).save(os.path.join(SALIDA, "icon-512.png"))
icono(512, redondeado=False, escala_cruz=0.78).save(os.path.join(SALIDA, "icon-maskable-512.png"))
print("iconos generados")
