import { useState } from 'react';
import './interacciones.css';

// Interacción de Fernando Guevara, pasada del TP1: Rincón Musical, un dato por disco
const discos = [
  {
    nombre: '«Harvest Moon»',
    dato: '«Harvest Moon» (1992) es considerado la secuela espiritual de «Harvest» (1972): Neil Young la grabó exactamente 20 años después.',
  },
  {
    nombre: '«Reveal»',
    dato: '«Reveal» (2001) es de la etapa de R.E.M. como trío, después de que el baterista Bill Berry dejara la banda en 1997.',
  },
  {
    nombre: '«Guess Who»',
    dato: '«Guess Who» (1972) es uno de los discos de B.B. King con más influencia funk y soul, bastante alejado del blues más tradicional.',
  },
];

export default function RinconMusical() {
  const [elegido, setElegido] = useState(0);

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
            {disco.nombre}
          </button>
        ))}
      </div>

      <div className="interaccion-caja">
        <p aria-live="polite">{discos[elegido].dato}</p>
      </div>
    </div>
  );
}
