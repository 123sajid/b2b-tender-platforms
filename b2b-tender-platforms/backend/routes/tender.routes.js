const express = require('express');
const router = express.Router();
const tenderController = require('../controllers/tender.controller');
const auth = require('../middleware/authMiddleware');
const validate = require('../middleware/validate');
const { tenderSchema } = require('../validators/tender.validator');

router.post('/', auth, validate(tenderSchema), tenderController.createTender);
router.get('/', tenderController.getAllTenders);
router.get('/my', auth, tenderController.getMyTenders);

module.exports = router;
