document.addEventListener("DOMContentLoaded", () => {
  cargarReservas();
  cargarExperiencias();
  establecerFechaMinima();
  document.getElementById("buscador-experiencias").addEventListener("input", ({ target }) => filtrarExperiencias(target.value));
  document.getElementById("experiencia-seleccionada").addEventListener("change", actualizarFormularioReserva);
  document.getElementById("personas-reserva").addEventListener("input", actualizarFormularioReserva);
  document.getElementById("formulario-reserva").addEventListener("submit", crearReserva);
  document.getElementById("boton-vaciar").addEventListener("click", vaciarReservas);
});

// Impide seleccionar una fecha anterior al día actual.
function establecerFechaMinima() {
  const fechaActual = new Date().toISOString().split("T")[0];
  document.getElementById("fecha-reserva").min = fechaActual;
}
