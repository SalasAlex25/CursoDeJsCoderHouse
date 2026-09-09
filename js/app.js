document.addEventListener("DOMContentLoaded", () => {
  cargarReservas();
  cargarExperiencias();
  document.getElementById("buscador-experiencias").addEventListener("input", ({ target }) => filtrarExperiencias(target.value));
  document.getElementById("experiencia-seleccionada").addEventListener("change", actualizarFormularioReserva);
  document.getElementById("personas-reserva").addEventListener("input", actualizarFormularioReserva);
  document.getElementById("formulario-reserva").addEventListener("submit", crearReserva);
  document.getElementById("boton-vaciar").addEventListener("click", vaciarReservas);
});
