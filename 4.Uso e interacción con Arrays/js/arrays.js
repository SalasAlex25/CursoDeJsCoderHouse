"use strict";

// Array inicial con al menos cinco elementos.
const eventosGeek = [
    "Festival de Cómics",
    "Torneo de Videojuegos",
    "Maratón de Anime",
    "Encuentro de Cosplay",
    "Feria de Coleccionismo"
];

// Agregar un elemento al final.
eventosGeek.push("Noche de Juegos de Mesa");

// Agregar un elemento al principio.
eventosGeek.unshift("Expo Geek Córdoba");

// Eliminar el último elemento y guardarlo en una variable.
const eventoEliminadoInicial = eventosGeek.pop();

/**
 * Recorre y muestra todos los eventos.
 */
function mostrarEventos() {
    const listaHTML = document.getElementById("lista-eventos");

    listaHTML.innerHTML = "";

    console.log("Eventos disponibles:");

    // Recorrido obligatorio utilizando for...of.
    for (const evento of eventosGeek) {
        console.log(`Evento: ${evento}`);

        const elementoLista = document.createElement("li");
        elementoLista.textContent = `Evento: ${evento}`;

        listaHTML.appendChild(elementoLista);
    }
}

/**
 * Busca un evento utilizando includes e indexOf.
 */
function buscarEvento() {
    const nombreBuscado = prompt(
        "Ingrese el nombre o una parte del evento que desea buscar:"
    );

    if (nombreBuscado === null || nombreBuscado.trim() === "") {
        alert("No se ingresó ningún texto para buscar.");
        return;
    }

    const busquedaNormalizada = nombreBuscado.trim().toLowerCase();

    const eventosEncontrados = [];

    for (const evento of eventosGeek) {
        const eventoNormalizado = evento.toLowerCase();

        // Funciona como un LIKE '%texto%'.
        if (eventoNormalizado.includes(busquedaNormalizada)) {
            eventosEncontrados.push(evento);
        }
    }

    if (eventosEncontrados.length > 0) {
        let mensaje = "Eventos encontrados:\n\n";

        for (const evento of eventosEncontrados) {
            const posicion = eventosGeek.indexOf(evento);

            mensaje += `Índice ${posicion}: ${evento}\n`;
        }

        alert(mensaje);
    } else {
        alert(
            `No se encontraron eventos que contengan "${nombreBuscado}".`
        );
    }
}

/**
 * Agrega un evento al final del array.
 */
function agregarEventoAlFinal() {
    const nuevoEvento = prompt("Ingrese el nombre del nuevo evento:");

    if (nuevoEvento === null || nuevoEvento.trim() === "") {
        alert("El nombre del evento no puede estar vacío.");
        return;
    }

    eventosGeek.push(nuevoEvento.trim());

    alert(`Se agregó "${nuevoEvento.trim()}" al final de la lista.`);

    alert(obtenerListadoConIndices());
    mostrarEventos();
}

/**
 * Agrega un evento prioritario al comienzo del array.
 */
function agregarEventoPrioritario() {
    const nuevoEvento = prompt(
        "Ingrese el nombre del evento prioritario:"
    );

    if (nuevoEvento === null || nuevoEvento.trim() === "") {
        alert("El nombre del evento no puede estar vacío.");
        return;
    }

    eventosGeek.unshift(nuevoEvento.trim());

    alert(`Se agregó "${nuevoEvento.trim()}" al principio de la lista.`);

    alert(obtenerListadoConIndices());
    mostrarEventos();
}

/**
 * Modifica un evento utilizando su índice.
 */
function modificarEvento() {
    const indiceIngresado = prompt(
        `Ingrese el índice del evento que desea modificar.\n\n` +
        obtenerListadoConIndices()
    );

    if (indiceIngresado === null || indiceIngresado.trim() === "") {
        alert("No se ingresó ningún índice.");
        return;
    }

    const indice = Number(indiceIngresado);

    if (
        Number.isNaN(indice) ||
        indice < 0 ||
        indice >= eventosGeek.length
    ) {
        alert("El índice ingresado no es válido.");
        return;
    }

    const nuevoNombre = prompt(
        `Ingrese el nuevo nombre para "${eventosGeek[indice]}":`
    );

    if (nuevoNombre === null || nuevoNombre.trim() === "") {
        alert("El nuevo nombre no puede estar vacío.");
        return;
    }

    const nombreAnterior = eventosGeek[indice];

    // Modificación del elemento utilizando splice.
    eventosGeek.splice(indice, 1, nuevoNombre.trim());

    alert(
        `Se reemplazó "${nombreAnterior}" por "${nuevoNombre.trim()}".`
    );

    alert(obtenerListadoConIndices());
    mostrarEventos();
}

/**
 * Elimina el último evento del array.
 */
function eliminarUltimoEvento() {
    if (eventosGeek.length === 0) {
        alert("No hay eventos para eliminar.");
        return;
    }

    const eventoEliminado = eventosGeek.pop();

    alert(`Se ha eliminado el elemento: ${eventoEliminado}`);

    alert(obtenerListadoConIndices());
    mostrarEventos();
}

/**
 * Genera un texto con los eventos y sus respectivos índices.
 */
function obtenerListadoConIndices() {
    let listado = "";
    let indice = 0;

    for (const evento of eventosGeek) {
        listado += `${indice}: ${evento}\n`;
        indice++;
    }

    return listado;
}

/**
 * Controla el menú principal del simulador.
 */
function iniciarSimulador() {
    let opcion;

    do {
        opcion = prompt(
            "CÓRDOBA GEEK - GESTIÓN DE EVENTOS\n\n" +
            "1. Mostrar eventos\n" +
            "2. Buscar un evento\n" +
            "3. Agregar evento al final\n" +
            "4. Agregar evento prioritario\n" +
            "5. Modificar evento por índice\n" +
            "6. Eliminar el último evento\n" +
            "0. Salir\n\n" +
            "Ingrese una opción:"
        );

        switch (opcion) {
            case "1":
                mostrarEventos();
                alert(obtenerListadoConIndices());
                break;

            case "2":
                buscarEvento();
                break;

            case "3":
                agregarEventoAlFinal();
                break;

            case "4":
                agregarEventoPrioritario();
                break;

            case "5":
                modificarEvento();
                break;

            case "6":
                eliminarUltimoEvento();
                break;

            case "0":
            case null:
                alert("Gracias por utilizar Córdoba Geek.");
                break;

            default:
                alert("La opción ingresada no es válida.");
                break;
        }
    } while (opcion !== "0" && opcion !== null);
}


// Primera visualización de los eventos.
mostrarEventos();

// Inicio del simulador.
iniciarSimulador();