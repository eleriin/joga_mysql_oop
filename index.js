const express = require('express')
const bodyParser = require('body-parser')

const app= express()
app.use(bodyParser.urlencoded({ extended: false}))
app.use(bodyParser.json())


const articleRoutes = require('./routes/articles');
app.use('/', articleRoutes)

const authorRoutes = require('./routes/author');
app.use('/', authorRoutes)

app.listen(3012, () =>{
    console.log('Web server is connected')

})