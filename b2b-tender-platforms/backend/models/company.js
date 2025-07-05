const express = require('express');
const router = express.Router();
const { Company } = require('../models');
const authenticate = require('../middleware/authMiddleware'); // ✅ use correct filename

// GET /api/company/me
router.get('/me', authenticate, async (req, res) => {
  try {
    const company = await Company.findOne({ where: { userId: req.user.userId } }); // ✅ FIXED
    if (!company) {
      return res.status(404).json({ message: 'Company not found' });
    }
    res.json(company);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
