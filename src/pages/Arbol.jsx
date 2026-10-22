import { useState } from 'react';
import EncabezadoSeccion from '../components/EncabezadoSeccion.jsx';
import arbol from '../data/arbol.json';
import './Arbol.css';

// Datos del componente: archivo, ruta y de dónde lee la información
function Detalle({ archivo, ruta, datos, descripcion }) {
  return (
    <div className="arbol-detalle">
      <code className="arbol-archivo">{archivo}</code>
      {ruta && <span className="arbol-chip">ruta {ruta}</span>}
      {datos && <span className="arbol-chip">lee {datos}</span>}
      <p className="arbol-descripcion">{descripcion}</p>
    </div>
  );
}

// Componente recursivo: se dibuja a sí mismo para cada hijo
function NodoArbol({ nodo, nivel, abrirTodo }) {
  const { nombre, hijos = [], ...detalle } = nodo;

  if (!hijos.length) {
    return (
      <li className="arbol-nodo">
        <div className="arbol-hoja">
          <span className="arbol-nombre">&lt;{nombre} /&gt;</span>
          <Detalle {...detalle} />
        </div>
      </li>
    );
  }

  return (
    <li className="arbol-nodo">
      {/* Abiertos por defecto los tres primeros niveles: main, App y Layout */}
      <details open={abrirTodo ?? nivel < 3}>
        <summary>
          <span className="arbol-nombre">&lt;{nombre}&gt;</span>
          <span className="arbol-cantidad">{hijos.length} {hijos.length === 1 ? 'hijo' : 'hijos'}</span>
        </summary>
        <Detalle {...detalle} />
        <ul className="arbol-lista">
          {hijos.map((hijo) => (
            <NodoArbol key={`${hijo.nombre}-${hijo.archivo}`} nodo={hijo} nivel={nivel + 1} abrirTodo={abrirTodo} />
          ))}
        </ul>
      </details>
    </li>
  );
}

export default function Arbol() {
  // null: cada nodo usa su estado inicial; true o false: todos abiertos o cerrados
  const [abrirTodo, setAbrirTodo] = useState(null);
  const [version, setVersion] = useState(0);

  const alternarTodo = (abrir) => {
    setAbrirTodo(abrir);
    setVersion((anterior) => anterior + 1); // la key nueva vuelve a montar el árbol
  };

  return (
    <>
      <EncabezadoSeccion etiqueta="Cómo está hecha" titulo="Árbol de componentes">
        <p>
          La jerarquía real de esta aplicación, desde el punto de entrada hasta cada interacción.
          Desplegá cada componente para ver su archivo, su ruta y de dónde toma los datos.
        </p>
      </EncabezadoSeccion>

      <div className="arbol-acciones">
        <button type="button" className="arbol-boton" onClick={() => alternarTodo(true)}>Expandir todo</button>
        <button type="button" className="arbol-boton" onClick={() => alternarTodo(false)}>Contraer todo</button>
      </div>

      <ul className="arbol-lista arbol-raiz" key={version}>
        <NodoArbol nodo={arbol} nivel={0} abrirTodo={abrirTodo} />
      </ul>
    </>
  );
}