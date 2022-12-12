const exphbs = require('express-handlebars') //motor de plantillas
const express = require('express') 
const path = require('path')
const morgan = require('morgan') //mostrar peticiones en consola
const multer = require('multer') //para subir archivos
const uuid = require('uuid').v4 //para generar id unicos
const methodOverride = require('method-override') //para poder usar metodos put y delete
const flash = require('connect-flash') //para mostrar mensajes
const session = require('express-session') //para guardar datos de sesion
const passport = require('passport') //para autenticar usuarios

//iniciar express
const app = express();


/* require('./config/passport') //configurar passport */


//configuracion
    //configurar puerto pensando en el despliegue
    app.set('port', process.env.PORT || 4000);
    //configurar el motor de plantillas abarcando todos los sistemas operativos
    app.set('views', path.join(__dirname, 'views'));

    //configurar el motor de plantillas
    app.engine('.hbs', exphbs.engine({
        defaultLayout: 'main',
        runtimeOptions: {
                  allowProtoPropertiesByDefault: true,
                  allowProtoMethodsByDefault: true,
                },
        layoutsDir: path.join(app.get('views'), 'layouts'),
        partialsDir: path.join(app.get('views'), 'partials'),
        extname: '.hbs'
    }));

    app.set('view engine', '.hbs')


//middlewares, es decir funciones para ejecutar cuando llegan peticiones
    //convertir datos recibidos del servidor a objeetos json
    app.use(morgan('dev')); //para mostrar peticiones en consola
    app.use(express.urlencoded({extended:false})); //para poder recibir datos de formularios
    
    const storage = multer.diskStorage({
        destination: path.join(__dirname, 'public/img/uploads'),
        filename: (req, file, cb, filename) => {
            cb(null, uuid() + path.extname(file.originalname)) //generar id unico y concatenarle la extension del archivo
        }
    }) //para subir archivos y guardarlos en una carpeta y generar id unico


    app.use(multer({storage: storage}).single('image')) //para subir archivos y guardarlos en una carpeta


    app.use(methodOverride('_method')); //para poder usar metodos put y delete

    //configurar la sesion
    app.use(session({
        secret: 'secret',
        resave: true,
        saveUninitialized: true
    }));

    //configurar passport
    app.use(passport.initialize());
    app.use(passport.session());

    //configurar flash
    app.use(flash());



    


//variables globales
    //para poder usar mensajes en cualquier parte de la aplicacion
 /*    app.use((req, res, next)=>{
        res.locals.success_msg = req.flash('success_msg');
        res.locals.error_msg = req.flash('error_msg');
        //error de passport
        res.locals.error = req.flash('error');

        //para saber si el usuario esta logeado y con esto poder mostrar el menu logout o no
        res.locals.user = req.user || null;
        next();
    }) */


//rutas
    

    app.use(require('./routes/index.routes'));
/*     app.use(require('./routes/notes.routes'));
    app.use(require('./routes/users.routes')); */


//archivos estaticos
    //configurar la carpeta publica
    app.use(express.static(path.join(__dirname, 'public')));



//exportar el modulo de express para el server
module.exports = app;