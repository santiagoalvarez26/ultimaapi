import { useState, useEffect, useContext } from 'react';
import { useParams } from "react-router-dom";
import { AppContext } from '../../Contexto/contexto';

function Pokemon() {
  const { name } = useParams();
  const [datapoke, setDatapoke] = useState(null);
  const { favoritos, setFavoritos } = useContext(AppContext);
  const esFavorito = datapoke && favoritos.some(p => p.id === datapoke.id);

  useEffect(() => {
    setDatapoke(null); // Reset cuando cambia el nombre
    fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
      .then(response => response.json())
      .then(responseData => setDatapoke(responseData))
      .catch(error => console.error("Error:", error));
  }, [name]);

  const toggleFavorito = () => {
    if (!datapoke) return;
    if (esFavorito) {
      setFavoritos(favoritos.filter(p => p.id !== datapoke.id));
    } else {
      setFavoritos([...favoritos, { id: datapoke.id, nombre: datapoke.name }]);
    }
  };

  if (!datapoke) return <p style={{ color: 'white', textAlign: 'center', marginTop: '50px' }}>Cargando...</p>;

  const tipoColores = {
    normal: '#A8A77A',
    fire: '#EE8130',
    water: '#6390F0',
    electric: '#F7D02C',
    grass: '#7AC74C',
    ice: '#96D9D6',
    fighting: '#C22E28',
    poison: '#A33EA1',
    ground: '#E2BF65',
    flying: '#A98FF3',
    psychic: '#F95587',
    bug: '#A6B91A',
    rock: '#B6A136',
    ghost: '#735797',
    dragon: '#6F35FC',
    dark: '#705746',
    steel: '#B7B7CE',
    fairy: '#D685AD',
    stellar: '#AB47BC',
    shadow: '#4B0082',
    unknown: '#777777'
  };

  const tipoPrincipal = datapoke.types[0].type.name;
  const colorTipoPrincipal = tipoColores[tipoPrincipal] || '#333';

  return (
    <>
      <style>{`
        body {
          margin: 0;
          padding: 0;
          background: linear-gradient(-45deg, #8e9eff, #b388ff, #7f7fff, #c084fc, #6f00ff);
          background-size: 400% 400%;
          animation: gradientBackground 15s ease infinite;
          overflow: hidden;
        }

        @keyframes gradientBackground {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }

        .poke-container {
          max-width: 400px;
          margin: 40px auto;
          border-radius: 20px;
          padding: 30px 25px;
          box-shadow: 0 0 20px #9400ff88;
          color: white;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          text-align: center;
          background: ${colorTipoPrincipal};
        }

        .poke-img {
          width: 180px;
          height: 180px;
          border-radius: 50%;
          background: radial-gradient(circle at center, #ff00e0, transparent);
          box-shadow: 0 0 15px #ff00e0;
          margin: 0 auto 20px;
          object-fit: contain;
        }

        .poke-name {
          font-size: 2rem;
          font-weight: 700;
          text-transform: capitalize;
          margin-bottom: 10px;
          text-shadow: 0 0 8px #ff00e0;
        }

        .poke-id {
          font-size: 1rem;
          margin-bottom: 15px;
          color: #aaa;
        }

        .tipos-container {
          margin-bottom: 20px;
        }

        .tipo-chip {
          display: inline-block;
          padding: 6px 14px;
          border-radius: 20px;
          margin: 0 6px;
          font-size: 0.9rem;
          font-weight: 600;
          text-transform: capitalize;
          color: white;
          box-shadow: 0 0 8px;
          transition: box-shadow 0.3s ease;
        }

        .tipo-chip:hover {
          box-shadow: 0 0 14px white;
        }

        .stats-container {
          text-align: left;
          margin: 20px 0;
        }

        .stat-row {
          display: flex;
          justify-content: space-between;
          margin: 8px 0;
          font-weight: 600;
          font-size: 0.95rem;
        }

        .stat-bar {
          flex-grow: 1;
          height: 12px;
          background: #31106e;
          border-radius: 10px;
          margin-left: 10px;
          position: relative;
          overflow: hidden;
          box-shadow: inset 0 0 5px #000;
        }

        .stat-fill {
          height: 100%;
          border-radius: 10px;
          background: linear-gradient(90deg, #ff00e0, #9400ff);
          box-shadow: 0 0 8px #ff00e0;
          transition: width 0.6s ease;
        }

        .info-peso-altura {
          margin-top: 15px;
          font-size: 1rem;
          font-weight: 600;
          color: #ddd;
        }

        .favorito-btn {
          margin-top: 30px;
          background: transparent;
          border: 2px solid #ff00e0;
          color: #ff00e0;
          padding: 10px 30px;
          border-radius: 30px;
          font-size: 1.5rem;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 0 12px #ff00e0;
        }

        .favorito-btn:hover {
          background: #ff00e0;
          color: white;
          box-shadow: 0 0 20px #ff00e0, 0 0 30px #ff00e0;
        }
      `}</style>

      <div className="poke-container">
        <img
          className="poke-img"
          src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${datapoke.id}.png`}
          alt={datapoke.name}
          loading="lazy"
        />

        <p className="poke-name">{datapoke.name}</p>
        <p className="poke-id">ID: #{datapoke.id}</p>

        <div className="tipos-container">
          {datapoke.types.map(({ type }) => (
            <span
              key={type.name}
              className="tipo-chip"
              style={{ backgroundColor: tipoColores[type.name] || '#666' }}
              title={`Tipo ${type.name}`}
            >
              {type.name}
            </span>
          ))}
        </div>

        <p className="info-peso-altura">
          Altura: {(datapoke.height / 10).toFixed(1)} m &nbsp;|&nbsp; Peso: {(datapoke.weight / 10).toFixed(1)} kg
        </p>

        <div className="stats-container">
          {datapoke.stats.map((stat, index) => (
            <div className="stat-row" key={index}>
              <div>{stat.stat.name.replace('-', ' ')}</div>
              <div className="stat-bar">
                <div
                  className="stat-fill"
                  style={{ width: `${(stat.base_stat / 255) * 100}%` }}
                  title={stat.base_stat}
                />
              </div>
            </div>
          ))}
        </div>

        <button className="favorito-btn" onClick={toggleFavorito}>
          {esFavorito ? '❤️ Favorito' : '🤍 Agregar a Favoritos'}
        </button>
      </div>
    </>
  );
}

export default Pokemon;
