import verificadorPosiciones from './verificadorPosiciones'
const movs = [[-1, 0], [0, 1], [1, 0], [0, -1]]
var cuadricula = new Array(17)
var animaciones = []
var animacion = {}

function dijkstra(){
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
}
export default dijkstra