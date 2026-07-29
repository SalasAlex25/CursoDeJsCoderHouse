/*
    Clase Cliente

    Cada vez que una persona completa el formulario,
    se crea un nuevo objeto Cliente.
*/
class Cliente {
    constructor(id, nombreCompleto, email, telefono) {
        this.id = id;
        this.nombreCompleto = nombreCompleto;
        this.email = email;
        this.telefono = telefono;
    }

    // Método que informa los datos de contacto
    obtenerContacto() {
        return (
            `${this.nombreCompleto} | ` +
            `${this.email} | ` +
            `${this.telefono}`
        );
    }
}


/*
    Clase Evento

    Se utiliza como molde para crear los distintos
    eventos de Córdoba Geek.
*/
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
        this.reservas = [];
    }

    /*
        Método que recibe un objeto Cliente y
        la cantidad de entradas que desea reservar.
    */
    reservarEntradas(cantidad, cliente) {
        if (!Number.isInteger(cantidad) || cantidad <= 0) {
            return {
                exito: false,
                mensaje: "La cantidad de entradas no es válida."
            };
        }

        if (cantidad > this.cuposDisponibles) {
            return {
                exito: false,
                mensaje:
                    `Solo quedan ${this.cuposDisponibles} ` +
                    "entradas disponibles."
            };
        }

        const nuevaReserva = {
            id: this.reservas.length + 1,
            cliente: cliente,
            cantidad: cantidad,
            total: this.precio * cantidad
        };

        this.reservas.push(nuevaReserva);

        this.cuposDisponibles -= cantidad;

        const textoEntradas =
            cantidad === 1 ? "entrada" : "entradas";

        return {
            exito: true,
            mensaje:
                `Reserva confirmada para ${cliente.nombreCompleto}. ` +
                `Reservaste ${cantidad} ${textoEntradas} ` +
                `para ${this.nombre}. ` +
                `Total: ${formatearPrecio(nuevaReserva.total)}.`,
            reserva: nuevaReserva
        };
    }

    // Método que calcula todas las entradas reservadas
    obtenerEntradasReservadas() {
        let totalReservado = 0;

        for (const reserva of this.reservas) {
            totalReservado += reserva.cantidad;
        }

        return totalReservado;
    }

    // Método que informa el estado del evento
    obtenerInformacion() {
        return (
            `${this.nombre} | ` +
            `Precio: ${formatearPrecio(this.precio)} | ` +
            `Cupos disponibles: ${this.cuposDisponibles}`
        );
    }
}


/*
    Tres instancias de la clase Evento
    creadas utilizando new.
*/

const eventoComicCon = new Evento(
    1,
    "Córdoba Comic Con",
    "Cómics",
    "15/08/2026",
    "Centro de Convenciones Córdoba",
    15000,
    200
);

const eventoGaming = new Evento(
    2,
    "Torneo Gamer Córdoba",
    "Videojuegos",
    "22/08/2026",
    "Quality Espacio",
    12000,
    100
);

const eventoCine = new Evento(
    3,
    "Maratón de Cine Fantástico",
    "Cine",
    "29/08/2026",
    "Cineclub Municipal",
    10000,
    80
);


/*
    Array que contiene todos los eventos.
*/
const eventos = [
    eventoComicCon,
    eventoGaming,
    eventoCine
];


/*
    Array que guardará los clientes creados.
*/
const clientes = [];


/*
    Guarda el ID del evento seleccionado.
*/
let idEventoSeleccionado = null;


/*
    Formatea los precios en pesos argentinos.
*/
const formatearPrecio = (precio) => {
    return precio.toLocaleString("es-AR", {
        style: "currency",
        currency: "ARS"
    });
};


/*
    Busca un evento dentro del array por su ID.
*/
const buscarEventoPorId = (id) => {
    return eventos.find((evento) => evento.id === id);
};


/*
    Muestra un mensaje en la página.
*/
const mostrarMensaje = (texto) => {
    const mensaje =
        document.getElementById("mensajeReserva");

    if (mensaje) {
        mensaje.textContent = texto;
    }
};


/*
    Muestra las tarjetas de eventos en el HTML.
*/
const renderizarEventos = () => {
    const contenedor =
        document.getElementById("contenedorEventos");

    if (!contenedor) {
        console.error(
            "No se encontró el elemento con id contenedorEventos."
        );

        return;
    }

    contenedor.innerHTML = "";

    for (const evento of eventos) {
        const tarjeta = document.createElement("article");

        tarjeta.innerHTML = `
            <h3>${evento.nombre}</h3>

            <p>
                <strong>Categoría:</strong>
                ${evento.categoria}
            </p>

            <p>
                <strong>Fecha:</strong>
                ${evento.fecha}
            </p>

            <p>
                <strong>Lugar:</strong>
                ${evento.lugar}
            </p>

            <p>
                <strong>Precio por entrada:</strong>
                ${formatearPrecio(evento.precio)}
            </p>

            <p>
                <strong>Cupos disponibles:</strong>
                ${evento.cuposDisponibles}
            </p>

            <p>
                <strong>Entradas reservadas:</strong>
                ${evento.obtenerEntradasReservadas()}
            </p>

            <button
                type="button"
                class="botonReservar"
                data-id="${evento.id}"
                ${evento.cuposDisponibles === 0 ? "disabled" : ""}
            >
                ${
                    evento.cuposDisponibles === 0
                        ? "Entradas agotadas"
                        : "Reservar entradas"
                }
            </button>

            <hr>
        `;

        contenedor.appendChild(tarjeta);
    }
};


