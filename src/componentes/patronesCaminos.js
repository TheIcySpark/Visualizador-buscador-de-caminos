function laberintoAleatorio(){
    var id = 0
    for(var i = 0; i < 17; i++){
        for(var j = 0; j < 38; j++){
            let elemento = document.getElementById(id++)
            if(elemento.className !== 'puntoInicio' && elemento.className !== 'puntoFinal'){
                let posibilidad = Math.random() * (101 - 0) + 0;
                if(posibilidad >= 70)
                    elemento.className = 'celdaOcupada'
            }
        }
    }
}

function laberintoAleatorioPesos(){
    var id = 0
    for(var i = 0; i < 17; i++){
        for(var j = 0; j < 38; j++){
            let elemento = document.getElementById(id++)
            if(elemento.className !== 'puntoInicio' && elemento.className !== 'puntoFinal'){
                let posibilidad = Math.random() * (101 - 0) + 0;
                if(posibilidad >= 70)
                    elemento.className = 'celdaConPeso'
            }
        }
    }
}

export default {laberintoAleatorio, laberintoAleatorioPesos}