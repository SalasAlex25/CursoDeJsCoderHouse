const anioActual = 2026;

const nombre = prompt("Ingrese su nombre:");
const apellido = prompt("Ingrese su apellido:");
const anioNacimiento = parseInt(prompt("Ingrese su año de nacimiento:"));

let edad = anioActual - anioNacimiento;

const mensaje = "Hola " + nombre + " " + apellido + 
", según el año ingresado tenés aproximadamente " + edad + " años.";

console.log(mensaje);
alert(mensaje);