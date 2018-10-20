const ui = new UI();

document.addEventListener('DOMContentLoaded', () => {
    ui.mostrarEstablecimientos();
})

//Busqueda de establecimientos

const buscador = document.querySelector('#buscar input');

buscador.addEventListener('input', () => {
    if(buscador.value.length > 3){
        ui.obtenerSugerencias(buscador.value);
    }else{
        ui.inicializarMapa();
        ui.mostrarEstablecimientos();
    }
});


