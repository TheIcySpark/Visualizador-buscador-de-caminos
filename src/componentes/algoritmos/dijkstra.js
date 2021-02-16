import verificadorPosiciones from './verificadorPosiciones'
var PriorityQueue  = require('priorityqueuejs')
var colaPrioridad
const movs = [[-1, 0], [0, 1], [1, 0], [0, -1]]
var cuadricula = new Array(17)
var animaciones = []
var animacion = {}

function inicializacion(){
    colaPrioridad = new PriorityQueue(function(a, b){
        return b.distancia - a.distancia
    })
    animaciones = []
    cuadricula = new Array(17)
    let inicio = document.getElementsByClassName('puntoInicio')[0]
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
            cuadricula[i][j] = {id: id, visitado: false, distancia: 100000, previo: -1, i: i, j: j,
            clase: document.getElementById(id).className}
            id ++
        }
    }
    i = iAux
    j = jAux
    cuadricula[i][j].distancia = 0
    cuadricula[i][j].previo = {i: i, j: j}
    colaPrioridad.enq({distancia: cuadricula[i][j].distancia, id: cuadricula[i][j].id, visitado: cuadricula[i][j].visitado,
    previo: {i: i, j: j}, i: cuadricula[i][j].i, j: cuadricula[i][j].j, clase: cuadricula[i][j].clase})
}

function obtenerPeso(posicion){
    if(posicion.clase === 'celdaLibre' || posicion.clase === 'puntoFinal') return 1
    else if(posicion.clase === 'celdaConPeso') return 10
}

function relajacion(posicionActual, posicionSiguiente){
    let peso = obtenerPeso(posicionSiguiente)
    console.log(peso)
    if(posicionActual.distancia + peso < posicionSiguiente.distancia){
        posicionSiguiente.distancia = posicionActual.distancia + peso
        posicionSiguiente.previo = {i: posicionActual.i, j: posicionActual.j}
        cuadricula[posicionSiguiente.i][posicionSiguiente.j] = posicionSiguiente
        colaPrioridad.enq(posicionSiguiente)
    }
}

function recrearCamino(posicion){
    while(posicion.clase != 'puntoInicio'){
        animacion = {}
        animacion.posicion = posicion.id
        if(posicion.clase === 'celdaLibre') animacion.clase = 'celdaCamino'
        else if(posicion.clase === 'celdaConPeso') animacion.clase = 'celdaCaminoConPeso'
        animaciones.push(animacion)
        posicion = cuadricula[posicion.previo.i][posicion.previo.j]
    }
}

function dijkstra(){
    inicializacion()
    let posicionActual
    while(colaPrioridad.size() > 0){
        posicionActual = colaPrioridad.peek()
        colaPrioridad.deq()
        if(cuadricula[posicionActual.i][posicionActual.j].visitado) continue
        cuadricula[posicionActual.i][posicionActual.j].visitado = true
        animacion = {}
        animacion.posicion = cuadricula[posicionActual.i][posicionActual.j].id
        if(cuadricula[posicionActual.i][posicionActual.j].clase === 'celdaLibre') animacion.clase = 'celdaVisitada'
        else if(cuadricula[posicionActual.i][posicionActual.j].clase === 'celdaConPeso') animacion.clase = 'celdaVisitadaConPeso'

        if(cuadricula[posicionActual.i][posicionActual.j].clase === 'celdaConPeso' ||
        cuadricula[posicionActual.i][posicionActual.j].clase === 'celdaLibre') animaciones.push(animacion)
        if(posicionActual.clase === 'puntoFinal') break
        let i = 0
        while(i < 4){
            let posicionAdyacente = {i: posicionActual.i, j: posicionActual.j}
            posicionAdyacente.i += movs[i][0]
            posicionAdyacente.j += movs[i][1]
            if(verificadorPosiciones.posicionValida({i: posicionAdyacente.i, j: posicionAdyacente.j}, cuadricula)){
                posicionAdyacente.distancia = cuadricula[posicionAdyacente.i][posicionAdyacente.j].distancia
                posicionAdyacente.visitado = cuadricula[posicionAdyacente.i][posicionAdyacente.j].visitado
                posicionAdyacente.clase = cuadricula[posicionAdyacente.i][posicionAdyacente.j].clase
                posicionAdyacente.previo = cuadricula[posicionAdyacente.i][posicionAdyacente.j].previo
                posicionAdyacente.id = cuadricula[posicionAdyacente.i][posicionAdyacente.j].id
                if(cuadricula[posicionAdyacente.i][posicionAdyacente.j].visitado === false){
                    relajacion(posicionActual, posicionAdyacente)
                }
            }
            i++
        }
    }
    if(posicionActual.clase === 'puntoFinal') recrearCamino(cuadricula[posicionActual.previo.i][posicionActual.previo.j])
    return animaciones
}
export default dijkstra