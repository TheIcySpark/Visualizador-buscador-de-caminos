import { Button, Dropdown, DropdownButton } from 'react-bootstrap';
import React from 'react';
import imagenAyuda from '../imagenes/ayudar.png';
import imagenGithub from '../imagenes/github.png';

export default class BarraSuperior extends React.Component{
    render(){
        return(
            <div className = 'd-flex justify-content-between'>
                <div className = ''>
                    <input type = 'image' src = {imagenAyuda} draggable = {false}></input>
                </div>
                <select className = 'bg-dark text-white  h-50' id = 'selectAlgoritmo'>
                    <option value = 'bfs'>
                        BFS
                    </option>
                    <option value = 'dijkstra'>
                        Algoritmo de Dijkstra
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
                <DropdownButton title = 'Patron de caminos' className = 'h-50' variant = 'info' id = 'dropdownPatronCaminos'>
                    <Dropdown.Item>Patron 1</Dropdown.Item>
                    <Dropdown.Item>Patron 2</Dropdown.Item>
                    <Dropdown.Item>Patron 3</Dropdown.Item>
                </DropdownButton>
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