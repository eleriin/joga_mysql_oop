const express = require('express')
const router = express.Router()
const articleControllerClass = require('../controllers/articles')

const articleController= new articleControllerClass()

router.get('/',(req,res)=> articleController.getAllArticles(req, res)),
router.get('/article/:slug', (req,res)=>articleController.getAllArticleBySlug(req,res))

module.exports = router