const bcrypt = require('bcrypt')
const UserModel = require('../models/users')

class UserController {
    constructor(){
        this.model = new UserModel()

        this.register= this.register.bind(this)
        this.login = this.login.bind(this)
        this.logout = this.logout.bind(this)
        this.showLogin = this.showLogin.bind(this)
        this.showRegister = this.showRegister.bind(this)
    }

    showLogin(req,res){
        res.render('login')
    }

    showRegister(req, res){
        res.render('register')
    }

    async register ( req,res){
        try{

            const existingUser = await this.model.findByUsername(req.body.username)

            if (existingUser){
                return res.render('register',{
                    msg: 'Username already exists'
                })
            }

            if (req.body.password.length < 6){
                return res.render('register',{
                    msg: 'Password must be at least 6 characters long'
                })
            }
            const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{6,}$/;

            if (!req.body.password.match(passwordRegex)){
                return res.render('register', {
                    msg:'Password must include uppercase, lowercase, number and special character'
                })
            }

            const cryptPassword = await bcrypt.hash(req.body.password, 10)

            const registeredUserId = await this.model.create({
                username: req.body.username,
                email: req.body.email,
                password: cryptPassword,
                role: 'user'
            })

            const userData = await this.model.findUserById(registeredUserId)

            req.session.user = {
                user_id: userData.id,
                username: userData.username,
                role: userData.role
            }

            return res.redirect('/')
        } catch( error){
            res.render('register', {msg: error.message})
        }
    }
    async login(req,res){
        try{
            const user = await this.model.findByUsername(req.body.username)

            if (!user){
                return res.render('login',{msg: 'username not exists'})
            }
            const passwordCompare = await bcrypt.compare(
                req.body.password,
                user.password
            )
            if (!passwordCompare){
                return res.render('login', { msg: 'password is incorrect'})
            }

            req.session.user= {
                user_id: user.id,
                username: user.username,
                role: user.role
            }
            return res.redirect('/')
        }catch ( error){
            res.render('login',{msg:error.message})
        }
    }
    logout(req,res){
        req.session.destroy(()=>{
            res.redirect('/')
        })
    }
}

module.exports = new UserController();
