import { useState, useEffect } from "react"


const API_URL = "http://localhost:3000/api/resenas"

function Puntuacion({ juegoId }) {

    const [resenas, setResenas] = useState([])



    useEffect(() => {
        fetch(API_URL)
            .then(res => res.json())
            .then(data => setResenas(data))
            .catch(err => console.error('Error cargando reseñas:', err))
    }, [])

    const resenasDelJuego = resenas.filter(r => {
        const id = typeof r.juegoId === "object" ? r.juegoId._id : r.juegoId;
        return id === juegoId;
    });


    const promedio = resenasDelJuego.length > 0
        ? resenasDelJuego.reduce((sum, r) => sum + parseFloat(r.puntuacion), 0) / resenasDelJuego.length
        : 0;

    return (
        <>
            <h1>Puntuacion</h1>
            {[1, 2, 3, 4, 5].map(n => (
                <span key={n} style={{ color: n <= promedio ? "gold" : "gray" }}>
                    ★
                </span>
            ))}
        </>
    )
}

export default Puntuacion