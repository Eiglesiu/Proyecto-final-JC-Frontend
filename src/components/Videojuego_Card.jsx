import { useState, useEffect } from "react"
import { useParams } from 'react-router-dom'
import buscarTrailer from "../../models/api"
import Puntuacion from "./Puntuacion"
import useEstadoJuego from "../../models/Buttons"


const API_URL = "http://localhost:3000/api/videojuegos"

function Videojuego_Card() {
    const [videojuegos, setVideojuegos] = useState([])
    const { gameId } = useParams();
    const [cargando, setCargando] = useState(true)
    const [trailerId, setTrailerId] = useState(null)

    const {
        completado,
        quieroJugarlo,
        toggleCompletado,
        toggleQuieroJugarlo
    } = useEstadoJuego(gameId)

    //Cargar los videojuegos
    useEffect(() => {
        fetch(API_URL)
            .then(res => res.json())
            .then(data => {
                setVideojuegos(data)
                setCargando(false)
            })
            .catch(err => {
                console.error(err)
                setCargando(false)
            })
    }, [])

    const videojuegoSeleccionado = videojuegos.find(v => v._id === gameId)

    useEffect(() => {
        if (videojuegoSeleccionado?.titulo) {
            buscarTrailer(videojuegoSeleccionado.titulo).then(setTrailerId)
        }
    }, [videojuegoSeleccionado])
    

    if (!videojuegoSeleccionado)
        return <div className="Cargando">Cargando...</div>





    return (
        <div className="Videojuego_Crud_Div">
            <section className="Videojuego_Crud_Section">
                <h1 className="Videojuego_Crud_Title">{videojuegoSeleccionado.titulo}</h1>
                <div className="Videojuego_Crud_Content">
                    <img src={videojuegoSeleccionado.imagenPortada} alt={videojuegoSeleccionado.titulo} className="Videojuego_Crud_Img" />
                    <p className="Videojuego_Crud_Platform">{videojuegoSeleccionado.plataforma}</p>
                    <p className="Videojuego_Crud_Description">{videojuegoSeleccionado.descripcion}</p>
                    <p className="Videojuego_Crud_Gender">{videojuegoSeleccionado.genero}</p>
                    <p className="Videojuego_Crud_Year">{videojuegoSeleccionado.anoLanzamiento}</p>
                    <p className="Videojuego_Crud_Developer">{videojuegoSeleccionado.desarrollador}</p>

                    <div>
                         <button 
                            onClick={toggleCompletado}
                            className={completado ? "boton-activo" : "boton-inactivo"}
                        >
                            {completado ? "Completado" : " Marcar como completado"}
                        </button>

                        <button 
                            onClick={toggleQuieroJugarlo}
                            className={quieroJugarlo ? "boton-activo" : "boton-inactivo"}
                        >
                            {quieroJugarlo ? "Quiero jugarlo" : "Agregar a mi lista"}
                        </button>
                    </div>


                </div>
            </section>
            <section className="Videojuego_Resena_Section">
                <h1>Resenas</h1>
            </section>
            
            <section className="secTrailer">
                    <h2>🎬 Tráiler del juego</h2>
                    {trailerId ? (
                    <iframe
                        width="560"
                        height="315"
                        src={`https://www.youtube.com/embed/${trailerId}`}
                        allowFullScreen
                        title="Tráiler del videojuego"
                    ></iframe>
                    ) : (
                    <p>No se encontró tráiler.</p>
                    )}
            </section>
                    <Puntuacion juegoId={videojuegoSeleccionado._id} />
        </div>
    )
}


export default Videojuego_Card