const express = require('express');
const conController = require('./../controllers/conController');


const router = express.Router();

router.route('/').get(conController.getAllCons).post(conController.checkBody,conController.createCon).delete(conController.deleteCon);

router.route('/:id').get(conController.getCon).patch(conController.updateCon);
//.delete(conController.deleteCon)

module.exports = router; 