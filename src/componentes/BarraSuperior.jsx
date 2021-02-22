import { Button} from 'react-bootstrap';
import React from 'react';
import imagenAyuda from '../imagenes/ayudar.png';
import imagenGithub from '../imagenes/github.png';
import Tutorial from './Tutorial'

export default class BarraSuperior extends React.Component{
    render(){
        return(
            <div className = 'd-flex justify-content-between'>
                <div className = ''>
                    <input type = 'image' src = {imagenAyuda} draggable = {false}></input>
                </div>
                <select className = 'bg-dark text-white  h-50' id = 'selectAlgoritmo'>
                    <option value = 'dfs'>
                        DFS
                    </option>
                    <option value = 'dijkstra'>
                        Algoritmo de Dijkstra
                    </option>
                    <option value = 'bfs'>
                        BFS
                    </option>
                </select>
                <select className = 'bg-dark text-white  h-50' id = 'selectVelocidad'>
                    <option value = '5'>
                        rapido
                    </option>
                    <option value = '50'>
                        intermedio
                    </option>
                    <option value = '75'>
                        lento
                    </option>
                </select>
                <select className = 'bg-dark text-white  h-50' id = 'selectPatronCaminos'>
                    <option value = 'patrones'>
                        Patrones
                    </option>
                    <option value = 'laberintoAleatorio'>
                        Laberinto aleatorio
                    </option>
                    <option value = 'laberintoAleatorioPesos'>
                        Laberinto aleatorio de pesos
                    </option>
                </select>
                <Button className = 'h-50 ' variant = 'info' id = 'botonReiniciarCuadricula'>
                    Reiniciar cuadricula
                </Button>
                <Button className = 'h-50 ' variant = 'info' id = 'botonReiniciarCamino'>
                    Reiniciar camino
                </Button>
                <Button className = 'h-50 ' variant = 'success' id = 'botonInicio'>
                    Iniciar
                </Button>
                <Button className = 'h-50' variant = 'danger' disabled id = 'botonDetener'>
                    Detener
                </Button>
                <a href = 'https://github.com/TheIcySpark/Visualizador-buscador-de-caminos'  draggable = {false}>
                    <img src = {imagenGithub} draggable = {false}></img>
                </a>
            </div>
        )
    }
}