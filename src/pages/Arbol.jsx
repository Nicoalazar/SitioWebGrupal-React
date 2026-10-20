import EncabezadoSeccion from '../components/EncabezadoSeccion.jsx';

// Sprint 5: árbol desplegable que corresponde a los componentes reales
export default function Arbol() {
  return (
    <EncabezadoSeccion etiqueta="Cómo está hecha" titulo="Árbol de componentes">
      <p>La jerarquía de componentes de esta aplicación, desde App hasta cada tarjeta.</p>
      <p className="en-construccion">Sección en construcción (Sprint 5).</p>
    </EncabezadoSeccion>
  );
}
