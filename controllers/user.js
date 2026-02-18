const bcrypt = require ('bcrypt')
const userDbModel = require('../models/users')
const userModel = new userDbModel()

class userControllerClass {
    async register(req,res){
        try{
            const { username, email, password } = req.body

            const existingUser = await userModel.findByEmail(email)
            if (existingUser){
                return res.status(400).json({message:'Email is already registered'})
            }
            if(password.length < 6){
                return res.status(400).json({message: 'Password must be at least 6 charaters long'})
            }

            const passwordRegex = /^(?=.*[A-Z])(?=.*\d).+$/;
            if (!passwordRegex.test(password)) {
                return res.status(400).json({ message: 'Password must contain at least one uppercase letter and one number' });
            }
            
            const cryptPassword = await bcrypt.hash(password, 10)
            const registeredId = await userModel.create({
                username, 
                email,
                password: cryptPassword
            })

        
            if (registeredId){
                const userData = await userModel.findUserById(registeredId)
                req.session.user = {
                    username: userData.username, 
                    user_id: userData.id
                }
                return res.status(201).json({
                    message: 'New user is registered',
                    user_session: req.session.user
                })
            }
        } catch (error){
            res.status(500).json({message: error.message})
        }
    }
    async findUserById (username){
        const user = await super.findOne('username', username)
        return user
    }
    async login(req,res){
        const {username, password} = req.body
        
        const user = await userModel.findByUsername(username)
        if(!user){
            return res.status(404).json({message: 'User not found'})
        }
        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch){ 
            return res.status(400).json({message: 'Invalid password'})
        }
        req.session.user = {
            username: user.username, 
            user_id: user.id
        }
        res.json({
            message: 'Login successful',
            user_session: req.session.user
        })
    }
}

module.exports = userControllerClass