const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  role: String,
  username: String,
  email: String,
  password: String,
});

const Users = mongoose.model('Users', userSchema);

module.exports = Users;
