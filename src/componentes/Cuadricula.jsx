import React from 'react';
import './cuadricula.css'
import flecha from '../imagenes/flecha.png';
import punto from '../imagenes/punto.png';


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

    allowDrop(ev) {
        ev.preventDefault();
    }

    drag(ev) {
        ev.dataTransfer.setData("text", ev.target.id);
    }

    drop(ev) {
        ev.preventDefault();
        var data = ev.dataTransfer.getData("text");
        ev.target.appendChild(document.getElementById(data));
    }

    componentDidMount(props) {
        let puntoInicio = document.createElement("img");
        puntoInicio.src = flecha
        document.getElementById(0).appendChild(puntoInicio);
        puntoInicio.draggable = true;
        puntoInicio.id = 'puntoInicio';
        puntoInicio.ondragstart = this.drag;
        let puntoFinal = document.createElement("img");
        puntoFinal.src = punto;
        document.getElementById(this.state.numeroColumnas * this.state.numeroFilas - 1).appendChild(puntoFinal)
        puntoFinal.draggable = true;
        puntoFinal.id = 'pudntoFinal';

    }

    convertirEnPared(celda) {
        celda.style.backgroundColor = '#80ced6';
    }

    convertirEnCeldaLibre(celda) {
        celda.style.backgroundColor = '#f6e9e9';
    }

    render() {
        console.log(this.state.cuadricula)
        return (
            <>
                {this.state.cuadricula.map((valor, indice) => {
                    return (
                        <div className='d-flex justify-content-start'>
                            {
                                valor.map((valor, indice) => {
                                    return (
                                        <div className='celda' key={indice} id={valor}
                                        onDrop = {this.drop} onDragOver = {this.allowDrop}
                                        onMouseEnter={(evento) => {
                                                let celda = document.getElementById(valor)
                                                if (evento.shiftKey && evento.buttons == 1) {
                                                    this.convertirEnCeldaLibre(celda);
                                                } else if (evento.buttons == 1) {
                                                    this.convertirEnPared(celda);
                                                }
                                            }}
                                            onMouseDown={(evento) => {
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