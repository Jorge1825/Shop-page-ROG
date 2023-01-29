const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/User');

const {check,validationResult} = require('express-validator')

passport.use( new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true//para pasar la solicitud req como un argumento adicional y asi acceder a los datos del body
}, async (req,email,password,done) => {
    
    if(email === "" || email === undefined || req.body.nit === "" || req.body.nit === undefined || password === "" || password === undefined ){
        return done(null,false,{message:'Datos invalidos'});
    }

    
    //confirmar si el email existe
    const user = await User.findOne({email:email})
    
    if(!user){
        return done(null,false,{message:'Credenciales no validas'});
    }else{
        //confirmar si la contraseña es correcta
        const match = await user.matchPassword(password);
        if(match && user.nit_empleado == req.body.nit){
            return done(null,user);
        }else{
            return done(null,false,{message:'Credenciales no validas'});
        }
    }

}))


passport.serializeUser((user,done) => {
    done(null,user.id);
})

passport.deserializeUser((id,done) => {
    User.findById(id,(err,user) => {
        done(err,user);
    })
})
