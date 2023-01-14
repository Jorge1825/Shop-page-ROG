const errorCtrl = {}

errorCtrl.renderError = (req,res)=>{
    res.locals.NavFooterActive = false
    res.render('404')
}



module.exports = errorCtrl