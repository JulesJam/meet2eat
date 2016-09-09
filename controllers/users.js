var User = require('../models/user');

function usersIndex (req, res){
  User.find(function(err, users){
    if(err) return res.status(500).json(err);
    return res.status(200).json(users);
  });
}

function usersCreate(req, res){
  User.create(req.body, function(err,user){
    if(err) return res.status(400).json(err);
    return res.status(201).json(user);
  });
}

function usersShow(req, res){
  Users.findById(req.params.id, function(err, user){
    if(err) return res.status(500).json(err);
    if(!user) return res.status(404).json({message: "Could not find a user which matches the requested id"});
    return res.status(200).json(user);
  })
}

module.exports = {
  index: usersIndex,
  create: usersCreate,
  show: usersShow
}