import React from 'react';
import './cuadricula.css'
import flecha from '../imagenes/flecha.svg';
import punto from '../imagenes/punto.svg';
import Cuadricula2 from './Cuadricula2';


export default class Cuadricula extends React.Component {
    constructor(props) {
        super(props);
        let nf = 17
        let nc = 40
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


    componentDidMount(props) {
        let puntoInicio = document.getElementById(0);
        puntoInicio.draggable = true;
        puntoInicio.className = 'puntoInicio';
        puntoInicio.ondragstart = this.drag;

        let puntoFinal = document.getElementById(this.state.numeroColumnas * this.state.numeroFilas - 1);
        puntoFinal.draggable = true;
        puntoFinal.className = 'puntoFinal';
        puntoFinal.ondragstart = this.drag;
    }

    drag(evento) {
        evento.dataTransfer.setData("text", evento.target.id);
    }


    render() {
        return (
            <Cuadricula2 cuadricula = {this.state.cuadricula} nf = {this.state.nf} nc = {this.state.nc}
            ></Cuadricula2>
        )
    }
}