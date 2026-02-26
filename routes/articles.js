const express = require('express')
const router = express.Router()
const articleControllerClass = require('../controllers/articles')
const { requireRole } = require('../utils/auth')

const articleController = new articleControllerClass()

router.get('/', (req,res)=>{res.redirect('/articles')})

router.get('/articles/create',
    requireRole('admin'),
    articleController.showCreater
)

router.post('/articles/create',
    requireRole('admin'),
    articleController.createNewArticle
)

router.get('/articles',
    articleController.getAllArticles
)

router.get('/articles/:slug',
    articleController.getAllArticleBySlug
)

router.post('/articles/update/:id',
    requireRole('admin'),
    articleController.updateArticle
)

router.post('/articles/delete/:id',
    requireRole('admin'),
    articleController.deleteRows
)

module.exports = router
