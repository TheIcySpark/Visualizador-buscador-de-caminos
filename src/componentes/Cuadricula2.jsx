import React, {useState} from 'react';
import {useSpring, animated, config} from 'react-spring'

function Cuadricula2(props) {
    
    
    return (
        <>
            {props.cuadricula.map((valor, indice) => {
                return (
                    <div className='d-flex justify-content-start' draggable = {false}>
                        {
                            valor.map((valor, indice) => {
                                return (
                                    <animated.div className='celdaLibre' key={indice} id = {valor}
                                    onDrop = {drop} onDragOver = {allowDrop}
                                    onMouseEnter={(evento) => {
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
                            })
                        }
                    </div>
                )
            })
            }
        </>
    );
}

function allowDrop(evento) {
    evento.preventDefault();
    evento.stopPropagation();
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

export default Cuadricula2;
