//definir lo que se va a guardar en la base de datos sobre Usuarios

const {Schema,model} = require('mongoose')
const bcryp = require('bcryptjs')


//crear schema 
const UserSquema = new Schema({
    nombre: {
        type: String,
        required: true
    },
    nit_empleado:{
        type:String,
        requerid:true,
        unique: true,
        trim: true
    },
    telefono:{
        type:String,
        requerid:true,
        unique: true,
        trim: true
    },
    email:{
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    password:{
        type: String,
        required: true
    },
    estado:{
        type:Number,
        default:0
    }
    
},{
    //propiedad para crear la fecha de creacion y de actualizacion actuamaticamnete
    timestamps: true
});


//metodo para cifrar la contraseña de forma asyncrona
UserSquema.methods.encrypPassword = async password =>{
    //usar bcryp para cifrar los datos sencibles como la contraseña
    const salt = await bcryp.genSalt(10)
    return await bcryp.hash(password,salt)
};


//metodo para comparar la contraseña cifrada con la que se recibe 
UserSquema.methods.matchPassword = async function(password) {

    //retorna un true si las contraseñas son iguales de lo contrario un false
    return await bcryp.compare(password, this.password)

}


module.exports = model('User', UserSquema);