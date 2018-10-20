class UI{
    constructor(){
        this.api = new API();
        this.inicializarMapa();
    }

    inicializarMapa(){
        let latLng = { lat: 19.390519, lng: -99.3739778 }
        this.mapa = new google.maps.Map(document.getElementById('mapa'), {
            center: latLng,
            zoom: 5
        });
    }

    //Mostrar establecimeintos
    mostrarEstablecimientos(){
        this.api.obtenerDatos()
                        .then(datos => {
                            const resultado = datos.respuestaJSON.results;

                           this.mostrarPines(resultado);
                        })
    }

    //Muestra los pines en el mapa
    mostrarPines(datos){
        //Almacena infowindow activo
        let infoWindowActivo;

        datos.forEach(dato => {
            let {latitude, longitude, calle, regular, premium} = dato;

            let latLng = {
                lat: Number(latitude),
                lng: Number(longitude)
            }

            //Agregar pin
            let marker = new google.maps.Marker({
                position: latLng,
                map: this.mapa
            });

            let contenido = `
                <p>Domicilio: ${calle} </p>
                <p>Precio Regular: $${regular} </p>
                <p>Precio Premium: $${premium} </p>
            `;
            let infoWindow = new google.maps.InfoWindow({
                content: contenido
            });

            marker.addListener('click', () => {
                if (infoWindowActivo){
                    infoWindowActivo.close();
                }
                
                infoWindow.open(this.mapa, marker);
                infoWindowActivo = infoWindow;
            });

        })
    }
    obtenerSugerencias(busqueda){
        this.api.obtenerDatos()
            .then(datos => {
                const resultados = datos.respuestaJSON.results;

                this.filtrarSugerencias(resultados, busqueda);
            })
    }

    filtrarSugerencias(resultados, busqueda){
        const filtro = resultados.filter( filtro => filtro.calle.indexOf(busqueda) !== -1 );
        
        this.inicializarMapa();
        this.mostrarPines(filtro);
    }
}