import { Routes, Route } from 'react-router-dom'
import { useState } from 'react'
import Header from './components/Header.jsx'
import Crud_videojuegos from "./pages/Crud_videojuegos.jsx"
import Crud_resenas from './pages/Crud_resenas.jsx'
import Home from './pages/Home.jsx'
import Footer from './components/Footer.jsx'
import Buscar from "./pages/Buscar.jsx"
import Videojuego_Card from "./components/Videojuego_Card.jsx"
import Perfil from './pages/Perfil.jsx'
import "./components/CSS/Header.css"
import "./components/CSS/Fila_videojuegos.css"
import "./pages/CSS/Crud_videojuegos.css"
import "./pages/CSS/Crud_resenas.css"
import "./pages/CSS/Home.css"
import "./components/CSS/Footer.css"
import "./pages/CSS/Buscar.css"
import "./components/CSS/Videojuego_Card.css"
import './App.css'



function App({ videojuegos = [] }) {

  return (
    <>
    <Header/>
        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/addJuego' element={<Crud_videojuegos/>} />
          <Route path='/addResena' element={<Crud_resenas/>} />
          <Route path='/search' element={<Buscar/>} />
          <Route path="/game/:gameId" element={<Videojuego_Card videojuegos={videojuegos} />} />
          <Route path='/perfil' element={<Perfil/>} />
        </Routes>
    <Footer/>
    </>
    )
}

export default App