var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

  var pinSchema = new Schema({
    _id: Schema.Types.ObjectId,
    pinNum: String
});


//will not work if this code is uncommented
/* pinSchema.pre('save', function(next, err) {
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
var uPin = mongoose.model('uPins', pinSchema, 'uPins');

module.exports = uPin;