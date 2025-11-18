import { useMemo } from "react"
import "./CSS/Barra_Lateral.css"

function Barra_Lateral({ videojuegos, cambioFiltro, generoSeleccionado, plataformaSeleccionado }) {

    const genres = useMemo(() => {
        return [...new Set(videojuegos.map(v => v.genero))].filter(Boolean)
    }, [videojuegos])

    const platforms = useMemo(() => {
        return [...new Set(videojuegos.map(v => v.plataforma))].filter(Boolean)
    }, [videojuegos])



    return (
        <aside className="SideBar">
            <h3 className="SideBar_Title">Filtros</h3>

            <div className="SideBar_Filter">
                <h4 className="SideBar_Filter_Title">Género</h4>
                {genres.map((genre, index) => {
                    const id = `genre-${index}`;
                    return (
                        <div key={genre} className="SideBar_Filter_Div">
                            <input
                                className="SideBar_Filter_Checkbox"
                                id={id}
                                type="checkbox"
                                checked={generoSeleccionado.includes(genre)}
                                onChange={(e) => cambioFiltro("genre", genre, e.target.checked)}/>
                            <label htmlFor={id} className="SideBar_Filter_Label">{genre}</label>
                        </div>
                    );
                })}
            </div>

            <div className="SideBar_Filter">
                <h4 className="SideBar_Filter_Title">Plataforma</h4>
                {platforms.map((platform, index) => {
                    const id = `platform-${index}`;
                    return (
                        <div key={platform} className="SideBar_Filter_Div">
                            <input
                                className="SideBar_Filter_Checkbox"
                                id={id}
                                type="checkbox"
                                checked={plataformaSeleccionado.includes(platform)}
                                onChange={(e) => cambioFiltro("platform", platform, e.target.checked)}/>
                            <label htmlFor={id} className="SideBar_Filter_Label">{platform}</label>
                        </div>
                    );
                })}
            </div>
        </aside>
    )

}

export default Barra_Lateral