import { useState, useEffect } from 'react'
import { Link, Routes } from "react-router"
import Fila_videojuegos from '../components/Fila_videojuegos'

const API_URL = "http://localhost:3000/api/videojuegos"

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
            <div className='Home_Introduce'>
                <h1 className='Home_Title'>Games</h1>
            </div>
            <div className='Home_Games'>
                <Fila_videojuegos title="Todos los juegos" videojuegos={videojuegos} />
                <Fila_videojuegos title="Acción y Disparos" videojuegos={byGenre('Acción y Disparos')} />
                <Fila_videojuegos title="Terror y Supervivencia" videojuegos={byGenre('Terror y Supervivencia')} />
            </div>
        </main>
    )
}

export default Home