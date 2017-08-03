// const MongoClient = require('mongodb').MongoClient;
const { MongoClient, ObjectID } = require('mongodb');
const assert = require('assert');
const databaseURL = 'mongodb://localhost:27017/TodoApp';
const log = console.log;

const databaseConnection = (url) => {
  return new Promise((resolve, reject) => {
    MongoClient.connect(url, (err, db) => {
      if (err) {
        return reject(JSON.stringify(err, undefined, 2));
      }
      log('Connected to MongoDB server 💁 ');
      resolve(db);
    });
  });
};


const findTodoFromDatabase = (db, searchCriterias) => {
  return new Promise((resolve, reject) => {
    db.collection('Todos')
      .find(searchCriterias)
      .toArray()
      .then((documents) => {
        resolve(documents);
      }, err => reject(err));
  });
};

const countTodos = (db) => {
  return new Promise((resolve, reject) => {
    db.collection('Todos')
      .find()
      .count()
      .then((count) => {
        resolve(count);
      });
  }, err => reject(err));
};

const getTodoItems = async (criterias) => {
  try {
    const db = await databaseConnection(databaseURL);
    const todoCount = await countTodos(db);
    const todos = await findTodoFromDatabase(db, criterias);

    log(`Total of todos: ${todoCount}`);
    log(`Todos:`);
    log(JSON.stringify(todos, undefined, 2));
 
    db.close();
  } catch (error) {
    log(error);
    db.close();
  }
};

const crit = {
  _id: new ObjectID('59823e7b1db31962cad9b6ce')
};

function search() {
  try {
    getTodoItems(crit);
  } catch (error) {
    log(error);
  }
}

search();