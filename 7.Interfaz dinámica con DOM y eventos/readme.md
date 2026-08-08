# Córdoba Geek

Proyecto desarrollado como parte del curso de JavaScript.

En esta pre-entrega se migra la interfaz del simulador de eventos de la consola al DOM, permitiendo interactuar con la información de forma dinámica sin recargar la página.

## Funcionalidades

- Renderizado dinámico de la colección de eventos mediante `innerHTML` y template strings.
- Agregar eventos completando un formulario y presionando un botón.
- Feedback visual para cada acción (mensajes de éxito/error y resaltado del ítem agregado).
- Botones "Reservar" y "Eliminar" en cada evento, gestionados por delegación de eventos.
- Barra de búsqueda en vivo por nombre o categoría mediante evento de teclado.

## Tecnologías utilizadas

- HTML
- CSS
- JavaScript (manipulación del DOM y eventos)

## Ejecución

Abrir `index.html` en el navegador. No se utilizan `prompt`, `alert` ni `console.log` puesto que toda la interacción ocurre sobre el DOM.