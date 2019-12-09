const uPins = require('../controllers/pin.server.controller'),
    express = require('express'), 
    router = express.Router();

/*
  When trying to call use the following schema:

    (base url)  +  (routing)
  ex.
  localhost:3000/clockIn/3737
*/

router.route('/list')
  .get(uPins.list)

router.route('/delete/')
  .delete(uPins.delete)

router.route('/clockIn/:pinNumIn')
  .get(uPins.read);
router.route('/clockOut/:pinNumOut')
  .get(uPins.read);


//paramaters are sent to the exported functions
router.param('pinNumIn', uPins.clockIn)
router.param('pinNumOut', uPins.clockOut)


module.exports = router;