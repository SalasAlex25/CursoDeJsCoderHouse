// ==========================================
// CLAVE DE STORAGE
// ==========================================

const CLAVE_STORAGE = "cordobaGeekEventos";


// ==========================================
// CLASE EVENTO
// ==========================================

class Evento {

    constructor({
        id,
        nombre,
        categoria,
        fecha,
        lugar,
        precio,
        cuposDisponibles,
        entradasReservadas
    }) {

        this.id = id;
        this.nombre = nombre;
        this.categoria = categoria;
        this.fecha = fecha ?? "Por confirmar";
        this.lugar = lugar ?? "Por confirmar";
        this.precio = precio ?? 0;
        this.cuposDisponibles = cuposDisponibles ?? 0;
        this.entradasReservadas = entradasReservadas ?? 0;

    }


    reservarEntrada(cantidad) {

        if (cantidad > this.cuposDisponibles) {
            return "No hay suficientes cupos disponibles.";
        }


        this.cuposDisponibles -= cantidad;
        this.entradasReservadas += cantidad;


        return "ok";

    }

}


// ==========================================
// EVENTOS INICIALES
// ==========================================

const eventosIniciales = [

    new Evento({
        id: 1,
        nombre: "Córdoba Comic Fest",
        categoria: "Convención",
        fecha: "15/08/2026",
        lugar: "Córdoba Capital",
        precio: 5000,
        cuposDisponibles: 100
    }),

    new Evento({
        id: 2,
        nombre: "Torneo Gaming Córdoba",
        categoria: "Gaming",
        fecha: "20/08/2026",
        lugar: "Nueva Córdoba",
        precio: 3500,
        cuposDisponibles: 60
    }),

    new Evento({
        id: 3,
        nombre: "Feria Geek Alta Gracia",
        categoria: "Feria",
        fecha: "05/09/2026",
        lugar: "Alta Gracia",
        precio: 0,
        cuposDisponibles: 200
    }),

    new Evento({
        id: 4,
        nombre: "Anime Fest Córdoba",
        categoria: "Anime",
        fecha: "12/09/2026",
        lugar: "Córdoba Capital",
        precio: 4500,
        cuposDisponibles: 150
    }),

    new Evento({
        id: 5,
        nombre: "Expo Comics Córdoba",
        categoria: "Convención",
        fecha: "25/09/2026",
        lugar: "Córdoba Capital",
        precio: 6000,
        cuposDisponibles: 120
    })

];


// ==========================================
// STORAGE: LEER Y GUARDAR ESTADO
// ==========================================

const cargarEventos = () => {

    let eventosCargados = eventosIniciales.map((evento) => new Evento(evento));

    try {
        const eventosGuardados = JSON.parse(
            localStorage.getItem(CLAVE_STORAGE) ?? "null"
        );

        const origenEventos = eventosGuardados ?? eventosIniciales;

        // JSON.parse devuelve objetos planos; se reconstruyen como Evento para recuperar metodos.
        eventosCargados = origenEventos.map((evento) => new Evento(evento));
    } catch (error) {
        console.error("No se pudieron leer los eventos guardados.", error);
        localStorage.removeItem(CLAVE_STORAGE);
        eventosCargados = eventosIniciales.map((evento) => new Evento(evento));
    } finally {
        console.info("Carga inicial del simulador finalizada.");
    }

    return eventosCargados;

};


const guardarEventos = () => {

    localStorage.setItem(
        CLAVE_STORAGE,
        JSON.stringify(eventos)
    );

};


let eventos = cargarEventos();


// ==========================================
// SELECCION DE ELEMENTOS DEL DOM
// ==========================================

const contenedorEventos = document.getElementById("contenedor-eventos");
const formularioEvento = document.getElementById("formulario-evento");
const inputNombre = document.getElementById("input-nombre");
const inputCategoria = document.getElementById("input-categoria");
const inputPrecio = document.getElementById("input-precio");
const inputCupos = document.getElementById("input-cupos");
const buscador = document.getElementById("buscador");
const feedback = document.getElementById("feedback");
const mensajeAsincronico = document.getElementById("mensaje-asincronico");
const contadorResultados = document.getElementById("contador-resultados");
const botonVaciar = document.getElementById("boton-vaciar");


// ==========================================
// FUNCIONES AUXILIARES
// ==========================================

const formatearPrecio = (precio) => precio === 0
    ? "Entrada libre"
    : "$" + precio.toLocaleString("es-AR");


const obtenerNuevoId = () => eventos.length === 0
    ? 1
    : Math.max(...eventos.map((evento) => evento.id)) + 1;


let temporizadorFeedback = null;


const mostrarFeedback = (mensaje, tipo) => {

    feedback.textContent = mensaje;
    feedback.className = `mensaje mensaje-${tipo}`;

    clearTimeout(temporizadorFeedback);

    temporizadorFeedback = setTimeout(() => {

        feedback.textContent = "";
        feedback.className = "mensaje";

    }, 4000);

};


// ==========================================
// RENDERIZADO DINAMICO
// ==========================================

