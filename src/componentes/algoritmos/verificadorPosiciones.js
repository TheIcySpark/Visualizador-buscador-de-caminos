function posicionValida(posicion, cuadricula){
    if(posicionExistente(posicion) && 
        (cuadricula[posicion.i][posicion.j].clase === 'celdaLibre' ||
        cuadricula[posicion.i][posicion.j].clase === 'celdaConPeso'  ||
        cuadricula[posicion.i][posicion.j].clase === 'puntoFinal' ||
        cuadricula[posicion.i][posicion.j].clase === 'puntoInicio')){
        return true
    }else{
        return false
    }
}


function posicionExistente(posicion){
    if(posicion.i < 17 && posicion.i >= 0 && posicion.j < 38 && posicion.j >= 0) return true
    else return false
}

export default {posicionValida, posicionExistente}