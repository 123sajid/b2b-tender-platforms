const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const applicationController = require('../controllers/application.controller');

// Apply to a tender
router.post('/apply', auth, applicationController.applyToTender);

// View applications received on your tenders
router.get('/received', auth, applicationController.getTenderApplications);

// View tenders you've applied to
router.get('/mine', auth, applicationController.getMyApplications);

module.exports = router;
