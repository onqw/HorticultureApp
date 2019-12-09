
/* 11/29/19 - Jaxson Jerger
- fixed not sending resStatus on first call after server start
- added comments for queries
- added res.status to response 
- removed functions called from ClockIn and Out and integrated as
  embedded queries to execute accordingly
- list now sorts by _id
*/


const mongoose = require('mongoose'), 
    moment = require('moment'),
    format = require('format'),
    uPins = require('../models/uPins.server.model.js')
    timeClock = require('../models/timeClock.server.model')
    Users = require('../models/Users.server.model')


/* 
  //see routing for url implementation
  Functions Exported:

  - create (Make new pin on create new user)
  - list (all pins in order by _id)
  - read
  - delete
  - clockIn
  - clockOut

  //############################################//
  //Status codes:
  // 0 = nothing has happened yet
  // 1 = successfully clocked in
  // 10 = found user, already clocked in
  // 11 = successfully clocked out
  // 33 = found user, nowhere to clock out
  // 404 = error, no user found
  // 911 = there was an error
  //############################################//

  calling clockIn or Out
  localhost:3000/uPins/clockIn/(pinNum)
  localhost:3000/uPins/clockOut/(pinNum)
*/


try{
  /* Create a new pin, should not be done via url */
  exports.create = function(req, res) {
  
   
    var pin = new uPins(req.body);
    
    //save the new schema'd pin
    pin.save(function(err) {
      if(err) {
        console.log(err);
        res.status(400).send(err);
      } else {
        res.json(pin);
        console.log(pin)
      }
    });
  };

  //list all by _id
  exports.list = function(req, res) {
    uPins.find({}, null, null, function (err, pins) {
      if (err) return console.error(err);
      console.log("calling all pins" + pins);
      res.send(pins);
    }).sort('_id');
  };

  exports.read = function(req,res){
    if (req.params.pinNumIn !== null){
      res.json(req.params.pinNumIn)
    }
    else if (req.params.pinNumOut !== null){
      res.json(req.params.pinNumOut)
    }
  };

  //delete entry w/ req.body._id
  exports.delete = function(req, res) {
    uPins.findOneAndRemove({'_id' : req.body._id},
     function(err){
      if(err) {
        console.log(err);
        res.status(400).send(err);
      } else {
        console.log("Deleted: " + req.body._id)
        res.status(200).send("Deleted: " + req.body._id)
      }
    })
  }


//#######################           #######################//
//####################### Clock  In #######################//
//#######################           #######################//
    
  exports.clockIn = function(req, res) {
    var oldPin = "";

    var resStatus = {"name":null,"clockedIn":false, "status":0};
    
    
    //check if the user pin exists
    uPins.findOne({pinNum:req.params.pinNumIn})
    .exec(async function (err, user) {

      if (err){ 
        resStatus.status = 911;
        console.error(err);

        //send status to page
        res.json(resStatus).status(400)
      }
      else if (user===null){
        console.log("Pin not found.")
        resStatus.status = 404;

        //send status to page
        res.json(resStatus).status(400);
      }
      else{
        Users.findOne({_id:mongoose.Types.ObjectId(user._id)},'name',
          function (err, userName) {
            if (err) {
              console.error("Could not getName:" + err)
              resStatus.status = 404;

              //Send to page the status of events
              res.json(resStatus).status(400);
            }
            else if (userName === null) {
              resStatus.status = 404;

              //send status to page
              res.json(resStatus).status(400);

            }
            else {
              resStatus.name = userName.name;

              //find entries with same id and bool false
              //clockPin will depend on the server clocking out employees
              // at the end of their shift
              //checking for if clocked in
              timeClock.findOne({employeeID:user._id, boolClockedOut:false}, 
                'boolClockedOut', function(err, todayClockOut){
                if (err){
                  console.log("Find timeClocks error: " + err)
                  resStatus.status = 911;

                  //Send to page the status of events
                  res.json(resStatus).status(400);
                }
                else if (todayClockOut !== null) {
                  //user needs to clock out before clocking in again
                  
                  console.log(userName.name + " has not clocked out")
                  resStatus.status = 10;
                  resStatus.clockedIn = true;
                  
                  //Send to page the status of events
                  res.json(resStatus).status(400);
                }
                else{
                  //create new data in db showing a user has clocked in
                  //console.log("Creating new instance in database")
        
                  var newTimeClock = new timeClock({
                    employeeID:user._id,
                    clockIn:moment().format(),
                    clockOut:"",
                    boolClockedOut:false
                  });

                  //create a new entry in the timeClock
                  newTimeClock.save(function (err,entry){
                      if (err) {
                        resStatus.status = 911;
                        console.error("Create error: " + err);

                        //Send to page the status of events
                        res.json(resStatus).status(400);
                      }
                      else{
                        console.log("New clock-in: " + entry._id)
                        resStatus.status = 1;
                        resStatus.clockedIn = true;


                        //Send to page the status of events
                        res.json(resStatus).status(200);
                        
                      }
                  })
                }
              });
            }
        })
      }
  });
};
//#######################           #######################//
//####################### Clock In #######################//
//#######################    END   #######################//

    



//#######################           #######################//
//####################### Clock Out #######################//
//#######################           #######################//


exports.clockOut = function(req, res) {
  var oldPin = "";
  var resStatus = {"name":null,"clockedIn":false, "status":0};

  //check if the user pin exists
  uPins.findOne({pinNum:req.params.pinNumOut})
    .exec(async function (err, user) {

      if (err){ 
        console.error(err);
        resStatus.status = 911;


        //send status to page
        res.json(resStatus).status(400);
      }
      else if (user===null){
        console.log("Pin not found.")
        resStatus.status = 404;
        
        
        //send status to page
        res.json(resStatus).status(400);
      }
      else{
        Users.findOne({_id:mongoose.Types.ObjectId(user._id)},'name',
          function (err, userName) {
            if (err) {
              console.error("Could not getName:" + err)
              resStatus.status = 404;

              //Send to page the status of events
              res.json(resStatus).status(400);
            }
            else if (userName === null) {
              resStatus.status = 404;

              //send status to page
              res.json(resStatus).status(400);

            }
            else {
              resStatus.name = userName.name;


              //find entries with same id and bool false
              //clockPinOut will depend on the server clocking out employees
              // at the end of their shift
              timeClock.findOne({employeeID:user._id, boolClockedOut:false}, 
                function(err, todayClockOut){
                if (err){
                  console.log("Find timeClocks error: " + err)
                  resStatus.status = 911;

                  //Send to page the status of events
                  res.json(resStatus).status(400);
                }
                else if (todayClockOut === null) {
                  //user needs to clock out before clocking in again
                  
                  console.log(userName.name + " has not been clocked in")
                  resStatus.clockedIn = false;
                  resStatus.status = 33;
                  
                  //Send to page the status of events
                  res.json(resStatus).status(400);
                }
                else{
                  //create new data in db showing a user has clocked in
                  //console.log("Creating new instance in database")
                  
                  var newTimeClock = new timeClock({
                    _id: todayClockOut._id,
                    employeeID:todayClockOut.employeeID,
                    clockIn:todayClockOut.clockIn,
                    clockOut:moment().format(),
                    boolClockedOut:true
                  });


                  timeClock.findOneAndUpdate({employeeID:user._id, boolClockedOut:false}, 
                    newTimeClock, function (err,entry){
                      if (err) {
                        console.error("Update error: " + err);
                        resStatus.status = 911;

                        //Send to page the status of events
                        res.json(resStatus).status(400);
                      }
                      else{
                        console.log("Clocked-out: " + entry._id)
                        resStatus.clockedIn = false;
                        resStatus.status = 11;
                        
                        //Send to page the status of events
                        res.json(resStatus).status(200);
                      }
                })
              }
            });
          }
        })
      }
  });    
};


//#######################   END     #######################//
//####################### Clock Out #######################//
//#######################   END     #######################//

}
catch(err){
  console.log(err);
}

