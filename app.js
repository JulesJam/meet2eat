var express   = require('express');
var app       = express();
var secret = require('./config/tokens').secret;

var socketioJwt = require('socketio-jwt');
var mongoose  = require('mongoose');
var bodyParser= require('body-parser');
var cors      = require('cors');
var bluebird  = require('bluebird');


    


var environment = app.get('env');
var port = process.env.PORT || 3000;

var routes = require('./config/routes');

var databaseUri = require('./config/db')(environment);

var server = app.listen(port, function(){
 console.log("Express running on port "+port);
  });

var io = require('socket.io').listen(server);
var users = {};
var buffersecret = new Buffer(secret, "base64");

io.on('connection', socketioJwt.authorize({
  secret: secret,
  timeout: 15000
})).on('authenticated', function(socket) {
  console.log('hello! ' + socket.decoded_token.username);
  users[socket.decoded_token.username] = socket;
  console.log('authenticated'+ socket);

  socket.on('message', function(data) {
    io.sockets.emit('message', data);
  });

  socket.on('pm', function(data) {
    users[socket.decoded_token.username].emit('pm', data);
    socket.emit('pm', data);
  });

  socket.on('disconnect', function() {
    delete users[socket.decoded_token.username];
  });

});

mongoose.connect(databaseUri);
mongoose.Promise = bluebird;


if('test' !== environment){
  app.use(require('morgan')('dev'));
};

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api', routes);

app.use(express.static('public'));



module.exports = app;