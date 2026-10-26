import { useState } from 'react';
import './interacciones.css';

// Interacción de Nicolás Zalazar, pasada del TP1: comparador de gustos.
// Muestra sus películas y discos de a uno y calcula el % de coincidencia.
// Las tarjetas salen de contenidos.json, que llega por props desde el perfil.

const mensajes = [
  { min: 0, max: 0, texto: 'No te gustó nada de mi lista.' },
  { min: 1, max: 33, texto: 'Algo en común tenemos.' },
  { min: 34, max: 66, texto: 'Compartimos varios gustos.' },
  { min: 67, max: 99, texto: 'Compartimos la mayoría de los gustos.' },
  { min: 100, max: 100, texto: '¡Compartimos los mismos gustos!' },
];

export default function ComparadorGustos({ peliculas = [], discos = [] }) {
  const tarjetas = [
    ...peliculas.map((p) => ({ tipo: 'Película', titulo: p.nombre, detalle: `${p.datoExtra} · ${p.anio}` })),
    ...discos.map((d) => ({ tipo: 'Disco', titulo: d.nombre, detalle: `${d.datoExtra} · ${d.anio}` })),
  ];
  const [actual, setActual] = useState(0);
  const [meGustan, setMeGustan] = useState(0);

  const terminado = actual === tarjetas.length;
  const porcentaje = Math.round((meGustan / tarjetas.length) * 100);
  const mensaje = mensajes.find((m) => porcentaje >= m.min && porcentaje <= m.max);

  function responder(meGusta) {
    if (meGusta) setMeGustan(meGustan + 1);
    setActual(actual + 1);
  }

  function reiniciar() {
    setActual(0);
    setMeGustan(0);
  }

  return (
    <div>
      <h2>Comparador de gustos</h2>
      <p className="interaccion-intro">
        Te voy mostrando mis películas y discos favoritos, uno por uno: marcá «Me gusta» o «No es lo mío» en
        cada tarjeta y al final calculo nuestra compatibilidad de gustos.
      </p>

      {terminado ? (
        <div className="interaccion-caja" aria-live="polite">
          <p className="etiqueta">Compatibilidad</p>
          <h3>{porcentaje}%</h3>
          <div className="interaccion-barra">
            <span style={{ width: `${porcentaje}%` }} />
          </div>
          <p>{mensaje.texto}</p>
          <button type="button" className="interaccion-boton" onClick={reiniciar}>
            Volver a intentar
          </button>
        </div>
      ) : (
        <>
          <p className="interaccion-estado" aria-live="polite">
            Tarjeta {actual + 1} de {tarjetas.length}
          </p>
          <div className="interaccion-barra">
            <span style={{ width: `${(actual / tarjetas.length) * 100}%` }} />
          </div>
          {/* key nueva en cada tarjeta para que la animación de aparición se repita */}
          <div className="interaccion-caja interaccion-aparece" key={actual}>
            <p className="etiqueta">{tarjetas[actual].tipo}</p>
            <h3>{tarjetas[actual].titulo}</h3>
            <p>{tarjetas[actual].detalle}</p>
          </div>
          <div className="interaccion-opciones">
            <button type="button" className="interaccion-boton" onClick={() => responder(true)}>
              <span aria-hidden="true">👍</span> Me gusta
            </button>
            <button type="button" className="interaccion-boton" onClick={() => responder(false)}>
              <span aria-hidden="true">👎</span> No es lo mío
            </button>
          </div>
        </>
      )}
    </div>
  );
}
