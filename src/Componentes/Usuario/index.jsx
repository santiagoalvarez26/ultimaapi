import { useEffect, useState } from "react";
import { supabase } from "../../supabase";

export default function Usuario() {
  const [usuario, setUsuario] = useState(null);
  const [form, setForm] = useState({
    nombre: "",
    correo: "",
    fecha_nacimiento: "",
    telefono: "",
    roll: ""
  });
  const [nuevaUrl, setNuevaUrl] = useState("");
  const [imagenes, setImagenes] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetchUsuario() {
      try {
        setCargando(true);
        const { data: { user }, error: userError } = await supabase.auth.getUser();
        if (userError || !user) throw new Error("Usuario no autenticado");

        const { data, error } = await supabase
          .from("usuario")
          .select("*")
          .eq("id", user.id)
          .maybeSingle();

        if (error) throw error;

        if (!data) {
          const nuevoUsuario = {
            id: user.id,
            correo: user.email || "",
            nombre: user.user_metadata?.full_name || "",
            fecha_nacimiento: null,
            telefono: "",
            roll: ""
          };
          const { data: creado, error: errCrear } = await supabase
            .from("usuario")
            .insert([nuevoUsuario])
            .select()
            .maybeSingle();

          if (errCrear) throw errCrear;

          setUsuario(creado);
          setForm(creado);
          fetchImagenes(user.id);
        } else {
          setUsuario(data);
          setForm(data);
          fetchImagenes(user.id);
        }
      } catch (err) {
        console.error("Error:", err.message);
        setError(true);
      } finally {
        setCargando(false);
      }
    }

    fetchUsuario();
  }, []);

  const fetchImagenes = async (usuarioid) => {
    const { data } = await supabase
      .from("multimedia")
      .select("*")
      .eq("usuarioid", usuarioid);
    if (data) setImagenes(data);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    const { error } = await supabase
      .from("usuario")
      .update(form)
      .eq("id", usuario.id);
    if (error) alert("Error al actualizar");
    else alert("Datos actualizados correctamente");
  };

  const handleAgregarUrl = async () => {
    if (!nuevaUrl.trim()) return;
    const { error } = await supabase
      .from("multimedia")
      .insert([{ url: nuevaUrl, usuarioid: usuario.id }]);
    if (!error) {
      setNuevaUrl("");
      fetchImagenes(usuario.id);
    } else {
      alert("Error al agregar la imagen");
    }
  };

  const handleEliminarImagen = async (id) => {
    const { error } = await supabase
      .from("multimedia")
      .delete()
      .eq("id", id);
    if (!error) {
      setImagenes(imagenes.filter((img) => img.id !== id));
    }
  };

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      alert("Hubo un problema al cerrar sesión");
    } else {
      window.location.href = "/";
    }
  };

  if (cargando) {
  return (
    <div className="loader-container">
      <div className="spinner"></div>
      <style>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        html, body {
          height: 100%;
          width: 100%;
          background-color: #0f172a;
        }

        .loader-container {
          position: fixed;
          top: 0;
          left: 0;
          height: 100vh;
          width: 100vw;
          display: flex;
          align-items: center;
          justify-content: center;
          background-color: #0f172a;
          z-index: 9999;
        }

        .spinner {
          width: 80px;
          height: 80px;
          border: 10px solid #334155;
          border-top: 10px solid #3b82f6;
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}


  if (error || !usuario) {
    return (
      <div style={{ color: "white", padding: "60px", textAlign: "center" }}>
        Ocurrió un error al cargar tu perfil. Intenta recargar la página.
      </div>
    );
  }

  return (
    <div className="container">
      <div className="perfil">
        <h2>Mi Perfil</h2>
        <form className="formulario" onSubmit={(e) => { e.preventDefault(); handleUpdate(); }}>
          <label>Nombre:
            <input name="nombre" value={form.nombre} onChange={handleChange} />
          </label>
          <label>Correo:
            <input name="correo" value={form.correo} onChange={handleChange} />
          </label>
          <label>Fecha de nacimiento:
            <input type="date" name="fecha_nacimiento" value={form.fecha_nacimiento || ""} onChange={handleChange} />
          </label>
          <label>Teléfono:
            <input name="telefono" value={form.telefono} onChange={handleChange} />
          </label>
          <label>Rol:
            <input name="roll" value={form.roll} onChange={handleChange} />
          </label>
          <button type="submit" className="btn guardar">Guardar Cambios</button>
        </form>

        <section className="imagenes">
          <h3>Agregar Imagen</h3>
          <div className="agregar">
            <input type="text" placeholder="URL de la imagen" value={nuevaUrl} onChange={(e) => setNuevaUrl(e.target.value)} />
            <button onClick={handleAgregarUrl} className="btn verde">Agregar</button>
          </div>

          <h3>Imágenes Guardadas</h3>
          <div className="galeria">
            {imagenes.map((img) => (
              <div className="imagen" key={img.id}>
                <img src={img.url} alt="guardada" />
                <button onClick={() => handleEliminarImagen(img.id)} className="btn eliminar">✕</button>
              </div>
            ))}
          </div>
        </section>

        <section className="cerrar-sesion">
          <h3>¿Deseas salir?</h3>
          <button onClick={handleLogout} className="btn rojo">Cerrar sesión</button>
        </section>
      </div>

      <style>{`
        html, body {
          margin: 0;
          padding: 0;
          background: linear-gradient(145deg, #1e293b, #0f172a);
          min-height: 100vh;
          font-family: 'Segoe UI', sans-serif;
          color: #e2e8f0;
        }

        .container {
          display: flex;
          justify-content: center;
          padding: 40px 20px;
        }

        .perfil {
          background: #1e293b;
          padding: 30px;
          border-radius: 16px;
          width: 100%;
          max-width: 700px;
          box-shadow: 0 0 25px rgba(0, 0, 0, 0.5);
        }

        h2, h3 {
          text-align: center;
          margin-bottom: 20px;
          color: #f8fafc;
        }

        .formulario label {
          display: flex;
          flex-direction: column;
          margin-bottom: 16px;
          font-weight: 600;
        }

        .formulario input {
          padding: 10px;
          border: none;
          border-radius: 8px;
          margin-top: 6px;
          font-size: 14px;
          background: #334155;
          color: #f8fafc;
        }

        .formulario input:focus {
          outline: 2px solid #60a5fa;
        }

        .btn {
          border: none;
          border-radius: 8px;
          padding: 10px 18px;
          font-size: 15px;
          font-weight: bold;
          cursor: pointer;
          transition: 0.3s ease;
          margin-top: 10px;
        }

        .guardar {
          background-color: #3b82f6;
          color: white;
          width: 100%;
        }

        .guardar:hover {
          background-color: #2563eb;
        }

        .imagenes {
          margin-top: 40px;
        }

        .agregar {
          display: flex;
          gap: 10px;
          margin-bottom: 25px;
        }

        .agregar input {
          flex: 1;
          padding: 10px;
          border-radius: 8px;
          border: none;
          background: #334155;
          color: #f8fafc;
        }

        .verde {
          background-color: #10b981;
          color: white;
        }

        .verde:hover {
          background-color: #059669;
        }

        .galeria {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
          gap: 15px;
        }

        .imagen {
          position: relative;
          border-radius: 12px;
          overflow: hidden;
        }

        .imagen img {
          width: 100%;
          height: 150px;
          object-fit: cover;
          border-radius: 12px;
        }

        .eliminar {
          position: absolute;
          top: 6px;
          right: 6px;
          background-color: #ef4444;
          color: white;
          width: 28px;
          height: 28px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .eliminar:hover {
          background-color: #dc2626;
        }

        .cerrar-sesion {
          text-align: center;
          margin-top: 50px;
        }

        .rojo {
          background-color: #f87171;
          color: white;
          padding: 12px 25px;
        }

        .rojo:hover {
          background-color: #ef4444;
        }
      `}</style>
    </div>
  );
}
