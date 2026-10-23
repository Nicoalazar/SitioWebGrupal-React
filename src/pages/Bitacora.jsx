import { useId, useState } from 'react';
import EncabezadoSeccion from '../components/EncabezadoSeccion.jsx';
import entradas from '../data/bitacora.json';
import './Bitacora.css';

const formatoFecha = new Intl.DateTimeFormat('es-AR', {
  day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC',
});

const ETIQUETA_TIPO = { decision: 'Decisión', avance: 'Avance', dificultad: 'Dificultad' };

// Las opciones de los filtros salen del JSON: al cargar un sprint o un tipo nuevo aparecen solas
const sprints = [...new Set(entradas.map(({ sprint }) => sprint))].sort((a, b) => a - b);
const tipos = [...new Set(entradas.map(({ tipo }) => tipo))];

// Sprint 5: filtros por sprint y por tipo, con entradas desplegables
export default function Bitacora() {
  const [sprint, setSprint] = useState('todos');
  const [tipo, setTipo] = useState('todos');
  const idSprint = useId();

  const visibles = [...entradas].reverse().filter((entrada) =>
    (sprint === 'todos' || entrada.sprint === Number(sprint))
    && (tipo === 'todos' || entrada.tipo === tipo));

  const hayFiltros = sprint !== 'todos' || tipo !== 'todos';
  const restablecer = () => {
    setSprint('todos');
    setTipo('todos');
  };

  return (
    <>
      <EncabezadoSeccion etiqueta="Proceso" titulo="Bitácora">
        <p>Qué hicimos, qué decidimos y qué dificultades resolvimos, con su fecha real.</p>
      </EncabezadoSeccion>

      <div className="bitacora-filtros">
        <div className="bitacora-campo">
          <label htmlFor={idSprint}>Sprint</label>
          <select id={idSprint} value={sprint} onChange={(evento) => setSprint(evento.target.value)}>
            <option value="todos">Todos</option>
            {sprints.map((numero) => <option key={numero} value={numero}>Sprint {numero}</option>)}
          </select>
        </div>

        <fieldset className="bitacora-tipos">
          <legend>Tipo</legend>
          {['todos', ...tipos].map((valor) => (
            <button
              key={valor}
              type="button"
              className="bitacora-chip"
              aria-pressed={tipo === valor}
              onClick={() => setTipo(valor)}
            >
              {valor === 'todos' ? 'Todos' : ETIQUETA_TIPO[valor] ?? valor}
            </button>
          ))}
        </fieldset>

        <button type="button" className="bitacora-restablecer" onClick={restablecer} disabled={!hayFiltros}>
          Restablecer
        </button>
      </div>

      <p className="bitacora-cantidad" role="status" aria-live="polite">
        {visibles.length === 1 ? '1 entrada' : `${visibles.length} entradas`} de {entradas.length}
      </p>

      {visibles.length === 0 ? (
        <div className="bitacora-vacio">
          <p>No hay entradas para esos filtros.</p>
          <button type="button" className="bitacora-restablecer" onClick={restablecer}>Restablecer filtros</button>
        </div>
      ) : (
        visibles.map(({ fecha, sprint: numero, tipo: tipoEntrada, titulo, registros }, indice) => (
          <details className="bitacora-entrada" key={`${fecha}-${titulo}`} open={indice === 0}>
            <summary>
              <span className="bitacora-meta">
                <time dateTime={fecha}>{formatoFecha.format(new Date(fecha))}</time>
                <span className="bitacora-tipo">{ETIQUETA_TIPO[tipoEntrada] ?? tipoEntrada}</span>
              </span>
              <h2 className="bitacora-titulo">Sprint {numero} — {titulo}</h2>
            </summary>
            <ul>
              {registros.map((registro) => <li key={registro}>{registro}</li>)}
            </ul>
          </details>
        ))
      )}
    </>
  );
}