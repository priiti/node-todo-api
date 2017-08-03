// const MongoClient = require('mongodb').MongoClient;
const { MongoClient, ObjectID } = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
  if (err) {
    return console.log('Unable to connect to MongoDB server: 💩 ');
  }

  console.log('Connected to MongoDB server 💁 ');

  db.collection('Todos')
    .findOneAndUpdate(
      { _id: new ObjectID('59823e7b1db31962cad9b6ce') }, // filter
      { $set: { completed: true, text: 'Go to the gym (or just skating)' } }, // actions
      { returnOriginal: false } // options
    )
    .then((result) => {
      console.log(result);
    });

  db.collection('Users')
    .findOneAndUpdate(
      { _id: new ObjectID('59832a5fcf956f50a00bf8e2') },
      { 
        $set: { name: 'Priit Parl' }, 
        $inc: { age: -1 }
      },
      { returnOriginal: false }
    )
    .then((result) => {
      console.log(result);
    });

  db.close();

});

// For data insertion

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