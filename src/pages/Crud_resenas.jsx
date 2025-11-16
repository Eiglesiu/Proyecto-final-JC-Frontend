import { useState, useEffect } from "react"

const API_URL = "https://proyecto-final-jc-backend.onrender.com/api/resenas"
const VIDEOJUEGOS_URL = "https://proyecto-final-jc-backend.onrender.com/api/videojuegos"

function Crud_resenas() {
  const [resenas, setResenas] = useState([])
  const [videojuegos, setVideojuegos] = useState([])
  const [juegoId, setJuegoId] = useState("")
  const [puntuacion, setPuntuacion] = useState("")
  const [textoResena, setTextoResena] = useState("")
  const [horasJugadas, setHorasJugadas] = useState("")
  const [dificultad, setDificultad] = useState("")
  const [recomendaria, setRecomendaria] = useState("")
  const [editando, setEditando] = useState(null)

  useEffect(() => {
    fetch(API_URL)
      .then(res => res.json())
      .then(data => setResenas(data))
      .catch(err => console.error('Error cargando reseñas:', err))
    
    fetch(VIDEOJUEGOS_URL)
      .then(res => res.json())
      .then(data => setVideojuegos(data))
      .catch(err => console.error('Error cargando videojuegos:', err))
  }, [])

  const agregarResena = () => {
    const nuevaResena = {
      juegoId: juegoId,
      puntuacion: parseInt(puntuacion),           
      textoResena: textoResena,
      horasJugadas: parseInt(horasJugadas),       
      dificultad: dificultad,
      recomendaria: recomendaria === "true"       
    }

    fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(nuevaResena)
    })
      .then(res => res.json())
      .then(data => {
        setResenas([...resenas, data])
        //Limpiar formulario
        setJuegoId("")
        setPuntuacion("")
        setTextoResena("")
        setHorasJugadas("")
        setDificultad("")
        setRecomendaria("")
      })
      .catch(err => console.error('Error creando reseña:', err))
  }

  const eliminarResena = (_id) => {
    fetch(`${API_URL}/${_id}`, {
      method: "DELETE"
    })
      .then(() => {
        setResenas(resenas.filter(r => r._id !== _id))
      })
      .catch(err => console.error('Error eliminando reseña:', err))
  }

  const preparaEdicion = (resena) => {
    setEditando(resena._id)
    // Manejar juegoId (puede ser objeto o string)
    const idDelJuego = resena.juegoId?._id || resena.juegoId
    setJuegoId(idDelJuego)
    // Manejar campos numéricos
    setPuntuacion(resena.puntuacion)
    setHorasJugadas(resena.horasJugadas)
    // Manejar texto
    setTextoResena(resena.textoResena)
    setDificultad(resena.dificultad)
    // Manejar booleano - CORREGIDO
    // Convertir boolean a string para el select
    if (resena.recomendaria === true) {
      setRecomendaria("true")
    } else if (resena.recomendaria === false) {
      setRecomendaria("false")
    } else {
      setRecomendaria("")
    }
    
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const actualizarResena = () => {
    const resenaActualizada = {
      juegoId: juegoId,
      puntuacion: parseInt(puntuacion),           
      textoResena: textoResena,
      horasJugadas: parseInt(horasJugadas),       
      dificultad: dificultad,
      recomendaria: recomendaria === "true" || recomendaria === true  
    }

    fetch(`${API_URL}/${editando}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(resenaActualizada)
    })
      .then(res => res.json())
      .then(data => {
        // Actualizar lista de reseñas
        setResenas(resenas.map(r => r._id === editando ? data : r))

        // Limpiar datos
        setEditando(null)
        setJuegoId("")
        setPuntuacion("")
        setTextoResena("")
        setHorasJugadas("")
        setDificultad("")
        setRecomendaria("")
      })
      .catch(err => console.error('Error actualizando reseña:', err))
  }

  // Función auxiliar para obtener el nombre del juego
  const obtenerNombreJuego = (resena) => {
    // Caso 1: juegoId es un objeto (populado)
    if (resena.juegoId && typeof resena.juegoId === 'object' && resena.juegoId.titulo) {
      return resena.juegoId.titulo
    }
    
    // Caso 2: juegoId es solo un string (ID)
    if (typeof resena.juegoId === 'string') {
      const juego = videojuegos.find(v => v._id === resena.juegoId)
      return juego ? juego.titulo : "Desconocido"
    }
    
    return "Desconocido"
  }

  return (
    <div className="Crud_Resenas_Div">
      <h1 className="Crud_Resenas_Title">Formulario de Reseñas</h1>

      {/* Formulario para crear/editar */}
      <h2 className="Crud_Resenas_Form_Title">
        {editando ? "Editar Reseña" : "Crear Reseña"}
      </h2>
      <div className="Crud_Resenas_Form">
        
        <div className="Crud_Resenas_Form_Content">
          <label htmlFor="" className="Crud_Videojuegos_Label">Videojuego</label>
          <select 
            className="Crud_Resenas_Input"
            value={juegoId}
            onChange={(e) => setJuegoId(e.target.value)}
          >
            <option value="">Selecciona un videojuego</option>
            {videojuegos.map(juego => (
              <option key={juego._id} value={juego._id}>
                {juego.titulo}
              </option>
            ))}
          </select>
        </div>

        <div className="Crud_Resenas_Form_Content">
          <label htmlFor="" className="Crud_Videojuegos_Label">Puntuación (1-5)</label>
          <input
            className="Crud_Resenas_Input"
            type="number"
            min="1"
            max="5"
            placeholder="Puntuación"
            value={puntuacion}
            onChange={(e) => setPuntuacion(e.target.value)}
          />
        </div>

        <div className="Crud_Resenas_Form_Content">
          <label htmlFor="" className="Crud_Resenas_Label">Horas Jugadas</label>
          <input
            className="Crud_Resenas_Input"
            type="number"
            min="0"
            placeholder="Horas Jugadas"
            value={horasJugadas}
            onChange={(e) => setHorasJugadas(e.target.value)}
          />
        </div>

        <div className="Crud_Resenas_Form_Content">
          <label htmlFor="" className="Crud_Resenas_Label">Dificultad</label>
          <select 
            className="Crud_Resenas_Input"
            value={dificultad}
            onChange={(e) => setDificultad(e.target.value)}
          >
            <option value="">Selecciona dificultad</option>
            <option value="Fácil">Fácil</option>
            <option value="Normal">Normal</option>
            <option value="Difícil">Difícil</option>
          </select>
        </div>

        <div className="Crud_Resenas_Form_Content">
          <label htmlFor="" className="Crud_Resenas_Label">¿Lo recomendarías?</label>
          <select 
            className="Crud_Resenas_Input"
            value={recomendaria}
            onChange={(e) => setRecomendaria(e.target.value)}
          >
            <option value="">Selecciona opción</option>
            <option value="true">Sí</option>
            <option value="false">No</option>
          </select>
        </div>

        <div className="Crud_Resenas_Form_TextArea">
          <label htmlFor="" className="Crud_Resenas_Label">Texto de la Reseña</label>
          <textarea
            className="Crud_Resenas_TextArea"
            placeholder="Escribe tu reseña..."
            value={textoResena}
            onChange={(e) => setTextoResena(e.target.value)}
            rows="4"
          />
        </div>
        
      </div>

      <div className="Crud_Resenas_Buttons">
        {editando ?
          (<button onClick={actualizarResena}>Actualizar</button>)
          :
          (<button onClick={agregarResena} className="Crud_Resenas_Button_Create">Crear</button>)}

        {editando && (
          <button onClick={() => {
            setEditando(null)
            setJuegoId("")
            setPuntuacion("")
            setTextoResena("")
            setHorasJugadas("")
            setDificultad("")
            setRecomendaria("")
          }}>Cancelar</button>
        )}
      </div>

      {/* Lista de reseñas */}
      <div className="Lista">
        <h2>Lista de reseñas ({resenas.length})</h2>
        {resenas.length === 0 ? (
          <p>No hay reseñas. ¡Crea la primera!</p>
        ) : (
          resenas.map(resena => (
            <div key={resena._id} className="resena">
              <h3>{obtenerNombreJuego(resena)}</h3>
              <p>Puntuación: {resena.puntuacion}/5</p>
              <p>Reseña: {resena.textoResena}</p>
              <p>Horas Jugadas: {resena.horasJugadas}h</p>
              <p>Dificultad: {resena.dificultad}</p>
              <p>¿Lo recomendarías?: {resena.recomendaria ? "Sí" : "No"}</p>
              <button onClick={() => preparaEdicion(resena)}>Editar</button>
              <button onClick={() => eliminarResena(resena._id)}>Eliminar</button>
            </div>
          ))
        )}
      </div>

      
    </div>
  )
}

export default Crud_resenas