const { ObjectId } = require('mongodb');
const { mongoose } = require('./../server/database/mongoose');
const { Todo } = require('./../server/models/todo');
const { User } = require('./../server/models/user');
const assert = require('assert');

Todo.remove({})
  .then((res) => {
    console.log(res);
  });

Todo.findOneAndRemove({
  _id: '59841e7d172f3782d6caad8a'
})
  .then((result) => {
    console.log(result);
  });

Todo.findByIdAndRemove('59841dfc172f3782d6caad89')
  .then((todo) => {
    console.log(todo);
  });