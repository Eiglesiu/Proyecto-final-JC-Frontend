import { useState, useEffect } from "react"
import "./CSS/Puntuacion.css"



const API_URL = "https://proyecto-final-jc-backend.onrender.com/api/resenas"

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
        <div className="Puntuacion_Div">
            <h1 className="Puntuacion_Title">Puntuacion:</h1>
            {[1, 2, 3, 4, 5].map(n => (
                <span className="Puntuacion_Stars" key={n} style={{
                    color: n <= promedio ? "gold" : "gray",
                    fontSize: "50px",    
                    lineHeight: "50px"
                }}>
                    ★
                </span>
            ))}
        </div>
    )
}

export default Puntuacion