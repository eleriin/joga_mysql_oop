const BaseSQLModel = require('./base')

class AuthorModel extends BaseSQLModel{
    constructor(){
        super('author')
    }

    async findAuthorById(id){
        const author = await super.findById(id)
        return author;
    }
    async findAll(){
        const authors = await super.findAll()
        return authors;
    }
  
}
module.exports = AuthorModel