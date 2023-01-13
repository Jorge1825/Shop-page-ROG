const indexCtrl = {}

indexCtrl.renderIndex = (req,res)=>{
    res.render('index')
}
indexCtrl.redirectIndex = (req,res)=>{
    res.redirect('/')
}




module.exports = indexCtrl