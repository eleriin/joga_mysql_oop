const express = require('express')
const router = express.Router()
const articleControllerClass = require('../controllers/articles')

const articleController= new articleControllerClass()

router.get('/article/',(req,res)=> articleController.getAllArticles(req, res)),
router.get('/article/:slug', (req,res)=>articleController.getAllArticleBySlug(req,res))
router.post('/article/create',(req,res)=> articleController.creteNewArticle(req,res));
router.patch('/article/edit/:id',(req,res)=> articleController.updateArticle(req,res));


module.exports = router