require('dotenv').config({ path: 'variables.env' });

const express = require('express');
const bodyParser = require('body-parser');
const _ = require('lodash');

const { mongoose } = require('./database/mongoose');
const { ObjectId } = require('mongodb');
const { Todo } = require('./models/todo');
const { User } = require('./models/user');

let app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

app.post('/todos', (req, res) => {
  const todo = new Todo({
    text: req.body.text
  });

  todo.save()
    .then((doc) => {
      res.send(doc);
    }, (err) => {
      res.status(400).send(err);
    });
});

app.get('/todos', (req, res) => {
  Todo.find()
    .then((todos) => {
      res.send({
        todos
      });
    }, (err) => {
      res.status(400).send(err);
    });
});

app.get('/todos/:id', (req, res) => {
  const id = req.params.id;

  if (!ObjectId.isValid(id)) {
    res.status(404).send();
  }

  Todo.findById(id)
    .then((todo) => {

      if (!todo) {
        res.status(404).send();
      }

      res.send({todo});

    })
    .catch(err => res.status(400).send());

});

app.delete('/todos/:id', (req, res) => {
  const todoId = req.params.id;

  if (!ObjectId.isValid(todoId)) {
    res.status(404).send();
  }

  Todo.findByIdAndRemove(todoId)
    .then((todo) => {
      if (!todo) {
        return res.status(404).send();
      }

      res.send({todo});
    })
    .catch(err => res.status(404).send());
});

app.patch('/todos/:id', (req, res) => {
  const todoId = req.params.id;
  const body = _.pick(req.body, ['text', 'completed']);

  if (!ObjectId.isValid(todoId)) {
    return res.status(404).send();
  }

  if (_.isBoolean(body.completed) && body.completed) {
    body.completedAt = new Date().getTime();
  } else {
    body.completed = false;
    body.completedAt = null;
  }

  Todo.findByIdAndUpdate(
    todoId,
    { $set: body },
    { new: true }
  )
  .then((todo) => {
    if (!todo) {
      return res.status(404).send();
    }

    res.send({todo});
  })
  .catch(err => res.status(400).send());


});

app.listen(port, () => {
  console.log(`Server running on ${port}`);
});

module.exports = { app };