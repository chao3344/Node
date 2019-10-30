var express = require('express');
var router = express.Router();

let position = require('../controllers/position')
let uploadMiddleware = require('../middlewares/upload')

// router.get('/findAll',position.findAll)
// router.post('/add',position.add)

router.route('/')
    .get(position.findAll)
    .post(uploadMiddleware,position.add)
    .patch(position.update)
    .delete(position.remove)


router.get('/findOne',position.findOne)
router.post('/search', position.search)

module.exports = router;

