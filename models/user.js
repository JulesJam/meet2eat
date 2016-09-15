var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
var s3 = require('../config/s3');
var beautifulUnique = require('mongoose-beautiful-unique-validation');

var userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true},
  email: { type: String, required: true, unique:true},
  passwordHash: String,
  avatar: String,
  facebookId: String,
  locationNameHome: String,
  locationHome: {},
  locationNameWork: String,
  locationWork: {},
  locationCurrent:{},
  locationNameCurrent:String,
  locationChosen:{},
  locationNameChosen:String,
  age: Number,
  occupation: String,
  foodPreference: String,
  drinkPreference: String,
  filmPreference: String,
  bookPreference: String,
  meetCuisines: String,
  meetDay: String,
  meetMeal: String,
  meetGroup: {type: Number, value: 0},
  activeMeet: Boolean,
  activeStart: Date,
  chatRoom: String,
  loggedIn: Boolean
});

userSchema.pre('validate', function(next){
  
  if(this.isNew && !this._password && !this.facebookId){
    this.invalidate('password', "A password is required");
  }
  next();
})




userSchema.set ('toJSON', {
  transform: function (document, json){
    delete json.passwordHash;
    delete json.__v;
    return json;
  },
  getters: true
});


userSchema.virtual('password')
  .set(function(password){
    this._password = password;
    this.passwordHash = bcrypt.hashSync(this._password, bcrypt.genSaltSync(8));
  });

userSchema.virtual('passwordConfirmation')
  .get(function(){
    return this._passwordConfirmation;
  })
  .set(function(passwordConfirmation){
    this._passwordConfirmation = passwordConfirmation;
  });

userSchema.path('passwordHash')
  .validate(function(passwordHash){
    if(this.isNew){
      if(!this._password){
        return this.invalidate('password', 'A password is required');
      }

      if(this._password !== this._passwordConfirmation){
        return this.invalidate('passwordConfirmation', "Passwords do not match");
      }
    }
  });

userSchema.path('avatar')
  .get(function(avatar) {
      console.log(s3.endpoint.href + process.env.AWS_BUCKET_NAME + "/" + avatar);
      return s3.endpoint.href + process.env.AWS_BUCKET_NAME + "/" + avatar;
    })
    .set(function(avatar) {
      console.log("s32");
      return avatar.split('/').splice(-1)[0];
    });

userSchema.methods.validatePassword = function(password){
  return bcrypt.compareSync(password, this.passwordHash);
}

userSchema.plugin(beautifulUnique);

module.exports = mongoose.model('User', userSchema);