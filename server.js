const express = require('express')

const app = express()

const authRoutes = require('./routes/auth')
const homeRoutes = require('./routes/home')
const courseRoutes = require('./routes/course')
const imageRoutes = require('./routes/image')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const cors = require('cors')
const mongoose = require('mongoose')


require('dotenv').config()



// connectDB

mongoose.connect(process.env.DATABASE_CLOUD,{ useNewUrlParser: true, useUnifiedTopology: true })
.then(()=> console.log('connected DB'))
.catch((e)=> {console.log(e)})
// middlewares
app.use(morgan('dev'))
app.use(bodyParser.json())
app.use(cors())

app.use('/api', homeRoutes)
app.use('/api', courseRoutes)
app.use('/api', imageRoutes)



const port = process.env.PORT ||  80;



app.listen(port, ()=> {
    console.log( `api is running on port ${port}`)
} )

