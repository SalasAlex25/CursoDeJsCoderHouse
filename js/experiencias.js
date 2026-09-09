let experiencias = [];

// Carga las experiencias desde la base de datos JSON.
async function cargarExperiencias() {
  const estadoCarga = document.getElementById("estado-carga");
  try {
    const respuesta = await fetch("data/experiencias.json");
    if (!respuesta.ok) throw new Error("No se pudo cargar la agenda");
    experiencias = await respuesta.json();
    renderizarExperiencias(experiencias);
    cargarOpcionesExperiencia(experiencias);
  } catch (error) {
    estadoCarga.textContent = "No se pudo cargar la agenda. Intentá nuevamente.";
  } finally {
    estadoCarga.hidden = true;
  }
}

// Dibuja las tarjetas de experiencias en el DOM.
function renderizarExperiencias(lista) {
  const contenedor = document.getElementById("contenedor-experiencias");
  contenedor.innerHTML = lista.length ? lista.map(crearTarjetaExperiencia).join("") : "<p>No encontramos experiencias.</p>";
  contenedor.querySelectorAll("[data-experiencia-id]").forEach((tarjeta) => {
    tarjeta.addEventListener("click", () => seleccionarExperiencia(Number(tarjeta.dataset.experienciaId)));
  });
}

// Genera el HTML de una tarjeta individual.
function crearTarjetaExperiencia(experiencia) {
  const { id, nombre, categoria, descripcion, precio, duracion, cupos, imagen } = experiencia;
  return `<article class="tarjeta-experiencia" data-experiencia-id="${id}">
    <div class="imagen-experiencia" style="background-image:url('${imagen}')"></div>
    <div class="contenido-tarjeta"><span class="etiqueta">${categoria}</span><h3>${nombre}</h3>
    <p>${descripcion}</p><div class="datos-tarjeta"><span>${duracion}</span><span>${cupos} cupos</span></div>
    <strong>$${precio.toLocaleString("es-AR")} por persona</strong></div>
  </article>`;
}

// Completa el selector con las experiencias disponibles.
function cargarOpcionesExperiencia(lista) {
  const selector = document.getElementById("experiencia-seleccionada");
  selector.innerHTML += lista.map(({ id, nombre }) => `<option value="${id}">${nombre}</option>`).join("");
}

// Selecciona una experiencia y actualiza el formulario.
function seleccionarExperiencia(idExperiencia) {
  const selector = document.getElementById("experiencia-seleccionada");
  selector.value = idExperiencia;
  actualizarFormularioReserva();
  document.getElementById("titulo-reserva").scrollIntoView({ behavior: "smooth" });
}

// Filtra las experiencias por nombre o categoría.
function filtrarExperiencias(texto) {
  const busqueda = texto.trim().toLowerCase();
  const resultado = experiencias.filter(({ nombre, categoria }) => `${nombre} ${categoria}`.toLowerCase().includes(busqueda));
  renderizarExperiencias(resultado);
}
