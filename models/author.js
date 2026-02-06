const BaseSQLModel = require('./base')

class AuthorModel extends BaseSQLModel{
    constructor(){
        super('author')
    }

    async findById(id){
        const author = await this.findOne({id})
        return author;
    }
    async findAll(){
        const authors = await super.findAll()
        return authors;
    }
    async findAllByAuthor(authorId){
        const ArticleModel = require('./author')
        const articleModel = new ArticleModel()

        const articles = await articleModel.findMany({author_id: authorId})
        return articles;
    }
}
module.exports = AuthorModel