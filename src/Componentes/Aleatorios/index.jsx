import { useState, useContext } from "react";
import { AppContext } from '../../Contexto/contexto';

function Aleatorios() {
  const { data, listaCapturados, setListaCapturados, setTipoSeleccionado } = useContext(AppContext);
  const [aleatorio, setAleatorio] = useState([]);
  const [pokeModal, setPokeModal] = useState(null);

  setTipoSeleccionado("All");

  const generar = () => {
    let nuevosAleatorios = [];

    while (nuevosAleatorios.length < 4) {
      const index = Math.floor(Math.random() * data.length);
      nuevosAleatorios.push(data[index]);
    }

    setAleatorio(nuevosAleatorios);

    const nuevosIds = nuevosAleatorios
      .map(p => p.url.split("/")[6])
      .filter(id => !listaCapturados.includes(id));

    setListaCapturados(prev => [...prev, ...nuevosIds]);
  };

  const mostrarInfo = async (pokemon) => {
    const id = pokemon.url.split("/")[6];
    try {
      const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
      const data = await res.json();
      setPokeModal(data);
    } catch (err) {
      console.error("Error al cargar info del Pokémon:", err);
    }
  };

  const cerrarModal = () => setPokeModal(null);

  return (
    <>
      <style>{`
        body, html, #root {
          margin: 0;
          padding: 0;
          height: 100%;
          background: linear-gradient(135deg, #512da8, #1976d2);
          overflow: hidden;
        }

        .aleatorios-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 30px;
          padding: 40px;
        }

        .pokemon-grid {
          display: flex;
          flex-wrap: wrap;
          gap: 30px;
          justify-content: center;
        }

        .pokemon-card {
          background: #1e1e2f;
          color: white;
          border-radius: 20px;
          padding: 20px;
          width: 200px;
          text-align: center;
          box-shadow: 0 0 20px #00000055;
          cursor: pointer;
          transition: transform 0.3s ease;
        }

        .pokemon-card:hover {
          transform: scale(1.05);
        }

        .pokemon-card img {
          width: 120px;
          height: 120px;
          object-fit: contain;
          margin-bottom: 10px;
        }

        .generate-button {
          margin-top: 20px;
          background: #7e57c2;
          border: none;
          padding: 15px 30px;
          border-radius: 15px;
          color: white;
          font-weight: bold;
          font-size: 1rem;
          cursor: pointer;
          box-shadow: 0 0 15px #00000066;
          transition: background 0.3s;
        }

        .generate-button:hover {
          background: #9575cd;
        }

        .modal {
          position: fixed;
          top: 0; left: 0;
          width: 100%;
          height: 100%;
          background-color: rgba(0,0,0,0.8);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
        }

        .modal-content {
          background: #2a2a3a;
          border-radius: 20px;
          padding: 30px;
          max-width: 400px;
          width: 90%;
          color: white;
          text-align: center;
          box-shadow: 0 0 20px #00000088;
        }

        .modal-content img {
          width: 180px;
          height: 180px;
          object-fit: contain;
          margin-bottom: 20px;
        }

        .close-btn {
          background: #ff4081;
          border: none;
          color: white;
          padding: 10px 25px;
          border-radius: 10px;
          margin-top: 20px;
          font-size: 1rem;
          cursor: pointer;
          box-shadow: 0 0 10px #ff4081aa;
        }

        .stats {
          margin-top: 15px;
          text-align: left;
        }

        .stats div {
          margin: 6px 0;
          font-size: 0.9rem;
        }

      `}</style>

      <div className="aleatorios-container">
        <div className="pokemon-grid">
          {aleatorio.map((pokemon, index) => {
            const id = pokemon.url.split("/")[6];
            return (
              <div className="pokemon-card" key={index} onClick={() => mostrarInfo(pokemon)}>
                <img
                  src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`}
                  alt={pokemon.name}
                />
                <p><strong>#{id}</strong></p>
                <p style={{ textTransform: "capitalize" }}>{pokemon.name}</p>
              </div>
            );
          })}
        </div>
        <button className="generate-button" onClick={generar}>Generar</button>
      </div>

      {pokeModal && (
        <div className="modal" onClick={cerrarModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <img
              src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokeModal.id}.png`}
              alt={pokeModal.name}
            />
            <h2 style={{ textTransform: "capitalize" }}>{pokeModal.name}</h2>
            <p>ID: {pokeModal.id}</p>
            <div className="stats">
              {pokeModal.stats.map((stat, idx) => (
                <div key={idx}>
                  {stat.stat.name.replace("-", " ")}: {stat.base_stat}
                </div>
              ))}
            </div>
            <button className="close-btn" onClick={cerrarModal}>Cerrar</button>
          </div>
        </div>
      )}
    </>
  );
}

export default Aleatorios;
