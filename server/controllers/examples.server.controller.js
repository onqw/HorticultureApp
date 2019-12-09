const Example = require('../models/examples.server.model.js')

var mongoose = require('mongoose'), 
    Users = require('../models/examples.server.model.js')

exports.hello = function(req, res) {
    res.send('world')
};

/* Create a listing */
try{
    exports.create = function(req, res) {
    
      /* Instantiate a User */
      var users = new Users(req.body);
     
      /* Then save the User */
      Users.save(function(err) {
        if(err) {
          console.log(err);
          res.status(400).send(err);
        } else {
          res.json(listing);
          console.log(listing)
        }
      });
    };
}
catch(err){
    console.log(err);
  }
