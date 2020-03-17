const mongoose = require('mongoose');

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.mongoConnection = mongoose.connect(
      'mongodb://localhost:27017/formarechat',
      {
        useCreateIndex: true,
        useNewUrlParser: true,
        useFindAndModify: true,
        useUnifiedTopology: true,
      }
    );
    this.connection = mongoose.connection;
    this.connection.once('open', () => {
      console.log('MongoDb connected');
    });
  }
}

module.exports = new Database();
