# Ingeniería Económica — Plataforma interactiva

HTML + CSS + JavaScript puro, sin backend ni dependencias.

## Estructura
```
index.html              Portada (tarjetas generadas desde config.js)
css/styles.css          Estilos; colores y fuentes en :root
js/config.js            Registro de módulos (menú y portada)
js/nav.js               Construye menú y portada
js/interes-simple.js    Lógica de la calculadora del módulo 1
modulos/                Un .html por tema
```

## Agregar un módulo nuevo
1. Copia `modulos/interes-simple.html` a `modulos/<tema>.html` y cambia el contenido y `data-modulo`.
2. Crea `js/<tema>.js` con su calculadora y enlázalo al final del HTML.
3. En `js/config.js` agrega el módulo (o cambia `estado` a `"disponible"`).

## Publicar en GitHub Pages
Sube la carpeta a un repositorio → Settings → Pages → Branch `main` / carpeta raíz.
Todas las rutas son relativas, funciona en `usuario.github.io/repositorio/`.
