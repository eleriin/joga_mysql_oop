const express = require('express')
const session = require('express-session')
const { engine } = require('express-handlebars')

const app= express()

app.use(express.json())
app.use(express.urlencoded({ extended: true}))
app.use(express.static('public'))

app.engine ('hbs', engine({extname:'.hbs',helpers:{eq: function (a,b){return a===b}}}))

app.set('view engine', 'hbs')
app.set('views','./views')


app.use(session({
    secret: 'thisismysecretkey',
    saveUninitialized: true,
    cookie:{maxAge: 1000* 60 * 60 *24},
    resave: false
}))

app.use((req,res, next)=>{res.locals.user = req.session.user; next()})

const articleRoutes = require('./routes/articles');
const authorRoutes = require('./routes/author');
const userRoutes = require('./routes/user')

app.use('/', articleRoutes)
app.use('/', authorRoutes)
app.use('/', userRoutes)


app.listen(3012, () =>{
    console.log('Web server is connected and started at http://localhost:3012')

})