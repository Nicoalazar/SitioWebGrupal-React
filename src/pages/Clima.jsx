import { useCallback, useEffect, useState } from 'react';
import EncabezadoSeccion from '../components/EncabezadoSeccion.jsx';
import integrantes from '../data/integrantes.json';
import './Clima.css';

// Códigos WMO que devuelve Open-Meteo (weather_code) traducidos a texto
const DESCRIPCIONES = {
  0: 'Despejado',
  1: 'Mayormente despejado',
  2: 'Parcialmente nublado',
  3: 'Nublado',
  45: 'Niebla',
  48: 'Niebla con escarcha',
  51: 'Llovizna leve',
  53: 'Llovizna',
  55: 'Llovizna intensa',
  61: 'Lluvia leve',
  63: 'Lluvia',
  65: 'Lluvia intensa',
  71: 'Nevada leve',
  73: 'Nevada',
  75: 'Nevada intensa',
  80: 'Chubascos leves',
  81: 'Chubascos',
  82: 'Chubascos fuertes',
  95: 'Tormenta',
  96: 'Tormenta con granizo',
  99: 'Tormenta fuerte con granizo',
};

const describir = (codigo) => DESCRIPCIONES[codigo] ?? 'Sin descripción';

// Una sola consulta con las coordenadas de los cinco integrantes, separadas por coma
function armarUrl() {
  const latitudes = integrantes.map(({ coordenadas }) => coordenadas.lat).join(',');
  const longitudes = integrantes.map(({ coordenadas }) => coordenadas.lon).join(',');
  const actual = 'temperature_2m,apparent_temperature,relative_humidity_2m,wind_speed_10m,weather_code';
  return `https://api.open-meteo.com/v1/forecast?latitude=${latitudes}&longitude=${longitudes}&current=${actual}&timezone=auto`;
}

// Sprint 3: consulta a Open-Meteo con estados de carga, error y reintento
export default function Clima() {
  const [estado, setEstado] = useState('cargando'); // 'cargando' | 'listo' | 'error'
  const [datos, setDatos] = useState([]);
  const [intento, setIntento] = useState(0);

  useEffect(() => {
    const controlador = new AbortController();
    setEstado('cargando');

    // Si Open-Meteo no responde en 10 segundos, la consulta se corta y pasa al estado de error
    const limite = AbortSignal.timeout(10000);
    fetch(armarUrl(), { signal: AbortSignal.any([controlador.signal, limite]) })
      .then((respuesta) => {
        if (!respuesta.ok) throw new Error(`Open-Meteo respondió ${respuesta.status}`);
        return respuesta.json();
      })
      .then((json) => {
        // Con varias coordenadas la API devuelve un arreglo; con una sola, un objeto
        const lista = Array.isArray(json) ? json : [json];
        if (lista.length !== integrantes.length || lista.some((item) => !item.current)) {
          throw new Error('La respuesta de Open-Meteo no tiene el formato esperado');
        }
        setDatos(lista);
        setEstado('listo');
      })
      .catch((error) => {
        if (error.name === 'AbortError') return;
        setEstado('error');
      });

    return () => controlador.abort();
  }, [intento]);

  const reintentar = useCallback(() => setIntento((n) => n + 1), []);

  return (
    <>
      <EncabezadoSeccion etiqueta="API pública · Open-Meteo" titulo="El clima del equipo">
        <p>
          El clima actual en la ciudad de cada integrante, consultado en vivo a Open-Meteo,
          una API abierta que no requiere clave.
        </p>
      </EncabezadoSeccion>

      <div aria-live="polite">
        {estado === 'cargando' && (
          <p className="clima-estado" role="status">Consultando el clima…</p>
        )}

        {estado === 'error' && (
          <div className="clima-estado clima-estado--error" role="alert">
            <p>No pudimos obtener el clima. Intentá de nuevo en unos segundos.</p>
            <button type="button" className="clima-reintentar" onClick={reintentar}>
              Reintentar
            </button>
          </div>
        )}
      </div>

      {estado === 'listo' && (
        <>
          <ul className="clima-lista">
            {integrantes.map((integrante, indice) => {
              const { current, current_units: unidades } = datos[indice];
              return (
                <li key={integrante.slug} className="clima-tarjeta">
                  <p className="clima-ciudad">{integrante.ciudad}</p>
                  <h2>{integrante.nombre}</h2>
                  <p className="clima-temperatura">
                    {Math.round(current.temperature_2m)}{unidades.temperature_2m}
                  </p>
                  <p className="clima-descripcion">{describir(current.weather_code)}</p>
                  <dl className="clima-detalle">
                    <dt>Sensación térmica</dt>
                    <dd>{Math.round(current.apparent_temperature)}{unidades.apparent_temperature}</dd>
                    <dt>Humedad</dt>
                    <dd>{current.relative_humidity_2m}{unidades.relative_humidity_2m}</dd>
                    <dt>Viento</dt>
                    <dd>{Math.round(current.wind_speed_10m)} {unidades.wind_speed_10m}</dd>
                  </dl>
                </li>
              );
            })}
          </ul>
          <p className="clima-fuente">
            Datos de <a href="https://open-meteo.com/" target="_blank" rel="noreferrer">Open-Meteo</a>.{' '}
            <button type="button" className="clima-reintentar" onClick={reintentar}>
              Actualizar
            </button>
          </p>
        </>
      )}
    </>
  );
}
