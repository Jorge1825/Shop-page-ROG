//importar dotenv para cifrar datos usando variables de entorno
require('dotenv').config()


try{
    //importar el servidor
    const app = require('./server');
    //importar la base de datos
    require('./database')
    //iniciar la escucha del servidor obteniendo el puerto
    app.listen(app.get('port'), ()=>{
        console.log('Server is listening on port: ', app.get('port'));
    })

}catch(error){
    console.log("No se pudo iniciar el servidor", error);
}