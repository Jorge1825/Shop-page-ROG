const mongoose = require('mongoose')

const MONGODB_URL = process.env.MONGODB_URL

//conectar a mongo atlas y configurar
mongoose.connect(MONGODB_URL,{
    useNewUrlParser: true,
    useUnifiedTopology: true

})
    .then(db => console.log('DB is connected'))
    .catch(err => console.log(err))