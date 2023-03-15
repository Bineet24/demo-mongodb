const express = require('express');
const accController = require('./../controllers/accController');


const router = express.Router();

router.route('/').get(accController.getAllAccs).post(accController.createAcc).delete(accController.deleteAcc).patch(accController.updateAcc);

router.route('/:id').get(accController.getAcc);
//.delete(accController.deleteAcc);
//.patch(accController.updateAcc)

module.exports = router; 