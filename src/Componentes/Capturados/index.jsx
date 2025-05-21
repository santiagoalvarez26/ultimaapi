import { useState, useContext } from 'react';
import { AppContext } from '../../Contexto/contexto';

function Capturados() {
  const { listaCapturados } = useContext(AppContext);
  const [selectedPokemon, setSelectedPokemon] = useState(null);

  const handleCardClick = async (id) => {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
    const data = await res.json();
    setSelectedPokemon(data);
  };

  const closeModal = () => {
    setSelectedPokemon(null);
  };

  return (
    <>
      <style>{`
        body, html, #root {
          margin: 0;
          padding: 0;
          height: 100%;
          background: linear-gradient(135deg, #3f51b5, #7e57c2);
          overflow: hidden;
        }

        .capturados-wrapper {
          height: 100vh;
          display: flex;
          flex-direction: column;
          padding: 20px 40px;
          box-sizing: border-box;
          color: white;
        }

        h1 {
          margin: 0 0 20px;
          font-weight: 700;
          font-size: 2rem;
          text-align: center;
          text-shadow: 0 0 10px #00000088;
          user-select: none;
        }

        .capturados-container {
          flex-grow: 1;
          display: flex;
          flex-wrap: wrap;
          gap: 30px;
          justify-content: center;
          overflow-y: auto;
          padding-right: 10px;
          box-sizing: border-box;
        }

        /* Scrollbar styling */
        .capturados-container::-webkit-scrollbar {
          width: 10px;
        }
        .capturados-container::-webkit-scrollbar-thumb {
          background: #7e57c2aa;
          border-radius: 10px;
        }
        .capturados-container::-webkit-scrollbar-track {
          background: transparent;
        }

        .poke-card {
          background: #1f1f2e;
          color: white;
          border-radius: 20px;
          padding: 20px;
          width: 220px;
          text-align: center;
          box-shadow: 0 0 20px #00000055;
          cursor: pointer;
          transition: transform 0.3s ease;
          user-select: none;
        }

        .poke-card:hover {
          transform: scale(1.05);
        }

        .poke-card img {
          width: 140px;
          height: 140px;
          object-fit: contain;
          margin-bottom: 10px;
        }

        .modal-backdrop {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          background: rgba(0,0,0,0.7);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 9999;
        }

        .modal-content {
          background: #2c2c3a;
          color: white;
          padding: 30px;
          border-radius: 20px;
          max-width: 500px;
          width: 90%;
          box-shadow: 0 0 30px #000000aa;
          text-align: center;
          user-select: none;
        }

        .modal-content h2 {
          text-transform: capitalize;
          margin-bottom: 10px;
        }

        .modal-content img {
          display: block;
          margin: 0 auto 20px;
          width: 180px;
          height: 180px;
          object-fit: contain;
        }

        .modal-close {
          margin-top: 20px;
          background: #7e57c2;
          border: none;
          padding: 10px 20px;
          border-radius: 10px;
          color: white;
          font-weight: bold;
          cursor: pointer;
          transition: background 0.3s;
        }

        .modal-close:hover {
          background: #9575cd;
        }
      `}</style>

      <div className="capturados-wrapper">
        <h1>Pokémon Capturados</h1>
        <div className="capturados-container">
          {listaCapturados.map((id) => (
            <div key={id} className="poke-card" onClick={() => handleCardClick(id)}>
              <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`} alt={`pokemon-${id}`} />
              <p># {id}</p>
            </div>
          ))}
        </div>

        {selectedPokemon && (
          <div className="modal-backdrop" onClick={closeModal}>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
              <img
                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${selectedPokemon.id}.png`}
                alt={selectedPokemon.name}
              />
              <h2>{selectedPokemon.name}</h2>
              <p><strong>ID:</strong> {selectedPokemon.id}</p>
              <p><strong>Altura:</strong> {(selectedPokemon.height / 10).toFixed(1)} m</p>
              <p><strong>Peso:</strong> {(selectedPokemon.weight / 10).toFixed(1)} kg</p>
              <p><strong>Tipos:</strong> {selectedPokemon.types.map(t => t.type.name).join(', ')}</p>
              <button className="modal-close" onClick={closeModal}>Cerrar</button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default Capturados;
