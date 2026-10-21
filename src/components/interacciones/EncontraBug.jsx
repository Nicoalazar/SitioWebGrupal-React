import { useState } from 'react';
import './interacciones.css';
import './EncontraBug.css';

// Interacción de Laura Belén Blanco, pasada del TP1: «Encontrá el bug».
// Algunos datos de la ficha tienen errores a propósito; el visitante los reporta.
const datos = [
  { etiqueta: 'Nombre', valor: 'Laura Belén Blnaco', bug: true,
    detalle: 'Error de tipeo: dice «Blnaco» en vez de «Blanco».' },
  { etiqueta: 'Película', valor: 'Eternal Sunshine of the Spotless Mind — Michel Gondry (2004)', bug: false },
  { etiqueta: 'Película', valor: 'Into the Wild — Christopher Nolan (2007)', bug: true,
    detalle: 'Dato incorrecto: la dirigió Sean Penn, no Christopher Nolan.' },
  { etiqueta: 'Disco', valor: 'Mothership — Led Zeppelin (2007)', bug: false },
  { etiqueta: 'Disco', valor: 'Never Say Die! — Black Sabbath (1987)', bug: true,
    detalle: 'Año con los dígitos invertidos: el disco salió en 1978.' },
  { etiqueta: 'Entrada para ver Gladiator', valor: '$ -2.500', bug: true,
    detalle: 'Precio negativo: el sistema debería validar que el importe sea mayor a cero.' },
  { etiqueta: 'Disco', valor: 'Al final de este viaje... — Silvio Rodríguez (1978)', bug: false },
];

const totalBugs = datos.filter((dato) => dato.bug).length;

export default function EncontraBug() {
  // Índices de los datos que el visitante ya revisó
  const [revisados, setRevisados] = useState([]);
  const [aviso, setAviso] = useState('Elegí un dato para revisarlo.');

  const encontrados = revisados.filter((i) => datos[i].bug).length;
  const falsosPositivos = revisados.length - encontrados;
  const completo = encontrados === totalBugs;

  function revisar(indice) {
    const dato = datos[indice];
    setRevisados([...revisados, indice]);
    setAviso(dato.bug ? `¡Bien! ${dato.detalle}` : 'Falso positivo: ese dato funciona correctamente.');
  }

  function reiniciar() {
    setRevisados([]);
    setAviso('Elegí un dato para revisarlo.');
  }

  let mensajeFinal = `¡Reporte perfecto! Encontraste los ${totalBugs} bugs sin ningún falso positivo.`;
  if (falsosPositivos > 0) {
    const palabra = falsosPositivos === 1 ? 'falso positivo' : 'falsos positivos';
    mensajeFinal = `Encontraste los ${totalBugs} bugs con ${falsosPositivos} ${palabra}. `
      + 'En QA también cuenta no reportar lo que funciona bien.';
  }

  return (
    <div>
      <h2>Encontrá el bug</h2>
      <p className="interaccion-intro">
        Como QA, mi trabajo es encontrar errores antes que los usuarios. Esta ficha tiene {totalBugs} bugs
        escondidos: hacé clic en cada dato que te parezca incorrecto.
      </p>

      <p className="interaccion-estado bug-estado">
        <span>Bugs encontrados: {encontrados} de {totalBugs}</span>
        <span>Falsos positivos: {falsosPositivos}</span>
      </p>

      <ul className="bug-ficha" aria-label="Ficha a revisar">
        {datos.map((dato, indice) => {
          const revisado = revisados.includes(indice);
          let clase = 'interaccion-boton bug-dato';
          if (revisado) clase += dato.bug ? ' is-correcta' : ' is-incorrecta';

          return (
            <li key={indice}>
              <button
                type="button"
                className={clase}
                onClick={() => revisar(indice)}
                disabled={revisado || completo}
              >
                <span className="bug-dato-etiqueta">{dato.etiqueta}</span>
                <span>{dato.valor}</span>
                {revisado && (
                  <span className="bug-dato-resultado">
                    {dato.bug ? `🐞 Bug reportado. ${dato.detalle}` : '✓ Este dato está bien.'}
                  </span>
                )}
              </button>
            </li>
          );
        })}
      </ul>

      <p aria-live="polite">{completo ? mensajeFinal : aviso}</p>
      {revisados.length > 0 && (
        <button type="button" className="interaccion-boton" onClick={reiniciar}>
          Volver a intentar
        </button>
      )}
    </div>
  );
}
