import './css/cuadricula.css'
import Celda from './Celda';
import bfs from './algoritmos/bfs';
import dijkstra from './algoritmos/dijkstra'
import dfs from './algoritmos/dfs'
import patronesCaminos from './patronesCaminos'
import { useEffect } from 'react';

function generarLaberintoAleatorio(){
    console.log("xd")
}

function mostrarAnimaciones(animaciones, timers, velocidad){
    if(animaciones.length === 0){
        intercambioBotonesHabilitados()
        return
    }
    let aux = 0
    for(let i = 0;i < animaciones.length && 
    (animaciones[i].clase === 'celdaVisitada' || animaciones[i].clase === 'celdaVisitadaConPeso'); i++){
        timers.push(
            setTimeout(() =>{
                document.getElementById(animaciones[i].posicion).className = animaciones[i].clase
            }, i * velocidad))
        aux = i
    }
    for(let i = aux;i < animaciones.length; i++){
        timers.push(
            setTimeout(() =>{
                document.getElementById(animaciones[i].posicion).className = animaciones[i].clase
                if(i == animaciones.length -1 ){
                    intercambioBotonesHabilitados()
                }
            }, i * velocidad))
    }
}

function reiniciarCamino(){
    var id = 0
    for(var i = 0; i < 17; i++){
        for(var j = 0; j < 38; j++){
            let elemento = document.getElementById(id++)
            if(elemento.className === 'celdaVisitada') elemento.className = 'celdaLibre'
            else if(elemento.className === 'celdaVisitadaConPeso') elemento.className = 'celdaConPeso'
            else if(elemento.className === 'puntoFinalVisitado') elemento.className = 'puntoFinal'
            else if(elemento.className === 'celdaCamino') elemento.className = 'celdaLibre'
            else if(elemento.className === 'celdaCaminoConPeso') elemento.className = 'celdaConPeso'
        }
    }
}

function reiniciarCuadricula(){
    var id = 0
    for(var i = 0; i < 17; i++){
        for(var j = 0; j < 38; j++){
            let elemento = document.getElementById(id++)
            if(elemento.className !== 'puntoInicio' && elemento.className !== 'puntoFinal') elemento.className = 'celdaLibre'
        }
    }
}

function detenerVisualizacion(timers){
    for(var i = 0; i < timers.length; i++){
        clearTimeout(timers[i])
    }
    timers = []
    setTimeout(() =>{
        reiniciarCamino()
        intercambioBotonesHabilitados()
    },100)
}

function intercambioBotonesHabilitados(){
    document.getElementById('botonDetener').disabled = !document.getElementById('botonDetener').disabled
    document.getElementById('botonInicio').disabled = !document.getElementById('botonInicio').disabled
    document.getElementById('selectAlgoritmo').disabled = !document.getElementById('selectAlgoritmo').disabled
    document.getElementById('selectVelocidad').disabled = !document.getElementById('selectVelocidad').disabled
    document.getElementById('botonReiniciarCuadricula').disabled = !document.getElementById('botonReiniciarCuadricula').disabled
    document.getElementById('botonReiniciarCamino').disabled = !document.getElementById('botonReiniciarCamino').disabled
    document.getElementById('selectPatronCaminos').disabled = !document.getElementById('selectPatronCaminos').disabled
}

function Cuadricula() {
    var cuadricula = new Array(17);
    var id = 0
    var clase = '';
    for(var i = 0; i < cuadricula.length; i++){
        cuadricula[i] = new Array(38);
        for(var j = 0; j < cuadricula[i].length; j++){
            cuadricula[i][j] = id++;
        }
    }

    useEffect(() =>{
        var timers = []
        document.getElementById('botonInicio').onclick = () =>{
            intercambioBotonesHabilitados()
            reiniciarCamino()
            let algoritmo = document.getElementById('selectAlgoritmo').value
            let velocidad = document.getElementById('selectVelocidad').value
            let animaciones 
            if(algoritmo === 'bfs') animaciones = bfs()
            else if(algoritmo === 'dijkstra') animaciones = dijkstra()
            else if(algoritmo === 'dfs') animaciones = dfs()
            console.log(animaciones)
            setTimeout(() =>{
                mostrarAnimaciones(animaciones, timers, velocidad)
            }, 500)
            
        }
        document.getElementById('botonReiniciarCamino').onclick = () =>{
            reiniciarCamino()
        }
        document.getElementById('botonDetener').onclick = () =>{
            detenerVisualizacion(timers)
        }
        document.getElementById('botonReiniciarCuadricula').onclick = () =>{
            reiniciarCuadricula()
        }
        document.getElementById('selectPatronCaminos').onchange = () =>{
            let valor = document.getElementById('selectPatronCaminos').value
            if(valor === 'patrones') return
            reiniciarCamino()
            reiniciarCuadricula()
            if(valor === 'laberintoAleatorio') patronesCaminos.laberintoAleatorio()
            else if(valor === 'laberintoAleatorioPesos') patronesCaminos.laberintoAleatorioPesos()
            document.getElementById('selectPatronCaminos').value = 'patrones'
        }
    }, [])

    return (
        <>
            {cuadricula.map((valor, indice) => {
                return (
                    <div className='d-flex justify-content-start' draggable = {false} key = {indice}>
                        {
                            valor.map((valor, indice) => {
                                if(valor == 0) clase = 'puntoInicio';
                                else if (valor == cuadricula.length * cuadricula[0].length - 1) clase = 'puntoFinal';
                                else clase = 'celdaLibre';
                                return (
                                    <Celda className={clase} key={valor} id = {valor}>
                                    </Celda>
                                )
                            })
                        }
                    </div>
                )
            })
            }
        </>
    );
}
export default Cuadricula;