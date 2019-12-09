
var mongoose = require('mongoose'), 
    uNoAvail = require('../models/uNoAvail.server.model.js')

/* Create a listing */
try{
    exports.create = function(req, res) {
    
      /* Instantiate a User */
      var noAvail = new uNoAvail(req.body);
     
      /* Then save the User */
      uNoAvail.save(function(err) {
        if(err) {
          console.log(err);
          res.status(400).send(err);
        } else {
          res.json(noAvail);
          console.log(noAvail)
        }
      });
    };
    exports.list = function(req, res) {
      /* Add your code */
      uNoAvail.find({}, null, null, function (err, noAvail) {
        if (err) return handleError(err);
        console.log("calling all users" + noAvail);
        res.send(noAvail);
      }); //add sorted functionality
    };
}
catch(err){
    console.log(err);
  }

