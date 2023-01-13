const helpers = {};

helpers.isAuthenticated = (req, res, next) => {

    //usando passport para verificar si el usuario esta autenticado con el fin de proteger las rutas
    if (req.isAuthenticated()) {
        return next();
    }
    req.flash('error_msg', 'Not Authorized');
    res.redirect('/users/signin');
}


module.exports = helpers;