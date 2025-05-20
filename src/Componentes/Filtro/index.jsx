function Filtro({ onTipoChange }) {
  const tipos = [
    "All", "normal", "fighting", "flying", "poison", "ground", "rock",
    "bug", "ghost", "steel", "fire", "water", "grass", "electric",
    "psychic", "ice", "dragon", "dark", "fairy", "stellar", "shadow", "unknown"
  ];

  const containerStyle = {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '10px',
    justifyContent: 'center',
    margin: '20px 0',
  };

  const buttonStyle = {
    padding: '8px 14px',
    backgroundColor: '#2a9d8f',
    color: 'white',
    border: 'none',
    borderRadius: '20px',
    fontSize: '14px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease, transform 0.2s ease',
  };

  return (
    <div style={containerStyle}>
      {tipos.map((unTipo, index) => (
        <button
          key={index}
          onClick={() => onTipoChange(unTipo)}
          style={buttonStyle}
          onMouseEnter={(e) => {
            e.target.style.backgroundColor = '#21867a';
            e.target.style.transform = 'scale(1.05)';
          }}
          onMouseLeave={(e) => {
            e.target.style.backgroundColor = '#2a9d8f';
            e.target.style.transform = 'scale(1)';
          }}
        >
          {unTipo}
        </button>
      ))}
    </div>
  );
}

export default Filtro;
