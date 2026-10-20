import EncabezadoSeccion from '../components/EncabezadoSeccion.jsx';

// Sprint 3: consulta a Open-Meteo con estados de carga, error y reintento
export default function Clima() {
  return (
    <EncabezadoSeccion etiqueta="API pública · Open-Meteo" titulo="El clima del equipo">
      <p>
        El clima actual en la ciudad de cada integrante, consultado en vivo a Open-Meteo,
        una API abierta que no requiere clave.
      </p>
      <p className="en-construccion">Sección en construcción (Sprint 3).</p>
    </EncabezadoSeccion>
  );
}
