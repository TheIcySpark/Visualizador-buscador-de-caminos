import React, {useState} from 'react';
import {useSpring, animated, config} from 'react-spring'


function allowDrop(evento) {
    evento.preventDefault();
    evento.stopPropagation();
}

function drag(evento) {
    evento.dataTransfer.setData("text", evento.target.id);
}

function drop(evento) {
    evento.preventDefault();
    var data = evento.dataTransfer.getData("text");
    var elemento = document.getElementById(data);
    if(elemento == null || evento.target.className == 'puntoInicio' || evento.target.className == 'puntoFinal') return;
    else{
        evento.target.className = elemento.className;
        evento.target.ondragstart = elemento.ondragstart;
        evento.target.draggable = true;
        elemento.className = 'celdaLibre';
        elemento.ondragstart = null;
    }
}


function convertirEnPared(celda) {
    if(celda.className != 'puntoInicio' && celda.className != 'puntoFinal') celda.className = 'celdaOcupada'
}


function convertirEnCeldaLibre(celda) {
    if(celda.className != 'puntoInicio' && celda.className != 'puntoFinal') celda.className = 'celdaLibre';
}

function Celda(props) {
    const [estado, setEstado] = useState(true);
    const animacion = useSpring({
        opacity: estado ? 1: 0
    })
    return(
        <animated.div className = {props.className} key = {props.key} id = {props.id}
        style = {animacion}
        onDrop = {(evento) =>{
            drop(evento)
        }}
        onDragOver = {(evento) =>{
            allowDrop(evento)
        }}
        onMouseEnter={(evento) => {
            console.log(estado);
            setEstado(!estado);
            if (evento.shiftKey && evento.buttons === 1) {
                convertirEnCeldaLibre(evento.target);
            } else if (evento.buttons === 1) {
                convertirEnPared(evento.target);
            }
        }}
        onMouseDown={(evento) => {
            if (evento.shiftKey) {
                convertirEnCeldaLibre(evento.target);
            } else {
                convertirEnPared(evento.target);
            }
        }}>
        </animated.div>
    )
}
export default Celda;