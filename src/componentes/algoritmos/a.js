import verificadorPosiciones from './verificadorPosiciones'
var PriorityQueue  = require('priorityqueuejs')
var colaPrioridad
const movs = [[-1, 0], [0, 1], [1, 0], [0, -1]]
var cuadricula = new Array(17)
var animaciones = []
var animacion = {}
let iFinal, jFinal

function obtenerDistancia(a, b){
    return(Math.abs(a.i - b.i) + Math.abs(a.j - b.j))
}

function inicializacion(){
    colaPrioridad = new PriorityQueue(function(a, b){
        if(a.f === b.f) return b.h - a.h
        else return b.f - a.f
    })
    animaciones = []
    cuadricula = new Array(17)
    let inicio = document.getElementsByClassName('puntoInicio')[0]
    let final = document.getElementsByClassName('puntoFinal')[0]
    let id = 0
    let i = 0
    let j = 0
    let iInicio = 0
    let jInicio = 0
    iFinal = 0
    jFinal = 0
    for(i = 0; i < cuadricula.length; i++){
        cuadricula[i] = new Array(38)
        for(j = 0; j < cuadricula[i].length; j++){
            if(id == inicio.id){
                iInicio = i
                jInicio = j
            }
            if(id == final.id){
                iFinal = i
                jFinal = j
            }
            cuadricula[i][j] = {id: id, f: 0, h: 0, g: 0, previo: -1, i: i, j: j, visitado: false, 
            clase: document.getElementById(id).className}
            id ++
        }
    }
    i = iInicio
    j = jInicio
    cuadricula[i][j].previo = {i: i, j: j}
    let h = obtenerDistancia({i: iInicio, j: jInicio}, {i: iFinal, j: jFinal})
    colaPrioridad.enq({id: cuadricula[i][j].id, g: 0, h: h, f: h, visitado: false,
    previo: {i: i, j: j}, i: cuadricula[i][j].i, j: cuadricula[i][j].j, clase: cuadricula[i][j].clase})
}


function recrearCamino(posicion){
    posicion = cuadricula[posicion.i][posicion.j].previo
    console.log(posicion)
    console.log(cuadricula[posicion.i][posicion.j].previo)
    while(posicion.i !== cuadricula[posicion.i][posicion.j].previo.i || posicion.j !== cuadricula[posicion.i][posicion.j].previo.j){
        animacion = {}
        animacion.posicion = cuadricula[posicion.i][posicion.j].id
        animacion.clase = 'celdaCamino'
        animaciones.push(animacion)
        posicion = cuadricula[posicion.i][posicion.j].previo
    }
}

function a(){
    inicializacion()
    let actual
    while(colaPrioridad.size() > 0){
        actual = colaPrioridad.peek()
        colaPrioridad.deq()
        cuadricula[actual.i][actual.j].visitado = true
        if(actual.clase === 'puntoFinal') break
        for(let aux = 0; aux < 4; aux++){
            let posSiguiente = {i: actual.i, j: actual.j}
            posSiguiente.i += movs[aux][0]
            posSiguiente.j += movs[aux][1]
            if(verificadorPosiciones.posicionValida(posSiguiente, cuadricula) && 
            !cuadricula[posSiguiente.i][posSiguiente.j].visitado){
                if(cuadricula[posSiguiente.i][posSiguiente.j].f === 0){
                    cuadricula[posSiguiente.i][posSiguiente.j].g = actual.g + 1
                    cuadricula[posSiguiente.i][posSiguiente.j].h = 
                            obtenerDistancia({i: actual.i, j: actual.j}, {i: iFinal, j: jFinal})
                    cuadricula[posSiguiente.i][posSiguiente.j].f = cuadricula[posSiguiente.i][posSiguiente.j].g +
                            cuadricula[posSiguiente.i][posSiguiente.j].h
                    cuadricula[posSiguiente.i][posSiguiente.j].previo = {i: actual.i, j: actual.j}
                    if(cuadricula[posSiguiente.i][posSiguiente.j].clase !== 'puntoFinal'){
                        animacion = {}
                        animacion.posicion = cuadricula[posSiguiente.i][posSiguiente.j].id
                        animacion.clase = 'celdaVisitada'
                        animaciones.push(animacion)
                    }
                    colaPrioridad.enq(cuadricula[posSiguiente.i][posSiguiente.j])
                }else if(cuadricula[actual.i][actual.j].g + 1 < cuadricula[posSiguiente.i][posSiguiente.j].g){
                    cuadricula[posSiguiente.i][posSiguiente.j].g = cuadricula[actual.i][actual.j].g + 1
                    cuadricula[posSiguiente.i][posSiguiente.j].f = cuadricula[posSiguiente.i][posSiguiente.j].g +
                            cuadricula[posSiguiente.i][posSiguiente.j].h
                    cuadricula[posSiguiente.i][posSiguiente.j].previo = {i: actual.i, j: actual.j}
                }
            }
        }
    }
    if(actual.clase === 'puntoFinal') recrearCamino({i: actual.i, j: actual.j})
    return animaciones
}
export default a