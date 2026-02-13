const authorDbModel = require('../models/author')
const articleDbModel = require('../models/article');

const authorModel = new authorDbModel();
const articleModel = new articleDbModel();

class authorControllerClass{
    constructor(){
        const authors = []
    }
    async getAuthorById(req, res){
        const author = await authorModel.findById(req.params.id)
        const articles = await articleModel.findMany(author.id)
        author['articles'] = articles
        author['articleCount'] = articles.length
        res.status(201).json({author:author})
    }
    async getAllAuthors(req, res){
        const authors = await authorModel.findAll()
        res.status(201).json({authors: authors})
    }
    
}

module.exports = authorControllerClass