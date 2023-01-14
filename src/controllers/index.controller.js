const indexCtrl = {}

indexCtrl.renderIndex = (req,res)=>{
    res.locals.NavFooterActive = true
    res.render('index')
}



module.exports = indexCtrl