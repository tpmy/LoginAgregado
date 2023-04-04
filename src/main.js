import express from 'express'
import session from 'express-session'
import MongoStore from 'connect-mongo'
import mongoose from 'mongoose'
import handlebars from 'express-handlebars'

import viewsRouter from './routes/view.router.js'
import apiRouter from './routes/api.router.js'
import { mongodbCnxStr } from './config/mongodb.js.js'

await mongoose.connect(mongodbCnxStr)

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('./public'))
app.use(session({
    store: new MongoStore({
        mongoUrl: mongodbCnxStr,
        ttl: 3600
    }),
    secret: "CoderSecretSHHHHH",
    resave: false,
    saveUninitialized: false
}))

app.engine('handlebars', handlebars.engine())
app.set('views', './views')
app.set('view engine', 'handlebars')

app.use('/', viewsRouter)
app.use('/api', apiRouter)

app.listen (puerto, () => {console.log(`conectado a ${puerto}`);})