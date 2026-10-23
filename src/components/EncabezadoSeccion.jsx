import { useEffect } from 'react';
import { useLocation } from 'react-router';
import secciones from '../data/secciones.json';

// Encabezado común a todas las secciones; también actualiza el título de la pestaña
export default function EncabezadoSeccion({ etiqueta, titulo, children }) {
  useEffect(() => {
    document.title = `${titulo} — Grupo 15`;
  }, [titulo]);

  // Si la sección tiene ilustración en secciones.json, se muestra al costado del título
  const { pathname } = useLocation();
  const imagen = secciones.find(({ ruta }) => ruta === pathname)?.imagen;

  return (
    <header className={`encabezado-seccion${imagen ? ' encabezado-seccion--imagen' : ''}`}>
      <div>
        {etiqueta && <p className="etiqueta">{etiqueta}</p>}
        <h1>{titulo}</h1>
        {children && <div className="encabezado-seccion-texto">{children}</div>}
      </div>
      {imagen && <img className="encabezado-seccion-imagen" src={imagen} alt="" width="320" height="180" />}
    </header>
  );
}