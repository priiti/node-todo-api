require('./config/config');

const express = require('express');
const bodyParser = require('body-parser');
const _ = require('lodash');

const { mongoose } = require('./database/mongoose');
const { ObjectId } = require('mongodb');
const { Todo } = require('./models/todo');
const { User } = require('./models/user');
const { authenticate } = require('./middleware/authenticate');

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

app.post('/users', (req, res) => {
  const body = _.pick(req.body, ['email', 'password']);
  let user = new User(body);

  user.save()
    .then(() => {
      return user.generateAuthToken();
    })
    .then((token) => {
      res.header('x-auth', token).send(user);
    })
    .catch(err => {
      res.status(400).send(err);
    });

});

app.get('/users/me', authenticate, (req, res) => {
  res.send(req.user);
});

app.post('/users/login', (req, res) => {
  const { email, password } = req.body;
  
  User.findByCredentials(email, password)
    .then((user) => {
      return user.generateAuthToken()
        .then((token) => {
          res.header('x-auth', token).send(user);
        })
    })
    .catch((error) => {
      res.status(400).send();
    });

});

app.listen(port, () => {
  console.log(`Server running on ${port}`);
});

module.exports = { app };