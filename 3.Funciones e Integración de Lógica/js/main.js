// Función declarada con parámetros y return
function pedirDato(mensaje) {
    let dato = prompt(mensaje);

    while (dato === "" || dato === null) {
        alert("No podés dejar el campo vacío.");
        dato = prompt(mensaje);
    }

    return dato;
}

// Función expresada con parámetros y return
const calcularTotal = function(cantidad, precio) {
    let total = cantidad * precio;
    return total;
};

// Función flecha con parámetros y return
const aplicarDescuento = (total) => {
    if (total >= 10000) {
        return total * 0.9;
    } else {
        return total;
    }
};

// Función declarada para mostrar el resultado
function mostrarResultado(nombre, cantidad, totalFinal) {
    alert("Gracias " + nombre + ". Compraste " + cantidad + " entradas. Total a pagar: $" + totalFinal);
    console.log("Cliente: " + nombre);
    console.log("Cantidad de entradas: " + cantidad);
    console.log("Total final: $" + totalFinal);
}

// Inicio del simulador

alert("Bienvenido al simulador de entradas geek");

let nombreUsuario = pedirDato("Ingresá tu nombre:");

let cantidadEntradas = Number(pedirDato("¿Cuántas entradas querés comprar?"));

while (isNaN(cantidadEntradas) || cantidadEntradas <= 0) {
    alert("Ingresá una cantidad válida.");
    cantidadEntradas = Number(pedirDato("¿Cuántas entradas querés comprar?"));
}

let precioEntrada = 3000;

let totalCompra = calcularTotal(cantidadEntradas, precioEntrada);

let totalConDescuento = aplicarDescuento(totalCompra);

mostrarResultado(nombreUsuario, cantidadEntradas, totalConDescuento);