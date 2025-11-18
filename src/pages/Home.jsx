import { useState, useEffect } from 'react'
import { Link, Routes } from "react-router"
import Fila_videojuegos from '../components/Fila_videojuegos'
import ParticlesBackground from '../components/Particles'

const API_URL = "https://proyecto-final-jc-backend.onrender.com/api/videojuegos"

function Home() {

    const [videojuegos, setVideojuegos] = useState([])

    useEffect(() => {
        fetch(API_URL)
            .then(res => res.json())
            .then(data => setVideojuegos(data))
    }, [])


    const byGenre = (genre) => videojuegos.filter(e => e.genero === genre)

    return (
        <main>
            <ParticlesBackground />
            <div className='Home_Games'>
                <div className='Home_Titles'>
                    <h1 className='Home_Title_Front'>Games</h1>
                    <h1 className='Home_Title_Back'>Games</h1>
                </div>
                <Fila_videojuegos title="Todos los juegos" videojuegos={videojuegos} />
                <Fila_videojuegos title="Acción y Disparos" videojuegos={byGenre('Acción y Disparos')} />
                <Fila_videojuegos title="Aventura y Rol" videojuegos={byGenre('Aventura y Rol')} />
                <Fila_videojuegos title="Estrategia y Simulación" videojuegos={byGenre('Estrategia y Simulación')} />
                <Fila_videojuegos title="Carrera y Deportes" videojuegos={byGenre('Carrera y Deportes')} />
                <Fila_videojuegos title="Terror y Supervivencia" videojuegos={byGenre('Terror y Supervivencia')} />
                <Fila_videojuegos title="Sandbox y Mundo Abierto" videojuegos={byGenre('Sandbox y Mundo Abierto')} />
                <Fila_videojuegos title="Indie" videojuegos={byGenre('Indie')} />
                <Fila_videojuegos title="Competitivo" videojuegos={byGenre('Competitivo')} />
            </div>
        </main>
    )
}

export default Home