import React, {useEffect, useState} from 'react';
import {useSpring, animated, config} from 'react-spring'


function allowDrop(evento) {
    evento.preventDefault();
    evento.stopPropagation();
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
        evento.target.style.backgroundColor = '#04879c'
        setEstado('#04879c')
        elemento.style.backgroundColor = '#bbe1fa'
        elemento.className = 'celdaLibre';
        elemento.ondragstart = null;
        elemento.draggable = false;
        console.log(evento.target.id)
    }
}


function convertirEnPared(celda, setEstado) {
    if(celda.className != 'puntoInicio' && celda.className != 'puntoFinal'){
        celda.className = 'celdaOcupada'
        setEstado('rgb(11, 37, 59)');
    }
}


function convertirEnCeldaLibre(celda, setEstado) {
    if(celda.className != 'puntoInicio' && celda.className != 'puntoFinal'){
        celda.className = 'celdaLibre';
        setEstado('#bbe1fa');
    } 
}

function convertirEnCeldaConPeso(celda, setEstado){
    if(celda.className != 'puntoInicio' && celda.className != 'puntoFinal'){
        celda.className = 'celdaConPeso';
        setEstado('#85cfcb');
    }
}

function Celda(props) {
    var colorInicial = '#bbe1fa'
    if(props.className === 'puntoInicio' || props.className === 'puntoFinal') colorInicial = '#04879c'
    const [estado, setEstado] = useState(colorInicial);
    const animacion = useSpring({
        backgroundColor: estado,
        config: {duration: 500}
    })


    return(
        <div className = {props.className} id = {props.id}
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
                convertirEnCeldaConPeso(evento.target, setEstado);
            }else if (evento.buttons === 1) {
                convertirEnPared(evento.target, setEstado);
            }
        }}
        onMouseDown={(evento) => {
            if (evento.shiftKey) {
                convertirEnCeldaLibre(evento.target, setEstado);
            }else if(evento.altKey){
                convertirEnCeldaConPeso(evento.target, setEstado);
            }else {
                convertirEnPared(evento.target, setEstado);
            }
        }}>
        </div>
    )
}
export default Celda;