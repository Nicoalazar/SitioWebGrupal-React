import { Link, useParams } from 'react-router';
import EncabezadoSeccion from '../components/EncabezadoSeccion.jsx';
import NoEncontrada from './NoEncontrada.jsx';
import integrantes from '../data/integrantes.json';

// Sprint 2: el contenido del perfil y su interacción pasan a un componente con props
export default function Perfil() {
  const { slug } = useParams();
  const posicion = integrantes.findIndex((integrante) => integrante.slug === slug);

  if (posicion === -1) return <NoEncontrada />;

  const integrante = integrantes[posicion];
  // Paginación circular entre compañeros, como en el TP1
  const anterior = integrantes[(posicion - 1 + integrantes.length) % integrantes.length];
  const siguiente = integrantes[(posicion + 1) % integrantes.length];

  return (
    <>
      <EncabezadoSeccion etiqueta="Perfil del equipo" titulo={integrante.nombre} />

      <img
        className="perfil-avatar"
        src={integrante.avatar}
        alt={`Avatar de ${integrante.nombre}`}
        width="1024"
        height="1024"
      />
      <ul className="lista-simple">
        <li><strong>Ciudad:</strong> {integrante.ciudad}</li>
        <li><strong>Edad:</strong> {integrante.edad} años</li>
        <li>
          <strong>GitHub:</strong>{' '}
          <a href={`https://github.com/${integrante.github}`} target="_blank" rel="noreferrer">
            @{integrante.github}
          </a>
        </li>
      </ul>

      <nav className="paginacion" aria-label="Navegación entre compañeros">
        <Link to={`/equipo/${anterior.slug}`}>← {anterior.nombre}</Link>
        <Link to={`/equipo/${siguiente.slug}`}>{siguiente.nombre} →</Link>
      </nav>
    </>
  );
}
