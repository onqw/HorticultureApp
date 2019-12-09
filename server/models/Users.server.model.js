var mongoose = require('mongoose'),
    Schema = mongoose.Schema;


var userSchema = new Schema({
    name: String,
    email: String,
    position: String,
    salary: Number
});

/* userSchema.pre('save', function(next, err) {
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
  }); */



//model decides database, schema, collection
var Users = mongoose.model('userData', userSchema, 'Users');

module.exports = Users;