import { useState, useEffect } from "react"
import ParticlesBackground from '../components/Particles'
import axios from "axios";

const API_URL = "https://proyecto-final-jc-backend.onrender.com/api/videojuegos"

function Crud_videojuegos() {

  const [videojuegos, setVideojuegos] = useState([])
  const [titulo, setTitulo] = useState("")
  const [genero, setGenero] = useState("")
  const [plataforma, setPlataforma] = useState("")
  const [anoLanzamiento, setAnoLanzamiento] = useState("")
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

  const agregarVideojuego = async () => {
    const nuevoVideojuego = {
      titulo,
      genero,
      plataforma,
      anoLanzamiento: parseInt(anoLanzamiento),
      desarrollador,
      imagenPortada,
      descripcion,
      completado: completado === "true"
    }

    fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ videojuego: nuevoVideojuego })
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
      })
  }

  const eliminarVideojuego = (_id) => {
    fetch(`${API_URL}/${_id}`, {
      method: "DELETE"
    })
      .then(() => {
        //Quitar de la lista
        setVideojuegos(videojuegos.filter(v => v._id !== _id))
      })
  }

  const preparaEdicion = (videojuego) => {
    setEditando(videojuego._id)
    setTitulo(videojuego.titulo)
    setGenero(videojuego.genero)
    setPlataforma(videojuego.plataforma)
    setAnoLanzamiento(videojuego.anoLanzamiento)
    setDesarrollador(videojuego.desarrollador)
    setImagenPortada(videojuego.imagenPortada)
    setDescripcion(videojuego.descripcion)
    setCompletado(videojuego.completado)
    setFechaCreacion(videojuego.fechaCreacion)

    window.scrollTo(0, 0)
  }

  const actualizarVideojuego = () => {
    const videojuegoActualizado = {
      titulo: titulo,
      genero: genero,           // "Acción", "RPG", "Estrategia", etc.
      plataforma: plataforma,       // "PC", "PlayStation", "Xbox", etc.
      anoLanzamiento: parseInt(anoLanzamiento),
      desarrollador: desarrollador,
      imagenPortada: imagenPortada,    // URL de la imagen
      descripcion: descripcion,
      completado: completado === "true" || completado === true,
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
        setVideojuegos(videojuegos.map(v => v._id === editando ? data : v))

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
      <ParticlesBackground />
      <h1 className="Crud_Videojuegos_Title">Formulario de Videojuegos</h1>

      {/* Formulario para crear */}
      <div className="Crud_Videojuegos_Form">
        <div className="Crud_Videojuegos_Form_Content">
          <label htmlFor="" className="Crud_Videojuegos_Label">Titulo</label>
          <input
            className="Crud_Videojuegos_Input"
            type="text"
            placeholder="Titulo..."
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
          />
        </div>
        <div className="Crud_Videojuegos_Form_Content">
          <label htmlFor="" className="Crud_Videojuegos_Label">Plataforma</label>
          <input
            className="Crud_Videojuegos_Input"
            type="text"
            placeholder="Plataforma..."
            value={plataforma}
            onChange={(e) => setPlataforma(e.target.value)}
          />
        </div>
        <div className="Crud_Videojuegos_Form_Content">
          <label htmlFor="" className="Crud_Videojuegos_Label">Desarrollador/es</label>
          <input
            className="Crud_Videojuegos_Input"
            type="text"
            placeholder="Desarrollador..."
            value={desarrollador}
            onChange={(e) => setDesarrollador(e.target.value)}
          />
        </div>
        <div className="Crud_Videojuegos_Form_Content">
          <label htmlFor="" className="Crud_Videojuegos_Label">Año de Lanzamiento</label>
          <select type="number" onChange={(e) => setAnoLanzamiento(e.target.value)} className="Crud_Videojuegos_Input_Select" value={anoLanzamiento}>
            <option value="">Selecciona el año</option>
            <option value="2025">2025</option>
            <option value="2024">2024</option>
            <option value="2023">2023</option>
            <option value="2022">2022</option>
            <option value="2021">2021</option>
            <option value="2020">2020</option>
            <option value="2019">2019</option>
            <option value="2018">2018</option>
            <option value="2017">2017</option>
            <option value="2016">2016</option>
            <option value="2015">2015</option>
            <option value="2014">2014</option>
            <option value="2013">2013</option>
            <option value="2012">2012</option>
            <option value="2011">2011</option>
            <option value="2010">2010</option>
            <option value="2009">2009</option>
            <option value="2008">2008</option>
            <option value="2007">2007</option>
            <option value="2006">2006</option>
            <option value="2005">2005</option>
            <option value="2004">2004</option>
            <option value="2003">2003</option>
            <option value="2002">2002</option>
            <option value="2001">2001</option>
            <option value="2000">2000</option>
          </select>
        </div>
        <div className="Crud_Videojuegos_Form_Content">
          <label htmlFor="" className="Crud_Videojuegos_Label">Imagen de la portada</label>
          <input
            className="Crud_Videojuegos_Input"
            type="url"
            placeholder="Url de la portada..."
            value={imagenPortada}
            onChange={(e) => setImagenPortada(e.target.value)}
          />
        </div>
        <div className="Crud_Videojuegos_Form_Content">
          <label htmlFor="" className="Crud_Videojuegos_Label">Genero</label>
          <select type="text" onChange={(e) => setGenero(e.target.value)} className="Crud_Videojuegos_Input_Select" value={genero}>
            <option value="">Selecciona tu genero</option>
            <option value="Acción y Disparos">Acción y Disparos</option>
            <option value="Aventura y Rol">Aventura y Rol</option>
            <option value="Estrategia y Simulación">Estrategia y Simulación</option>
            <option value="Carrera y Deportes">Carrera y Deportes</option>
            <option value="Terror y Supervivencia">Terror y Supervivencia</option>
            <option value="Sandbox y Mundo Abierto">Sandbox y Mundo Abierto</option>
            <option value="Indie">Indie</option>
            <option value="Competitivo">Competitivo</option>
          </select>
        </div>
        <div className="Crud_Videojuegos_Form_TextArea">
          <label htmlFor="" className="Crud_Videojuegos_Label">Descripcion</label>
          <textarea name="" id=""
            className="Crud_Videojuegos_TextArea"
            type="text"
            placeholder="Descripcion..."
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
          ></textarea>
        </div>
      </div>

      <div className="Crud_Videojuegos_Buttons">
        {editando ?
          (<button onClick={actualizarVideojuego} className="Crud_Videojuegos_Button_Create">Actualizar</button>)
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
            setFechaCreacion("")
          }} className="Crud_Videojuegos_Button_Create">Cancelar</button>
        )}
      </div>


      <div className="Crud_Videojuegos_List">
        <h2 className="Crud_Videojuegos_List_Title">Lista de videojuegos</h2>
        {videojuegos.map(videojuego => (
          <div key={videojuego._id} className="Crud_Videojuegos_Resena_Div">
            <h3>{videojuego.titulo}</h3>
            <p>Genero: {videojuego.genero}</p>
            <p>Plataforma: {videojuego.plataforma}</p>
            <p>Ano de Lanzamiento: {videojuego.anoLanzamiento}</p>
            <p>Desarrollador: {videojuego.desarrollador}</p>
            <p>Imagen de la portada: {videojuego.imagenPortada}</p>
            <p>Descripcion: {videojuego.descripcion}</p>
            <p>Fecha de creacion: {
              videojuego.fechaCreacion
                ? new Date(videojuego.fechaCreacion).toLocaleDateString()
                : "Sin fecha"
            }</p>
            <div className="Crud_Videojuegos_Buttons_Div">
              <button onClick={() => preparaEdicion(videojuego)} className="Crud_Videojuegos_Edit">Editar</button>
              <button onClick={() => eliminarVideojuego(videojuego._id)} className="Crud_Videojuegos_Edit">Eliminar</button>
            </div>
          </div>
        ))}
      </div>


    </div>
  )
}


export default Crud_videojuegos