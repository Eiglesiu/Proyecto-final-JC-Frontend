import { useState } from 'react'
import { Link, useNavigate } from "react-router"

function Header() {
const [buscarConsulta, setBuscarConsulta] = useState("")
const navigate = useNavigate()

const buscar = (e) => {
  e.preventDefault()
  navigate(`/search?q=${encodeURIComponent(buscarConsulta)}`)
  setBuscarConsulta("")
}



  return (
    <>
      <header>
        <h1 className='Header_Title'><Link to="/" className='Link'>Game Tracker</Link></h1>
        <div className='Header_Search'>
          <form onSubmit={buscar} className='Header_Search_Form'>
            <input 
            className='Header_SearchBar'
            type="text" 
            placeholder='Buscar...'
            value={buscarConsulta}
            onChange={(e) => setBuscarConsulta(e.target.value)}/>
            <button type='submit' className='Header_Button_Form'><img src="https://unpkg.com/lucide-static/icons/search.svg" alt="Buscar" /></button>
          </form>

        </div>
        <nav className='Header_Nav'>
          <ul className='Header_UlNav'>
            <li className='Header_Link'><Link to="/addJuego" className='Link'>Añadir un juego</Link></li>
            <li className='Header_Link'><Link to="/addResena" className='Link'>Añadir una Reseña</Link></li>
            <li className='Header_Link'><Link to="/perfil" className='Link'>Mi Perfil</Link></li>
          </ul>
        </nav>
      </header>
    </>
  )
}

export default Header