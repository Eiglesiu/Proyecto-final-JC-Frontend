import React, { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import download from "../assets/download.jpeg"


function Fila_videojuegos({ title, videojuegos = [] }) {
    const filaRef = useRef(null)


    
    const scrollByAmount = (dir = 1) => {
        const el = filaRef.current
        if (!el) return

        const client = el.clientWidth
        const scrollW = el.scrollWidth
        if (scrollW <= client) return

        const amount = Math.round(client * 0.7) * dir

    try {
      el.scrollBy({ left: amount, behavior: 'smooth' })
    } catch (e) {
      el.scrollLeft = Math.max(0, Math.min(el.scrollLeft + amount, el.scrollWidth - el.clientWidth))
    }
  }


        return (

            <>
                <section className='Home_Section'>
                    <h1 className='Home_Section_Title'>{title}</h1>
                    <div className='Home_Section_Button'>
                        <button type="button" className="Home_Section_Button_Left" onClick={() => scrollByAmount(-1)} aria-label="Anterior">‹</button>
                        <button type="button" className="Home_Section_Button_Right" onClick={() => scrollByAmount(1)} aria-label="Siguiente">›</button>
                    </div>
                    <article className='Home_Article' ref={filaRef}>
                        {videojuegos.map(videojuego => (
                            <Link to={`/game/${videojuego._id}`} key={videojuego._id} className='Videogame'>
                                <div className="Home_Article_Title">
                                    <h3>{videojuego.titulo}</h3>
                                    <p>{videojuego.plataforma}</p>
                                    <img src={download} alt="Imagen" className='Home_Article_Img' />
                                </div>
                            </Link>))}
                    </article>


                    {/*<article className='Home_Article' ref={filaRef}>
                    {videojuegos.map(videojuego => (
                        <div key={videojuego.id} className="Videogame">
                            <div className='Home_Article_Title'>
                                <h3>{videojuego.titulo}</h3>
                                <p>{videojuego.plataforma}</p>
                            </div>
                            <img src={download} alt="Imagen" className='Home_Article_Img' />
                        </div>))}
                </article>*/}

                </section>
            </>
        )
    }

    export default Fila_videojuegos