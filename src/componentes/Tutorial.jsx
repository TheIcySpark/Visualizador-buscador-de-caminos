import { Modal, Button } from 'react-bootstrap';
import { useState } from 'react'
import imagenAyuda from '../imagenes/ayudar.png';

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
        <p>
            indice 2
        </p>
        ,
        <p>
            indice 3
        </p>
    ]

    return (
        <div>
            <input type = 'image' src = {imagenAyuda} draggable = {false} onClick = {() =>{
                handleShow()
            }}>
            </input>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton className = 'bg-dark'>
                    <Modal.Title>¿Como utilizar la aplicacion?</Modal.Title>
                </Modal.Header>
                <Modal.Body className = 'bg-dark'>
                    {cuerpo[indice]}
                </Modal.Body>
                <Modal.Footer className = 'bg-dark'>
                    <Button variant = 'danger' onClick = {handleClose}>
                        PREFIERO RIFARME A LA ANTIGUA
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