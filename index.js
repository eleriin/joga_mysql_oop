const express = require('express')
const session = require('express-session')

const app= express()
app.use(express.json())
app.use(express.urlencoded({ extended: true}))

app.use(session({
    secret: 'thisismysecretkey',
    saveUninitialized: true,
    cookie:{maxAge: 1000* 60 * 60 *24},
    resave: false
}))

const articleRoutes = require('./routes/articles');
const authorRoutes = require('./routes/author');
app.use('/', articleRoutes)
app.use('/', authorRoutes)

const userRoutes = require('./routes/user')
app.use('/', userRoutes)

app.listen(3012, () =>{
    console.log('Web server is connected and started at http://localhost:3012')

})