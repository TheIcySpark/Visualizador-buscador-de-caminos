import './cuadricula.css'
import Celda from './Celda';
import bfs from './bfs';
import { useEffect } from 'react';


function mostrarAnimaciones(animaciones){
    for(let i = 0; i < animaciones.length; i++){
        document.getElementById(animaciones[i].posicion).className = animaciones[i].clase
        console.log(i)
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
            let animaciones = bfs();
            console.log(animaciones)
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