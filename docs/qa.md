# QA del Sprint 6

Revisión final antes de la entrega del 26/10. Se hizo sobre `development`, con los PRs #21 y #22 incluidos.

## Los 15 criterios

| # | Criterio | Estado | Cómo se verificó |
|---|---|:---:|---|
| 1 | Descripción y enlace en el «About» | ✅ | Revisión del repositorio en GitHub |
| 2 | README con índice y capturas | ✅ | Índice con 9 secciones y 7 capturas en `docs/capturas` |
| 3 | Invitaciones aceptadas y responsabilidades | ✅ | Los cinco integrantes son colaboradores con permiso de escritura; la tabla de responsabilidades no tiene filas «a definir» |
| 4 | Componente de perfil reutilizado con props | ✅ | Los cinco perfiles usan `TarjetaPerfil` y muestran sus 10 registros de `contenidos.json` |
| 5 | Sidebar con identidad, enlaces, sección activa y panel móvil | ✅ | Un solo enlace activo en cada una de las 10 rutas; a 375 px no hay scroll horizontal; el panel abre y cierra con el botón, con Escape, con el fondo y al navegar |
| 6 | Recargar cualquier URL | ✅ | `vercel.json` con el rewrite; una URL inexistente muestra la página 404 propia |
| 7 | Portada propia e interactiva | ✅ | Al tocar una foto el integrante se presenta; el carrusel filtra con el buscador |
| 8 | Una interacción por perfil, pasada del TP1 | ✅ | Las cinco interacciones responden; EncontraBug y TestPresion recorridas hasta el resultado |
| 9 | Coherencia visual | ✅ | Paleta, color por tipo, tipografías e ilustraciones compartidas entre portada, perfiles y secciones |
| 10 | Catálogo desde el JSON con detalle desplegable | ✅ | 50 registros desde `contenidos.json`; el detalle se abre y se cierra |
| 11 | Búsqueda, filtro, «sin resultados» y restablecer | ✅ | Búsqueda sin tildes ni mayúsculas, también por año; filtro por tipo; mensaje de vacío; Restablecer vuelve a los 50 |
| 12 | API con carga, error y reintentar | ✅ | Consulta única a Open-Meteo; ante un error aparece la alerta y Reintentar se recupera; a los 10 s sin respuesta pasa a error |
| 13 | Árbol de componentes que coincide con el código | ✅ | Cada nodo comparado con los imports y los JSON que lee cada archivo |
| 14 | Bitácora con desplegables o filtros | ✅ | Filtros por sprint y por tipo, contador, mensaje de vacío y Restablecer; abre primero la entrada más nueva |
| 15 | Declaración de IA por integrante | ✅ | Las cinco filas del README tienen aplicación, modelo y tarea |

## Incidencias reportadas en la revisión cruzada

| Reportó | Incidencia | Resolución |
|---|---|---|
| Nicolás | En ventanas de poca altura (por ejemplo, con la escala de Windows al 125 %) la sidebar mostraba la barra de scroll gris del navegador | Barra fina con los colores del sitio en la sidebar y en la página |
| Christian (desde el celular) | Las citas de Christian aparecen letra por letra, pero en otros perfiles el texto aparece de golpe | Fundido corto y compartido para el contenido que cambia en las cinco interacciones. La máquina de escribir se mantiene porque es la interacción original de Christian en el TP1 |
| Nicolás | En el carrusel de la portada, la tarjeta de Laura Olivera aparecía sin el borde superior | La ciudad en dos líneas la hacía más alta y la perspectiva 3D la agrandaba más que la escena. Más altura para la escena; probado con las cinco tarjetas a 1365, 900, 481, 375 y 320 px |
| Christian (desde el celular) | Propuso marcar la sección activa cambiando el color del texto en lugar del rectángulo redondeado | Se mantiene el rectángulo: es la misma forma que usan los botones del resto del sitio, como él mismo señaló, y no depende solo del color para indicar dónde estás |

## Pendiente sobre el sitio publicado

Estas pruebas se hacen sobre la URL de Vercel, en una ventana de incógnito:

- [ ] Abrir el repositorio y el sitio sin iniciar sesión.
- [ ] Recargar cada URL publicada: `/`, los cinco `/equipo/:slug`, `/catalogo`, `/clima`, `/arbol` y `/bitacora`.
- [ ] Comprobar que `/clima` cargue los datos reales de Open-Meteo.
- [ ] Cargar el enlace en la pestaña «TP 2» de la planilla de entregas.
