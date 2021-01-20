import { Button, Dropdown, DropdownButton } from 'react-bootstrap';
import React from 'react';
import imagenAyuda from '../imagenes/ayudar.png';
import imagenGithub from '../imagenes/github.png';

export default class BarraSuperior extends React.Component{

    render(){
        return(
            <div>
                <input type = 'image' src = {imagenAyuda}></input>
                <select value = 'algoritmo 1'>
                    <option value = 'algoritmo 1'>
                        algoritmo 1
                    </option>
                </select>
                Velocidad: 
                <select value = 'rapido' >
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
                <DropdownButton title = 'Patron de caminos'>
                    <Dropdown.Item>Patron 1</Dropdown.Item>
                    <Dropdown.Item>Patron 2</Dropdown.Item>
                    <Dropdown.Item>Patron 3</Dropdown.Item>
                </DropdownButton>
                <Button>
                    Reiniciar cuadricula
                </Button>
                <Button>
                    Reiniciar camino
                </Button>
                <Button>
                    Iniciar
                </Button>
                <Button>
                    Detener
                </Button>
                <a href = ''>
                    <img src = {imagenGithub}></img>
                </a>
            </div>
        )
    }
}