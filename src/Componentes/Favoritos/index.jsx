import { useContext, useState, useMemo } from 'react';
import { AppContext } from '../../Contexto/contexto';
import { useNavigate } from "react-router-dom";

function Favoritos() {
  const { favoritos } = useContext(AppContext);
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState('');

  const favoritosFiltrados = useMemo(() => {
    return favoritos
      .filter(p => p.nombre.toLowerCase().includes(searchTerm.toLowerCase()))
      .sort((a, b) => a.nombre.localeCompare(b.nombre));
  }, [favoritos, searchTerm]);

  return (
    <>
      <style>{`
        body, html, #root {
          margin: 0; padding: 0; background: #4a4a7a; /* tono oscuro de fondo */
        }

        .favoritos-container {
          padding: 30px 40px;
          background: linear-gradient(135deg, #5c6bc0, #8e99f3);
          min-height: 100vh;
          box-sizing: border-box;
          color: white;
        }

        h1 {
          text-align: center;
          margin-bottom: 20px;
          font-weight: 700;
          user-select: none;
          text-shadow: 0 0 10px #000000aa;
        }

        .search-input {
          display: block;
          margin: 0 auto 30px auto;
          width: 300px;
          max-width: 90%;
          padding: 10px 15px;
          font-size: 1rem;
          border-radius: 15px;
          border: none;
          box-shadow: 0 0 10px #3949ab88;
          outline: none;
          transition: box-shadow 0.3s ease;
          background: #2e2e5e;
          color: white;
        }

        .search-input::placeholder {
          color: #bbb;
        }

        .search-input:focus {
          box-shadow: 0 0 15px #283593ff;
        }

        .c-lista {
          display: flex;
          flex-wrap: wrap;
          gap: 25px;
          justify-content: center;
        }

        .c-lista-pokemon {
          background: #3949ab;
          border-radius: 20px;
          padding: 20px;
          width: 180px;
          text-align: center;
          cursor: pointer;
          box-shadow: 0 0 12px #1a1a40cc; /* sombra oscura suave */
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          user-select: none;
          border: none; /* aseguramos que no haya bordes */
        }

        .c-lista-pokemon:hover {
          transform: scale(1.1);
          box-shadow: 0 0 20px #283593cc;
        }

        .c-lista-pokemon img {
          width: 140px;
          height: 140px;
          object-fit: contain;
          margin-bottom: 10px;
          border-radius: 10px; /* opción para suavizar bordes imagen */
          background: transparent;
          border: none;
        }

        .c-lista-pokemon p {
          font-weight: 600;
          font-size: 1.1rem;
          text-transform: capitalize;
          color: white;
          margin: 0;
        }

        .no-favoritos {
          text-align: center;
          font-size: 1.3rem;
          margin-top: 50px;
          user-select: none;
        }
      `}</style>

      <div className="favoritos-container">
        <h1>Pokémon Favoritos</h1>

        {favoritos.length > 0 && (
          <input
            type="text"
            placeholder="Buscar Pokémon por nombre..."
            className="search-input"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            autoComplete="off"
          />
        )}

        {favoritosFiltrados.length === 0 ? (
          <p className="no-favoritos">No hay Pokémon que coincidan con la búsqueda.</p>
        ) : (
          <div className="c-lista">
            {favoritosFiltrados.map((pokemon) => (
              <div
                className="c-lista-pokemon"
                onClick={() => navigate(`/pokemon/${pokemon.id}`)}
                key={pokemon.id}
              >
                <img
                  src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`}
                  alt={`Pokémon ${pokemon.nombre}`}
                  loading="lazy"
                />
                <p>{pokemon.nombre}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}

export default Favoritos;
