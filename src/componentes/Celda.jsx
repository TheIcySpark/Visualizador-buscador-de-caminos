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

function drop(evento, estado, setEstado) {
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


function convertirEnPared(celda, estado, setEstado) {
    if(celda.className != 'puntoInicio' && celda.className != 'puntoFinal'){
        celda.className = 'celdaOcupada'
        setEstado(0);
    }
}


function convertirEnCeldaLibre(celda, estado, setEstado) {
    if(celda.className != 'puntoInicio' && celda.className != 'puntoFinal'){
        celda.className = 'celdaLibre';
        setEstado(1)
    } 
}

function Celda(props) {
    const [estado, setEstado] = useState(1);
    const animacion = useSpring({
        backgroundColor: estado ? 'aliceblue': 'rgb(0, 70, 131)',
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
            drop(evento, estado, setEstado)
        }}
        onDragOver = {(evento) =>{
            allowDrop(evento)
        }}
        onMouseEnter={(evento) => {
            if (evento.shiftKey && evento.buttons === 1) {
                convertirEnCeldaLibre(evento.target, estado, setEstado);
            } else if (evento.buttons === 1) {
                convertirEnPared(evento.target, estado, setEstado);
            }
        }}
        onMouseDown={(evento) => {
            if (evento.shiftKey) {
                convertirEnCeldaLibre(evento.target, estado, setEstado);
            } else {
                convertirEnPared(evento.target, estado, setEstado);
            }
        }}>
        </animated.div>
    )
}
export default Celda;