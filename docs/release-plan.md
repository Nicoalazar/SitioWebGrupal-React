# Release Plan — TP2: Sitio Web Grupal en React
### Desarrollo de Sistemas Web · Front End · 2026 2C

**Objetivo:** «Propone» en los 15 criterios de la rúbrica y «Supera» en el criterio 9, el único que tiene ese nivel.
**Entrega:** lunes 26/10/2026.

---

## Calendario

| Día | Sprint | Qué |
|---|---|---|
| Lun 19/10 | 0 | Repo, invitaciones, estructura base y primer deploy |
| Mar 20/10 | 1 | Sidebar terminada, JSON de contenidos y componente de perfil definido |
| Mié 21/10 | 2 | Portada y perfiles; cada integrante pasa su interacción del TP1 a React |
| Jue 22/10 | 3 | Catálogo con búsqueda, filtro y detalle; sección del clima |
| Vie 23/10 | 4 | Identidad visual e imágenes con IA |
| Sáb 24/10 | 5 | Árbol de componentes, bitácora con filtros, README y declaración de IA |
| Dom 25/10 | 6 | QA cruzado sin iniciar sesión: los 15 criterios uno por uno |
| Lun 26/10 | — | Margen y entrega |

---

## Sprint 0 — Repo y estructura base · Lun 19/10

- [x] Crear el repositorio público `SitioWebGrupal-React`
- [ ] Invitar a los cuatro integrantes y confirmar que **cada uno aceptó** (criterio 3). Aceptó 1 de 4, falta que acepten los demás
- [x] Descripción y enlace al sitio en el «About» del repositorio (criterio 1 · Propone)
- [x] Estructura Vite + React + React Router, con layout, sidebar y una ruta por sección
- [x] `vercel.json` con el rewrite para recargar cualquier URL (criterio 6 · Propone)
- [x] Primer deploy en Vercel y prueba de recarga en cada URL
- [ ] Repartir las responsabilidades y completarlas en el README (criterio 3 · Propone). Se completa a medida que cada integrante toma un sprint

## Sprint 1 — Sidebar y datos · Mar 20/10

- [x] Sidebar con identidad, enlaces y sección activa (criterio 5). Código probado y validado en el navegador
- [x] Panel móvil que abre y cierra (criterio 5 · Propone). Código probado y validado en el navegador
- [x] JSON de contenidos con las habilidades, películas y discos del TP1 (50 registros) y un dato extra por registro (`src/data/contenidos.json`)
- [x] Definir las props del componente de perfil antes del Sprint 2

> ### Contrato de props del perfil (actualizado el 21/10 con lo implementado)
> `TarjetaPerfil` es el componente que reutilizan los cinco perfiles. `pages/Perfil.jsx` arma sus props:
> - **Datos personales (desde `integrantes.json`):** `nombre`, `slug`, `avatar`, `ciudad`, `edad`, `github` y `especialidad`, que es opcional porque en el TP1 solo la cargaron Nicolás, Christian y Fernando.
> - **Colecciones (desde `contenidos.json`, filtradas por `slug` y por `tipo`):** `habilidades`, `peliculas` y `discos`, arrays con los registros completos (`id`, `nombre`, `categoria`, `datoExtra`, …). Películas y discos suman `anio` como número, separado de `datoExtra` para poder filtrar y ordenar.
> - **Interacción propia (criterio 8):** entra como `children`. `components/interacciones/index.js` asigna un componente a cada `slug`, y ese componente recibe las mismas colecciones por props.
>
> Cambios respecto del primer borrador: `avatarUrl` pasó a ser `avatar`, que es el campo real de `integrantes.json`, y `especialidad` se trajo del TP1 a `integrantes.json` para los tres que la tenían.

## Sprint 2 — Portada y perfiles · Mié 21/10

- [x] Portada con presentación propia e interactiva (criterio 7 · Propone)
- [x] Un componente de perfil reutilizado con props para los cinco (criterio 4 · Propone). Muestra habilidades, películas y discos desde `contenidos.json`
- [x] Una interacción por perfil, pasada del TP1 a React (criterio 8 · Propone). Las pasó Laura Olivera; falta que cada integrante revise la suya y deje su commit

## Sprint 3 — Catálogo y API · Jue 22/10

- [x] Catálogo dinámico desde el JSON con detalle desplegable (criterio 10 · Propone)
- [x] Búsqueda por texto y filtro por propiedad, con «sin resultados» y botón para restablecer (criterio 11 · Propone)
- [x] Clima de Open-Meteo con carga, error y botón de reintentar (criterio 12 · Propone)

## Sprint 4 — Identidad visual · Vie 23/10

- [x] Paleta, tipografías y composición propias del TP2
- [x] Imágenes generadas o editadas para el proyecto, con registro de herramienta, modelo y retoques
- [x] Coherencia visual entre portada, perfiles y las demás secciones (criterio 9 · Supera)

## Sprint 5 — Árbol, bitácora y documentación · Sáb 24/10

- [ ] Árbol de componentes desplegable que coincide con el código (criterio 13 · Propone)
- [ ] Bitácora con desplegables o filtros (criterio 14 · Propone)
- [ ] README completo, con índice y capturas (criterio 2 · Propone)
- [ ] Declaración de IA por integrante: aplicación, modelo y tarea (criterio 15 · Propone)

## Sprint 6 — QA y entrega · Dom 25/10

- [ ] Revisión cruzada entre integrantes
- [ ] Abrir el repo y el sitio sin iniciar sesión
- [ ] Recargar cada URL publicada
- [ ] Revisar los 15 criterios uno por uno
- [ ] Cargar el enlace en la pestaña «TP 2» de la planilla de entregas

---

## Lecciones del TP1

- Bitácora incremental, con fechas reales, en el momento en que pasan las cosas.
- Commits de todos, repartidos en el tiempo.
- Antes de mergear un PR, revisar con `git status` que la rama no tenga commits sin subir.
- Probar siempre el sitio publicado, no solo el local.
- No inventar datos en la documentación.
