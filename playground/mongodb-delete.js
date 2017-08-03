// const MongoClient = require('mongodb').MongoClient;
const { MongoClient, ObjectID } = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
  if (err) {
    return console.log('Unable to connect to MongoDB server: 💩 ');
  }

  console.log('Connected to MongoDB server 💁 ');


  // deleteMany
  db.collection('Todos')
    .deleteMany({
      text: 'Eat dinner'
    })
    .then((result) => {
      console.log(result);
    });

  // deleteOne
  db.collection('Todos')
    .deleteOne({
      text: 'Eat dinner'
    })
    .then((result) => {
      console.log(result);
    });

  // findOneAndDelete
  db.collection('Todos')
    .findOneAndDelete({
      completed: false
    })
    .then((deletedItem) => {
      console.log(deletedItem);
    });

  db.collection('Users')
    .deleteMany({
      name: 'Priit Parl'
    });
  

  db.collection('Users')
    .findOneAndDelete({_id: new ObjectID('59832a5fcf956f50a00bf8e2')})
    .then((result) => {
      console.log(JSON.stringify(result, undefined, 2));
    });
    
  db.close();

});

// db.Todos.insertMany(
//   [
//     {
//       text: 'Eat dinner',
//       completed: false
//     },
//     {
//       text: 'Eat dinner',
//       completed: false
//     }
//   ]
// );

// db.Users.insertMany(
//   [
//     {
//       name: 'Where are you???',
//       age: 29,
//       location: 'Tallinn'
//     }
//   ]
// );