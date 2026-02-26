const BaseSQLModel = require('./base');

class UserModel extends BaseSQLModel{
    constructor(){
       super('users'); 
    }
    async findAll(){
        const users = await super.findAll()
        return users;
    }
    async findUserById(id){
        const user = await super.findById(id)
        return user;
    }
    async findByUsername(username){
        const user = await super.findOne('username',username)
        return user;
    }
    async create(user){
        user.role = user.role || 'user'
        const createUserId = await super.create(user)
        return createUserId
    }
    async update(userId, updateUserData){
        const updateUser = await super.update(userId, updateUserData)
        return updateUser
    }
    async delete(id){
        const deletedRows = await super.delete(id)
        return deletedRows
    }
    async findByEmail(email){
        const user = await super.findOne('email', email)
        return user
    }
}

module.exports = UserModel