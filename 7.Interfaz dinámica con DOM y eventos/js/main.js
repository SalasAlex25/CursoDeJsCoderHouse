// ==========================================
// CLASE EVENTO
// ==========================================

class Evento {

    constructor(
        id,
        nombre,
        categoria,
        fecha,
        lugar,
        precio,
        cuposDisponibles
    ) {

        this.id = id;
        this.nombre = nombre;
        this.categoria = categoria;
        this.fecha = fecha;
        this.lugar = lugar;
        this.precio = precio;
        this.cuposDisponibles = cuposDisponibles;
        this.entradasReservadas = 0;

    }


    reservarEntrada(cantidad) {

        if (cantidad <= 0) {
            return "La cantidad debe ser mayor a 0.";
        }


        if (cantidad > this.cuposDisponibles) {
            return "No hay suficientes cupos disponibles.";
        }


        this.cuposDisponibles -= cantidad;

        this.entradasReservadas += cantidad;


        return "ok";

    }

}


// ==========================================
// ARRAY DE EVENTOS
// ==========================================

const eventos = [

    new Evento(
        1,
        "Córdoba Comic Fest",
        "Convención",
        "15/08/2026",
        "Córdoba Capital",
        5000,
        100
    ),

    new Evento(
        2,
        "Torneo Gaming Córdoba",
        "Gaming",
        "20/08/2026",
        "Nueva Córdoba",
        3500,
        60
    ),

    new Evento(
        3,
        "Feria Geek Alta Gracia",
        "Feria",
        "05/09/2026",
        "Alta Gracia",
        0,
        200
    ),

    new Evento(
        4,
        "Anime Fest Córdoba",
        "Anime",
        "12/09/2026",
        "Córdoba Capital",
        4500,
        150
    ),

    new Evento(
        5,
        "Expo Comics Córdoba",
        "Convención",
        "25/09/2026",
        "Córdoba Capital",
        6000,
        120
    )

];


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

const contadorResultados = document.getElementById("contador-resultados");


// ==========================================
// FUNCIONES AUXILIARES
// ==========================================

const formatearPrecio = (precio) => {

    if (precio === 0) {
        return "Entrada libre";
    }

    return "$" + precio.toLocaleString("es-AR");

};


let temporizadorFeedback = null;


// Mostrar un mensaje visual de feedback al usuario
const mostrarFeedback = (mensaje, tipo) => {

    feedback.textContent = mensaje;

    feedback.className = `mensaje mensaje-${tipo}`;


    // El mensaje desaparece solo despues de unos segundos
    clearTimeout(temporizadorFeedback);

    temporizadorFeedback = setTimeout(() => {

        feedback.textContent = "";

        feedback.className = "mensaje";

    }, 4000);

};


// ==========================================
// RENDERIZADO DINAMICO
// ==========================================

// Limpia el contenedor y dibuja cada evento del array usando innerHTML
const renderizarEventos = (filtro = "", idAResaltar = null) => {

    const termino = filtro.trim().toLowerCase();


    // Filtro por nombre o categoria (evento input del teclado)
    const eventosFiltrados = eventos.filter(

        (evento) =>

            evento.nombre.toLowerCase().includes(termino) ||

            evento.categoria.toLowerCase().includes(termino)

    );


    if (eventosFiltrados.length === 0) {

        contenedorEventos.innerHTML =
            '<p class="sin-resultados">No se encontraron eventos.</p>';

        contadorResultados.textContent = "";

        return;

    }


    // Template string que se inyecta en el contenedor
    contenedorEventos.innerHTML = eventosFiltrados.map((evento) => `

        <article class="tarjeta-evento${evento.id === idAResaltar ? " destacado" : ""}" data-id="${evento.id}">

            <div class="tarjeta-info">

                <h3>${evento.nombre}</h3>

                <p class="detalle">${evento.categoria} | ${evento.fecha} | ${evento.lugar}</p>

                <p class="precio">${formatearPrecio(evento.precio)}</p>

                <p class="cupos">Cupos: ${evento.cuposDisponibles} - Reservadas: ${evento.entradasReservadas}</p>

            </div>

            <div class="tarjeta-acciones">

                <button type="button" class="boton boton-secundario btn-reservar">Reservar</button>

                <button type="button" class="boton boton-peligro btn-eliminar">Eliminar</button>

            </div>

        </article>

    `).join("");


    contadorResultados.textContent =
        `Se muestran ${eventosFiltrados.length} de ${eventos.length} eventos.`;

};


// ==========================================
// AGREGAR EVENTO - EVENTO SUBMIT DEL FORMULARIO
// ==========================================

formularioEvento.addEventListener("submit", (e) => {

    e.preventDefault();


    const nombre = inputNombre.value.trim();

    const categoria = inputCategoria.value.trim();

    const precio = Number(inputPrecio.value);

    const cupos = Number(inputCupos.value);


    if (!nombre || !categoria || Number.isNaN(precio) || precio < 0 || cupos <= 0) {

        mostrarFeedback(
            "Completá todos los campos con valores válidos.",
            "error"
        );

        return;

    }


    const nuevoId = Math.max(...eventos.map((ev) => ev.id)) + 1;


    const nuevoEvento = new Evento(
        nuevoId,
        nombre,
        categoria,
        "Por confirmar",
        "Por confirmar",
        precio,
        cupos
    );


    eventos.push(nuevoEvento);


    renderizarEventos(buscador.value, nuevoEvento.id);


    formularioEvento.reset();

    inputNombre.focus();


    mostrarFeedback(
        `"${nuevoEvento.nombre}" fue agregado al simulador.`,
        "exito"
    );

});


// ==========================================
// INTERACCION CON CADA TARJETA
// DELEGACION DE EVENTOS: un solo listener en el contenedor
// ==========================================

contenedorEventos.addEventListener("click", (e) => {

    // Busca la tarjeta mas cercana al elemento cliqueado
    const tarjeta = e.target.closest(".tarjeta-evento");


    if (!tarjeta) {
        return;
    }


    const id = Number(tarjeta.dataset.id);

    const evento = eventos.find((ev) => ev.id === id);


    if (e.target.classList.contains("btn-reservar")) {

        const resultado = evento.reservarEntrada(1);


        if (resultado === "ok") {

            mostrarFeedback(
                `Entrada reservada para "${evento.nombre}". Cupos restantes: ${evento.cuposDisponibles}.`,
                "exito"
            );

        } else {

            mostrarFeedback(resultado, "error");

        }

    }


    if (e.target.classList.contains("btn-eliminar")) {

        const indice = eventos.findIndex((ev) => ev.id === id);

        eventos.splice(indice, 1);


        mostrarFeedback(
            `"${evento.nombre}" fue eliminado del simulador.`,
            "exito"
        );

    }


    renderizarEventos(buscador.value);

});


// ==========================================
// BUSQUEDA EN VIVO - EVENTO DE TECLADO
// ==========================================

buscador.addEventListener("input", (e) => {

    renderizarEventos(e.target.value);

});


// ==========================================
// RENDERIZADO INICIAL
// ==========================================

renderizarEventos();