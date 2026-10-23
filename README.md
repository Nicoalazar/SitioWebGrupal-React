# Grupo 15 — Sitio Web Grupal en React

> **TP2 · Desarrollo de Sistemas Web · Front End · 2026 2C**
> Continuación del [TP1](https://github.com/Nicoalazar/SitioWebGrupal): el sitio del equipo llevado a React, con una sidebar compartida, perfiles, datos locales, una API pública, el árbol de componentes y la bitácora.

🔗 **Sitio publicado:** [sitio-web-grupal-15.vercel.app](https://sitio-web-grupal-15.vercel.app/)
🗺️ **Plan de trabajo:** [docs/release-plan.md](docs/release-plan.md)

---

## Índice

1. [Descripción](#1-descripción)
2. [Integrantes](#2-integrantes)
3. [Responsabilidades](#3-responsabilidades)
4. [Tecnologías](#4-tecnologías)
5. [Cómo correrlo en local](#5-cómo-correrlo-en-local)
6. [Estructura del proyecto](#6-estructura-del-proyecto)
7. [Secciones de la aplicación](#7-secciones-de-la-aplicación)
8. [Publicación en Vercel](#8-publicación-en-vercel)
9. [Uso de IA](#9-uso-de-ia)

---

## 1. Descripción

Somos cinco estudiantes que aprenden haciendo. En el TP1 armamos un sitio estático con la portada del equipo, un perfil por integrante y la bitácora del proceso. En el TP2 lo llevamos a React: la aplicación se recorre desde una sidebar compartida y suma un catálogo con lo que nos gusta, el clima en la ciudad de cada integrante, el árbol de componentes y la bitácora con filtros.

## 2. Integrantes

| Nombre | GitHub |
|---|---|
| Nicolás Zalazar | [@Nicoalazar](https://github.com/Nicoalazar) |
| Laura Belén Blanco | [@LauBelen](https://github.com/LauBelen) |
| Christian Albornoz | [@albor77](https://github.com/albor77) |
| Laura Olivera | [@laura108814](https://github.com/laura108814) |
| Fernando Guevara | [@Fer-505](https://github.com/Fer-505) |

## 3. Responsabilidades

<!-- Se completa a medida que cada integrante toma un sprint -->

| Responsabilidad | Responsable |
|---|---|
| Estructura base, sidebar y rutas | Nicolás Zalazar |
| Portada | Laura Olivera |
| Componente de perfil | Laura Olivera |
| Interacciones de los cinco perfiles, pasadas del TP1 | Laura Olivera |
| JSON de contenidos y contrato de props del perfil | Christian Albornoz |
| Catálogo (búsqueda y filtro) | Fernando Guevara |
| Sección del clima (API) | Fernando Guevara |
| Identidad visual e imágenes | Laura Belén Blanco |
| Árbol de componentes | Laura Belén Blanco |
| Bitácora con filtros | Laura Belén Blanco |
| README | _a definir_ |
| Revisión de la interacción de su propio perfil | Cada integrante |

## 4. Tecnologías

| Tecnología | Uso |
|---|---|
| **React 19** | Interfaz construida con componentes |
| **React Router 7** | Navegación entre secciones con URLs propias |
| **Vite** | Servidor de desarrollo y build |
| **CSS** | Estilos propios con variables (tokens) en `src/styles/tokens.css` |
| **Google Fonts** | Space Grotesk para títulos y DM Sans para el texto |
| **Open-Meteo** | API pública del clima, sin clave |
| **Vercel** | Publicación del sitio |

## 5. Cómo correrlo en local

Requiere Node.js 20 o superior.

```bash
npm install
npm run dev
```

Para generar y revisar la versión de producción: `npm run build` y `npm run preview`.

## 6. Estructura del proyecto

```
SitioWebGrupal-React/
├── index.html                 # Punto de entrada de Vite
├── vercel.json                # Rewrite para abrir y recargar cualquier URL
├── public/                    # Favicon y avatares (se sirven tal cual)
│   └── img/perfiles/
├── src/
│   ├── main.jsx               # Monta la aplicación con el router
│   ├── App.jsx                # Rutas de todas las secciones
│   ├── components/            # Layout, Sidebar y componentes reutilizables
│   │   └── interacciones/     # La interacción de cada perfil, pasada del TP1
│   ├── pages/                 # Una página por sección
│   ├── data/                  # JSON locales: integrantes, contenidos y bitácora
│   └── styles/                # Tokens y estilos globales
└── docs/
    └── release-plan.md        # Plan de sprints
```

## 7. Secciones de la aplicación

| Sección | Ruta | Estado |
|---|---|---|
| Inicio | `/` | Presentación interactiva del equipo, accesos a cada sección y carrusel 3D con buscador |
| Perfil de cada integrante | `/equipo/:slug` | Componente de perfil con una interacción por integrante |
| Lo que nos gusta | `/catalogo` | Búsqueda por texto, filtro por tipo y detalle desplegable |
| El clima del equipo | `/clima` | Clima actual de las cinco ciudades desde Open-Meteo, con carga, error y reintento |
| Árbol de componentes | `/arbol` | Sprint 5 |
| Bitácora | `/bitacora` | Estructura base |

### Perfiles e interacciones

Los cinco perfiles usan el mismo componente, `TarjetaPerfil`: recibe por props los datos de [`integrantes.json`](src/data/integrantes.json), las habilidades, películas y discos de [`contenidos.json`](src/data/contenidos.json) y la interacción del integrante como `children`. El catálogo va a leer ese mismo JSON, así los datos se escriben una sola vez. Cada interacción es la del TP1, pasada a React:

| Integrante | Interacción | Componente |
|---|---|---|
| Nicolás Zalazar | Comparador de gustos: «Me gusta» o «No es lo mío» y % de coincidencia | `ComparadorGustos` |
| Laura Belén Blanco | Encontrá el bug: datos con errores a propósito para reportar | `EncontraBug` |
| Christian Albornoz | Citas con efecto de máquina de escribir y trivia de cine | `CitasTrivia` |
| Laura Olivera | Test de resolución bajo presión | `TestPresion` |
| Fernando Guevara | Rincón Musical: un dato curioso por disco | `RinconMusical` |

## 8. Publicación en Vercel

El sitio está publicado en [sitio-web-grupal-15.vercel.app](https://sitio-web-grupal-15.vercel.app/).

El proyecto ya incluye `vercel.json` con una regla de *rewrite*: cualquier ruta devuelve `index.html` y React Router resuelve la sección. Sin esa regla, recargar una URL como `/clima` daría un 404 en Vercel.

## 9. Uso de IA

<!-- Completar a medida que se usen. Diferenciar la aplicación del modelo. -->

| Integrante | Aplicación | Modelo | Para qué lo usó |
|---|---|---|---|
| Nicolás Zalazar | Claude Code | Claude Opus 5.5 | Estructura base del proyecto, sidebar y rutas; revisión e integración de los sprints 1 y 2 |
| Laura Belén Blanco | Claude | Claude Opus 5.5 | Identidad visual del Sprint 4 (paleta, color por tipo y tipografía), ilustraciones SVG de árbol de componentes y bitácora con filtros: Claude propuso código y generó imágenes |
| Christian Albornoz | | | |
| Laura Olivera | Claude Code | Claude Opus 5.5 | Componente de perfil, portada interactiva y paso de las cinco interacciones del TP1 a React |
| Fernando Guevara | Claude | Claude Sonnet 5.5 | Código de las secciones Catálogo y Clima (API Open-Meteo) |
