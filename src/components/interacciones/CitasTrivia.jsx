import { useEffect, useState } from 'react';
import './interacciones.css';

// Interacción de Christian Albornoz, pasada del TP1: Espacio Cinéfilo.
// Cada película muestra una cita con efecto de máquina de escribir y una trivia.
// Las películas salen de contenidos.json; acá queda solo la cita y la trivia de cada una,
// indexadas por el nombre que figura en el JSON.
const citas = {
  'Forrest Gump': {
    cita: '«Mamá siempre decía que la vida era como una caja de bombones, nunca sabés qué te va a tocar.»',
    pregunta: '¿En qué año se estrenó Forrest Gump y quién la protagonizó?',
    opciones: [
      { texto: '1994 — Tom Hanks', correcta: true },
      { texto: '1996 — Robin Williams', correcta: false },
      { texto: '1992 — Kevin Costner', correcta: false },
    ],
  },
  'Big Fish': {
    cita: '«Un hombre cuenta sus historias tantas veces que se convierte en ellas. Siguen viviendo después de él, y así se hace inmortal.»',
    pregunta: '¿Quién dirigió la película Big Fish (El Gran Pez)?',
    opciones: [
      { texto: 'Steven Spielberg', correcta: false },
      { texto: 'Tim Burton', correcta: true },
      { texto: 'Terry Gilliam', correcta: false },
    ],
  },
  'Flores de Fuego (Hana-bi)': {
    cita: '«En el silencio absoluto de la tragedia, la belleza aún encuentra un rincón para florecer.»',
    pregunta: '¿Qué prestigioso galardón internacional obtuvo Flores de Fuego (Hana-bi) en 1997?',
    opciones: [
      { texto: 'León de Oro en el Festival de Venecia', correcta: true },
      { texto: 'Palma de Oro en el Festival de Cannes', correcta: false },
      { texto: 'Oso de Oro en el Festival de Berlín', correcta: false },
    ],
  },
};

const sinAnimacion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export default function CitasTrivia({ peliculas: deLaLista = [] }) {
  // Solo las películas del JSON que tienen cita y trivia cargadas
  const peliculas = deLaLista
    .filter((p) => citas[p.nombre])
    .map((p) => ({ nombre: p.nombre, ...citas[p.nombre] }));
  const [elegida, setElegida] = useState(0);
  const [letras, setLetras] = useState(0);
  // Índice de la opción que eligió el visitante, o null si todavía no respondió
  const [respuesta, setRespuesta] = useState(null);

  const pelicula = peliculas[elegida];

  // Máquina de escribir: suma una letra cada 28 ms hasta completar la cita
  useEffect(() => {
    if (!pelicula || sinAnimacion || letras >= pelicula.cita.length) return;
    const temporizador = setTimeout(() => setLetras(letras + 1), 28);
    return () => clearTimeout(temporizador);
  }, [letras, pelicula?.cita]);

  if (!pelicula) return null;

  function elegir(indice) {
    setElegida(indice);
    setLetras(0);
    setRespuesta(null);
  }

  const acerto = respuesta !== null && pelicula.opciones[respuesta].correcta;

  return (
    <div>
      <h2>Espacio Cinéfilo: Citas &amp; Trivia</h2>
      <p className="interaccion-intro">
        Elegí una de mis películas favoritas para ver una frase icónica en tiempo real y poner a prueba tu ojo de
        cinéfilo:
      </p>

      <div className="interaccion-opciones" role="group" aria-label="Películas disponibles">
        {peliculas.map((p, indice) => (
          <button
            key={p.nombre}
            type="button"
            className={`interaccion-boton${indice === elegida ? ' is-activo' : ''}`}
            aria-pressed={indice === elegida}
            onClick={() => elegir(indice)}
          >
            {p.nombre}
          </button>
        ))}
      </div>

      <div className="interaccion-caja">
        <p className="etiqueta">Cita memorable</p>
        {/* El lector de pantalla lee la cita completa, no letra por letra */}
        <blockquote aria-hidden="true">{sinAnimacion ? pelicula.cita : pelicula.cita.slice(0, letras)}</blockquote>
        <p className="visualmente-oculto">{pelicula.cita}</p>

        <p className="etiqueta">Trivia rápida</p>
        <h3 className="interaccion-aparece" key={pelicula.nombre}>{pelicula.pregunta}</h3>
        <div className="interaccion-opciones interaccion-opciones--columna">
          {pelicula.opciones.map((opcion, indice) => {
            let clase = 'interaccion-boton';
            if (indice === respuesta) clase += opcion.correcta ? ' is-correcta' : ' is-incorrecta';

            return (
              <button
                key={opcion.texto}
                type="button"
                className={clase}
                onClick={() => setRespuesta(indice)}
                disabled={respuesta !== null}
              >
                {opcion.texto}
              </button>
            );
          })}
        </div>

        <p aria-live="polite">
          {respuesta !== null && (acerto ? '¡Correcto! Excelente memoria cinéfila.' : 'No era esa opción, pero vale el intento.')}
        </p>
        {respuesta !== null && (
          <button type="button" className="interaccion-boton" onClick={() => setRespuesta(null)}>
            Volver a intentar
          </button>
        )}
      </div>
    </div>
  );
}
