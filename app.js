const express = require('express')
const config = require('config')
const mongoose = require('mongoose')
const cors = require('cors')

const app = express()
const PORT = config.get('port') || 5000
app.use(cors())
app.use(express.json({extended: true}))
app.use('/api/auth', require('./route/auth.routes'))
app.use('/api/books', require('./route/book.routes'))

async function start(){
    try {
        await mongoose.connect(config.get('mongoUri'), {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            // useCreateIndex: true,
        })
        app.listen(PORT, ()=>{
            console.log('start')
        })
    }
    catch (e){
        console.log(e.message)
        process.exit(1)
    }
}

start()