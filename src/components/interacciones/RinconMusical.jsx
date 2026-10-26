import { useState } from 'react';
import './interacciones.css';

// Interacción de Fernando Guevara, pasada del TP1: Rincón Musical, un dato por disco.
// Los discos salen de contenidos.json; acá queda solo el dato curioso de cada uno.
const curiosidades = {
  'Harvest Moon': '«Harvest Moon» (1992) es considerado la secuela espiritual de «Harvest» (1972): Neil Young la grabó exactamente 20 años después.',
  'Reveal': '«Reveal» (2001) es de la etapa de R.E.M. como trío, después de que el baterista Bill Berry dejara la banda en 1997.',
  'Guess Who': '«Guess Who» (1972) es uno de los discos de B.B. King con más influencia funk y soul, bastante alejado del blues más tradicional.',
};

export default function RinconMusical({ discos: deLaLista = [] }) {
  const [elegido, setElegido] = useState(0);

  const discos = deLaLista.filter((d) => curiosidades[d.nombre]);
  if (!discos.length) return null;

  return (
    <div>
      <h2>Rincón Musical: un dato por disco</h2>
      <p className="interaccion-intro">Elegí uno de mis discos favoritos para ver un dato curioso sobre él:</p>

      <div className="interaccion-opciones" role="group" aria-label="Discos disponibles">
        {discos.map((disco, indice) => (
          <button
            key={disco.nombre}
            type="button"
            className={`interaccion-boton${indice === elegido ? ' is-activo' : ''}`}
            aria-pressed={indice === elegido}
            onClick={() => setElegido(indice)}
          >
            «{disco.nombre}»
          </button>
        ))}
      </div>

      {/* aria-live en la caja: el párrafo se vuelve a montar para animarse y la caja anuncia el cambio */}
      <div className="interaccion-caja" aria-live="polite">
        <p className="interaccion-aparece" key={discos[elegido].nombre}>{curiosidades[discos[elegido].nombre]}</p>
      </div>
    </div>
  );
}
