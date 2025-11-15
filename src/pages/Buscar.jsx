import React, { useEffect, useState } from "react"
import { useSearchParams, Link } from "react-router-dom"
import Barra_Lateral from "../components/Barra_Lateral.jsx"


const API_URL = "http://localhost:3000/api/videojuegos"



function Search() {
    const [parametroBuscar, setParametroBuscar] = useSearchParams()
    const [todosJuegos, setTodosJuegos] = useState([])
    const [filtro, setFiltro] = useState([])
    const [cargando, setCargando] = useState(true)


    const consulta = parametroBuscar.get("q") || ""
    const generoSeleccionado = parametroBuscar.getAll("genre") || []
    const plataformaSeleccionado = parametroBuscar.getAll("platform") || []

    useEffect(() => {
        fetch(API_URL)
            .then(res => res.json())
            .then(data => {
                setTodosJuegos(data)
                setCargando(false)
            })
            .catch(err => {
                console.error(err)
                setCargando(false)
            })
    }, [])

    useEffect(() => {
        let result = todosJuegos

        if (consulta) {
            result = result.filter(videojuego =>
                videojuego.titulo.toLowerCase().includes(consulta.toLowerCase()) ||
                videojuego.plataforma.toLowerCase().includes(consulta.toLowerCase())
            )
        }

        if (generoSeleccionado.length > 0) {
            result = result.filter(videojuego =>
                generoSeleccionado.includes(videojuego.genero)
            )
        }


        if (plataformaSeleccionado.length > 0) {
            result = result.filter(videojuego =>
                plataformaSeleccionado.includes(videojuego.plataforma)
            )
        }

        setFiltro(result)
    }, [consulta, parametroBuscar.toString(), todosJuegos])

    const manejarCambioFiltro = (type, value, checked) => {
        const parametros = new URLSearchParams(parametroBuscar)


        if (checked) {
            parametros.append(type, value)
        } else {
            const valores = parametros.getAll(type).filter(v => v !== value)
            parametros.delete(type)
            valores.forEach(v => parametros.append(type, v))
        }

        setParametroBuscar(parametros)
    }

    if (cargando) return <div className="Cargando">Cargando...</div>






    return (
        <main className="Buscar_Main">
            <div className="Buscar_Container">
                <Barra_Lateral
                    videojuegos={todosJuegos}
                    cambioFiltro={manejarCambioFiltro}
                    generoSeleccionado={generoSeleccionado}
                    plataformaSeleccionado={plataformaSeleccionado}
                />
            </div>
            <section className="Buscar_Results">
                <h2>Resultados {consulta && `para "${consulta}"`}</h2>
                <p>{filtro.length} Juegos Encontrados</p>
                {filtro.length === 0 ? (
                    <div className="Buscar_NoResults">No se encontraron juegos</div>
                ) : (
                    <div className="Buscar_List">
                        {filtro.map(videojuego => (
                            <Link to={`/game/${videojuego._id}`} key={videojuego._id} className="Buscar_Item">
                                <img src={videojuego.imagenPortada} alt={videojuego.titulo} className="Buscar_Item_Img" />
                                <div className="Buscar_Item_Info">
                                    <h3>{videojuego.titulo}</h3>
                                    <p>plataforma: {videojuego.plataforma}</p>
                                    <p>Género: {videojuego.genero}</p>
                                </div>
                            </Link>
                        ))}
                    </div>
                )}
            </section>
        </main>
    )

}
export default Search