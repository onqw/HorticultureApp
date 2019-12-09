var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var userSchema = new Schema({
    name: String,
    email: String,
    position: String,
    salary: Number
})

userSchema.pre('save', function(next, err) {
    /* your code here from Bootcamp Assignment #2 - ListingSchema.js File */
    if (!this.name){
      next(err);
    }
    else{
    var currentDate = new Date();
    this.updated_at = currentDate;
    if(!this.created_at)
      this.created_at = currentDate;
      next();
    }
  });
  
  var Users = mongoose.model('Users', userSchema);

  module.exports = Users;