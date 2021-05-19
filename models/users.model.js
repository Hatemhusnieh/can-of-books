'use strict';
const mongoose = require('mongoose');
const bookModel = require('./books.model');

const userSchema = new mongoose.Schema({
    email: String,
    books: [bookModel.bookSchema]
  });
  
  const userModel = mongoose.model('users', userSchema);
  
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
    aseel.save();
  }

  module.exports = {
    userSchema,
    userModel,
    seedUsersCollection
  };
