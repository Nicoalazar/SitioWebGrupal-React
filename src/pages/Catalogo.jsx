import { useId, useMemo, useState } from 'react';
import { Link } from 'react-router';
import EncabezadoSeccion from '../components/EncabezadoSeccion.jsx';
import integrantes from '../data/integrantes.json';
import contenidos from '../data/contenidos.json';
import './Catalogo.css';

const TIPOS = [
  { valor: 'habilidad', etiqueta: 'Habilidades' },
  { valor: 'pelicula', etiqueta: 'Películas' },
  { valor: 'disco', etiqueta: 'Discos' },
];

const ETIQUETA_TIPO = { habilidad: 'Habilidad', pelicula: 'Película', disco: 'Disco' };

// Para buscar sin importar mayúsculas ni tildes: "pelicula" encuentra "Película"
const normalizar = (texto) =>
  texto.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().trim();

// Sprint 3: catálogo desde el JSON local, con búsqueda, filtro y detalle desplegable
export default function Catalogo() {
  const [busqueda, setBusqueda] = useState('');
  const [tipo, setTipo] = useState('todos');
  const [abiertos, setAbiertos] = useState(() => new Set());
  const idBusqueda = useId();
  const idTipo = useId();

  const resultados = useMemo(() => {
    const termino = normalizar(busqueda);
    return contenidos.filter((registro) => {
      if (tipo !== 'todos' && registro.tipo !== tipo) return false;
      if (!termino) return true;
      const texto = normalizar(`${registro.nombre} ${registro.datoExtra} ${registro.integrante} ${registro.categoria} ${registro.tipo}`);
      return texto.includes(termino);
    });
  }, [busqueda, tipo]);

  const hayFiltros = busqueda !== '' || tipo !== 'todos';

  const restablecer = () => {
    setBusqueda('');
    setTipo('todos');
  };

  const alternarDetalle = (id) => {
    setAbiertos((previos) => {
      const siguientes = new Set(previos);
      if (siguientes.has(id)) siguientes.delete(id);
      else siguientes.add(id);
      return siguientes;
    });
  };

  return (
    <>
      <EncabezadoSeccion etiqueta="Datos locales" titulo="Lo que nos gusta">
        <p>Las habilidades, películas y discos de cada integrante, en un solo catálogo.</p>
      </EncabezadoSeccion>

      <form className="catalogo-filtros" role="search" onSubmit={(evento) => evento.preventDefault()}>
        <div className="catalogo-campo catalogo-campo--ancho">
          <label htmlFor={idBusqueda}>Buscar</label>
          <input
            id={idBusqueda}
            type="search"
            value={busqueda}
            placeholder="Título, artista, director o integrante"
            onChange={(evento) => setBusqueda(evento.target.value)}
          />
        </div>

        <div className="catalogo-campo">
          <label htmlFor={idTipo}>Tipo</label>
          <select id={idTipo} value={tipo} onChange={(evento) => setTipo(evento.target.value)}>
            <option value="todos">Todos</option>
            {TIPOS.map(({ valor, etiqueta }) => (
              <option key={valor} value={valor}>{etiqueta}</option>
            ))}
          </select>
        </div>

        <button type="button" className="catalogo-restablecer" onClick={restablecer} disabled={!hayFiltros}>
          Restablecer
        </button>
      </form>

      <p className="catalogo-cantidad" role="status" aria-live="polite">
        {resultados.length === 1
          ? '1 resultado'
          : `${resultados.length} resultados`} de {contenidos.length}
      </p>

      {resultados.length === 0 ? (
        <div className="catalogo-vacio">
          <p>No encontramos nada para esa búsqueda.</p>
          <button type="button" className="catalogo-restablecer" onClick={restablecer}>
            Restablecer filtros
          </button>
        </div>
      ) : (
        <ul className="catalogo-lista">
          {resultados.map((registro) => {
            const abierto = abiertos.has(registro.id);
            const idDetalle = `detalle-${registro.id}`;
            const integrante = integrantes.find(({ slug }) => slug === registro.slug);
            return (
              <li key={registro.id} className="catalogo-tarjeta">
                <p className="catalogo-tipo">
                  {ETIQUETA_TIPO[registro.tipo]} · {registro.categoria}
                </p>
                <h2>{registro.nombre}</h2>
                <p className="catalogo-integrante">De {registro.integrante}</p>

                <button
                  type="button"
                  className="catalogo-detalle-boton"
                  aria-expanded={abierto}
                  aria-controls={idDetalle}
                  onClick={() => alternarDetalle(registro.id)}
                >
                  {abierto ? 'Ocultar detalle' : 'Ver detalle'}
                </button>

                <dl id={idDetalle} className="catalogo-detalle" hidden={!abierto}>
                  <dt>Dato extra</dt>
                  <dd>{registro.datoExtra}</dd>
                  {registro.anio && (
                    <>
                      <dt>Año</dt>
                      <dd>{registro.anio}</dd>
                    </>
                  )}
                  {integrante && (
                    <>
                      <dt>Perfil</dt>
                      <dd><Link to={`/equipo/${integrante.slug}`}>{integrante.nombre}</Link></dd>
                    </>
                  )}
                </dl>
              </li>
            );
          })}
        </ul>
      )}
    </>
  );
}
