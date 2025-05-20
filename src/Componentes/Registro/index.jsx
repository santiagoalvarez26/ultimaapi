import { useState } from 'react';
import { supabase } from '../../supabase';
import { useNavigate } from 'react-router-dom';

function Registro() {
  const [formulario, setFormulario] = useState({
    nombre: '',
    correo: '',
    password: '',
    fechaNacimiento: '',
    telefono: '',
  });

  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormulario({ ...formulario, [e.target.name]: e.target.value });
  };

  const handleRegistro = async (e) => {
    e.preventDefault();
    setError(null);

    const { data, error: errorAuth } = await supabase.auth.signUp({
      email: formulario.correo,
      password: formulario.password,
    });

    if (errorAuth) {
      setError(errorAuth.message);
      return;
    }

    const uid = data.user.id;

    const { error: errorInsert } = await supabase.from("usuario").insert([
      {
        id: uid,
        nombre: formulario.nombre,
        correo: formulario.correo,
        fecha_nacimiento: formulario.fechaNacimiento,
        telefono: formulario.telefono,
        roll: "usuario",
      },
    ]);

    if (errorInsert) {
      setError("Usuario creado pero error en tabla usuarios: " + errorInsert.message);
    } else {
      navigate("/login");
    }
  };

  return (
    <>
      <style>{`
        html, body, #root {
          height: 100%;
          margin: 0;
          overflow: hidden;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          background: #1a1a2e;
          color: #fff;
          position: relative;
        }

        .background {
          position: fixed;
          top: 0; left: 0; right: 0; bottom: 0;
          overflow: hidden;
          z-index: -1;
          background: linear-gradient(135deg, #ff512f, #dd2476);
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .circle {
          position: absolute;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.15);
          animation-timing-function: linear;
          animation-iteration-count: infinite;
          opacity: 0.7;
          animation-name: circularMove;
          animation-duration: 20s;
          animation-direction: alternate;
        }

        .circle1 {
          width: 100px;
          height: 100px;
          top: 25%;
          left: 30%;
          animation-duration: 18s;
        }
        .circle2 {
          width: 140px;
          height: 140px;
          top: 70%;
          left: 60%;
          animation-duration: 22s;
        }
        .circle3 {
          width: 60px;
          height: 60px;
          top: 40%;
          left: 80%;
          animation-duration: 15s;
        }

        @keyframes circularMove {
          0% { transform: translate(0, 0); opacity: 0.7; }
          25% { transform: translate(20px, -30px); opacity: 0.5; }
          50% { transform: translate(40px, 0); opacity: 0.7; }
          75% { transform: translate(20px, 30px); opacity: 0.5; }
          100% { transform: translate(0, 0); opacity: 0.7; }
        }

        .registro-container {
          height: 100vh;
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 20px;
        }

        .registro-card {
          background: rgba(0, 0, 0, 0.7);
          padding: 40px 30px;
          border-radius: 15px;
          width: 350px;
          box-shadow: 0 8px 32px rgba(31, 38, 135, 0.37);
          backdrop-filter: blur(8.5px);
          text-align: center;
        }

        .registro-card h2 {
          margin-bottom: 20px;
          font-size: 26px;
        }

        .registro-card form {
          display: flex;
          flex-direction: column;
          gap: 14px;
        }

        .registro-card input {
          padding: 12px;
          border-radius: 8px;
          border: none;
          font-size: 16px;
          background-color: #2c2c54;
          color: #fff;
          outline: none;
        }

        .registro-card input:focus {
          box-shadow: 0 0 8px #ff512f;
          background-color: #3a3a6a;
        }

        .registro-card button {
          background-color: #ff512f;
          color: white;
          padding: 12px;
          border: none;
          border-radius: 8px;
          font-weight: bold;
          cursor: pointer;
          transition: background-color 0.3s ease;
        }

        .registro-card button:hover {
          background-color: #dd2476;
        }

        .registro-card p {
          margin-top: 15px;
          color: #ccc;
        }

        .registro-card .login-btn {
          margin-top: 8px;
          background: transparent;
          border: 2px solid #ff512f;
          color: #ff512f;
          padding: 10px;
          border-radius: 8px;
          font-weight: bold;
          transition: all 0.3s ease;
        }

        .registro-card .login-btn:hover {
          background-color: #ff512f;
          color: white;
        }

        .registro-card .error {
          color: #ff8080;
          font-size: 14px;
          margin-top: 10px;
        }
      `}</style>

      <div className="background">
        <div className="circle circle1"></div>
        <div className="circle circle2"></div>
        <div className="circle circle3"></div>
      </div>

      <div className="registro-container">
        <div className="registro-card">
          <h2>Crear Cuenta</h2>
          <form onSubmit={handleRegistro}>
            <input type="text" name="nombre" placeholder="Nombre completo" value={formulario.nombre} onChange={handleChange} required />
            <input type="email" name="correo" placeholder="Correo electrónico" value={formulario.correo} onChange={handleChange} required />
            <input type="password" name="password" placeholder="Contraseña" value={formulario.password} onChange={handleChange} required />
            <input type="date" name="fechaNacimiento" value={formulario.fechaNacimiento} onChange={handleChange} required />
            <input type="text" name="telefono" placeholder="Teléfono" value={formulario.telefono} onChange={handleChange} required />
            <button type="submit">Registrarse</button>
          </form>
          {error && <p className="error">{error}</p>}
          <p>¿Ya tienes cuenta?</p>
          <button className="login-btn" onClick={() => navigate("/login")}>Ir a Login</button>
        </div>
      </div>
    </>
  );
}

export default Registro;
