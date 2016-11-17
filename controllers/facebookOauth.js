var User = require('../models/user');
var request = require('request-promise');
var jwt = require('jsonwebtoken');
var bluebird = require('bluebird');
var secret = require('../config/tokens').secret;
var qs = require('qs');
var config = require('../config/url');

function login (req, res) {
  request.post({
    url: "https://graph.facebook.com/v2.5/oauth/access_token",
    qs: {
      client_id: process.env.FACEBOOK_API_KEY,
      client_secret: process.env.FACEBOOK_API_SECRET,
      code: req.body.code,
      redirect_uri: config.url[process.env.NODE_ENV]
    },
    json: true,
   
  })

  .then(function(access_token){
    return request.get({
      url: "https://graph.facebook.com/v2.5/me?fields=id,email,name,picture",
      qs: access_token,
      json: true
    })
  })
  .then(function(profile) {
    return User.findOne({ email: profile.email })
      .then(function(user) {
        if(user) {
          user.facebookId = profile.id;
          user.avatar = profile.avatar_url;
        }
        else {
          user = new User({
          username: profile.name,
          email: profile.email,
          facebookId: profile.id,
          avatar: profile.avatar_url
          });
        }

        return user.save();
      })
  })
  .then(function(user) {
    var payload = {
      _id: user._id,
      avatar: user.avatar,
      username: user.username
    }
    console.log("user",user)


    var token = jwt.sign(payload, secret, { expiresIn: '24h' });

    res.status(200).json({ token: token });

  })
  .catch(function(err){
    res.status(500).json(err);
  })
}
  
module.exports = {
  login: login
}


