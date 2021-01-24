import { event } from 'jquery';
import React from 'react';
import './cuadricula.css'

export default class Cuadricula extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            cuadricula : [],
            numeroFilas : 17,
            numeroColumnas: 35
        }
    }

    componentDidMount(props){
        let id = 0
        let cuadricula = new Array(this.state.numeroFilas);
        for(let i = 0; i < this.state.numeroFilas; i++){
            cuadricula[i] = new Array(this.state.numeroColumnas);
            for(let j = 0; j < this.state.numeroColumnas; j++){
                cuadricula[i][j] = id;
                id += 1;
            }
        }
        this.setState({cuadricula});
    }

    convertirEnPared(celda){
        celda.style.backgroundColor = '#80ced6';
    }

    render(){
        console.log(this.state.cuadricula)
        return(
            <>
                {this.state.cuadricula.map((valor, indice) =>{
                    return(
                        <div className = 'd-flex justify-content-start'>
                            {
                                valor.map((valor, indice) =>{
                                    return(
                                        <div className = 'celda' key = {indice} id = {valor}
                                        onMouseEnter = {(evento) =>{
                                            if(evento.buttons == 1){
                                                this.convertirEnPared(document.getElementById(valor));
                                            }
                                        }}
                                        onMouseDown = {(evento) =>{
                                            this.convertirEnPared(document.getElementById(valor));
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