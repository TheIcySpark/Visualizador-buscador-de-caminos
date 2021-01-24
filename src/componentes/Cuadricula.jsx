import React from 'react';
import './cuadricula.css'
import flecha from '../imagenes/flecha.svg';
import punto from '../imagenes/punto.svg';


export default class Cuadricula extends React.Component {
    constructor(props) {
        super(props);
        let nf = 17
        let nc = 35
        let id = 0
        let c = new Array(nf);
        for (let i = 0; i < nf; i++) {
            c[i] = new Array(nc);
            for (let j = 0; j < nc; j++) {
                c[i][j] = id;
                id += 1;
            }
        }
        this.state = {
            cuadricula: c,
            numeroFilas: nf,
            numeroColumnas: nc
        }
    }

    allowDrop(evento) {
        evento.preventDefault();
        evento.stopPropagation();
    }

    drag(evento) {
        evento.dataTransfer.setData("text", evento.target.id);
    }

    drop(evento) {
        evento.preventDefault();
        var data = evento.dataTransfer.getData("text");
        var elemento = document.getElementById(data);
        if(elemento == null) return;
        else evento.target.appendChild(elemento);
    }

    componentDidMount(props) {
        let puntoInicio = document.createElement("img");
        puntoInicio.src = flecha
        document.getElementById(0).appendChild(puntoInicio);
        puntoInicio.id = 'puntoInicio';
        puntoInicio.ondragstart = this.drag;
        let puntoFinal = document.createElement("img");
        puntoFinal.src = punto;
        document.getElementById(this.state.numeroColumnas * this.state.numeroFilas - 1).appendChild(puntoFinal)
        puntoFinal.id = 'puntoFinal';
        puntoFinal.ondragstart = this.drag;

    }

    convertirEnPared(celda) {
        celda.style.backgroundColor = '#80ced6';
    }

    convertirEnCeldaLibre(celda) {
        celda.style.backgroundColor = '#f6e9e9';
    }

    render() {
        return (
            <>
                {this.state.cuadricula.map((valor, indice) => {
                    return (
                        <div className='d-flex justify-content-start' draggable = {false} >
                            {
                                valor.map((valor, indice) => {
                                    return (
                                        <div className='celda' key={indice} id={valor}
                                        onDrop = {this.drop} onDragOver = {this.allowDrop}
                                        draggable = {false}
                                        onMouseEnter={(evento) => {
                                                let celda = document.getElementById(valor)
                                                if (evento.shiftKey && evento.buttons === 1) {
                                                    this.convertirEnCeldaLibre(celda);
                                                } else if (evento.buttons === 1) {
                                                    this.convertirEnPared(celda);
                                                }
                                            }}
                                            onMouseDown={(evento) => {
                                                console.log(evento.target)
                                                let celda = document.getElementById(valor);
                                                if (evento.shiftKey) {
                                                    this.convertirEnCeldaLibre(celda);
                                                } else {
                                                    this.convertirEnPared(celda);
                                                }
                                            }}>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    )
                })
                }
            </>
        )
    }
}