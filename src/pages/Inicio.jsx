import EncabezadoSeccion from '../components/EncabezadoSeccion.jsx';
import PresentacionEquipo from '../components/PresentacionEquipo.jsx';
import TarjetaSeccion from '../components/TarjetaSeccion.jsx';
import CarruselEquipo from '../components/CarruselEquipo.jsx';
import integrantes from '../data/integrantes.json';
import './Inicio.css';

// Lo que se puede recorrer en la aplicación, además de los perfiles
const secciones = [
  { titulo: 'Lo que nos gusta', texto: 'Las películas, discos y habilidades del equipo, con búsqueda y filtros.', ruta: '/catalogo' },
  { titulo: 'El clima del equipo', texto: 'Cómo está el día en la ciudad de cada integrante.', ruta: '/clima' },
  { titulo: 'Árbol de componentes', texto: 'Cómo está armada esta aplicación por dentro.', ruta: '/arbol' },
  { titulo: 'Bitácora', texto: 'Las decisiones y aprendizajes de cada sprint.', ruta: '/bitacora' },
];

export default function Inicio() {
  return (
    <>
      <section className="portada-hero">
        <div>
          <EncabezadoSeccion etiqueta="Grupo 15 · Desarrollo de Sistemas Web" titulo="Tu equipo, tu próxima idea">
            <p>Somos cinco estudiantes que aprenden haciendo. Acá están nuestros perfiles, lo que nos gusta y cómo trabajamos.</p>
          </EncabezadoSeccion>
          <a className="portada-boton" href="#equipo">Conocer al equipo</a>
        </div>
        <PresentacionEquipo integrantes={integrantes} />
      </section>

      <section className="portada-secciones" aria-labelledby="secciones-titulo">
        <p className="etiqueta">Lo que vas a encontrar</p>
        <h2 id="secciones-titulo">Recorré el proyecto</h2>
        <div className="portada-secciones-grilla">
          {secciones.map((seccion, indice) => (
            <TarjetaSeccion key={seccion.ruta} numero={`0${indice + 1}`} {...seccion} />
          ))}
        </div>
      </section>

      <CarruselEquipo integrantes={integrantes} />
    </>
  );
}
