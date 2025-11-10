import { useState, useEffect } from "react"

const API_URL = "http://localhost:3000/api/resenas"
const VIDEOJUEGOS_URL = "http://localhost:3000/api/videojuegos"

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
    
    fetch(VIDEOJUEGOS_URL)
      .then(res => res.json())
      .then(data => setVideojuegos(data))
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
  }

  const eliminarResena = (_id) => {
    fetch(`${API_URL}/${_id}`, {
      method: "DELETE"
    })
      .then(() => {
        //Quitar de la lista
        setResenas(resenas.filter(r => r._id !== _id))
      })
  }

  const preparaEdicion = (resena) => {
    setEditando(resena._id)
    setJuegoId(resena.juegoId._id || resena.juegoId)
    setPuntuacion(resena.puntuacion)
    setTextoResena(resena.textoResena)
    setHorasJugadas(resena.horasJugadas)
    setDificultad(resena.dificultad)
    setRecomendaria(resena.recomendaria)
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
        //Actualizar lista de reseñas
        setResenas(resenas.map(r => r._id === editando ? data : r))

        //Limpiar datos
        setEditando(null)
        setJuegoId("")
        setPuntuacion("")
        setTextoResena("")
        setHorasJugadas("")
        setDificultad("")
        setRecomendaria("")
      })
  }

  // Función auxiliar para obtener el nombre del juego
  const obtenerNombreJuego = (resena) => {
    if (resena.juegoId && resena.juegoId.titulo) {
      return resena.juegoId.titulo
    }
    const juego = videojuegos.find(v => v._id === resena.juegoId)
    return juego ? juego.titulo : "Desconocido"
  }

  return (
    <div className="Crud_Resenas_Div">
      <h1 className="Crud_Resenas_Title">Formulario de Reseñas</h1>

      {/* Formulario para crear */}
      <h2 className="Crud_Resenas_Form_Title">Crear Reseña</h2>
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
          <label htmlFor="" className="Crud_Resenas_Label">Texto de la Reseña</label>
          <textarea
            className="Crud_Resenas_Input"
            placeholder="Escribe tu reseña..."
            value={textoResena}
            onChange={(e) => setTextoResena(e.target.value)}
            rows="4"
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

      </div>

      {/* Lista de reseñas */}
      <div className="Lista">
        <h2>Lista de reseñas</h2>
        {resenas.map(resena => (
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
        ))}
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
    </div>
  )
}

export default Crud_resenas