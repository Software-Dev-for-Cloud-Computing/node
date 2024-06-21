const app = require('./app');
const mongoose = require('mongoose');
require('dotenv').config();

const PORT = process.env.PORT || 5001;
const NODE_ENV = process.env.NODE_ENV || 'development';

let DB_USER, DB_PASSWORD, DB_HOST, DB_PORT, DB_NAME, DB_URI;

if (NODE_ENV === 'production') {
  DB_USER = process.env.PROD_DB_USER;
  DB_PASSWORD = process.env.PROD_DB_PASSWORD;
  DB_HOST = process.env.PROD_DB_HOST;
  DB_PORT = process.env.PROD_DB_PORT;
  DB_NAME = process.env.PROD_DB_NAME;
  DB_URI = `mongodb://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}?ssl=true&replicaSet=globaldb&retrywrites=false&maxIdleTimeMS=120000&appName=@${DB_USER}@`;
} else {
  DB_USER = process.env.DEV_DB_USER;
  DB_PASSWORD = process.env.DEV_DB_PASSWORD;
  DB_HOST = process.env.DEV_DB_HOST;
  DB_PORT = process.env.DEV_DB_PORT;
  DB_NAME = process.env.DEV_DB_NAME;
  DB_URI = `mongodb://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}`;
}

console.log(`Connecting to MongoDB at ${DB_URI}`);

mongoose.connect(DB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Connected to MongoDB');
  if (require.main === module) {
    app.listen(PORT, 'localhost', () => {
      console.log(`Server running on port ${PORT}`);
    });
  }
}).catch(err => {
  console.error('Failed to connect to MongoDB', err);
});
