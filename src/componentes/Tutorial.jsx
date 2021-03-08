import { Modal, Button } from 'react-bootstrap';
import { useState } from 'react'
import imagenAyuda from '../imagenes/ayudar.png';
import moverPuntos from '../imagenes/gifs/moverPuntos.gif'
import ponerCeldasLibres from '../imagenes/gifs/ponerCeldasLibres.gif'
import ponerParedes from '../imagenes/gifs/ponerParedes.gif'
import ponerPesos from '../imagenes/gifs/ponerPesos.gif'

function Tutorial() {
    const [show, setShow] = useState(true)
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    var [indice, setInidice] = useState(0)


    const cuerpo = [
        <p>La barra superior corresponde a: <br></br>
        1: ¿Como utilizar la aplicacion? <br></br>
        2: Algoritmo de busqueda seleccionado <br></br>
        3: Velocidad de la visualizacion <br></br>
        4: Patron de obstaculos en la cuadricula <br></br>
        5: [Reiniciar cuadricula] elimina los obstaculos y pesos de la cuadricula <br></br>
        6: [Reiniciar camino] elimina la visualizacion del camino generada <br></br>
        7: Inicia la visualizacion <br></br>
        8: Detener la visualizacion <br></br>
        9: Ir al repositorio del proyecto
        </p>
        ,
        <div>
            <p>
                click izquierdo para mover los puntos de inicio y fin
            </p>
            <img src = {moverPuntos} width = {450}></img>
        </div>
        ,
        <div>
            <p>
                click izquierdo para poner paredes
            </p>
            <img src = {ponerParedes} width = {450}></img>
        </div>
        ,
        <div>
            <p>
                alt + click izquierdo para poner pesos
                <br></br>
                Los pesos funcionan con algunos algoritmos, los algoritmos que no los utilizen
                Ignoraran los pesos y los convertirar en celdas libres <br></br>
                Algoritmos que utilizan pesos: <br></br>
                *: Algoritmo de dijkstra
            </p>
            <img src = {ponerPesos} width = {450}></img>
        </div>
        ,
        <div>
            <p>
                shift + click para convertir las celdas, en celdas vacias
            </p>
            <img src = {ponerCeldasLibres} width = {450}></img>
        </div>
        ,
        <p>
            Ahora utiliza libremente la aplicacion
        </p>
    ]

    return (
        <div>
            <input type = 'image' src = {imagenAyuda} draggable = {false} onClick = {() =>{
                handleShow()
            }}>
            </input>
            <Modal show={show} onHide={handleClose} centered>
                <Modal.Header closeButton className = 'bg-dark'>
                    <Modal.Title>¿Como utilizar la aplicacion?</Modal.Title>
                </Modal.Header>
                <Modal.Body className = 'bg-dark'>
                    {cuerpo[indice]}
                </Modal.Body>
                <Modal.Footer className = 'bg-dark'>
                    <Button variant = 'danger' onClick = {handleClose}>
                        Quitar tutorial
                    </Button>
                    <Button variant="primary" onClick = {() =>{
                        if(indice > 0) setInidice(indice - 1)
                    }}>
                        Anterior
                    </Button>
                    <Button variant="primary" onClick = {() =>{
                        if(indice < cuerpo.length - 1) setInidice(indice + 1)
                    }}>
                        Siguiente
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}
export default Tutorial