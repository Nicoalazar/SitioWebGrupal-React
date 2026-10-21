import { useState } from 'react';
import './interacciones.css';

// Interacción de Laura Olivera, pasada del TP1: test de resolución bajo presión
const preguntas = [
  {
    titulo: 'El sistema falla antes de una entrega. ¿Qué hacés primero?',
    opciones: [
      { texto: 'Reviso el error y priorizo la causa principal.', puntos: 3 },
      { texto: 'Pido ayuda al equipo y reparto la investigación.', puntos: 2 },
      { texto: 'Pruebo cambios rápidos hasta encontrar una solución.', puntos: 1 },
    ],
  },
  {
    titulo: 'Recibís una tarea urgente y poco clara. ¿Cómo avanzás?',
    opciones: [
      { texto: 'Hago preguntas concretas para definir el objetivo.', puntos: 3 },
      { texto: 'Investigo el contexto y propongo una primera versión.', puntos: 2 },
      { texto: 'Empiezo por lo más sencillo y ajusto después.', puntos: 1 },
    ],
  },
  {
    titulo: 'Un cambio rompe una parte del proyecto. ¿Cuál es tu reacción?',
    opciones: [
      { texto: 'Vuelvo al último cambio seguro y analizo qué pasó.', puntos: 3 },
      { texto: 'Comparo versiones con Git y consulto al equipo.', puntos: 2 },
      { texto: 'Sigo adelante y trato de corregirlo al final.', puntos: 1 },
    ],
  },
];

// Del puntaje más alto al más bajo: el primero cuyo mínimo se alcanza es el resultado
const perfiles = [
  { min: 8, nombre: 'Perfil estratega', texto: 'Analizás, priorizás y encontrás soluciones claras.' },
  { min: 5, nombre: 'Perfil colaborativo', texto: 'Combinás análisis y trabajo en equipo para avanzar.' },
  { min: 0, nombre: 'Perfil resolutivo', texto: 'Actuás rápido y aprendés mientras buscás una solución.' },
];

const puntajeMaximo = preguntas.length * 3;

export default function TestPresion() {
  const [actual, setActual] = useState(0);
  const [puntaje, setPuntaje] = useState(0);

  const terminado = actual === preguntas.length;
  const resultado = perfiles.find((perfil) => puntaje >= perfil.min);
  const progreso = (actual / preguntas.length) * 100;

  function responder(puntos) {
    setPuntaje(puntaje + puntos);
    setActual(actual + 1);
  }

  function reiniciar() {
    setActual(0);
    setPuntaje(0);
  }

  return (
    <div>
      <h2>¿Cómo resolvés bajo presión?</h2>
      <p className="interaccion-intro">Elegí una respuesta en cada situación y descubrí tu perfil profesional.</p>

      <p className="interaccion-estado" aria-live="polite">
        {terminado ? 'Test completado' : `Situación ${actual + 1} de ${preguntas.length}`}
      </p>
      <div className="interaccion-barra">
        <span style={{ width: `${progreso}%` }} />
      </div>

      {terminado ? (
        <div className="interaccion-caja" aria-live="polite">
          <p className="etiqueta">Tu resultado</p>
          <h3>{resultado.nombre}</h3>
          <p>{resultado.texto}</p>
          <p className="interaccion-estado">Puntaje: {puntaje} de {puntajeMaximo}</p>
          <button type="button" className="interaccion-boton" onClick={reiniciar}>
            Volver a intentar
          </button>
        </div>
      ) : (
        <div className="interaccion-caja">
          <h3>{preguntas[actual].titulo}</h3>
          <div className="interaccion-opciones interaccion-opciones--columna">
            {preguntas[actual].opciones.map((opcion) => (
              <button
                key={opcion.texto}
                type="button"
                className="interaccion-boton"
                onClick={() => responder(opcion.puntos)}
              >
                {opcion.texto}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
