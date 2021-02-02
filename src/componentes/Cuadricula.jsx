import './cuadricula.css'
import flecha from '../imagenes/flecha.svg';
import punto from '../imagenes/punto.svg';
import Celda from './Celda';



function Cuadricula() {
    var cuadricula = new Array(17);
    var id = 0
    for(var i = 0; i < cuadricula.length; i++){
        cuadricula[i] = new Array(35);
        for(var j = 0; j < cuadricula[i].length; j++){
            cuadricula[i][j] = id++;
        }
    }

    return (
        <>
            {cuadricula.map((valor, indice) => {
                return (
                    <div className='d-flex justify-content-start' draggable = {false}>
                        {
                            valor.map((valor, indice) => {
                                return (
                                    <Celda className='celdaLibre' key={valor} id = {valor}>
                                    </Celda>
                                )
                            })
                        }
                    </div>
                )
            })
            }
        </>
    );
}
export default Cuadricula;