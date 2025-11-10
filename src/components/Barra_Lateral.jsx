import React, { useMemo } from "React"
import "./Barra_Lateral.css"

function Barra_Lateral({ videojuegos, cambioFiltro, generoSeleccionado, plataformaSeleccionado }) {

    const genres = useMemo(() => {
        return [...new Set(videojuegos.map(v => v.genero))].filter(Boolean)
    }, [videojuegos])

    const platforms = useMemo(() => {
        return [...new Set(videojuegos.map(v => v.plataforma))].filter(Boolean)
    }, [videojuegos])

    return (
        <aside className="SideBar">
            <h3>Filtros</h3>

            <div className="SideBar_Filter">
                <h4>Género</h4>
                {genres.map(genre => (
                    <label key={genre}>
                        <input
                            type="checkbox"
                            checked={generoSeleccionado.includes(genre)}
                            onChange={(e) => cambioFiltro("genre", genre, e.target.checked)}
                        />
                        {genre}
                    </label>
                ))}
            </div>

            <div className="SideBar_Filter">
                <h4>plataforma</h4>
                {platforms.map(platform => (
                    <label key={platform}>
                        <input
                            type="checkbox"
                            checked={plataformaSeleccionado.includes(platform)}
                            onChange={(e) => cambioFiltro("platform", platform, e.target.checked)}
                        />
                        {platform}
                    </label>
                ))}
            </div>
        </aside>
    )

}

export default Barra_Lateral