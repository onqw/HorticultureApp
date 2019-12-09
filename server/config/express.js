const path = require('path'),
    express = require('express'),
    mongoose = require('mongoose'),
    morgan = require('morgan'),
    bodyParser = require('body-parser'),
    config = require('./config'),
    userRouter = require('../routes/user.server.routes');
    availRouter = require('../routes/avail.server.routes');
    noAvailRouter = require('../routes/noAvail.server.routes');
    pinRouter = require('../routes/pin.server.routes');

module.exports.init = () => {
    /* 
        connect to database
        - reference README for db uri
    */
   // Attempt connecting to mongoose database userData (selects all collections inside)
    try {
        mongoose.connect(config.dbUserData.uri, { useNewUrlParser: true, useUnifiedTopology: true });
        mongoose.set('useCreateIndex', true);
        mongoose.set('useFindAndModify', false);
        console.log('Successfully connected to Users db')
        }
    catch (err){
        console.log("Could not retrieve database Users")
    }
    // end try to connect to db collections


    // initialize app
    const app = express();

    // enable request logging for development debugging
    app.use(morgan('dev'));

    // body parsing middleware
    app.use(bodyParser.json());

    // add a router
    app.use('/Users', userRouter);
    app.use('/uAvail', availRouter);
    app.use('/uNoAvail', noAvailRouter);
    app.use('/uPins', pinRouter);

   // if (process.env.NODE_ENV === 'production') {
        // Serve any static files
        app.use(express.static(path.join(__dirname, '../../client/public')));

        // Handle React routing, return all requests to React app
        app.get('*', function(req, res) {
            res.sendFile(path.join(__dirname, '../../client/public', 'index.html'));
        });
    //}

    return app
};
