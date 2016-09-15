var router  = require('express').Router();
var jwt     = require('jsonwebtoken');
var secret  = require('../config/tokens').secret;
var upload = require('./upload');

var usersController = require('../controllers/users');
var authController  = require('../controllers/authentications');
var facebookController = require('../controllers/facebookOauth');
var restaurantController = require('../controllers/restaurant');

function secureRoute(req, res, next){
  if(!req.headers.authorization) return res.status(401).json({ message: "Unauthorised"});

  var token = req.headers.authorization.replace('Bearer ','');
  
  jwt.verify(token, secret, function(err, payload){
    if(err|| !payload) return res.status(401).json({ message: "Unauthorised"});
    req.user = payload;
    next();
  });
}

router.get('/restaurants/cuisines', restaurantController.cuisines);

router.route('/users')
  // .all(secureRoute)
  .get(usersController.index)
  .post(upload.single('avatar'), usersController.create);


router.route('/users/:id')
  //.all(secureRoute)
  .get(usersController.show)
  .put( upload.single('avatar'),usersController.update)
  // .patch(usersController.update)
  .delete(usersController.delete);

router.route('/chat/:id')
  .get(usersController.show);

router.route('/match/:id')
  .get(usersController.match)

router.route('/register')
  .post(upload.single('avatar'), authController.register);
router.post('/login', authController.login);
router.post('/facebook', facebookController.login);

module.exports = router;
