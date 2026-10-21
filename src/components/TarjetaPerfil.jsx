import './TarjetaPerfil.css';

// Cada colección del integrante se muestra como una lista con su dato extra
function ListaGustos({ titulo, items }) {
  if (!items.length) return null;

  return (
    <section className="tarjeta-perfil-gustos-bloque">
      <h2>{titulo}</h2>
      <ul>
        {items.map((item) => (
          <li key={item.id}>
            <strong>{item.nombre}</strong>
            <small>{item.anio ? `${item.datoExtra} · ${item.anio}` : item.datoExtra}</small>
          </li>
        ))}
      </ul>
    </section>
  );
}

// Componente reutilizado por los cinco perfiles: los datos llegan por props
// y la interacción propia de cada integrante entra como children
export default function TarjetaPerfil({
  nombre,
  avatar,
  ciudad,
  edad,
  especialidad,
  github,
  habilidades = [],
  peliculas = [],
  discos = [],
  children,
}) {
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
          {/* No todos cargaron especialidad en el TP1 */}
          {especialidad && <li><strong>Especialidad:</strong> {especialidad}</li>}
          <li>
            <strong>GitHub:</strong>{' '}
            <a href={`https://github.com/${github}`} target="_blank" rel="noreferrer">
              @{github}
            </a>
          </li>
        </ul>
      </div>

      <div className="tarjeta-perfil-gustos">
        <ListaGustos titulo="Habilidades" items={habilidades} />
        <ListaGustos titulo="Películas favoritas" items={peliculas} />
        <ListaGustos titulo="Discos favoritos" items={discos} />
      </div>

      <section className="tarjeta-perfil-interaccion" aria-label={`Interacción de ${nombre}`}>
        {children ?? <p className="en-construccion">Interacción en construcción</p>}
      </section>
    </article>
  );
}
