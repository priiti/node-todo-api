const sha256 = require('crypto-js/sha256');
const jwt = require('jsonwebtoken');

const data = {
  id: 10
};

const token = jwt.sign(data, '123abc');
console.log(token);

const decoded = jwt.verify(token, '123abc');
console.log(JSON.stringify(decoded, undefined, 2));

// let message = 'I am user number 3';
// let hash = sha256(message).toString();

// console.log(`Message: ${message}, hash: ${hash}`);

// const data = {
//   id: 4
// };

// const token = {
//   data,
//   hash: sha256(JSON.stringify(data) + 'somesecret').toString()
// };


// token.data.id = 5;
// token.hash = sha256(JSON.stringify(token.data)).toString();


// const resultHash = sha256(JSON.stringify(token.data) + 'somesecret').toString();

// if (resultHash === token.hash) {
//   console.log('Data was not changed!');
// } else {
//   console.log('Data was changed, do not trust');
// }

// const crypto = require('crypto');
// const secret = 'bigsecret';
// const message = 'I am the message';
// const hash = crypto.createHmac('sha256', secret)
//   .update('I love cupcakes')
//   .digest('hex');

// console.log(hash);