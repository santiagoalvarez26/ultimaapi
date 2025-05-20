import { useState } from 'react';
import { supabase } from '../../supabase';
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) alert("Usuario o contraseña no válido");
    else navigate("/");
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
          background: linear-gradient(135deg, #6a11cb, #2575fc);
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

        /* Distintos tamaños y posiciones iniciales */
        .circle1 {
          width: 80px;
          height: 80px;
          top: 30%;
          left: 20%;
          animation-duration: 18s;
          animation-delay: 0s;
        }
        .circle2 {
          width: 120px;
          height: 120px;
          top: 60%;
          left: 50%;
          animation-duration: 22s;
          animation-delay: 5s;
        }
        .circle3 {
          width: 50px;
          height: 50px;
          top: 40%;
          left: 75%;
          animation-duration: 15s;
          animation-delay: 3s;
        }
        .circle4 {
          width: 150px;
          height: 150px;
          top: 70%;
          left: 85%;
          animation-duration: 25s;
          animation-delay: 6s;
        }

        @keyframes circularMove {
          0% {
            transform: translate(0, 0);
            opacity: 0.7;
          }
          25% {
            transform: translate(20px, -30px);
            opacity: 0.5;
          }
          50% {
            transform: translate(40px, 0);
            opacity: 0.7;
          }
          75% {
            transform: translate(20px, 30px);
            opacity: 0.5;
          }
          100% {
            transform: translate(0, 0);
            opacity: 0.7;
          }
        }

        .login-container {
          height: 100vh;
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 20px;
        }

        .login-card {
          background: rgba(0,0,0,0.7);
          padding: 40px 30px;
          border-radius: 15px;
          width: 320px;
          box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
          backdrop-filter: blur(8.5px);
          -webkit-backdrop-filter: blur(8.5px);
          border: 1px solid rgba(255,255,255,0.18);
          text-align: center;
        }

        .login-card h2 {
          margin-bottom: 24px;
          font-weight: 700;
          font-size: 28px;
          color: #fff;
        }

        .login-card form {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .login-card input {
          padding: 12px 15px;
          border-radius: 10px;
          border: none;
          font-size: 16px;
          outline: none;
          transition: box-shadow 0.3s ease;
          background-color: #222;
          color: #eee;
        }

        .login-card input:focus {
          box-shadow: 0 0 8px #6a11cb;
          background-color: #2c2c54;
        }

        .login-card button[type="submit"] {
          background-color: #6a11cb;
          color: white;
          padding: 12px 15px;
          border-radius: 10px;
          border: none;
          font-weight: 600;
          font-size: 16px;
          cursor: pointer;
          transition: background-color 0.3s ease;
        }

        .login-card button[type="submit"]:hover {
          background-color: #2575fc;
        }

        .login-card p {
          margin-top: 20px;
          margin-bottom: 10px;
          color: #ccc;
          font-size: 14px;
        }

        .login-card .register-btn {
          background-color: transparent;
          color: #6a11cb;
          border: 2px solid #6a11cb;
          padding: 10px 15px;
          border-radius: 10px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .login-card .register-btn:hover {
          background-color: #6a11cb;
          color: white;
          border-color: #2575fc;
        }
      `}</style>

      <div className="background">
        <div className="circle circle1"></div>
        <div className="circle circle2"></div>
        <div className="circle circle3"></div>
        <div className="circle circle4"></div>
      </div>

      <div className="login-container">
        <div className="login-card">
          <h2>Iniciar Sesión</h2>
          <form onSubmit={handleLogin}>
            <input
              type="email"
              placeholder="Correo electrónico"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button type="submit">Iniciar sesión</button>
          </form>
          <p>¿No tienes cuenta?</p>
          <button className="register-btn" onClick={() => navigate('/registro')}>Regístrate</button>
        </div>
      </div>
    </>
  );
}

export default Login;
