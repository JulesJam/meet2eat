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
  User.findById(req.params.id, function(err, user){
    if(err) return res.status(500).json(err);
    if(!user) return res.status(404).json({message: "Could not find a user which matches the requested id"});
    return res.status(200).json(user);
  });
}

function usersUpdate(req, res){

  if(req.file) req.body.avatar = req.file.key;
  
  user = User.findById(req.params.id)

    .then(function(user){
      for(key in req.body) user[key] = req.body[key];
      return user.save();
    })
    .then(function(user){
      res.status(200).json(user);
    })
    .catch(function(err){
      console.log("update error",err);
      res.status(500).json(err);
    })
}

function usersDelete(req, res){
  User.findByIdAndRemove(req.params.id, function(err){
    if(err) return res.status(500).json(err);
    return res.status(204).send();
  });
}


module.exports = {
  index: usersIndex,
  create: usersCreate,
  show: usersShow,
  update: usersUpdate,
  delete: usersDelete
}