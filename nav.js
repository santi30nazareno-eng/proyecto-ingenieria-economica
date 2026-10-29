/* Construye el menú lateral y la portada a partir de js/config.js.
   Cada página declara data-raiz="./" (index) o data-raiz="../" (modulos/)
   y data-modulo="<id>" cuando es un módulo. */
(function () {
  "use strict";
  const cfg = window.CONFIG_SITIO;
  const raiz = document.body.dataset.raiz || "./";
  const actual = document.body.dataset.modulo || "";

  function crear(tag, props, hijos) {
    const el = document.createElement(tag);
    Object.assign(el, props || {});
    (hijos || []).forEach(h => el.append(h));
    return el;
  }

  /* ----- Menú lateral ----- */
  const menu = document.getElementById("menu-lateral");
  if (menu) {
    const parciales = [...new Set(cfg.modulos.map(m => m.parcial))].sort((a, b) => a - b);
    parciales.forEach(p => {
      menu.append(crear("h2", { textContent: "Parcial " + p }));
      const ul = crear("ul");
      cfg.modulos.filter(m => m.parcial === p).forEach(m => {
        const li = crear("li");
        if (m.estado === "disponible") {
          const a = crear("a", { href: raiz + m.archivo, textContent: m.titulo });
          if (m.id === actual) a.setAttribute("aria-current", "page");
          li.append(a);
        } else {
          li.append(crear("span", { className: "proximamente", textContent: m.titulo + " (próximamente)" }));
        }
        ul.append(li);
      });
      menu.append(ul);
    });
  }

  /* ----- Botón del menú (móvil) ----- */
  const boton = document.getElementById("boton-menu");
  if (boton && menu) {
    boton.addEventListener("click", () => {
      const abierto = menu.classList.toggle("abierto");
      boton.setAttribute("aria-expanded", String(abierto));
    });
  }

  /* ----- Portada: tarjetas de módulos ----- */
  const rejilla = document.getElementById("rejilla-modulos");
  if (rejilla) {
    cfg.modulos.filter(m => m.estado === "disponible").forEach(m => {
      rejilla.append(crear("a", { className: "tarjeta-modulo", href: raiz + m.archivo }, [
        crear("h3", { textContent: m.titulo }),
        crear("p", { textContent: m.descripcion })
      ]));
    });
  }

  const anio = document.getElementById("anio");
  if (anio) anio.textContent = new Date().getFullYear();
})();
