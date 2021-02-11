import React from 'react';


function visualizacionEnCurso(){
    if(document.getElementById('botonInicio').disabled) return true
    else return false
}

function allowDrop(evento) {
    if(visualizacionEnCurso()) return
    evento.preventDefault();
    evento.stopPropagation();
}

function drag(evento) {
    if(visualizacionEnCurso()) return
    evento.dataTransfer.setData("text", evento.target.id);
}

function drop(evento) {
    if(visualizacionEnCurso()) return
    evento.preventDefault();
    var data = evento.dataTransfer.getData("text");
    var elemento = document.getElementById(data);
    if(elemento == null || evento.target.className == 'puntoInicio' || evento.target.className == 'puntoFinal') return;
    else{
        evento.target.className = elemento.className;
        evento.target.ondragstart = drag;
        evento.target.draggable = true;
        elemento.className = 'celdaLibre';
        elemento.ondragstart = null;
        elemento.draggable = false;
    }
}


function convertirEnPared(celda) {
    if(visualizacionEnCurso()) return
    if(celda.className != 'puntoInicio' && celda.className != 'puntoFinal'){
        celda.className = 'celdaOcupada'
    }
}


function convertirEnCeldaLibre(celda) {
    if(visualizacionEnCurso()) return
    if(celda.className != 'puntoInicio' && celda.className != 'puntoFinal'){
        celda.className = 'celdaLibre';
    } 
}

function convertirEnCeldaConPeso(celda){
    if(visualizacionEnCurso()) return
    if(celda.className != 'puntoInicio' && celda.className != 'puntoFinal'){
        celda.className = 'celdaConPeso';
    }
}

function Celda(props) {
    return(
        <div className = {props.className} id = {props.id}
        draggable = {(props.className === 'puntoInicio' || props.className === 'puntoFinal')? true: false}
        onDragStart = {(evento) =>{
            if(props.className === 'puntoInicio' || props.className === 'puntoFinal'){
                drag(evento)
            }
        }}
        onDrop = {(evento) =>{
            drop(evento)
        }}
        onDragOver = {(evento) =>{
            allowDrop(evento)
        }}
        onMouseEnter={(evento) => {
            if (evento.shiftKey && evento.buttons === 1) {
                convertirEnCeldaLibre(evento.target);
            }else if(evento.altKey && evento.buttons === 1){
                convertirEnCeldaConPeso(evento.target);
            }else if (evento.buttons === 1) {
                convertirEnPared(evento.target);
            }
        }}
        onMouseDown={(evento) => {
            if (evento.shiftKey) {
                convertirEnCeldaLibre(evento.target);
            }else if(evento.altKey){
                convertirEnCeldaConPeso(evento.target);
            }else {
                convertirEnPared(evento.target);
            }
        }}>
        </div>
    )
}
export default Celda;