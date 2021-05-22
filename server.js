'use strict';

const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

// setting up the server
const app = express();
const port = process.env.PORT || 7980;

app.use(cors());
app.use(express.json());

const userController = require('./controllers/user.controller');
const bookModel = require('./models/books.model');
const userModel = require('./models/users.model');

const mongoPort = process.env.MONGODB_URL || 'mongodb://127.0.0.1:27017/user'
mongoose.connect(
  `${mongoPort}`,
  { useNewUrlParser: true, useUnifiedTopology: true }
);


// userModel.seedUsersCollection();
// bookModel.seedBooksCollection();

app.get('/', (req, res) => {
  res.send('hello useless home page');
});

// getting email from the frontend to send static data:
app.get('/user', userController.getUserInfo);

// Adding data in the DB from the frontend:
app.post('/user', userController.createNewbook);

// deleting data from the dataBase:
app.delete('/user/:id', userController.deleteBooks);


app.put('/user/:index', userController.updateBookInfo);

app.listen(port, () => {
  console.log(`Serverinhio startado on ${port}`);
});
