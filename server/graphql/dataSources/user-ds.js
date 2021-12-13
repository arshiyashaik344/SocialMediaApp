const { MongoDataSource } = require('apollo-datasource-mongodb');

class Users extends MongoDataSource {

  getUser(userName) {
    return this.model.findOne({ username :  userName });
  }

  createUser(user) {
       return this.model.create(user);
  }
}


module.exports = Users;

