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
    passwordConfirmation: "password",
    locationHome: {lat:51.4882, lng:-0.0193}
  },{
    username: "susan",
    email: "susan@mail",
    password: "password",
    passwordConfirmation: "password",
    locationHome: {lat:51.5346, lng:-0.1000 }
  },{
    username: "eifion",
    email: "eifion@mail",
    password: "password",
    passwordConfirmation: "password",
    locationHome: {lat:51.6578, lng:-0.1233}
  },{
    username: "julian",
    email: "julian@mail",
    password: "password",
    passwordConfirmation: "password",
    locationHome: {lat:51.4000, lng:-0.0010}
  }
], function(err, users) {
  console.log(users);
  mongoose.connection.close();
})