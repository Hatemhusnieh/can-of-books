'use strict';
const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    name: String,
    description: String,
    status: String
  });

  const bookModel = mongoose.model('books', bookSchema);

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

  module.exports = {
    bookSchema,
    bookModel,
    seedBooksCollection
  };