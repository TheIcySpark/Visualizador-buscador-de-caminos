const movs = [[-1, 0], [0, 1], [1, 0], [0, -1]]
var cuadricula = new Array(17)
var animaciones = []
var animacion = {}

function posicionValida(posicion){
    if(posicion.i < 17 && posicion.i >= 0 && posicion.j < 38 && posicion.j >= 0 && 
        (document.getElementById(cuadricula[posicion.i][posicion.j]).className === 'celdaLibre' ||
        document.getElementById(cuadricula[posicion.i][posicion.j]).className === 'celdaConPeso'  ||
        document.getElementById(cuadricula[posicion.i][posicion.j]).className === 'puntoFinal')){
        return true
    }else{
        return false
    }
}

function bfs(){
    let inicio = document.getElementsByClassName('puntoInicio')[0]
    let final = document.getElementsByClassName('puntoFinal')[0]
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
            cuadricula[i][j] = id++
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
            if(posicionValida(posicionSiguiente)){
                cola.push(posicionSiguiente)
                let elemento = document.getElementById(cuadricula[posicionSiguiente.i][posicionSiguiente.j])
                if(elemento.className === 'celdaLibre'){
                    animacion = {}
                    animacion.posicion = posicionSiguiente
                    animacion.clase = 'celdaVisitada'
                    animaciones.push(animacion)
                    elemento.className = 'celdaVisitada'
                }else if(elemento.className == 'celdaConPeso'){
                    animacion = {}
                    animacion.posicion = posicionSiguiente
                    animacion.clase = 'celdaVisitada'
                    animaciones.push(animacion)
                    elemento.className = 'celdaVisitadaConPeso'
                }else if(elemento.className == 'puntoFinal'){
                    animacion = {}
                    animacion.posicion = posicionSiguiente
                    animacion.clase = 'puntoFinalVisitado'
                    animaciones.push(animacion)
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