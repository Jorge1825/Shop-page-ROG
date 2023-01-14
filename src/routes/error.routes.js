const {Router}= require('express')
const router = Router()
const {renderError} = require('../controllers/error.controller')


router.get('*',renderError);



module.exports = router