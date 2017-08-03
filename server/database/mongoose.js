const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect(process.env.DATABASE_URL);

mongoose.connection.on('error', error => console.log(JSON.stringify(error, undefined, 2)));

module.exports = {
  mongoose
};