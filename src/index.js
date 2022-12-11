//importar dotenv para cifrar datos usando variables de entorno
require('dotenv').config()


const app = require('./server');
require('./database')



//iniciar la escucha del servidor obteniendo el puerto
app.listen(app.get('port'), ()=>{
    console.log('Server is listening on port: ', app.get('port'));
})