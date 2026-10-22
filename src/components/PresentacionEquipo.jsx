import { useState } from 'react';
import { Link } from 'react-router';
import './PresentacionEquipo.css';

// Panel de la portada: al tocar una foto, cada integrante se presenta
export default function PresentacionEquipo({ integrantes }) {
  const [elegido, setElegido] = useState(null);

  const integrante = integrantes.find((i) => i.slug === elegido);

  // Tocar de nuevo la misma foto vuelve al mensaje del equipo
  function elegir(slug) {
    setElegido(slug === elegido ? null : slug);
  }

  return (
    <div className="presentacion-equipo">
      <p className="etiqueta">Grupo 15</p>

      <div className="presentacion-mensaje" aria-live="polite">
        {integrante ? (
          <>
            <strong>Hola, soy {integrante.nombre}.</strong>
            <p>Vivo en {integrante.ciudad} y tengo {integrante.edad} años.</p>
            <Link to={`/equipo/${integrante.slug}`}>Ver mi perfil →</Link>
          </>
        ) : (
          <>
            <strong>Ideas que se conectan.</strong>
            <p>Tocá una foto para que cada integrante se presente.</p>
          </>
        )}
      </div>

      <div className="presentacion-fotos" role="group" aria-label="Integrantes del equipo">
        {integrantes.map((i) => (
          <button
            key={i.slug}
            type="button"
            className={`presentacion-foto${i.slug === elegido ? ' is-elegida' : ''}`}
            aria-pressed={i.slug === elegido}
            onClick={() => elegir(i.slug)}
          >
            <img src={i.avatar} alt={i.nombre} width="1024" height="1024" />
          </button>
        ))}
      </div>
    </div>
  );
}
