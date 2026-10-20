import { Link, useParams } from 'react-router';
import EncabezadoSeccion from '../components/EncabezadoSeccion.jsx';
import TarjetaPerfil from '../components/TarjetaPerfil.jsx';
import interacciones from '../components/interacciones/index.js';
import NoEncontrada from './NoEncontrada.jsx';
import integrantes from '../data/integrantes.json';

export default function Perfil() {
  const { slug } = useParams();
  const posicion = integrantes.findIndex((integrante) => integrante.slug === slug);

  if (posicion === -1) return <NoEncontrada />;

  const integrante = integrantes[posicion];
  const Interaccion = interacciones[integrante.slug];
  // Paginación circular entre compañeros, como en el TP1
  const anterior = integrantes[(posicion - 1 + integrantes.length) % integrantes.length];
  const siguiente = integrantes[(posicion + 1) % integrantes.length];

  return (
    <>
      <EncabezadoSeccion etiqueta="Perfil del equipo" titulo={integrante.nombre} />

      {/* key reinicia la interacción al pasar de un perfil a otro */}
      <TarjetaPerfil key={integrante.slug} {...integrante}>
        {Interaccion && <Interaccion />}
      </TarjetaPerfil>

      <nav className="paginacion" aria-label="Navegación entre compañeros">
        <Link to={`/equipo/${anterior.slug}`}>← {anterior.nombre}</Link>
        <Link to={`/equipo/${siguiente.slug}`}>{siguiente.nombre} →</Link>
      </nav>
    </>
  );
}
