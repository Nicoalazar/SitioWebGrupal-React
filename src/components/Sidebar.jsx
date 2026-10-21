import { Link, NavLink } from 'react-router';
import integrantes from '../data/integrantes.json';
import './Sidebar.css';

const secciones = [
  { ruta: '/', texto: 'Inicio', exacta: true },
  { ruta: '/catalogo', texto: 'Lo que nos gusta' },
  { ruta: '/clima', texto: 'El clima del equipo' },
  { ruta: '/arbol', texto: 'Árbol de componentes' },
  { ruta: '/bitacora', texto: 'Bitácora' },
];

// NavLink agrega la clase "active" y aria-current="page" a la sección actual
export default function Sidebar({ abierta }) {
  return (
    <aside id="sidebar" className={`sidebar${abierta ? ' sidebar--abierta' : ''}`}>
      {/* Link y no NavLink: la sección activa se marca solo en la lista */}
      <Link to="/" className="sidebar-identidad">
        <img src="/favicon.svg" alt="" width="48" height="48" />
        <span>
          <strong>Grupo 15</strong>
          <small>Desarrollo de Sistemas Web</small>
        </span>
      </Link>

      <nav aria-label="Secciones">
        <ul className="sidebar-lista">
          {secciones.map(({ ruta, texto, exacta }) => (
            <li key={ruta}>
              <NavLink to={ruta} end={exacta}>{texto}</NavLink>
            </li>
          ))}
        </ul>

        <p className="sidebar-subtitulo" id="sidebar-equipo">El equipo</p>
        <ul className="sidebar-lista" aria-labelledby="sidebar-equipo">
          {integrantes.map(({ slug, nombre }) => (
            <li key={slug}>
              <NavLink to={`/equipo/${slug}`}>{nombre}</NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}
