const UsersCtrl = {};
const User = require('../models/User');
const passport = require('passport');
const {validationResult} = require('express-validator');



//renderizar el formulario de registro
UsersCtrl.renderSignUpForm = async (req, res) => {
    res.locals.NavFooterActive = false
    const users = await User.find().lean(); //lean() sirve para convertir el objeto en un json y poderlo manipular
    
    //convertir createdAt a una fecha legible y corta 
    users.forEach(user => {
        user.createdAt = user.createdAt.toLocaleDateString('es-ES', {year: 'numeric', month: 'long', day: 'numeric'});
        user.estado = user.estado == 0 ? 'Activo' : 'Inactivo';
    });
    
    

    const countUsers = users.length;
    
    res.render('users/signup',{users, countUsers});

}


//registrar un nuevo usuario
UsersCtrl.signUp = async (req, res) => {
    res.locals.NavFooterActive = false
    const errors = validationResult(req);

    const {nameSignUp,
          phoneSignUp,
          nitSignUp,
          emailSignUp,
          passwordSignUp,
          password2SignUp,
          comboSignUp
          }= req.body



    if(!errors.isEmpty()){
        res.render('users/signup',{
            errors: errors.array(),
            nameSignUp,
            phoneSignUp,
            nitSignUp,
            emailSignUp,
            passwordSignUp,
            password2SignUp,
            comboSignUp
        });

    }else{
        try{
            const newUser = new User({
                nombre: (nameSignUp).toUpperCase(),   
                nit_empleado: (nitSignUp).toUpperCase().replace(/\s/g, ""),
                telefono:(phoneSignUp).toString().replace(/\s/g, ""),
                email:(emailSignUp).toLowerCase().replace(/\s/g, ""),
                password: passwordSignUp
                });
            //cifrar la contraseña
            newUser.password = await newUser.encrypPassword(passwordSignUp);

            await newUser.save();
            req.flash('success_msg','Usuario registrado');
            res.redirect('/users/signup');
            
        }catch(err){
            req.flash('error_msg','Ha ocurrido un error al registrar el usuario');
            res.redirect('/users/signup');
        }
            
    }

}


//renderizar el formulario de inico de sesion
UsersCtrl.renderSignInForm = (req, res) => {
    res.locals.NavFooterActive = false
    res.render('users/signin');
}


//logiar un usuario
UsersCtrl.signin = passport.authenticate('local',{
    failureRedirect:'/users/signin',
    successRedirect:'/users/upload',
    failureFlash:true
})


//cerrar sesion
UsersCtrl.logout = (req, res) => {
    req.logout((err) =>{
        req.flash('success_msg','Sesion cerrada');
        res.redirect('/users/signin');
    });
    
    
}




UsersCtrl.renderUpload=(req, res)=>{
    res.locals.NavFooterActive = false
    res.render('users/upload')
}

UsersCtrl.sendUpload=async (req, res)=>{
    

    try{
    const product = new Product({
        name: req.body.name,
        marca: req.body.marca,
        modelo: req.body.modelo,
        precio: req.body.precio,
        caracteristicas: req.body.caracteristicas,
        image: {
            filename: req.file.filename,
            path: '/img/uploads/'  + req.file.filename,
            mimetype: req.file.mimetype,
            size: req.file.size
        },
        stock: req.body.stock
    })

    
    await product.save()
    res.redirect('/upload')

    }catch(err){
        req.flash('error_msg','Ha ocurrido un error al registrar el producto');
        res.redirect('/upload');
    }
}
 



UsersCtrl.renderHome=(req, res)=>{
    res.locals.NavFooterActive = false
    res.render('users/home')
}



module.exports = UsersCtrl;