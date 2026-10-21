import { Link } from 'react-router';
import './TarjetaSeccion.css';

// Tarjeta de la portada que presenta una sección y lleva a ella
export default function TarjetaSeccion({ numero, titulo, texto, ruta }) {
  return (
    <Link className="tarjeta-seccion" to={ruta}>
      <span className="tarjeta-seccion-numero" aria-hidden="true">{numero}</span>
      <h3>{titulo}</h3>
      <p>{texto}</p>
      <span className="tarjeta-seccion-ir" aria-hidden="true">→</span>
    </Link>
  );
}
