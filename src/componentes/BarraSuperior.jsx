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
                <select value = 'algoritmo 1' className = 'bg-dark text-white  h-50'>
                    <option value = 'algoritmo 1'>
                        algoritmo 1
                    </option>
                </select>
                <select className = 'bg-dark text-white  h-50' >
                    <option value = 'lento'>
                        lento
                    </option>
                    <option value = 'intermedio'>
                        intermedio
                    </option>
                    <option value = 'rapido'>
                        rapido
                    </option>
                </select>
                <DropdownButton title = 'Patron de caminos' className = 'h-50' variant = 'info'>
                    <Dropdown.Item>Patron 1</Dropdown.Item>
                    <Dropdown.Item>Patron 2</Dropdown.Item>
                    <Dropdown.Item>Patron 3</Dropdown.Item>
                </DropdownButton>
                <Button className = 'h-50 ' variant = 'info'>
                    Reiniciar cuadricula
                </Button>
                <Button className = 'h-50 ' variant = 'info'>
                    Reiniciar camino
                </Button>
                <Button className = 'h-50 ' variant = 'success'>
                    Iniciar
                </Button>
                <Button className = 'h-50' variant = 'danger' disabled>
                    Detener
                </Button>
                <a href = ''  draggable = {false}>
                    <img src = {imagenGithub} draggable = {false}></img>
                </a>
            </div>
        )
    }
}