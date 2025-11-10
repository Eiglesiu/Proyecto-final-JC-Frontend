import { useState } from 'react'
import { Link, Routes, useNavigate } from "react-router"

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
        <h1 className='Header_Title'>GameTracker</h1>
        <div className='Header_Search'>
          <form onSubmit={buscar} className='Header_Search_Form'>
            <input 
            className='Header_SearchBar'
            type="text" 
            placeholder='Buscar...'
            value={buscarConsulta}
            onChange={(e) => setBuscarConsulta(e.target.value)}/>
            <button type='submit' className='Header_Button_Form'>Buscar</button>
          </form>

        </div>
        <nav className='Header_Nav'>
          <ul className='Header_UlNav'>
            <li className='Header_Link'><Link to="/" className='Link'>Menu Principal</Link></li>
            <li className='Header_Link'><Link to="/addJuego" className='Link'>Añadir un juego</Link></li>
            <li className='Header_Link'><Link to="/addResena" className='Link'>Añadir una Reseña</Link></li>
          </ul>
        </nav>
      </header>
    </>
  )
}

export default Header