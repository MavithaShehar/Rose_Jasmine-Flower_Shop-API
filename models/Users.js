const mongoose = require("mongoose");

const userModel = new mongoose.Schema({
  username: {  
    type: String,
    required: [true, 'Username is required'],
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
  },
  password: {  
    type: String,
    required: [true, 'Password is required'],
    minlength: [4, 'Password must be at least 6 characters long'], 
  },
  role: {
    type: String,
    enum: ['admin', 'user'],
    default: 'user'
  }
});

const Users = mongoose.model('Users', userModel);

module.exports = Users;