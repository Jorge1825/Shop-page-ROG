const {Router}= require('express')
const router = Router()
const {renderIndex,redirectIndex} = require('../controllers/index.controller')
const Product = require('../models/Product')

router.get('/',renderIndex);

//NO OLVIDAR LAS RUTAS NO PROGRAMADAS



/* 
router.get('/upload', (req, res)=>{
    res.render('upload')
})

router.post('/upload', async (req, res)=>{
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
})
 */


module.exports = router