import { Route, Routes } from 'react-router';
import Layout from './components/Layout.jsx';
import Inicio from './pages/Inicio.jsx';
import Perfil from './pages/Perfil.jsx';
import Catalogo from './pages/Catalogo.jsx';
import Clima from './pages/Clima.jsx';
import Arbol from './pages/Arbol.jsx';
import Bitacora from './pages/Bitacora.jsx';
import NoEncontrada from './pages/NoEncontrada.jsx';

// Todas las secciones comparten el Layout, que contiene la sidebar
export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Inicio />} />
        <Route path="equipo/:slug" element={<Perfil />} />
        <Route path="catalogo" element={<Catalogo />} />
        <Route path="clima" element={<Clima />} />
        <Route path="arbol" element={<Arbol />} />
        <Route path="bitacora" element={<Bitacora />} />
        <Route path="*" element={<NoEncontrada />} />
      </Route>
    </Routes>
  );
}
