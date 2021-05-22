'use strict';
const userModel = require('../models/users.model');

const getUserInfo = async (req, res) => {
  // console.log(req.query);
  const { email } = req.query;
  await userModel.userModel.find({ email: email }, function (err, user) {
    if (err) { res.send(`YOU GOT AN ERROR! your error: ${err}`) };
    // console.log(user[0].books);
    res.send(user[0].books);
  });
}
const createNewbook = async (req, res) => {
  const { bookName, bookDescription, bookStatus, email } = req.body;
  // console.log(req.body);
  await userModel.userModel.find({ email: email }, (err, user) => {
    if (err) { res.send(`YOU GOT AN ERROR! your error: ${err}`) };
    user[0].books.push({
      name: bookName,
      description: bookDescription,
      status: bookStatus,
    })
    user[0].save();
    res.send(user[0].books);
  });
}
const deleteBooks = async (req, res) => {
  const index = Number(req.params.id);
  const { email } = req.query;
  await userModel.userModel.find({ email: email }, (err, user) => {
    if (err) { res.send(`YOU GOT AN ERROR! your error: ${err}`) };
    const booksArr = user[0].books.filter((book, idx) => {
      return idx !== index
    });
    user[0].books = booksArr;
    user[0].save();
    res.send('The book has been successfully deleted');
  });
}
const updateBookInfo = async (req, res) => {
  const index = Number(req.params.index);
  const { email, bookName, bookDescription, bookStatus } = req.body;
  const newInfo = {
    name: bookName,
    description: bookDescription,
    status: bookStatus
  };
  await userModel.userModel.find({ email: email }, (error, user) => {
    // console.log(user[0]);
    user[0].books.splice(index, 1, newInfo);
    user[0].save();
    res.send(user[0].books);
  });
}

module.exports = {
  getUserInfo,
  createNewbook,
  deleteBooks,
  updateBookInfo
};