/* Calculadora de Interés Simple
   Fórmulas:  I = C · i · n     F = C + I = C (1 + i·n)
   i y n deben estar en la MISMA unidad de tiempo. Se convierte
   el tiempo a "periodos de la tasa" para igualarlos. */
(function () {
  "use strict";

  const NOMBRES = {
    anual: ["año", "años"], semestral: ["semestre", "semestres"],
    trimestral: ["trimestre", "trimestres"], bimestral: ["bimestre", "bimestres"],
    mensual: ["mes", "meses"], diaria: ["día", "días"]
  };
  const UNIDADES = { anios: "años", meses: "meses", dias: "días" };

  /* Periodos por año según la frecuencia de la tasa */
  function periodosPorAnio(periodo, baseDias) {
    return { anual: 1, semestral: 2, trimestral: 4, bimestral: 6, mensual: 12, diaria: baseDias }[periodo];
  }
  /* Duración de una unidad de tiempo expresada en años */
  function unidadEnAnios(unidad, baseDias) {
    return { anios: 1, meses: 1 / 12, dias: 1 / baseDias }[unidad];
  }

  const f = {
    dinero: v => "$ " + v.toLocaleString("es-EC", { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
    num: v => v.toLocaleString("es-EC", { maximumFractionDigits: 6 })
  };

  const $ = id => document.getElementById(id);
  const form = $("form-calculadora");
  const campos = [$("capital"), $("tasa"), $("tiempo")];
  const out = { interes: $("res-interes"), monto: $("res-monto"), error: $("mensaje-error"), desglose: $("desglose") };

  const leer = input => {
    const t = input.value.trim().replace(",", ".");
    return t === "" ? NaN : Number(t);
  };

  function limpiar(mensaje) {
    out.interes.textContent = "—";
    out.monto.textContent = "—";
    out.desglose.innerHTML = "<p>Completa los tres datos para ver el procedimiento.</p>";
    out.error.textContent = mensaje || "";
  }

  function calcular() {
    campos.forEach(i => i.removeAttribute("aria-invalid"));
    if (campos.some(i => i.value.trim() === "")) return limpiar("");

    const [C, tasaPct, t] = campos.map(leer);
    const malos = campos.filter((_, k) => !(Number.isFinite([C, tasaPct, t][k]) && [C, tasaPct, t][k] >= 0));
    if (malos.length) {
      malos.forEach(i => i.setAttribute("aria-invalid", "true"));
      return limpiar("Ingresa solo números iguales o mayores que cero.");
    }

    const base = Number($("base-dias").value);
    const periodoTasa = $("periodo-tasa").value;
    const unidadTiempo = $("unidad-tiempo").value;

    const n = t * unidadEnAnios(unidadTiempo, base) * periodosPorAnio(periodoTasa, base);
    const i = tasaPct / 100;
    const I = C * i * n;
    const F = C + I;

    const nombre = NOMBRES[periodoTasa];
    const mismaUnidad = (unidadTiempo === "anios" && periodoTasa === "anual")
      || (unidadTiempo === "meses" && periodoTasa === "mensual")
      || (unidadTiempo === "dias" && periodoTasa === "diaria");

    out.error.textContent = "";
    out.interes.textContent = f.dinero(I);
    out.monto.textContent = f.dinero(F);
    out.desglose.innerHTML = `
      <p>i = ${f.num(tasaPct)} % = ${f.num(i)} por ${nombre[0]}</p>
      ${mismaUnidad ? "" : `<p>n = ${f.num(t)} ${UNIDADES[unidadTiempo]} = ${f.num(n)} ${nombre[1]}</p>`}
      <p><strong>Interés:</strong> I = C · i · n</p>
      <p>I = ${f.num(C)} × ${f.num(i)} × ${f.num(n)}</p>
      <p>I = <strong>${f.dinero(I)}</strong></p>
      <p><strong>Monto:</strong> F = C + I</p>
      <p>F = ${f.num(C)} + ${f.num(I)} = <strong>${f.dinero(F)}</strong></p>`;
  }

  /* Tiempo real: cualquier cambio en el formulario recalcula */
  form.addEventListener("input", calcular);
  form.addEventListener("submit", e => e.preventDefault());
  limpiar("");
})();
