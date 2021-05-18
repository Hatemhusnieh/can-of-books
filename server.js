'use strict';

const cors = require('cors');
const express = require('express');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());
const mongoose = require('mongoose');
const port = process.env.PORT || 7980;

mongoose.connect(
  'mongodb://127.0.0.1:27017/user',
  { useNewUrlParser: true, useUnifiedTopology: true }
);

const bookSchema = new mongoose.Schema({
  name: String,
  description: String,
  status: String
});

const userSchema = new mongoose.Schema({
  email: String,
  books: [bookSchema]
});

const bookModel = mongoose.model('books', bookSchema);
const userModel = mongoose.model('users', userSchema);

function seedBooksCollection() {
  const book1 = new bookModel({
    name : 'the Son of Man description',
    description : "Kahlil Gibran's 'Jesus the Son of Man' is a magical book filled with facts about Jesus' life interwoven with complete fantasy. It would be best to only read this book if you have already read the New Testament. ... Kahlil gives us little vignettes of the life of Jesus through the words of those who knew him.",
    status : 'unread'
  });
  const book2 = new bookModel({
    name : 'The Prophet',
    description : "The Prophet is a book of 26 prose poetry fables written in English by the Lebanese-American poet and writer Kahlil Gibran. It was originally published in 1923 by Alfred A. Knopf. It is Gibran's best known work. The Prophet has been translated into over 100 different languages, making it one of the most translated books in history, and it has never been out of print.",
    status : 'unread'
  });
  const book3 = new bookModel({
    name : "Harry Potter and the Philosopher's Stone ",
    description : "Harry Potter and the Philosopher's Stone is a fantasy novel written by British author J. K. Rowling. The first novel in the Harry Potter series and Rowling's debut novel, it follows Harry Potter, a young wizard who discovers his magical heritage on his eleventh birthday, when he receives a letter of acceptance to Hogwarts School of Witchcraft and Wizardry. Harry makes close friends and a few enemies during his first year at the school, and with the help of his friends, he faces an attempted comeback by the dark wizard Lord Voldemort, who killed Harry's parents, but failed to kill Harry when he was just 15 months old.",
    status : 'unread'
  });

  // console.log(book1, book2, book3);

  book1.save();
  book2.save();
  book3.save();
}

function seedUsersCollection() {
  const hatem = new userModel({
    email: 'hatemhtm7@gmail.com',
    books: [
      {
        name: 'Spirits Rebellious',
        description: 'The selection in this volume features an anthology of four short stories published originally in Arabic as "Spirits Rebellious" (1908) and two collections of parables... "The Forerunner" and "The Madman" (1932).',
        status: 'has been read'
      },
      {
        name: 'Broken Wings',
        description: "a tale of tragic love, set at the turn of the 20th century in Beirut.[1] A young woman, Selma Karamy, is betrothed to a prominent religious man's nephew. The protagonist (a young man that Gibran perhaps modeled after himself) falls in love with this woman. They begin to meet in secret, however they are discovered, and Selma is forbidden to leave her house, breaking their hopes and hearts.",
        status: 'has been read'
      },
      {
        name: 'Inferno',
        description: "Inferno is a 2013 mystery thriller novel by American author Dan Brown and the fourth book in his Robert Langdon series, following Angels & Demons, The Da Vinci Code and The Lost Symbol. The book was published on May 14, 2013, ten years after publication of The Da Vinci Code (2003), by Doubleday.[1] It was number one on the New York Times Best Seller list for hardcover fiction and Combined Print & E-book fiction for the first eleven weeks of its release, and also remained on the list of E-book fiction for the first seventeen weeks of its release. A film adaptation was released in the United States on October 28, 2016.",
        status: 'reading'
      }
    ]
  });

  const aseel = new userModel({
    email: 'Aseel.Hamamreh@hotmail.com',
    books: [
      {
        name : 'a song of ice and fire',
        description : "A Song of Ice and Fire is a series of epic fantasy novels by the American novelist and screenwriter George R. R. Martin. He began the first volume of the series, A Game of Thrones, in 1991, and it was published in 1996. Martin, who initially envisioned the series as a trilogy, has published five out of a planned seven volumes. The fifth and most recent volume of the series, A Dance with Dragons, was published in 2011 and took Martin six years to write. He is currently writing the sixth novel, The Winds of Winter. A seventh novel, A Dream of Spring, is planned.",
        status : 'has been read'
      },
      {
        name : 'Pride and Prejudice',
        description : "Pride and Prejudice, romantic novel by Jane Austen, published anonymously in three volumes in 1813. A classic of English literature, written with incisive wit and superb character delineation, it centers on the turbulent relationship between Elizabeth Bennet, the daughter of a country gentleman, and Fitzwilliam Darcy, a rich aristocratic landowner.",
        status : 'reading'
      }
    ]
  });

  const aseel2 = new userModel({
    email: 'aseel.hamamreh@hotmail.com',
    books: [
      {
        name : 'a song of ice and fire',
        description : "A Song of Ice and Fire is a series of epic fantasy novels by the American novelist and screenwriter George R. R. Martin. He began the first volume of the series, A Game of Thrones, in 1991, and it was published in 1996. Martin, who initially envisioned the series as a trilogy, has published five out of a planned seven volumes. The fifth and most recent volume of the series, A Dance with Dragons, was published in 2011 and took Martin six years to write. He is currently writing the sixth novel, The Winds of Winter. A seventh novel, A Dream of Spring, is planned.",
        status : 'has been read'
      },
      {
        name : 'Pride and Prejudice',
        description : "Pride and Prejudice, romantic novel by Jane Austen, published anonymously in three volumes in 1813. A classic of English literature, written with incisive wit and superb character delineation, it centers on the turbulent relationship between Elizabeth Bennet, the daughter of a country gentleman, and Fitzwilliam Darcy, a rich aristocratic landowner.",
        status : 'reading'
      }
    ]
  });

  // console.log(hatem);
  // console.log(aseel);

  hatem.save();
  // aseel.save();
  aseel2.save();
}


// seedUsersCollection();
// seedBooksCollection();

app.get('/user', getUserInfo);

app.get('/', (req, res) => {
  res.send('hello useless home page');
});

function getUserInfo(req, res) {
  const { email } = req.query;
  // console.log(name);
  userModel.find({ email: email }, function (err, user) {
      if (err) {res.send('N/A')};
      // console.log(user[0].books);
      res.send(user[0].books);
  });
}

// Adding a new book in the DB from the frontend:
app.post('/user', createNewbook);

function createNewbook(req, res) {
  const { bookName, bookDescription,bookStatus, email } = req.body;
  myOwnerModel.find({ email: email }, (err, user) => {
    user[0].books.push({
          name: bookName,
          description: bookDescription,
          status: bookStatus,
      })
      user[0].save();
      res.send(user[0].books);
      if (err) {res.send('N/A')};
  });
}
// ************************************************************************************


// deleting a book from the dataBase:
app.delete('/user/:id', deleteBooks);

function deleteBooks(req, res) {
  const index = Number(req.params.id);
  const { email } = req.query;
  myOwnerModel.find({ email: email }, (err, user) => {
      const booksArr = user[0].books.filter((book, idx) => {
          return idx !== index
      });
      user[0].books = booksArr;
      user[0].save();
      res.send('The book has been successfully deleted');
      if (err) {res.send('N/A')};
  });
}
// ************************************************************************************

app.listen(port, () => {
  console.log(`Serverinhio startado on ${port}`);
  console.log('hahaha');
});