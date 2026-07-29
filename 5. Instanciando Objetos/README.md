# Córdoba Geek - Pre-entrega 5

Proyecto realizado para la pre-entrega del módulo **Instanciando Objetos** de JavaScript.

La aplicación simula la reserva de entradas para distintos eventos geek de Córdoba. El usuario puede seleccionar un evento, completar sus datos personales y elegir la cantidad de entradas que desea reservar.

## Objetivo de la entrega

El objetivo principal es aplicar los conceptos de programación orientada a objetos vistos durante el curso:

- Creación de clases.
- Uso de constructores.
- Uso de la palabra clave `this`.
- Creación de objetos mediante `new`.
- Métodos de instancia.
- Arrays de objetos.
- Funciones.
- Ciclos.
- Métodos de arrays.
- Manipulación del DOM.
- Eventos en JavaScript.

## Funcionalidades

La aplicación permite:

- Visualizar los eventos disponibles.
- Consultar el nombre, categoría, fecha, lugar y precio de cada evento.
- Ver los cupos disponibles.
- Abrir un formulario de reserva.
- Ingresar nombre, correo electrónico y teléfono.
- Seleccionar la cantidad de entradas.
- Validar que la cantidad solicitada no supere los cupos disponibles.
- Crear un objeto de tipo `Cliente`.
- Guardar la reserva dentro del evento seleccionado.
- Calcular el importe total de la reserva.
- Descontar los cupos reservados.
- Mostrar un mensaje de confirmación.
- Consultar en la consola los clientes y las reservas creadas.

## Clases utilizadas

### Clase `Cliente`

Representa a la persona que realiza una reserva.

Propiedades:

- `id`
- `nombreCompleto`
- `email`
- `telefono`

Método:

- `obtenerContacto()`: devuelve los datos de contacto del cliente.

### Clase `Evento`

Representa cada evento disponible.

Propiedades:

- `id`
- `nombre`
- `categoria`
- `fecha`
- `lugar`
- `precio`
- `cuposDisponibles`
- `reservas`

Métodos:

- `reservarEntradas()`: crea una reserva y descuenta los cupos.
- `obtenerEntradasReservadas()`: calcula la cantidad total de entradas reservadas.
- `obtenerInformacion()`: devuelve información del evento.

## Instanciación de objetos

Se crearon tres instancias de la clase `Evento` utilizando el operador `new`:

```javascript
const eventoComicCon = new Evento(...);
const eventoGaming = new Evento(...);
const eventoCine = new Evento(...);