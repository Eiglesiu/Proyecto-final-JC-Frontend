import { useState, useEffect } from "react"

function useEstadoJuego (juegoId) {
    const STORAGE_KEY = "estadosVideojuegos"

    const [estado, setEstado] = useState({
        completado: false,
        quieroJugarlo: false
    }) 

    useEffect(() => {
        const estadosGuardados = localStorage.getItem(STORAGE_KEY)

        if (estadosGuardados ) {
            const todosLosEstados = JSON.parse(estadosGuardados)

            if (todosLosEstados[juegoId]) {
                setEstado(todosLosEstados[juegoId])
            }
        }
    }, [juegoId])


    const actualizarEstado = (campo) => {

        const nuevoEstado = {
            ...estado,
            [campo]: !estado[campo]
        }

        setEstado(nuevoEstado)

        const estadosGuardados = localStorage.getItem(STORAGE_KEY) //Se obtiene el estado guardado
        const todosLosEstados = estadosGuardados 
        ? JSON.parse(estadosGuardados) 
        : {}

        todosLosEstados[juegoId] = nuevoEstado

        localStorage.setItem(STORAGE_KEY, JSON.stringify(todosLosEstados))
        
        }
        return {
            completado: estado.completado,
            quieroJugarlo: estado.quieroJugarlo,
            toggleCompletado: () => actualizarEstado('completado'),
            toggleQuieroJugarlo: () => actualizarEstado('quieroJugarlo')
        }
}

export default useEstadoJuego