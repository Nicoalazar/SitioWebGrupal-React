import { Link } from 'react-router';
import EncabezadoSeccion from '../components/EncabezadoSeccion.jsx';
import integrantes from '../data/integrantes.json';

// Sprint 2: presentación propia e interactiva del equipo
export default function Inicio() {
  return (
    <>
      <EncabezadoSeccion etiqueta="Grupo 15 · Desarrollo de Sistemas Web" titulo="Tu equipo, tu próxima idea">
        <p>Somos cinco estudiantes que aprenden haciendo. Acá están nuestros perfiles, lo que nos gusta y cómo trabajamos.</p>
      </EncabezadoSeccion>

      <section aria-labelledby="equipo-titulo">
        <h2 id="equipo-titulo">Conocé al equipo</h2>
        <ul className="lista-simple">
          {integrantes.map(({ slug, nombre }) => (
            <li key={slug}><Link to={`/equipo/${slug}`}>{nombre}</Link></li>
          ))}
        </ul>
      </section>
    </>
  );
}
