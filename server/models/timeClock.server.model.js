var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

  var timeCSchema = new Schema({
    employeeID: String,
    clockIn: String,
    clockOut: String,
    boolClockedOut: Boolean
});




//model decides database, schema, collection
var timeClock = mongoose.model('timeClock', timeCSchema, 'timeClock');

module.exports = timeClock;