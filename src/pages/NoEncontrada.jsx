import { Link } from 'react-router';
import EncabezadoSeccion from '../components/EncabezadoSeccion.jsx';

export default function NoEncontrada() {
  return (
    <EncabezadoSeccion etiqueta="Error 404" titulo="Esta página no existe">
      <p>Puede que el enlace esté mal escrito o que la sección haya cambiado de lugar.</p>
      <p><Link to="/">Volver al inicio</Link></p>
    </EncabezadoSeccion>
  );
}
