const UsersCtrl = {};
const User = require('../models/User');
const passport = require('passport');



//renderizar el formulario de registro
UsersCtrl.renderSignUpForm = (req, res) => {
    res.locals.NavFooterActive = false
    res.render('users/signup');
}


//registrar un nuevo usuario
UsersCtrl.signUp = async (req, res) => {
    res.locals.NavFooterActive = false
    const errors = [];
    const {nameSignUp,
          phoneSignUp,
          nitSignUp,
          emailSignUp,
          passwordSignUp,
          password2SignUp,
          comboSignUp
          }= req.body


            const newUser = new User({
                nombre: nameSignUp,
                nit_empleado: nitSignUp,
                telefono: phoneSignUp,
                email:emailSignUp,
                password: passwordSignUp
                });
            //cifrar la contraseña
            newUser.password = await newUser.encrypPassword(passwordSignUp);

            await newUser.save();
            req.flash('success_msg','Usuario registrado');
            res.redirect('/users/signup');

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
    console.log(req.file)

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
}
 



module.exports = UsersCtrl;