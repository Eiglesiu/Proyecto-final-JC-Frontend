import { useState, useEffect } from "react"
import axios from "axios";

const API_URL = "https://690131c7ff8d792314bcca49.mockapi.io/Videojuegos"

function Crud_videojuegos() {

  const [videojuegos, setVideojuegos] = useState([])
  const [titulo, setTitulo] = useState("")
  const [genero, setGenero] = useState("")
  const [plataforma, setPlataforma] = useState("")
  const [anoLanzamiento, setAnoLanzamiento] = useState()
  const [desarrollador, setDesarrollador] = useState("")
  const [imagenPortada, setImagenPortada] = useState("")
  const [descripcion, setDescripcion] = useState("")
  const [completado, setCompletado] = useState(false)
  const [fechaCreacion, setFechaCreacion] = useState("")
  const [editando, setEditando] = useState(null)

  useEffect(() => {
    fetch(API_URL)
      .then(res => res.json())
      .then(data => setVideojuegos(data))
  }, [])

  const agregarVideojuego = () => {
    const nuevoVideojuego = {
      titulo: titulo,
      genero: genero,           // "Acción", "RPG", "Estrategia", etc.
      plataforma: plataforma,       // "PC", "PlayStation", "Xbox", etc.
      anoLanzamiento: anoLanzamiento,
      desarrollador: desarrollador,
      imagenPortada: imagenPortada,    // URL de la imagen
      descripcion: descripcion,
      completado: completado,
      fechaCreacion: fechaCreacion,
    }

    fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(nuevoVideojuego)
    })
      .then(res => res.json())
      .then(data => {
        setVideojuegos([...videojuegos, data])
        //Limpiar formulario
        setTitulo("")
        setGenero("")
        setPlataforma("")
        setAnoLanzamiento("")
        setDesarrollador("")
        setImagenPortada("")
        setDescripcion("")
        setCompletado(false)
        setFechaCreacion("")
      })
  }

  const eliminarVideojuego = (id) => {    //Cambiar a Axios
    fetch(`${API_URL}/${id}`, {
      method: "DELETE"
    })
      .then(() => {
        //Quitar de la lista
        setVideojuegos(videojuegos.filter(v => v.id !== id))
      })
  }

  const preparaEdicion = (videojuego) => {
    setEditando(videojuego.id)
    setTitulo(videojuego.titulo)
    setGenero(videojuego.genero)
    setPlataforma(videojuego.plataforma)
    setAnoLanzamiento(videojuego.anoLanzamiento)
    setDesarrollador(videojuego.desarrollador)
    setImagenPortada(videojuego.imagenPortada)
    setDescripcion(videojuego.descripcion)
    setCompletado(videojuego.completado)
    setFechaCreacion(videojuego.fechaCreacion)
  }

  const actualizarVideojuego = () => {
    const videojuegoActualizado = {
      titulo: titulo,
      genero: genero,           // "Acción", "RPG", "Estrategia", etc.
      plataforma: plataforma,       // "PC", "PlayStation", "Xbox", etc.
      anoLanzamiento: anoLanzamiento,
      desarrollador: desarrollador,
      imagenPortada: imagenPortada,    // URL de la imagen
      descripcion: descripcion,
      completado: completado,
      fechaCreacion: fechaCreacion,
    }

    fetch(`${API_URL}/${editando}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(videojuegoActualizado)
    })

      .then(res => res.json())
      .then(data => {

        //Actualizar lista de videojuegos
        setVideojuegos(videojuegos.map(v => v.id === editando ? data : v))

        //Limpiar datos
        setEditando(null)
        setTitulo("")
        setGenero("")
        setPlataforma("")
        setAnoLanzamiento("")
        setDesarrollador("")
        setImagenPortada("")
        setDescripcion("")
        setCompletado(false)
        setFechaCreacion("")
      })
  }


  return (
    <div className="Crud_Videojuegos_Div">
      <h1 className="Crud_Videojuegos_Title">Formulario de Videojuegos</h1>

      {/* Formulario para crear */}
      <h2 className="Crud_Videojuegos_Form_Title">Crear Videojuego</h2>
      <div className="Crud_Videojuegos_Form">
        <div className="Crud_Videojuegos_Form_Content">
          <label htmlFor="" className="Crud_Videojuegos_Label">Titulo</label>
          <input
            className="Crud_Videojuegos_Input"
            type="text"
            placeholder="Titulo"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
          />
        </div>
        <div className="Crud_Videojuegos_Form_Content">
          <label htmlFor="" className="Crud_Videojuegos_Label">Genero</label>
          <select name="Genero" onChange={(e) => setGenero(e.target.value)} className="Crud_Videojuegos_Input"> 
            <option value="Acción">Acción</option>
            <option value="Terror">Terror</option>
            <option value="Terror">Aventura y Rol</option>
            <option value="Terror">Estartegia y Simulacion</option>
            <option value="Terror">Carrera y Deportes</option>
            <option value="Terror">Terror y Supervivencia</option>
            <option value="Terror">Sandbox y Mundo Abierto</option>
            <option value="Terror">Indie</option>
            <option value="Terror">Competitivo</option>
          </select>
        </div>
        <div className="Crud_Videojuegos_Form_Content">
          <label htmlFor="" className="Crud_Videojuegos_Label">Plataforma</label>
          <input
            className="Crud_Videojuegos_Input"
            type="text"
            placeholder="Plataforma"
            value={plataforma}
            onChange={(e) => setPlataforma(e.target.value)}
          />
        </div>
        <div className="Crud_Videojuegos_Form_Content">
          <label htmlFor="" className="Crud_Videojuegos_Label">Año de Lanzamiento</label>
          <input
            className="Crud_Videojuegos_Input"
            type="date"
            placeholder="Año de Lanzamiento"
            value={anoLanzamiento}
            onChange={(e) => setAnoLanzamiento(e.target.value)}
          />
        </div>
        <div className="Crud_Videojuegos_Form_Content">
          <label htmlFor="" className="Crud_Videojuegos_Label">Desarrollador/es</label>
          <input
            className="Crud_Videojuegos_Input"
            type="text"
            placeholder="Desarrollador"
            value={desarrollador}
            onChange={(e) => setDesarrollador(e.target.value)}
          />
        </div>
        <div className="Crud_Videojuegos_Form_Content">
          <label htmlFor="" className="Crud_Videojuegos_Label">Url de Portada</label>
          <input
            className="Crud_Videojuegos_Input"
            type="url"
            placeholder="Imagen de la portada"
            value={imagenPortada}
            onChange={(e) => setImagenPortada(e.target.value)}
          />
        </div>
        <div className="Crud_Videojuegos_Form_Content">
          <label htmlFor="" className="Crud_Videojuegos_Label">Descripcion</label>
          <input
            className="Crud_Videojuegos_Input"
            type="text"
            placeholder="descripcion"
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
          />
        </div>
        <div className="Crud_Videojuegos_Form_Content">
          <label htmlFor="" className="Crud_Videojuegos_Label">Completado?</label>
          <select name="Genero" onChange={(e) => setCompletado(e.target.value)} className="Crud_Videojuegos_Input"> 
            <option value="true">Si</option>
            <option value="false">No</option>
          </select>
        </div>
        <div className="Crud_Videojuegos_Form_Content">
          <label htmlFor="" className="Crud_Videojuegos_Label">Ultima Actualización</label>
          <input
            className="Crud_Videojuegos_Input"
            type="date"
            placeholder="fecha de creacion"
            value={fechaCreacion}
            onChange={(e) => setFechaCreacion(e.target.value)}
          />
        </div>

      </div>
      {/*
      <div className="Lista">
        <h2>Lista de videojuegos</h2>
        {videojuegos.map(videojuego => (
          <div key={videojuego.id} className="videojuego">
            <h3>{videojuego.titulo}</h3>
            <p>Genero: ${videojuego.genero}</p>
            <p>Plataforma: ${videojuego.plataforma}</p>
            <p>Ano de Lanzamiento: ${videojuego.anoLanzamiento}</p>
            <p>Desarrollador: ${videojuego.desarrollador}</p>
            <p>Imagen de la portada: ${videojuego.imagenPortada}</p>
            <p>Descripcion: ${videojuego.descripcion}</p>
            <p>Completado: ${videojuego.completado}</p>
            <p>Fecha de creacion: ${videojuego.fechaCreacion}</p>
            <button onClick={() => preparaEdicion(videojuego)}>Editar</button>
            <button onClick={() => eliminarVideojuego(videojuego.id)}>Eliminar</button>
          </div>
))}
      </div>*/}
      <div className="Crud_Videojuegos_Buttons">
        {editando ?
          (<button onClick={actualizarVideojuego}>Actualizar</button>)
          :
          (<button onClick={agregarVideojuego} className="Crud_Videojuegos_Button_Create">Crear</button>)}

        {editando && (
          <button onClick={() => {
            setEditando(null)
            setTitulo("")
            setGenero("")
            setPlataforma("")
            setAnoLanzamiento("")
            setDesarrollador("")
            setImagenPortada("")
            setDescripcion("")
            setCompletado(false)
            setFechaCreacion("")
          }}>Cancelar</button>
        )}
      </div>
    </div>
  )
}


export default Crud_videojuegos
