require('./config/config');

const express = require('express');
const bodyParser = require('body-parser');
const _ = require('lodash');

const { mongoose } = require('./database/mongoose');
const { ObjectId } = require('mongodb');
const { Todo } = require('./models/todo');
const { User } = require('./models/user');
const { authenticate } = require('./middleware/authenticate');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

app.post('/todos', authenticate, async (req, res) => {
  try {
    const todo = new Todo({
      text: req.body.text,
      _creator: req.user._id
    });

    const newTodo = await todo.save();

    res.send(newTodo);
  } catch (error) {
    res.status(400).send(error);
  }
});

app.get('/todos', authenticate, async (req, res) => {
  try {
    const todos = await Todo.find({
      _creator: req.user._id
    });

    res.send({ todos });

  } catch (error) {
    res.status(400).send(err);
  }
});

app.get('/todos/:id', authenticate, async (req, res) => {
  try {
    const todoId = req.params.id;

    if (!ObjectId.isValid(todoId)) {
      res.status(404).send();
    }

    const todo = await Todo.findOne({
      _id: todoId,
      _creator: req.user._id
    });

    if (!todo) {
      throw new Error();
    }

    res.send({todo});
  } catch (error) {
    res.status(404).send();
  }
});

app.delete('/todos/:id', authenticate, async (req, res) => {
  try {
    const todoId = req.params.id;

    if (!ObjectId.isValid(todoId)) {
      throw new Error();
    }

    const todo = await Todo.findOneAndRemove({
      _id: todoId,
      _creator: req.user._id
    });

    if (!todo) {
      throw new Error();
    }

    res.send({ todo });
  } catch (error) {
    res.status(404).send()
  }
});

app.patch('/todos/:id', authenticate, async (req, res) => {
  try {
    const todoId = req.params.id;
    const body = _.pick(req.body, ['text', 'completed']);

    if (!ObjectId.isValid(todoId)) {
      throw new Error();
    }

    if (_.isBoolean(body.completed) && body.completed) {
      body.completedAt = new Date().getTime();
    } else {
      body.completed = false;
      body.completedAt = null;
    }

    const todo = await Todo.findOneAndUpdate(
      { _id: todoId, _creator: req.user._id },
      { $set: body },
      { new: true }
    );

    if (!todo) {
      throw new Error();
    }

    res.send({todo});
  } catch (error) {
    res.status(404).send();
  }
});

app.post('/users', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = new User({ email, password });
    
    await user.save();
    const token = await user.generateAuthToken();
    res.header('x-auth', token).send(user);
  } catch (error) {
    res.status(400).send(error);
  }
});

app.get('/users/me', authenticate, async (req, res) => {
  try {
    res.send(req.user);
  } catch (error) {
    res.status(404).send();
  }
});

app.post('/users/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findByCredentials(email, password);
    const token = await user.generateAuthToken();

    res.header('x-auth', token).send(user);
  } catch (error) {
    res.status(400).send();
  }
});

app.delete('/users/me/token', authenticate, async (req, res) => {
  try {
    await req.user.removeToken(req.token);
    
    res.status(200).send();
  } catch (error) {
    res.status(400).send();
  }
});

app.listen(port, () => {
  console.log(`Server running on ${port}`);
});

module.exports = { app };