alert("Bienvenido al simulador de promedio de notas");

let cantidadNotas = parseInt(prompt("¿Cuántas notas querés cargar?"));
let sumaNotas = 0;

while (isNaN(cantidadNotas) || cantidadNotas <= 0) {
    cantidadNotas = parseInt(prompt("Error. Ingresá una cantidad válida de notas:"));
}

for (let i = 1; i <= cantidadNotas; i++) {
    let nota = parseInt(prompt("Ingresá la nota número " + i));

    while (isNaN(nota) || nota < 1 || nota > 10) {
        nota = parseInt(prompt("Nota inválida. Ingresá una nota entre 1 y 10:"));
    }

    sumaNotas += nota;
}

let promedio = sumaNotas / cantidadNotas;

console.log("Cantidad de notas cargadas: " + cantidadNotas);
console.log("Promedio final: " + promedio);

if (promedio >= 7) {
    alert("Aprobaste con promoción. Promedio: " + promedio);
} else if (promedio >= 4) {
    alert("Aprobaste, pero sin promoción. Promedio: " + promedio);
} else {
    alert("Desaprobaste. Promedio: " + promedio);
}