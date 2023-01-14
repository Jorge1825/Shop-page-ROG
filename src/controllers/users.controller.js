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
    const {name, email,password,confirm_password}= req.body

    if(password!=confirm_password){
        errors.push({text:'Las contraseñas no coinciden'});
    }
    if(password.length<4){
        errors.push({text:'La contraseña debe tener al menos 4 caracteres'});
    }
    if(errors.length>0){
        res.render('users/signup',{errors,name,email,password,confirm_password});
    }else{
        
        const emailUser = await User.findOne({email:email})

        if(emailUser){
            
            req.flash('error_msg','El correo ya esta en uso');
            //enviar los datos del formulario para que no se pierdan
            res.redirect('/users/signup');
        }else{
            const newUser = new User({name,email,password});
            //cifrar la contraseña
            newUser.password = await newUser.encrypPassword(password);
            await newUser.save();
            req.flash('success_msg','Usuario registrado');
            res.redirect('/users/signin');
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
    successRedirect:'/notes',
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