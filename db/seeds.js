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
    age: 34,
    locationNameHome: "Clapham",
    locationHome: {lat:51.4882, lng:-0.0193},
    locationNameWork: "Aldgate",
    locationWork: {lat:51.4995, lng:-0.1234},
    occupation:"Under cars fixing things",
    foodPreference: "25",
    drinkPreference: "67",
    filmPreference: "54",
    bookPreference: "45",
    entertainmentPreference: "66",
    dinningPreferences:["Indian", "Chinese"],
    activeMeet: true
    },{
    username: "susan",
    email: "susan@mail",
    password: "password",
    passwordConfirmation: "password",
    occupation:"Making cakes for sale",
    age: 45,
    locationNameHome: "Islington",
    locationHome: {lat:51.4000, lng:-0.1234},
    locationNameWork: "Moorgate",
    locationWork: {lat:51.5342, lng:-0.1005},
    foodPreference: "43",
    drinkPreference: "56",
    filmPreference: "73",
    bookPreference: "25",
    entertainmentPreference: "25",
    dinningPreferences:["French", "Tapas"],
    activeMeet: true
  },{
    username: "eifion",
    email: "eifion@mail",
    password: "password",
    passwordConfirmation: "password",
    occupation: "As a lawyer in the city",
    age: 44,
    locationNameHome: "Chelsea",
    locationHome: {lat:51.3456, lng:-0.1111},
    locationNameWork: "Old Street",
    locationWork: {lat:51.4005, lng:-0.1004},
    foodPreference: "87",
    drinkPreference: "85",
    filmPreference: "76",
    bookPreference: "66",
    entertainmentPreference: "66",
    dinningPreferences:["British", "French"],
    activeMeet: true
  },{
    username: "julian",
    email: "julian@mail",
    password: "password",
    passwordConfirmation: "password",
    occupation: "Writing the code to make this site work",
    age: 33,
    locationNameHome: "Vauxhall",
    locationHome: {lat:51.3762, lng:-0.1393},
    locationNameWork: "Aldgate",
    locationWork: {lat:51.2235, lng:-0.1034},
    foodPreference: "55",
    drinkPreference: "67",
    filmPreference: "65",
    bookPreference: "89",
    entertainmentPreference: "66",
    dinningPreferences:["Korean", "Chinese"],
    activeMeet: true
  }
], function(err, users) {
  console.log(users);
  mongoose.connection.close();
})