import { useState, useEffect } from 'react'
import "./CSS/Perfil.css"

const API_URL = "http://localhost:3000/api/videojuegos"

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
        
        // 4. Arrays para guardar los juegos filtrados
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
            <h1>Mi Perfil de Juegos</h1>

            {/* Sección de juegos completados */}
            <section className="Perfil_Section">
                <h2>Juegos Completados ({completados.length})</h2>
                {completados.length === 0 ? (
                    <p>No has marcado ningún juego como completado</p>
                ) : (
                    <div className="Perfil_Grid">
                        {completados.map(juego => (
                            <div key={juego._id} className="Perfil_Card">
                                <img src={juego.imagenPortada} alt={juego.titulo} />
                                <h3>{juego.titulo}</h3>
                                <p>{juego.plataforma}</p>
                            </div>
                        ))}
                    </div>
                )}
            </section>

            {/* Sección de juegos que quiere jugar */}
            <section className="Perfil_Section">
                <h2> Quiero Jugar ({quieroJugar.length})</h2>
                {quieroJugar.length === 0 ? (
                    <p>No has agregado juegos a tu lista</p>
                ) : (
                    <div className="Perfil_Grid">
                        {quieroJugar.map(juego => (
                            <div key={juego._id} className="Perfil_Card">
                                <img src={juego.imagenPortada} alt={juego.titulo} />
                                <h3>{juego.titulo}</h3>
                                <p>{juego.plataforma}</p>
                            </div>
                        ))}
                    </div>
                )}
            </section>
        </div>
    )
}

export default Perfil