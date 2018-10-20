class API {
    async obtenerDatos(){
        const datos = await fetch('http://api.datos.gob.mx/v1/precio.gasolina.publico');

        const respuestaJSON = await datos.json();

        return {
            respuestaJSON
        }

    }
}