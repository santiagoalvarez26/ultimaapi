import { useNavigate, Link } from 'react-router-dom';
import { supabase } from '../../supabase';

function Menu() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/');
  };

  const navStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    background: 'linear-gradient(90deg, #264653, #2a9d8f)',
    padding: '12px 24px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    borderRadius: '0 0 12px 12px',
    fontFamily: "'Segoe UI', sans-serif",
    flexWrap: 'wrap',
  };

  const ulStyle = {
    display: 'flex',
    listStyle: 'none',
    gap: '18px',
    margin: 0,
    padding: 0,
    flexWrap: 'wrap',
  };

  const linkStyle = {
    textDecoration: 'none',
    color: 'white',
    fontWeight: '500',
    transition: 'color 0.3s ease',
  };

  const linkHoverStyle = {
    color: '#f4a261',
  };

  const buttonStyle = {
    padding: '8px 16px',
    backgroundColor: '#e76f51',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    fontWeight: 'bold',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease, transform 0.2s ease',
  };

  return (
    <nav style={navStyle}>
      <ul style={ulStyle}>
        {['/', '/usuarios', '/capturados', '/aleatorios', '/favoritos'].map((path, i) => (
          <li key={i}>
            <Link
              to={path}
              style={linkStyle}
              onMouseEnter={(e) => (e.target.style.color = linkHoverStyle.color)}
              onMouseLeave={(e) => (e.target.style.color = linkStyle.color)}
            >
              {path === '/' ? 'Lista' : path.replace('/', '').charAt(0).toUpperCase() + path.replace('/', '').slice(1)}
            </Link>
          </li>
        ))}
      </ul>
      <button
        style={buttonStyle}
        onClick={handleLogout}
        onMouseEnter={(e) => {
          e.target.style.backgroundColor = '#d1452b';
          e.target.style.transform = 'scale(1.05)';
        }}
        onMouseLeave={(e) => {
          e.target.style.backgroundColor = '#e76f51';
          e.target.style.transform = 'scale(1)';
        }}
      >
        Cerrar sesión
      </button>
    </nav>
  );
}

export default Menu;
