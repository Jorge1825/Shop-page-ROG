const {Router} = require('express');
const router = Router();

const {
    renderSignUpForm,
    signUp,
    renderSignInForm,
    signin,
    logout, 
    renderUpload,
    sendUpload
    } = require('../controllers/users.controller');


//renderizar el formulario de registro
router.get('/users/signup', renderSignUpForm);
router.post('/users/signup', signUp);

//renderizar el formulario de inico de sesion
router.get('/users/signin', renderSignInForm);
router.post('/users/signin', signin);

//cerrar sesion
router.get('/users/logout', logout);



//Upload de nuevos productos
router.get('/users/upload', renderUpload)

router.post('/users/upload',sendUpload)
 


module.exports=  router;