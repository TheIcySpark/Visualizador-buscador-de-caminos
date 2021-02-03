import React, {useState} from 'react';
import {useSpring, animated, config} from 'react-spring'


function allowDrop(evento) {
    evento.preventDefault();
    evento.stopPropagation();
}

function finta(){

}

function drag(evento) {
    evento.dataTransfer.setData("text", evento.target.id);
}

function drop(evento, setEstado) {
    evento.preventDefault();
    var data = evento.dataTransfer.getData("text");
    var elemento = document.getElementById(data);
    if(elemento == null || evento.target.className == 'puntoInicio' || evento.target.className == 'puntoFinal') return;
    else{
        evento.target.className = elemento.className;
        evento.target.ondragstart = drag;
        evento.target.draggable = true;
        setEstado(1)
        elemento.className = 'celdaLibre';
        elemento.ondragstart = null;
        elemento.draggable = false;
    }
}


function convertirEnPared(celda, setEstado) {
    if(celda.className != 'puntoInicio' && celda.className != 'puntoFinal'){
        celda.className = 'celdaOcupada'
        setEstado(0);
    }
}


function convertirEnCeldaLibre(celda, setEstado) {
    if(celda.className != 'puntoInicio' && celda.className != 'puntoFinal'){
        celda.className = 'celdaLibre';
        setEstado(1);
    } 
}

function convertirEnCeldaConPeso(celda, setEstado){
    if(celda.className != 'puntoInicio' && celda.className != 'puntoFinal'){
        celda.className = 'celdaConPeso';
        setEstado(1);
    }
}

function Celda(props) {
    const [estado, setEstado] = useState(1);
    const animacion = useSpring({
        backgroundColor: estado ? '#bbe1fa': 'rgb(11, 37, 59)',
        config: {duration: 500}
    })
    return(
        <animated.div className = {props.className} id = {props.id}
        draggable = {(props.className === 'puntoInicio' || props.className === 'puntoFinal')? true: false}
        onDragStart = {(evento) =>{
            if(props.className === 'puntoInicio' || props.className === 'puntoFinal'){
                drag(evento)
            }
        }}
        style = {animacion}
        onDrop = {(evento) =>{
            drop(evento, setEstado)
        }}
        onDragOver = {(evento) =>{
            allowDrop(evento)
        }}
        onMouseEnter={(evento) => {
            if (evento.shiftKey && evento.buttons === 1) {
                convertirEnCeldaLibre(evento.target, setEstado);
            }else if(evento.altKey && evento.buttons === 1){
                console.log("xd")
                convertirEnCeldaConPeso(evento.target, setEstado);
            }else if (evento.buttons === 1) {
                convertirEnPared(evento.target, setEstado);
            }
        }}
        onMouseDown={(evento) => {
            if (evento.shiftKey) {
                convertirEnCeldaLibre(evento.target, setEstado);
            } else {
                convertirEnPared(evento.target, setEstado);
            }
        }}>
        </animated.div>
    )
}
export default Celda;