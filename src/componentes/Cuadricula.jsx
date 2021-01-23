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
        let cuadricula = new Array(this.state.numeroFilas);
        for(let i = 0; i < this.state.numeroFilas; i++){
            cuadricula[i] = new Array(this.state.numeroColumnas);
            for(let j = 0; j < this.state.numeroColumnas; j++){
                cuadricula[i][j] = 0;
            }
        }
        this.setState({cuadricula});
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
                                        <div className = 'celda' key = {indice}>
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