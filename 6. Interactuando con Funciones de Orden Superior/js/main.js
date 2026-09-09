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


        return `Reserva realizada correctamente para ${this.nombre}.`;

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
// MOSTRAR EVENTOS
// FOREACH
// ==========================================

const mostrarEventos = (listaEventos) => {

    console.log("===== EVENTOS DISPONIBLES =====");


    listaEventos.forEach((evento) => {

        console.log(`
ID: ${evento.id}
Nombre: ${evento.nombre}
Categoría: ${evento.categoria}
Fecha: ${evento.fecha}
Lugar: ${evento.lugar}
Precio: $${evento.precio}
Cupos disponibles: ${evento.cuposDisponibles}
Entradas reservadas: ${evento.entradasReservadas}
----------------------------------
        `);

    });

};


// ==========================================
// BUSCAR EVENTO POR ID
// FIND
// ==========================================

const buscarEventoPorId = (id) => {

    return eventos.find(
        evento => evento.id === id
    );

};


// ==========================================
// FILTRAR EVENTOS POR CATEGORÍA
// FILTER
// ==========================================

const filtrarEventosPorCategoria = (categoria) => {

    return eventos.filter(

        evento =>
            evento.categoria
                .toLowerCase()
                .includes(categoria.toLowerCase())

    );

};


// ==========================================
// TRANSFORMAR EVENTOS
// MAP
// ==========================================

const obtenerResumenEventos = () => {

    return eventos.map((evento) => {

        return `${evento.nombre} - $${evento.precio}`;

    });

};


// ==========================================
// CALCULAR RECAUDACIÓN POTENCIAL
// REDUCE
// ==========================================

const calcularRecaudacionPotencial = () => {

    return eventos.reduce(

        (acumulador, evento) => {

            return acumulador
                + evento.precio
                * evento.cuposDisponibles;

        },

        0

    );

};


// ==========================================
// RESERVAR ENTRADAS
// FIND + MÉTODO DE LA CLASE
// ==========================================

const reservarEntradas = () => {

    const idEvento = Number(
        prompt(
            "Ingrese el ID del evento en el que desea reservar:"
        )
    );


    const eventoEncontrado =
        buscarEventoPorId(idEvento);


    if (eventoEncontrado === undefined) {

        console.log(
            "No se encontró un evento con ese ID."
        );

        prompt(
            "Evento no encontrado. Presioná Aceptar para volver al menú."
        );

        return;

    }


    const cantidad = Number(
        prompt(
            `¿Cuántas entradas desea reservar para ${eventoEncontrado.nombre}?`
        )
    );


    const resultado =
        eventoEncontrado.reservarEntrada(cantidad);


    console.log(resultado);

    console.log(
        `Cupos disponibles: ${eventoEncontrado.cuposDisponibles}`
    );


    prompt(
        "Resultado mostrado en consola. Presioná Aceptar para volver al menú."
    );

};


// ==========================================
// MENÚ PRINCIPAL
// ==========================================

let opcion;


do {

    opcion = prompt(`
CÓRDOBA GEEK

Seleccione una opción:

1 - Mostrar todos los eventos
2 - Buscar evento por ID
3 - Filtrar eventos por categoría
4 - Mostrar nombre y precio de los eventos
5 - Calcular recaudación potencial
6 - Reservar entradas
0 - Salir
    `);


    switch (opcion) {


        // ==================================
        // MOSTRAR TODOS LOS EVENTOS
        // FOREACH
        // ==================================

        case "1": {

            mostrarEventos(eventos);


            prompt(
                "Todos los eventos fueron mostrados en la consola.\n\nPresioná Aceptar para volver al menú."
            );

            break;

        }


        // ==================================
        // BUSCAR POR ID
        // FIND
        // ==================================

        case "2": {

            const idBuscado = Number(
                prompt(
                    "Ingrese el ID del evento que desea buscar:"
                )
            );


            const eventoEncontrado =
                buscarEventoPorId(idBuscado);


            if (eventoEncontrado !== undefined) {

                console.log(
                    "===== EVENTO ENCONTRADO ====="
                );

                console.log(`
ID: ${eventoEncontrado.id}
Nombre: ${eventoEncontrado.nombre}
Categoría: ${eventoEncontrado.categoria}
Fecha: ${eventoEncontrado.fecha}
Lugar: ${eventoEncontrado.lugar}
Precio: $${eventoEncontrado.precio}
Cupos disponibles: ${eventoEncontrado.cuposDisponibles}
                `);


                prompt(
                    "Evento encontrado y mostrado en consola.\n\nPresioná Aceptar para volver al menú."
                );

            } else {

                console.log(
                    "No existe un evento con ese ID."
                );


                prompt(
                    "No existe un evento con ese ID.\n\nPresioná Aceptar para volver al menú."
                );

            }

            break;

        }


        // ==================================
        // FILTRAR POR CATEGORÍA
        // FILTER
        // ==================================

        case "3": {

            const categoriaBuscada = prompt(
                "Ingrese una categoría:\n\nConvención\nGaming\nFeria\nAnime"
            );


            const eventosFiltrados =
                filtrarEventosPorCategoria(
                    categoriaBuscada
                );


            if (eventosFiltrados.length > 0) {

                console.log(
                    `===== EVENTOS DE ${categoriaBuscada.toUpperCase()} =====`
                );


                mostrarEventos(
                    eventosFiltrados
                );


                prompt(
                    "Los eventos encontrados fueron mostrados en consola.\n\nPresioná Aceptar para volver al menú."
                );

            } else {

                console.log(
                    "No se encontraron eventos de esa categoría."
                );


                prompt(
                    "No se encontraron eventos de esa categoría.\n\nPresioná Aceptar para volver al menú."
                );

            }

            break;

        }


        // ==================================
        // TRANSFORMAR INFORMACIÓN
        // MAP
        // ==================================

        case "4": {

            const resumenEventos =
                obtenerResumenEventos();


            console.log(
                "===== EVENTOS Y PRECIOS ====="
            );


            resumenEventos.forEach(
                resumen => console.log(resumen)
            );


            prompt(
                "El listado de eventos y precios fue mostrado en consola.\n\nPresioná Aceptar para volver al menú."
            );

            break;

        }


        // ==================================
        // CALCULAR TOTAL
        // REDUCE
        // ==================================

        case "5": {

            const totalPotencial =
                calcularRecaudacionPotencial();


            console.log(
                `Recaudación potencial: $${totalPotencial}`
            );


            prompt(
                `Recaudación potencial: $${totalPotencial}\n\nPresioná Aceptar para volver al menú.`
            );

            break;

        }


        // ==================================
        // RESERVAR ENTRADAS
        // ==================================

        case "6": {

            reservarEntradas();

            break;

        }


        // ==================================
        // SALIR
        // ==================================

        case "0": {

            console.log(
                "Gracias por utilizar Córdoba Geek."
            );

            break;

        }


        // ==================================
        // OPCIÓN INVÁLIDA
        // ==================================

        default: {

            console.log(
                "La opción ingresada no es válida."
            );


            prompt(
                "Opción incorrecta.\n\nPresioná Aceptar para volver al menú."
            );

            break;

        }

    }


} while (opcion !== "0");