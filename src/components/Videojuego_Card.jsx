import { useState, useEffect } from "react"
import { useParams } from 'react-router-dom'
import buscarTrailer from "../../models/api"
import Puntuacion from "./Puntuacion"
import useEstadoJuego from "../../models/Buttons"
import ParticlesBackground from '../components/Particles'


const API_URL_Videojuegos = "https://proyecto-final-jc-backend.onrender.com/api/videojuegos"
const API_URL_Resenas = "https://proyecto-final-jc-backend.onrender.com/api/resenas"


function Videojuego_Card() {
    const [videojuegos, setVideojuegos] = useState([])
    const [resenas, setResenas] = useState([])
    const { gameId } = useParams();
    const [trailerId, setTrailerId] = useState(null)

    const {
        completado,
        quieroJugarlo,
        toggleCompletado,
        toggleQuieroJugarlo
    } = useEstadoJuego(gameId)

    //Cargar los videojuegos
    useEffect(() => {
        fetch(API_URL_Videojuegos)
            .then(res => res.json())
            .then(data => {
                setVideojuegos(data)
            })
            .catch(err => {
                console.error(err)
            })
    }, [])

    useEffect(() => {
        fetch(API_URL_Resenas)
            .then(res => res.json())
            .then(data => {
                setResenas(data)
            })
            .catch(err => {
                console.error(err)
            })
    }, [])

    const videojuegoSeleccionado = videojuegos.find(v => v._id === gameId)
    const resenasDelJuego = resenas.filter(r => r.juegoId._id === gameId)

    useEffect(() => {
        if (videojuegoSeleccionado?.titulo) {
            buscarTrailer(videojuegoSeleccionado.titulo).then(setTrailerId)
        }
    }, [videojuegoSeleccionado])


    if (!videojuegoSeleccionado)
        return <div className="Cargando">Cargando...</div>





    return (
        <div className="Videojuego_Card_Div">
            <ParticlesBackground />
            <section className="Videojuego_Card_Section">
                <div className="Videojuego_Card_Buttons">
                    <button
                        onClick={toggleCompletado}
                        className={completado ? "Videojuego_Card_Button1_On" : "Videojuego_Card_Button1_Off"}
                    >
                        {completado ? "Completado" : " Marcar como completado"}
                    </button>

                    <button
                        onClick={toggleQuieroJugarlo}
                        className={quieroJugarlo ? "Videojuego_Card_Button2_On" : "Videojuego_Card_Button2_Off"}
                    >
                        {quieroJugarlo ? "Quiero jugarlo" : "Agregar a mi lista"}
                    </button>
                </div>
                <h1 className="Videojuego_Card_Videogame_Title">{videojuegoSeleccionado.titulo} </h1>
                <div className="Videojuego_Card_Content">
                    <div className="Videojuego_Card_Img_Trailer">
                        <img src={videojuegoSeleccionado.imagenPortada} alt={videojuegoSeleccionado.titulo} className="Videojuego_Card_Img" />
                        <section className="Videojuego_Card_Trailer">
                            <h2 className="Videojuego_Card_Trailer_Title">🎬 Tráiler del juego</h2>
                            {trailerId ? (
                                <iframe
                                    width="800"
                                    height="482"
                                    src={`https://www.youtube.com/embed/${trailerId}`}
                                    allowFullScreen
                                    title="Tráiler del videojuego"
                                ></iframe>
                            ) : (
                                <p>No se encontró tráiler.</p>
                            )}
                        </section>
                    </div>
                    <div className="Videojuego_Card_Stars_Text">
                        <section className="Videojuego_Card_SecText">
                            <div className="Videojuego_Card_DivText">
                                <p className="Videojuego_Card_Platform"><strong>Plataforma:</strong> {videojuegoSeleccionado.plataforma}</p>
                                <p className="Videojuego_Card_Gender"><strong>Genero:</strong> {videojuegoSeleccionado.genero}</p>
                                <p className="Videojuego_Card_Year"><strong>Año de Lanzamiento:</strong> {videojuegoSeleccionado.anoLanzamiento}</p>
                                <p className="Videojuego_Card_Developer"><strong>Desarrollador:</strong> {videojuegoSeleccionado.desarrollador}</p>
                            </div>
                            <div className="Videojuego_Card_Description_Div">
                                <p className="Videojuego_Card_Description"><strong>Descripcion:</strong> {videojuegoSeleccionado.descripcion}</p>
                            </div>
                        </section>
                        <Puntuacion juegoId={videojuegoSeleccionado._id} className="Videojuego_Card_Stars" />
                    </div>
                </div>
            </section>
            <section className="Videojuego_Card_Section_Resenas">
                <h1 className="Videojuego_Card_Section_Resenas_Title">Reseñas</h1>
                {resenasDelJuego.map(r => (
                    <div key={r._id} className="Videojuego_Card_Div_Resenas">
                        <div className="Videojuego_Card_Div_Text">
                            <p><strong>Puntuación:</strong> {r.puntuacion}</p>
                            <p><strong>Comentario:</strong> {r.textoResena}</p>
                            <p><strong>Horas jugadas:</strong> {r.horasJugadas}</p>
                            <p><strong>Dificultad:</strong> {r.dificultad}</p>
                            <p><strong>¿Recomendaría?:</strong> {r.recomendaria ? "Sí" : "No"}</p>
                            <p><strong>Creada el: </strong>{r.fechaCreacion}</p>
                        </div>
                    </div>
                ))}
            </section>
        </div>
    )
}


export default Videojuego_Card