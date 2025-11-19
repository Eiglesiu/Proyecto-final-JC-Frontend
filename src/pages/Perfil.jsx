import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import "./CSS/Perfil.css"
import ParticlesBackground from '../components/Particles'

const API_URL = "https://proyecto-final-jc-backend.onrender.com/api/videojuegos"

function Perfil() {
    const [videojuegos, setVideojuegos] = useState([])
    const [cargando, setCargando] = useState(true)

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

    const obtenerJuegosConEstado = () => {

        const estadosJSON = localStorage.getItem("estadosVideojuegos")

        if (!estadosJSON) {
            return { completados: [], quieroJugar: [] }
        }

        // Convertir de string a objeto
        const todosLosEstados = JSON.parse(estadosJSON)

        // Arrays para guardar los juegos filtrados
        const completados = []
        const quieroJugar = []

        Object.entries(todosLosEstados).forEach(([juegoId, estado]) => {

            const juego = videojuegos.find(v => v._id === juegoId)

            if (juego) {
                if (estado.completado) {
                    completados.push(juego)
                }
                if (estado.quieroJugarlo) {
                    quieroJugar.push(juego)
                }
            }
        })

        return { completados, quieroJugar }
    }
    // ================================================================

    if (cargando) return <div>Cargando...</div>

    // Obtener los juegos filtrados
    const { completados, quieroJugar } = obtenerJuegosConEstado()

    return (
        <div className="Perfil">
            <ParticlesBackground />
            <h1 className='Perfil_Title'>Mi Perfil de Juegos</h1>
            {/* Sección de juegos completados */}
            <section className="Perfil_Section">
                {completados.length === 0 ? (
                    <h2 className="Perfil_Section_Text">No has marcado ningún juego como completado</h2>
                ) : (
                    <>
                        <h2 className="Perfil_Section_Title">Juegos Completados ({completados.length})</h2>
                        <div className="Perfil_Grid">
                            {completados.map(juego => (
                                <Link to={`/game/${juego._id}`} key={juego._id} className="Perfil_Card">
                                    <img src={juego.imagenPortada} alt={juego.titulo} className='Perfil_Card_Img' />
                                    <h3 className='Perfil_Card_Title'>{juego.titulo}</h3>
                                    <p className='Perfil_Card_Platform'>{juego.plataforma}</p>
                                </Link>
                            ))}
                        </div>
                    </>
                )}
            </section>

            {/* Sección de juegos que quiere jugar */}
            <section className="Perfil_Section">

                {quieroJugar.length === 0 ? (
                    <h2 className="Perfil_Section_Text">No has agregado juegos a tu lista</h2>
                ) : (
                    <>
                        <h2 className="Perfil_Section_Title"> Quiero Jugar ({quieroJugar.length})</h2>
                        <div className="Perfil_Grid">
                            {quieroJugar.map(juego => (
                                <Link to={`/game/${juego._id}`} key={juego._id} className="Perfil_Card">
                                    <img src={juego.imagenPortada} alt={juego.titulo} className='Perfil_Card_Img' />
                                    <h3 className='Perfil_Card_Title'>{juego.titulo}</h3>
                                    <p className='Perfil_Card_Platform'>{juego.plataforma}</p>
                                </Link>
                            ))}
                        </div>
                    </>
                )}
            </section>
        </div>
    )
}

export default Perfil