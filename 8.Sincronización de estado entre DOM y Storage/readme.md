# Córdoba Geek

Proyecto desarrollado como parte del curso de JavaScript.

En esta pre-entrega se sincroniza el estado del simulador entre el DOM, el array de JavaScript y `localStorage`, para que los datos agregados, eliminados o modificados no se pierdan al recargar la página.

## Funcionalidades

- Carga inicial de eventos desde `localStorage` usando `JSON.parse()`.
- Persistencia de cambios con `JSON.stringify()` después de agregar, reservar, eliminar o vaciar eventos.
- Renderizado dinámico de eventos mediante `innerHTML` y template strings.
- Búsqueda en vivo por nombre o categoría.
- Feedback visual para cada acción del usuario.
- Uso de operador `??`, optional chaining `?.`, ternarios y destructuring.

## Conceptos aplicados

- Sincronización entre estado en memoria, DOM y Storage.
- Rehidratación de objetos: los datos recuperados desde JSON se reconstruyen como instancias de `Evento` para conservar métodos como `reservarEntrada()`.
- Persistencia de stock actualizado y eventos creados por el usuario.

## Tecnologías utilizadas

- HTML
- CSS
- JavaScript
- LocalStorage

## Ejecución

Abrir `index.html` en el navegador. Agregar, reservar o eliminar eventos y luego recargar la página para comprobar que el estado queda persistido.
