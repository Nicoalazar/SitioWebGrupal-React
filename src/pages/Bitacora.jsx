import EncabezadoSeccion from '../components/EncabezadoSeccion.jsx';
import entradas from '../data/bitacora.json';

const formatoFecha = new Intl.DateTimeFormat('es-AR', {
  day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC',
});

// Sprint 5: filtros por sprint y entradas desplegables
export default function Bitacora() {
  return (
    <>
      <EncabezadoSeccion etiqueta="Proceso" titulo="Bitácora">
        <p>Qué hicimos, qué decidimos y qué dificultades resolvimos, con su fecha real.</p>
      </EncabezadoSeccion>

      {entradas.map(({ fecha, sprint, titulo, registros }) => (
        <article className="bitacora-entrada" key={`${fecha}-${titulo}`}>
          <time dateTime={fecha}>{formatoFecha.format(new Date(fecha))}</time>
          <h2>Sprint {sprint} — {titulo}</h2>
          <ul>
            {registros.map((registro) => <li key={registro}>{registro}</li>)}
          </ul>
        </article>
      ))}
    </>
  );
}
