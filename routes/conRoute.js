const express = require('express');
const conController = require('./../controllers/conController');


const router = express.Router();

router.route('/').get(conController.getAllCons).post(conController.createCon).delete(conController.deleteCon).patch(conController.updateCon);
//conController.checkBody,
router.route('/:id').get(conController.getCon);
//.delete(conController.deleteCon)

module.exports = router; 
