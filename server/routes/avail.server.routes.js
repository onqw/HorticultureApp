const avail = require('../controllers/avail.server.controller'),
    express = require('express'), 
    router = express.Router();


router.route('/create')
  .post(avail.create)

router.route('/update')
  .post(avail.updateAvail)

router.route('/delete')
  .delete(avail.deleteAvail)

//axios does not allow data to be sent during a get method
// changed to post
router.route('/:listBy/')
  .post(avail.listBy);

/* router.route('/listByWeek/:employeeID')
  .get(avail.listByWeek);

router.route('/listByWeek/:employeeID')
  .get(avail.listByWeek); */

router.param('listBy',avail.listBy)
module.exports = router;