const renderizarEventos = (filtro = "", idAResaltar = null) => {

    const termino = filtro.trim().toLowerCase();

    const eventosFiltrados = eventos.filter(({ nombre, categoria }) =>
        nombre.toLowerCase().includes(termino) ||
        categoria.toLowerCase().includes(termino)
    );


    if (eventosFiltrados.length === 0) {

        contenedorEventos.innerHTML =
            '<p class="sin-resultados">No se encontraron eventos guardados.</p>';

        contadorResultados.textContent =
            eventos.length === 0 ? "No hay eventos en storage." : "";

        return;

    }


    contenedorEventos.innerHTML = eventosFiltrados.map((evento) => {

        const {
            id,
            nombre,
            categoria,
            fecha,
            lugar,
            precio,
            cuposDisponibles,
            entradasReservadas
        } = evento;

        const claseDestacada = id === idAResaltar ? " destacado" : "";
        const textoCupos = cuposDisponibles > 0 ? `Cupos: ${cuposDisponibles}` : "Sin cupos";


        return `

            <article class="tarjeta-evento${claseDestacada}" data-id="${id}">

                <div class="tarjeta-info">

                    <h3>${nombre}</h3>

                    <p class="detalle">${categoria} | ${fecha} | ${lugar}</p>

                    <p class="precio">${formatearPrecio(precio)}</p>

                    <p class="cupos">${textoCupos} - Reservadas: ${entradasReservadas}</p>

                </div>

                <div class="tarjeta-acciones">

                    <button type="button" class="boton boton-secundario btn-reservar">Reservar</button>

                    <button type="button" class="boton boton-peligro btn-eliminar">Eliminar</button>

                </div>

            </article>

        `;

    }).join("");


    contadorResultados.textContent =
        `Se muestran ${eventosFiltrados.length} de ${eventos.length} eventos guardados.`;

};


// ==========================================
// AGREGAR EVENTO Y SINCRONIZAR STORAGE
// ==========================================

formularioEvento.addEventListener("submit", (e) => {

    e.preventDefault();

    const nombre = inputNombre.value.trim();
    const categoria = inputCategoria.value.trim();
    const precio = Number(inputPrecio.value);
    const cupos = Number(inputCupos.value);

    const datosValidos =
        nombre &&
        categoria &&
        !Number.isNaN(precio) &&
        !Number.isNaN(cupos) &&
        precio >= 0 &&
        cupos > 0;


    if (!datosValidos) {

        mostrarFeedback(
            "Completá todos los campos con valores válidos.",
            "error"
        );

        return;

    }


    const nuevoEvento = new Evento({
        id: obtenerNuevoId(),
        nombre,
        categoria,
        fecha: "Por confirmar",
        lugar: "Por confirmar",
        precio,
        cuposDisponibles: cupos
    });


    eventos.push(nuevoEvento);
    guardarEventos();
    renderizarEventos(buscador.value, nuevoEvento.id);

    formularioEvento.reset();
    inputNombre.focus();

    mostrarFeedback(
        `"${nuevoEvento.nombre}" fue agregado y guardado en localStorage.`,
        "exito"
    );

});


// ==========================================
// RESERVAR / ELIMINAR Y SINCRONIZAR STORAGE
// ==========================================

contenedorEventos.addEventListener("click", (e) => {

    const tarjeta = e.target.closest?.(".tarjeta-evento");

    if (!tarjeta) {
        return;
    }


    const id = Number(tarjeta.dataset.id);
    const evento = eventos.find((ev) => ev.id === id);

    if (!evento) {
        return;
    }


    if (e.target.classList.contains("btn-reservar")) {

        const resultado = evento.reservarEntrada(1);
        const esReservaExitosa = resultado === "ok";

        guardarEventos();
        renderizarEventos(buscador.value);

        mostrarFeedback(
            esReservaExitosa
                ? `Entrada reservada para "${evento.nombre}". El stock actualizado quedó guardado.`
                : resultado,
            esReservaExitosa ? "exito" : "error"
        );

    }


    if (e.target.classList.contains("btn-eliminar")) {

        eventos = eventos.filter((ev) => ev.id !== id);
        guardarEventos();
        renderizarEventos(buscador.value);

        mostrarFeedback(
            `"${evento.nombre}" fue eliminado del DOM y del localStorage.`,
            "exito"
        );

    }

});


// ==========================================
// BUSQUEDA EN VIVO
// ==========================================

buscador.addEventListener("input", (e) => {

    renderizarEventos(e.target.value);

});


// ==========================================
// VACIAR DATOS DEL SIMULADOR
// ==========================================

botonVaciar.addEventListener("click", () => {

    eventos = [];
    guardarEventos();
    renderizarEventos(buscador.value);

    mostrarFeedback(
        "Se vaciaron los eventos guardados en localStorage.",
        "exito"
    );

});


// ==========================================
// RENDERIZADO INICIAL
// ==========================================

renderizarEventos();


setTimeout(() => {

    mensajeAsincronico.textContent =
        "Cotizacion de referencia del dolar hoy: $1.200. Dato util para planificar reservas.";

}, 2500);