/*
    Abre el formulario emergente de reserva.
*/
const abrirModalReserva = (idEvento) => {
    const evento = buscarEventoPorId(idEvento);

    const modal =
        document.getElementById("modalReserva");

    const formulario =
        document.getElementById("formularioReserva");

    const eventoSeleccionado =
        document.getElementById("eventoSeleccionado");

    const cantidadEntradas =
        document.getElementById("cantidadEntradas");

    const errorFormulario =
        document.getElementById("errorFormulario");

    if (
        !evento ||
        !modal ||
        !formulario ||
        !eventoSeleccionado ||
        !cantidadEntradas ||
        !errorFormulario
    ) {
        console.error(
            "No se encontraron los elementos del formulario."
        );

        return;
    }

    idEventoSeleccionado = evento.id;

    formulario.reset();

    errorFormulario.textContent = "";

    eventoSeleccionado.textContent =
        `${evento.nombre} - ` +
        `${formatearPrecio(evento.precio)} por entrada`;

    cantidadEntradas.value = 1;
    cantidadEntradas.max = evento.cuposDisponibles;

    modal.showModal();
};


/*
    Cierra el formulario emergente.
*/
const cerrarModalReserva = () => {
    const modal =
        document.getElementById("modalReserva");

    if (modal) {
        modal.close();
    }

    idEventoSeleccionado = null;
};


/*
    Procesa los datos ingresados en el formulario.
*/
const procesarFormularioReserva = (eventoFormulario) => {
    eventoFormulario.preventDefault();

    const evento =
        buscarEventoPorId(idEventoSeleccionado);

    const cantidad = Number(
        document.getElementById("cantidadEntradas").value
    );

    const nombreCompleto =
        document
            .getElementById("nombreCliente")
            .value
            .trim();

    const email =
        document
            .getElementById("emailCliente")
            .value
            .trim();

    const telefono =
        document
            .getElementById("telefonoCliente")
            .value
            .trim();

    const errorFormulario =
        document.getElementById("errorFormulario");

    if (!evento) {
        errorFormulario.textContent =
            "No se encontró el evento seleccionado.";

        return;
    }

    if (nombreCompleto.length < 3) {
        errorFormulario.textContent =
            "Ingresá un nombre y apellido válido.";

        return;
    }

    if (telefono.length < 8) {
        errorFormulario.textContent =
            "Ingresá un número de teléfono válido.";

        return;
    }

    /*
        Se crea un objeto Cliente utilizando new.
    */
    const nuevoCliente = new Cliente(
        clientes.length + 1,
        nombreCompleto,
        email,
        telefono
    );

    clientes.push(nuevoCliente);

    /*
        El objeto Cliente completo se envía
        al método reservarEntradas().
    */
    const resultado = evento.reservarEntradas(
        cantidad,
        nuevoCliente
    );

    if (!resultado.exito) {
        errorFormulario.textContent =
            resultado.mensaje;

        /*
            Si la reserva falla, eliminamos el cliente
            que acabamos de agregar.
        */
        clientes.pop();

        return;
    }

    console.log("Cliente creado:");
    console.log(nuevoCliente);

    console.log("Datos de contacto:");
    console.log(nuevoCliente.obtenerContacto());

    console.log("Reserva creada:");
    console.log(resultado.reserva);

    console.log("Todos los clientes:");
    console.log(clientes);

    console.log(`Reservas de ${evento.nombre}:`);
    console.log(evento.reservas);

    mostrarMensaje(resultado.mensaje);

    cerrarModalReserva();

    renderizarEventos();
};


/*
    Inicio de la aplicación.
*/
document.addEventListener("DOMContentLoaded", () => {
    const contenedor =
        document.getElementById("contenedorEventos");

    const formulario =
        document.getElementById("formularioReserva");

    const botonCancelar =
        document.getElementById("botonCancelar");

    if (!contenedor || !formulario || !botonCancelar) {
        console.error(
            "Faltan elementos necesarios en el archivo HTML."
        );

        return;
    }

    renderizarEventos();

    /*
        Detecta qué botón de reserva fue presionado.
    */
    contenedor.addEventListener("click", (eventoClick) => {
        const boton =
            eventoClick.target.closest(".botonReservar");

        if (!boton) {
            return;
        }

        const idEvento = Number(boton.dataset.id);

        abrirModalReserva(idEvento);
    });

    /*
        Procesa la confirmación del formulario.
    */
    formulario.addEventListener(
        "submit",
        procesarFormularioReserva
    );

    /*
        Cierra el formulario al presionar Cancelar.
    */
    botonCancelar.addEventListener(
        "click",
        cerrarModalReserva
    );
});