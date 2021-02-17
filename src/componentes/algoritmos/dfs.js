import verificadorPosiciones from './verificadorPosiciones'
var pila
const movs = [[-1, 0], [0, 1], [1, 0], [0, -1]]
var cuadricula = new Array(17)
var animaciones = []
var animacion = {}
var posicionInicial 


function inicializacion(){
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
            cuadricula[i][j] = {id: id, visitado: false, clase: document.getElementById(id).className}
            id ++
        }
    }
    i = iAux
    j = jAux
    posicionInicial = {i: i, j: j}
}

function busqueda(posicion){
    console.log(posicion)
    if(!verificadorPosiciones.posicionValida(posicion, cuadricula) || cuadricula[posicion.i][posicion.j].visitado) return false
    if(cuadricula[posicion.i][posicion.j].clase === 'puntoFinal') return true
    if(cuadricula[posicion.i][posicion.j].clase === 'puntoInicio'){
        console.log('puntoInicio')
        cuadricula[posicion.i][posicion.j].visitado = true
        let i = 0
        while(i < 4){
            let posicionSiguiente = {i: posicion.i, j: posicion.j}
            posicionSiguiente.i += movs[i][0]
            posicionSiguiente.j += movs[i][1]
            if(busqueda(posicionSiguiente)) return true
            i += 1
        }
    }else if(cuadricula[posicion.i][posicion.j].clase === 'celdaLibre' ||
    cuadricula[posicion.i][posicion.j].clase === 'celdaConPeso'){
        cuadricula[posicion.i][posicion.j].visitado = true
        animacion = {}
        animacion.posicion = cuadricula[posicion.i][posicion.j].id
        animacion.clase = 'celdaVisitada'
        animaciones.push(animacion)
        let i = 0
        while(i < 4){
            let posicionSiguiente = {i: posicion.i, j: posicion.j}
            posicionSiguiente.i += movs[i][0]
            posicionSiguiente.j += movs[i][1]
            if(busqueda(posicionSiguiente)){
                animacion = {}
                animacion.posicion = cuadricula[posicion.i][posicion.j].id
                animacion.clase = 'celdaCamino'
                animaciones.push(animacion)
                return true
            }
            i += 1
        }
        return false
    }

}

function dfs() {
    inicializacion()
    busqueda(posicionInicial)
    return animaciones
}
export default dfs