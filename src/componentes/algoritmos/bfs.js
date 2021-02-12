import verificadorPosiciones from './verificadorPosiciones'
const movs = [[-1, 0], [0, 1], [1, 0], [0, -1]]
var cuadricula = new Array(17)
var animaciones = []
var animacion = {}




function recrearCamino(posicion){
    if(cuadricula[posicion.i][posicion.j].distancia === 0){
        animacion = {}
        animacion.posicion = cuadricula[posicion.i][posicion.j].id
        animacion.clase = 'celdaCamino'
        animaciones.push(animacion)
    }else{
        let aux = 0
        var posicionSiguiente
        while(aux < 4){
            posicionSiguiente = {i: posicion.i, j: posicion.j}
            posicionSiguiente.i += movs[aux][0]
            posicionSiguiente.j += movs[aux][1]
            if(verificadorPosiciones.posicionExistente(posicionSiguiente) && cuadricula[posicionSiguiente.i][posicionSiguiente.j].distancia ===
            cuadricula[posicion.i][posicion.j].distancia -1){
                break
            }
            aux++
        }
        recrearCamino({i: posicionSiguiente.i, j: posicionSiguiente.j})
        animacion = {}
        animacion.posicion = cuadricula[posicion.i][posicion.j].id
        animacion.clase = 'celdaCamino'
        animaciones.push(animacion)
    }
}

function bfs(){
    animaciones = []
    cuadricula = new Array(17)
    let inicio = document.getElementsByClassName('puntoInicio')[0]
    inicio.distancia = 0
    let id = 0
    let i = 0
    let j = 0
    let iAux = 0
    let jAux = 0
    for(i = 0; i < cuadricula.length; i++){
        cuadricula[i] = new Array(38)
        for(j = 0; j < cuadricula[i].length; j++){
            if(id == inicio.id){
                iAux = i
                jAux = j
            }
            cuadricula[i][j] = {id: id, clase: document.getElementById(id).className, distancia: -1}
            id ++
        }
    }
    i = iAux
    j = jAux
    let fin = false
    var cola = [{i: i, j: j}]
    while(cola.length > 0){
        let posicionActual = cola.shift();
        let aux = 0
        while(aux < 4){
            let posicionSiguiente = {i: posicionActual.i, j: posicionActual.j}
            posicionSiguiente.i += movs[aux][0]
            posicionSiguiente.j += movs[aux][1]
            if(verificadorPosiciones.posicionValida(posicionSiguiente, cuadricula)){
                cola.push(posicionSiguiente)
                if(cuadricula[posicionSiguiente.i][posicionSiguiente.j].clase === 'celdaLibre'){
                    animacion = {}
                    animacion.posicion = cuadricula[posicionSiguiente.i][posicionSiguiente.j].id
                    animacion.clase = 'celdaVisitada'
                    animaciones.push(animacion)
                    cuadricula[posicionSiguiente.i][posicionSiguiente.j].clase = 'celdaVisitada'
                    cuadricula[posicionSiguiente.i][posicionSiguiente.j].distancia = 
                            cuadricula[posicionActual.i][posicionActual.j].distancia + 1
                }else if(cuadricula[posicionSiguiente.i][posicionSiguiente.j].clase === 'celdaConPeso'){
                    animacion = {}
                    animacion.posicion = cuadricula[posicionSiguiente.i][posicionSiguiente.j].id
                    animacion.clase = 'celdaVisitada'
                    animaciones.push(animacion)
                    cuadricula[posicionSiguiente.i][posicionSiguiente.j].clase = 'celdaVisitada'
                    cuadricula[posicionSiguiente.i][posicionSiguiente.j].distancia = 
                            cuadricula[posicionActual.i][posicionActual.j].distancia + 1
                }else if(cuadricula[posicionSiguiente.i][posicionSiguiente.j].clase === 'puntoFinal'){
                    animacion = {}
                    animacion.posicion = cuadricula[posicionSiguiente.i][posicionSiguiente.j].id
                    animacion.clase = 'puntoFinal'
                    animaciones.push(animacion)
                    cuadricula[posicionSiguiente.i][posicionSiguiente.j].distancia = 
                            cuadricula[posicionActual.i][posicionActual.j].distancia + 1
                    if(cuadricula[posicionSiguiente.i][posicionSiguiente.j].distancia > 1){
                        recrearCamino({i: posicionActual.i, j: posicionActual.j})
                    }
                    fin = true
                    break
                }

            }
            aux += 1
        }
        if(fin) break
    }
    return animaciones
}
export default bfs