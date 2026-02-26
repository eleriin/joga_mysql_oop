const express = require('express');
const UserController = require('../controllers/user');

const router = express.Router()

router.get('/users/register',(req, res)=> res.render('register'))
router.post('/users/register',UserController.register)
router.get('/users/login',(req,res)=>res.render('login'))
router.post('/users/login', UserController.login)
router.get('/users/logout',UserController.logout)


module.exports = router