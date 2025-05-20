import { useState, useContext } from 'react'
import { useNavigate } from "react-router-dom";
import Filtro from '../Filtro'
import { AppContext } from '../../Contexto/contexto';

function Lista() {
  const [busqueda, setBusqueda] = useState('');
  const navigate = useNavigate();

  const { data, setTipoSeleccionado } = useContext(AppContext);

  const handleTipoChange = (tipo) => {
    setTipoSeleccionado(tipo);
  };

  let resultados = data;

  if (busqueda.length >= 3 && isNaN(busqueda)) {
    resultados = data.filter(pokemon =>
      pokemon.name.toLowerCase().includes(busqueda.toLowerCase())
    );
  }

  if (!isNaN(busqueda)) {
    resultados = data.filter(pokemon =>
      pokemon.url.includes('/' + busqueda)
    );
  }

  return (
    <>
      <style>{`
        html, body {
          margin: 0;
          padding: 0;
          background: linear-gradient(135deg, #1f0066, #3b0a94, #6c00d8);
          background-size: 400% 400%;
          animation: backgroundMove 20s ease infinite;
          font-family: 'Segoe UI', sans-serif;
        }

        @keyframes backgroundMove {
          0% {background-position: 0% 50%;}
          50% {background-position: 100% 50%;}
          100% {background-position: 0% 50%;}
        }

        .c-buscador {
          width: 100%;
          max-width: 400px;
          margin: 30px auto 10px;
          display: block;
          padding: 14px 18px;
          font-size: 16px;
          border-radius: 14px;
          border: none;
          outline: none;
          background-color: #1e1e2f;
          color: white;
          box-shadow: 0 0 12px #8f00ff;
        }

        .c-lista {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
          gap: 30px;
          padding: 40px 30px 60px;
          justify-items: center;
        }

        .c-lista-pokemon {
          background: linear-gradient(145deg, #2b2b4b, #1d1d33);
          border-radius: 16px;
          padding: 16px 10px;
          width: 100%;
          max-width: 140px;
          min-height: 170px;
          text-align: center;
          box-shadow: 0 0 8px #9400ff, 0 0 16px #5c00cc;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          cursor: pointer;
        }

        .c-lista-pokemon:hover {
          transform: translateY(-8px);
          box-shadow: 0 0 16px #ff00e0, 0 0 24px #ff00e0;
        }

        .c-lista-pokemon img {
          width: 80px;
          height: 80px;
          object-fit: contain;
          margin-bottom: 8px;
          filter: drop-shadow(0 0 4px #ffffffaa);
        }

        .c-lista-pokemon p {
          font-size: 14px;
          font-weight: bold;
          color: #ffffff;
          text-transform: capitalize;
          margin: 0;
          text-shadow: 0 0 4px #ff00e0;
        }
      `}</style>

      <input
        type="text"
        placeholder="Buscar Pokémon"
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
        className="c-buscador"
      />
      <Filtro onTipoChange={handleTipoChange} />
      <section className='c-lista'>
        {resultados.map((pokemon, index) => (
          <div className='c-lista-pokemon'
            onClick={() => navigate(`/pokemon/${pokemon.name}`)}
            key={index}>
            <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.url.split("/")[6]}.png`}
              alt={`Pokémon ${pokemon.name}`} loading='lazy'
            />
            <p>{pokemon.name}</p>
          </div>
        ))}
      </section>
    </>
  )
}

export default Lista;
