let reservas = [];

// Recupera las reservas guardadas en el navegador.
function cargarReservas() {
  reservas = JSON.parse(localStorage.getItem("reservas-geek")) || [];
  renderizarReservas();
}

// Guarda el estado actual de las reservas.
function guardarReservas() {
  localStorage.setItem("reservas-geek", JSON.stringify(reservas));
}

// Actualiza el resumen de precio del formulario.
function actualizarFormularioReserva() {
  const id = Number(document.getElementById("experiencia-seleccionada").value);
  const personas = Number(document.getElementById("personas-reserva").value) || 1;
  const experiencia = experiencias.find((item) => item.id === id);
  const resumen = document.getElementById("resumen-reserva");
  resumen.textContent = experiencia ? `Total estimado: $${(experiencia.precio * personas).toLocaleString("es-AR")}` : "Seleccioná una experiencia para ver el precio.";
  actualizarHorarios(experiencia);
}

// Muestra los horarios disponibles de la experiencia elegida.
function actualizarHorarios(experiencia) {
  const selector = document.getElementById("horario-reserva");
  selector.innerHTML = `<option value="">Seleccioná un horario</option>${experiencia ? experiencia.horarios.map((horario) => `<option value="${horario}">${horario}</option>`).join("") : ""}`;
}

// Crea una reserva y la persiste en localStorage.
function crearReserva(evento) {
  evento.preventDefault();
  const formulario = evento.currentTarget;
  const datos = new FormData(formulario);
  const experiencia = experiencias.find((item) => item.id === Number(datos.get("experiencia")));
  const reserva = { id: Date.now(), experienciaId: experiencia.id, nombre: experiencia.nombre, fecha: datos.get("fecha"), horario: datos.get("horario"), personas: Number(datos.get("personas")), total: experiencia.precio * Number(datos.get("personas")) };
  reservas.push(reserva);
  guardarReservas();
  renderizarReservas();
  formulario.reset();
  actualizarFormularioReserva();
  Toastify({ text: "Reserva guardada correctamente", duration: 2200, gravity: "top", position: "right" }).showToast();
}

// Muestra las reservas persistidas en el DOM.
function renderizarReservas() {
  const contenedor = document.getElementById("contenedor-reservas");
  contenedor.innerHTML = reservas.length ? reservas.map((reserva) => `<article class="reserva-item"><div><strong>${reserva.nombre}</strong><p>${reserva.fecha} · ${reserva.horario} · ${reserva.personas} persona(s)</p></div><div><strong>$${reserva.total.toLocaleString("es-AR")}</strong><button class="boton-eliminar" data-reserva-id="${reserva.id}">Cancelar</button></div></article>`).join("") : `<p class="estado">Todavía no tenés reservas guardadas.</p>`;
  contenedor.querySelectorAll("[data-reserva-id]").forEach((boton) => boton.addEventListener("click", () => cancelarReserva(Number(boton.dataset.reservaId))));
}

// Cancela una reserva después de confirmación visual.
function cancelarReserva(idReserva) {
  Swal.fire({ title: "¿Cancelar reserva?", icon: "warning", showCancelButton: true, confirmButtonText: "Sí, cancelar", cancelButtonText: "Volver" }).then(({ isConfirmed }) => {
    if (!isConfirmed) return;
    reservas = reservas.filter(({ id }) => id !== idReserva);
    guardarReservas();
    renderizarReservas();
    Toastify({ text: "Reserva cancelada", duration: 2000, gravity: "top", position: "right" }).showToast();
  });
}

// Vacía todas las reservas guardadas.
function vaciarReservas() {
  Swal.fire({ title: "¿Vaciar reservas?", icon: "question", showCancelButton: true, confirmButtonText: "Sí, vaciar", cancelButtonText: "Cancelar" }).then(({ isConfirmed }) => {
    if (!isConfirmed) return;
    reservas = [];
    guardarReservas();
    renderizarReservas();
  });
}
