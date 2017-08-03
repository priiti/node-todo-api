const { ObjectId } = require('mongodb');
const { mongoose } = require('./../server/database/mongoose');
const { Todo } = require('./../server/models/todo');
const { User } = require('./../server/models/user');
const assert = require('assert');

// const id = '598384c4dfb9edb9169e22d411';

// if (!ObjectId.isValid(id)) {
//   console.log('ID not valid');
// }

// Todo.find({
//   _id: id
// }).then((todos) => {
//   console.log('Todos\n', todos);
// });

// Todo.findOne({
//   _id: id
// }).then((todo) => {
//   console.log('Todo\n', todo);
// }).catch(e => console.log(e));

// Todo.findById(id)
//   .then((todo) => {
//     if (!todo) {
//       return console.log('Id not found!');
//     }

//     console.log('Todo by id\n', todo);
// })
//   .catch(e => console.log(e));

const userId = '59834196f85d1215074e7c42';

User.findById(userId)
  .then((user) => {
    if (!user) {
      return console.log('Unable to find user');
    }
    console.log(JSON.stringify(user, undefined, 2));
  })
  .catch((err) => console.log(err));