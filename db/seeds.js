var mongoose = require('mongoose');
var User = require('../models/user');

var databaseUri = require('../config/db')('development');
mongoose.connect(databaseUri);

User.collection.drop();

User.create([
  {
    username: "dave",
    email: "dave@mail",
    password: "password",
    passwordConfirmation: "password"
  },{
    username: "susan",
    email: "susan@mail",
    password: "password",
    passwordConfirmation: "password"
  },{
    username: "eifion",
    email: "eifion@mail",
    password: "password",
    passwordConfirmation: "password"
  },{
    username: "julian",
    email: "julian@mail",
    password: "password",
    passwordConfirmation: "password"
  }
], function(err, users) {
  console.log(users);
  mongoose.connection.close();
})