require('dotenv').config({ path: '.env' });

if (process.env.NODE_ENV === 'development') {
  process.env.MONGODB_URI = process.env.DEVELOPMENT_DATABASE;
} else if (process.env.NODE_ENV === 'test') {
  process.env.MONGODB_URI = process.env.TEST_DATABASE;
}