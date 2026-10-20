import { useEffect, useState } from 'react';
import { Outlet, useLocation } from 'react-router';
import Sidebar from './Sidebar.jsx';
import './Layout.css';

export default function Layout() {
  const [menuAbierto, setMenuAbierto] = useState(false);
  const { pathname } = useLocation();

  // Al cambiar de sección, el panel móvil se cierra y la vista vuelve arriba
  useEffect(() => {
    setMenuAbierto(false);
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    if (!menuAbierto) return undefined;
    const cerrarConEscape = (evento) => {
      if (evento.key === 'Escape') setMenuAbierto(false);
    };
    document.addEventListener('keydown', cerrarConEscape);
    return () => document.removeEventListener('keydown', cerrarConEscape);
  }, [menuAbierto]);

  return (
    <div className="layout">
      <a className="skip-link" href="#contenido-principal">Saltar al contenido principal</a>

      <header className="topbar">
        <span className="topbar-marca">Grupo 15</span>
        <button
          type="button"
          className="topbar-menu"
          aria-expanded={menuAbierto}
          aria-controls="sidebar"
          onClick={() => setMenuAbierto((abierto) => !abierto)}
        >
          {menuAbierto ? 'Cerrar menú' : 'Menú'}
        </button>
      </header>

      <Sidebar abierta={menuAbierto} />

      {menuAbierto && (
        <div className="sidebar-fondo" aria-hidden="true" onClick={() => setMenuAbierto(false)} />
      )}

      <main className="contenido" id="contenido-principal">
        <Outlet />
      </main>
    </div>
  );
}
