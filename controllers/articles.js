const articleDbModel = require('../models/article')
const articleModel = new articleDbModel();

class articleController{
    constructor(){
        const articles = []
    }
    async getAllArticles(req, res){
        const articles = await articleModel.findAll()
        res.render('index',{articles: articles})
    }
    async getAllArticleBySlug(req,res){
        const article = await articleModel.findOne(req.params.slug)
        res.render('article', { article})
    }
    async createNewArticle(req,res){
        const newArticle = {
            name: req.body.name,
            slug: req.body.slug,
            image: req.body.image,
            body: req.body.body,
            published: new Date().toISOString().slice(0, 19).replace('T',' '),
            author_id: req.body.author_id
        }
        const articleId = await articleModel.create(newArticle)
        
        return res.redirect('/articles')
    }
    async showCreater(req,res){
        res.render('article-create')
    }

    async updateArticle(req,res){
        try {
            const id = req.params.id

            const excistingArticle = await articleModel.findById(id)
            if (!excistingArticle){
                return res.status(404).json({
                    message: `Article with id ${id} not found`
                })
            }

            const updateData = {
                name: req.body.name,
                slug: req.body.slug,
                image: req.body.image,
                body: req.body.body,            
                published: new Date().toISOString().slice(0, 19).replace('T',' ') ,          
                author_id: req.body.author_id
            }
            const updatedArticle = await articleModel.update(id, updateData)
            res.status(201).json({
                message: `Updated article with id ${updatedArticle}`,
                article: {id: updatedArticle, ...updateData}
            })
        } catch (error){
            res.status(500).json({
                message: error.message
            })
        }
        
    }
    
    async deleteRows (req, res){
        try{
            const id = req.params.id
            
            const excistingArticle = await articleModel.findById(id)
                if (!excistingArticle){
                    return res.status(404).json({
                        message: `Article with id ${id} not found`
                    })
                }

                const deletedRows = await articleModel.delete(id)
                res.status(201).json({
                    message:`Article with id ${id} deleted successfully`
                })
        } catch (error){ 
            res.status(500).json({
                message: error.message
            })
        }
    }

}

module.exports = articleController