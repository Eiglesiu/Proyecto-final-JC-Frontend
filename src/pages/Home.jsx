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
                <Fila_videojuegos title="Acción" videojuegos={byGenre('Acción')} />
                <Fila_videojuegos title="Terror" videojuegos={byGenre('Terror')} />


                {/*
                <section className='Home_Section'>
                    <div className='Home_Section_Button'>
                        <button>Izquierda</button>
                        <button>Derecha</button>
                    </div>
                    <h1 className='Home_Section_Title'>Prueba</h1>
                    <article className='Home_Article'>
                        {videojuegos.map(videojuego => (
                            <div key={videojuego.id} className="Videogame">
                                <div className='Home_Article_Title'>
                                    <h3>Gta VI</h3>
                                    <p>Plataforma</p>
                                </div>
                                <img src={download} alt="Imagen" className='Home_Article_Img' />
                            </div>))}
                    </article>
                </section>

                <section className='Home_Section'>
                    <div className='Home_Section_Button'>
                        <button>Izquierda</button>
                        <button>Derecha</button>
                    </div>
                    <h1 className='Home_Section_Title'>Terror</h1>
                    <article className='Home_Article'>
                        {videojuegos.map(videojuego => (
                            <div key={videojuego.id} className="videojuego">
                                <h3>{videojuego.titulo}</h3>
                                <p>Plataforma{videojuego.plataforma}</p>
                                <p>Imagen de la portada{videojuego.imagenPortada}</p>
                            </div>))}
                    </article>
                </section>

                <section className='Home_Section'>
                    <div className='Home_Section_Button'>
                        <button>Izquierda</button>
                        <button>Derecha</button>
                    </div>
                    <h1 className='Home_Section_Title'>Diversion</h1>
                    <article className='Home_Article'>
                        {videojuegos.map(videojuego => (
                            <div key={videojuego.id} className="videojuego">
                                <h3>{videojuego.titulo}</h3>
                                <p>Plataforma{videojuego.plataforma}</p>
                                <p>Imagen de la portada{videojuego.imagenPortada}</p>
                            </div>))}
                    </article>
                </section>
                */}
            </div>





        </main>
    )
}

export default Home