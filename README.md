# Córdoba Geek Experiences

Aplicación web interactiva para reservar experiencias relacionadas con la cultura geek.

## ¿Qué permite hacer?

- Explorar experiencias de ciencia ficción, tecnología, juegos de mesa y cultura pop.
- Buscar experiencias por nombre o categoría.
- Elegir una experiencia, fecha, horario y cantidad de personas.
- Calcular automáticamente el total de la reserva.
- Guardar reservas en `localStorage`.
- Cancelar reservas o vaciar todas las reservas guardadas.
- Recibir confirmaciones con SweetAlert2 y notificaciones con Toastify.

## Tecnologías utilizadas

- HTML5 y CSS3.
- JavaScript vanilla.
- JSON y Fetch API.
- DOM y eventos.
- `async/await` con `try/catch/finally`.
- `localStorage`.
- SweetAlert2 y Toastify.

## Estructura

```text
index.html
assets/
  images/
css/
  style.css
data/
  experiencias.json
js/
  experiencias.js
  reservas.js
  app.js
```

## Ejecución

Abrir el proyecto con Live Server o cualquier servidor local para que la carga del archivo JSON mediante `fetch` funcione correctamente.
