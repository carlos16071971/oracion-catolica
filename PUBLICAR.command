#!/bin/bash
# Doble clic (Mac) o ./PUBLICAR.command (Linux): publica la app automáticamente.
cd "$(dirname "$0")" || exit 1
node scripts/publicar.mjs
read -n 1 -s -r -p $'\nPresiona una tecla para cerrar...'
