import { useState } from 'react';
import { Link } from 'react-router';
import './CarruselEquipo.css';

// Sin tildes ni mayúsculas, para que "olivera" encuentre a "Laura Olivera"
function normalizar(texto) {
  return texto.normalize('NFD').replace(/[̀-ͯ]/g, '').toLocaleLowerCase();
}

// Ángulo de cada tarjeta respecto de la activa: las cercanas quedan a los costados
function anguloDe(indice, actual, total) {
  const relativo = (indice - actual + total) % total;
  if (relativo === 0) return 0;
  return relativo <= total / 2 ? relativo * 72 : (relativo - total) * 72;
}

// Carrusel 3D con buscador, pasado de js/portada.js del TP1 a React
export default function CarruselEquipo({ integrantes }) {
  const [busqueda, setBusqueda] = useState('');
  const [actual, setActual] = useState(0);

  const visibles = integrantes.filter((integrante) =>
    normalizar(integrante.nombre).includes(normalizar(busqueda.trim())),
  );
  const total = visibles.length;

  function buscar(evento) {
    setBusqueda(evento.target.value);
    setActual(0);
  }

  return (
    <section className="carrusel-equipo" id="equipo" aria-labelledby="equipo-titulo">
      <div className="carrusel-equipo-barra">
        <div>
          <p className="etiqueta">Explorá</p>
          <h2 id="equipo-titulo">Conocé al equipo</h2>
        </div>
        <label>
          <span className="visualmente-oculto">Buscar integrante</span>
          <input
            className="carrusel-buscador"
            type="search"
            placeholder="Buscar integrante"
            value={busqueda}
            onChange={buscar}
          />
        </label>
      </div>

      {total === 0 ? (
        <p className="carrusel-vacio">No encontramos integrantes con ese nombre.</p>
      ) : (
        <div className="carrusel-escena">
          {visibles.map((integrante, indice) => {
            const angulo = anguloDe(indice, actual, total);
            const activa = indice === actual;
            const vecina = Math.abs(angulo) === 72;

            return (
              <article
                key={integrante.slug}
                className={`carrusel-tarjeta${activa ? ' is-activa' : ''}`}
                style={{
                  transform: `translate(-50%, -50%) rotateY(${angulo}deg) translateZ(var(--carrusel-profundidad)) scale(${activa ? 1 : 0.78})`,
                  opacity: activa ? 1 : vecina ? 0.75 : 0.35,
                }}
                // Las tarjetas de atrás no se pueden enfocar con el teclado
                inert={!activa}
              >
                <img
                  className="perfil-avatar"
                  src={integrante.avatar}
                  alt={`Avatar de ${integrante.nombre}`}
                  width="1024"
                  height="1024"
                />
                <h3>{integrante.nombre}</h3>
                <p>{integrante.ciudad}</p>
                <Link to={`/equipo/${integrante.slug}`}>Ver perfil</Link>
              </article>
            );
          })}
        </div>
      )}

      <div className="carrusel-controles">
        <button
          type="button"
          className="carrusel-boton"
          onClick={() => setActual(actual - 1)}
          disabled={actual === 0 || total === 0}
        >
          Anterior
        </button>
        <span className="carrusel-estado" aria-live="polite">
          {total ? `Perfil ${actual + 1} de ${total}` : 'Sin perfiles'}
        </span>
        <button
          type="button"
          className="carrusel-boton"
          onClick={() => setActual(actual + 1)}
          disabled={actual >= total - 1}
        >
          Siguiente
        </button>
      </div>
    </section>
  );
}
