var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
var beautifulUnique = require('mongoose-beautiful-unique-validation');

var userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true},
  email: { type: String, required: true, unique:true},
  passwordHash: String,
  avatar: String,
  facebookId: String,
  locationHome: {},
  locationWork: {},
  locationCurrent:{},
  locationChosen:{},
  age: Number,
  occupation: String,
  foodPreference: Number,
  drinkPreference: Number,
  filmPreference: Number,
  bookPreference: Number,
  entertainmentPreference:Number,
  dinningPreferences:{},
  activeMeet: Boolean,
  activeStart: Date
});

userSchema.pre('validate', function(next){
  
  if(!this._password && !this.facebookId){
    this.invalidate('password', "A password is required");
  }
  next();
})




userSchema.set ('toJson', {
  transform: function (document, json){
    delete json.passwordHash;
    delete json.__v;
    return json;
  }
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

userSchema.methods.validatePassword = function(password){
  return bcrypt.compareSync(password, this.passwordHash);
}

userSchema.plugin(beautifulUnique);

module.exports = mongoose.model('User', userSchema);