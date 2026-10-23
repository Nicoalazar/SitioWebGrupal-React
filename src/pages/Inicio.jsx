import EncabezadoSeccion from '../components/EncabezadoSeccion.jsx';
import PresentacionEquipo from '../components/PresentacionEquipo.jsx';
import TarjetaSeccion from '../components/TarjetaSeccion.jsx';
import CarruselEquipo from '../components/CarruselEquipo.jsx';
import integrantes from '../data/integrantes.json';
// Lo que se puede recorrer en la aplicación, además de los perfiles.
// El mismo JSON da la ilustración de cada sección a EncabezadoSeccion
import secciones from '../data/secciones.json';
import './Inicio.css';

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
