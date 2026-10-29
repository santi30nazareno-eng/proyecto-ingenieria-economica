/* ==========================================================
   REGISTRO DE MÓDULOS
   Para agregar un tema nuevo:
   1) Crea modulos/<id>.html (copia interes-simple.html).
   2) Agrega un objeto a este arreglo. El menú y la portada
      se actualizan solos.
   Estados: "disponible" | "proximamente"
   ========================================================== */
window.CONFIG_SITIO = {
  titulo: "Ingeniería Económica",
  modulos: [
    {
      id: "interes-simple",
      parcial: 1,
      titulo: "Interés simple",
      descripcion: "Capital, tasa, tiempo, interés y monto final.",
      archivo: "modulos/interes-simple.html",
      estado: "disponible"
    },
    {
      id: "interes-compuesto",
      parcial: 1,
      titulo: "Interés compuesto",
      descripcion: "Capitalización y valor futuro.",
      archivo: "modulos/interes-compuesto.html",
      estado: "proximamente"
    }
  ]
};
