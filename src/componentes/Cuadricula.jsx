import './cuadricula.css'
import Celda from './Celda';
import bfs from './bfs';
import { useEffect } from 'react';


function mostrarAnimaciones(animaciones, timers){
    for(let i = 0; i < animaciones.length; i++){
        setTimeout(() =>{
            document.getElementById(animaciones[i].posicion).className = animaciones[i].clase
        }, i * 3)
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
        }
    }
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
        document.getElementById('botonInicio').onclick = () =>{
            let timers = []
            reiniciarCamino()
            let algoritmo = document.getElementById('selectAlgoritmo').value
            console.log(algoritmo)
            let animaciones 
            if(algoritmo === 'bfs'){
                animaciones = bfs();
            }
            setTimeout(() =>{
                mostrarAnimaciones(animaciones, timers)
            }, 500)
            
        }
        document.getElementById('botonReiniciarCamino').onclick = () =>{
            reiniciarCamino()
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