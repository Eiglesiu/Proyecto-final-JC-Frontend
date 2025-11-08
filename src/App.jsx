import { Routes, Route } from 'react-router-dom'
import { useState } from 'react'
import Header from './components/Header.jsx'
import Crud_videojuegos from "./pages/Crud_videojuegos.jsx"
import Crud_resenas from './components/Crud_resenas.jsx'
import Home from './pages/Home.jsx'
import Footer from './components/Footer.jsx'
import "./components/Header.css"
import "./components/Fila_videojuegos.css"
import "./pages/Crud_videojuegos.css"
import "./components/Crud_resenas.css"
import "./pages/Home.css"
import "./components/Footer.css"
import './App.css'




function App() {

  return (
    <>
    <Header/>
        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/addJuego' element={<Crud_videojuegos/>} />
          <Route path='/addResena' element={<Crud_resenas/>} />
        </Routes>
    <Footer/>
    </>
    )
}

export default App