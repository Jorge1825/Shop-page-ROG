
const usersValidator = {};
const User = require('../models/User');
const {body} = require('express-validator');


usersValidator.validateSignUp = ()=>{
    return[
        body('nameSignUp', 'El nombre es requerido')
        .notEmpty(),
        
        body('phoneSignUp', 'El telefono debe tener 5 caracteres y debe ser positivo')
        .isLength({min: 5})
        .isInt({min: 0})
        .custom(async (value, {req}) => {
            const user = await User.findOne({telefono:req.body.phoneSignUp})
            if(user){
                return Promise.reject('El telefono ya esta registrado')
            }
        }),

        body('nitSignUp', 'El nit debe tener 5 caracteres')
        .isLength({min: 5})
        .custom(async (value, {req}) => {
            const user = await User.findOne({nit:req.body.nitSignUp})
            if(user){
                return Promise.reject('El nit ya esta registrado')
            }
        }),

        /* the email must be a valid email and not be registered in the database */
        body('emailSignUp', 'El email no es valido')
        .isEmail()
        .custom(async (value, {req}) => {
            const user = await User.findOne({email:req.body.emailSignUp})
            if(user){
                return Promise.reject('El email ya esta registrado')
            }
        }),
    
         /* the password must be at least 8 characters long, have at least one uppercase letter, one lowercase letter, one number and one special character */
        body('passwordSignUp', 'La contraseña debe tener al menos 8 caracteres, una mayuscula, una minuscula, un numero y un caracter especial')
        .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/),
    
        /* the confirmation password must be the same as the password */
        body('password2SignUp', 'Las contraseñas no coinciden')
        .custom((value, {req}) => value == req.body.passwordSignUp),
    
        body('comboSignUp', 'Debe seleccionar un estado de cuenta valido')
        .custom(value => value == '0' || value == '1')

    ]
}
   


usersValidator.validateUpload = ()=>{
    
    


}







module.exports = usersValidator;