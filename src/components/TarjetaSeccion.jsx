import { Link } from 'react-router';
import './TarjetaSeccion.css';

// Tarjeta de la portada que presenta una sección y lleva a ella
export default function TarjetaSeccion({ numero, titulo, texto, ruta, imagen }) {
  return (
    <Link className="tarjeta-seccion" to={ruta}>
      {/* Ilustración decorativa: el título ya dice de qué se trata la sección */}
      {imagen && <img className="tarjeta-seccion-imagen" src={imagen} alt="" width="320" height="180" />}
      <span className="tarjeta-seccion-numero" aria-hidden="true">{numero}</span>
      <h3>{titulo}</h3>
      <p>{texto}</p>
      <span className="tarjeta-seccion-ir" aria-hidden="true">→</span>
    </Link>
  );
}