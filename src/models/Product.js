//definir lo que se va a guardar en la base de datos sobre notas
const {Schema,model} = require('mongoose')




const ImageSquema = new Schema({
    filename: {
        type: String,
        required: true
    },
    path: {
        type: String,
        required: true
    },
    mimetype: {
        type: String,
        required: true
    },
    size: {
        type: Number,
        required: true
    }
})


const ProductSquema = new Schema({
    name: {
        type: String,
        required: true
    },
    marca:{
        type: String,
        required: true
    },
    modelo:{
        type: String,
        required: true
    },
    precio:{
        type: Number,
        required: true
    },
    caracteristicas:{
        //pasar a un array
        type: String,
        required: true
    },
    //crear otro json para las imagenes donde se guarde el nombre de la imagen, el nombre original y la ruta
    image: ImageSquema,

    stock:{
        type: Number,
        required: true
    },
    
},{
    //propiedad para crear la fecha de creacion y de actualizacion actuamaticamnete
    timestamps: true
})




module.exports = model('Product', ProductSquema);