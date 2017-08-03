const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/TodoApp');

mongoose.connection.on('error', error => console.log(JSON.stringify(error, undefined, 2)));

module.exports = {
  mongoose
};