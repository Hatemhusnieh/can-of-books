'use strict';

const express = require('express');
const app = express();

const cors = require('cors');
app.use(cors());
// defining a middleware for our data base usage 
app.use(express.json());

const mongoose = require('mongoose');
require('dotenv').config();
// setting up the server
const port = process.env.PORT || 7980;



const userController = require('./controllers/user.controller');
// requiring models to use their functions that fill the data base 
const bookModel = require('./models/books.model');
const userModel = require('./models/users.model');

const mongoPort = process.env.MONGODB_URL || 'mongodb://127.0.0.1:27017/user'
mongoose.connect(
  `${mongoPort}`,
  { useNewUrlParser: true, useUnifiedTopology: true }
  );
  
  
// use in case the data base is empty
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
