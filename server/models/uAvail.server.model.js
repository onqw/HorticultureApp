var mongoose = require('mongoose'),
    Schema = mongoose.Schema;


  var availSchema = new Schema({
    employeeID: String,
    start: String, //use moment.js
    end: String,
});

/* availSchema.pre('save', function(next, err) {
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
var uAvail = mongoose.model('uAvail', availSchema, 'uAvail');

module.exports = uAvail;
