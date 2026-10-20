import './TarjetaPerfil.css';

// Componente reutilizado por los cinco perfiles: los datos llegan por props
// y la interacción propia de cada integrante entra como children
export default function TarjetaPerfil({ nombre, avatar, ciudad, edad, github, children }) {
  return (
    <article className="tarjeta-perfil">
      <div className="tarjeta-perfil-datos">
        <img
          className="perfil-avatar"
          src={avatar}
          alt={`Avatar de ${nombre}`}
          width="1024"
          height="1024"
        />
        <ul className="lista-simple">
          <li><strong>Ciudad:</strong> {ciudad}</li>
          <li><strong>Edad:</strong> {edad} años</li>
          <li>
            <strong>GitHub:</strong>{' '}
            <a href={`https://github.com/${github}`} target="_blank" rel="noreferrer">
              @{github}
            </a>
          </li>
        </ul>
      </div>

      <section className="tarjeta-perfil-interaccion" aria-label={`Interacción de ${nombre}`}>
        {children ?? <p className="en-construccion">Interacción en construcción</p>}
      </section>
    </article>
  );
}
