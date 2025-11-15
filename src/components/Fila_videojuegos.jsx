import { useRef } from 'react'
import { Link } from 'react-router-dom'

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
            <section className="Fila_Videojuegos_Section">
                <h1 className="Fila_Videojuegos_Section_Title">{title}</h1>
                <div className="Fila_Videojuegos_Section_Button">
                    <button type="button" className="Fila_Videojuegos_Section_Button_Left" onClick={() => scrollByAmount(-1)} aria-label="Anterior">‹</button>
                    <button type="button" className="Fila_Videojuegos_Section_Button_Right" onClick={() => scrollByAmount(1)} aria-label="Siguiente">›</button>
                </div>
                <article className="Fila_Videojuegos_Article" ref={filaRef}>
                    {videojuegos.map(videojuego => (
                        <Link
                            to={`/game/${videojuego._id}`}
                            key={videojuego._id}
                            className="Fila_Videojuegos_Videogame">
                            <div className="Fila_Videojuegos_Article_Title">
                                <h3>{videojuego.titulo}</h3>
                                <p>{videojuego.plataforma}</p>
                                <img src={videojuego.imagenPortada} alt={videojuego.titulo} className="Fila_Videojuegos_Article_Img" />
                            </div>
                        </Link>))}
                </article>
            </section>
        </>
    )
}

export default Fila_videojuegos