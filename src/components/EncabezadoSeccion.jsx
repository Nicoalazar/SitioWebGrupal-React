import { useEffect } from 'react';

// Encabezado común a todas las secciones; también actualiza el título de la pestaña
export default function EncabezadoSeccion({ etiqueta, titulo, children }) {
  useEffect(() => {
    document.title = `${titulo} — Grupo 15`;
  }, [titulo]);

  return (
    <header className="encabezado-seccion">
      {etiqueta && <p className="etiqueta">{etiqueta}</p>}
      <h1>{titulo}</h1>
      {children && <div className="encabezado-seccion-texto">{children}</div>}
    </header>
  );
}
