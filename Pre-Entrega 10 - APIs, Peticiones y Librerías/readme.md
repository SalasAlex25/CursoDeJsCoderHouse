# Córdoba Geek

Proyecto desarrollado como parte del curso de JavaScript.

En esta pre-entrega el simulador carga eventos desde `data.json` mediante `fetch`, los transforma en instancias de `Evento` y los renderiza en el DOM. Si la carga remota falla, usa datos locales de respaldo y mantiene el flujo funcional.

## Funcionalidades

- Carga inicial asíncrona de eventos con `fetch("./data.json")`.
- Validación de la respuesta HTTP y manejo de errores con `try-catch-finally`.
- Fallback a datos locales si no se puede leer el JSON.
- Renderizado dinámico de eventos mediante `innerHTML` y template strings.
- Búsqueda en vivo por nombre o categoría.
- Agregado, reserva, eliminación y vaciado de eventos con persistencia en `localStorage`.
- Notificaciones visuales con SweetAlert2 y feedback en pantalla.

## Conceptos aplicados

- Consumo de datos remotos desde un archivo JSON.
- Manejo de asincronismo con `async/await`.
- Rehidratación de objetos: los datos recibidos se reconstruyen como instancias de `Evento` para conservar métodos como `reservarEntrada()`.
- Persistencia del estado local para los cambios hechos por el usuario.

## Tecnologías utilizadas

- HTML
- CSS
- JavaScript
- JSON
- Fetch API
- LocalStorage
- SweetAlert2

## Ejecución

Abrir `index.html` en el navegador. El simulador cargará los eventos desde `data.json`, permitirá agregar o modificar eventos y mantendrá el estado local mientras interactuás con la interfaz.
