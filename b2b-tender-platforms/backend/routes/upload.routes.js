const express = require('express');
const router = express.Router();
const upload = require('../middleware/uploadMiddleware');
const auth = require('../middleware/authMiddleware');

// Single file upload under "logo" field
router.post('/logo', auth, upload.single('logo'), (req, res) => {
  const fileUrl = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;
  res.json({ url: fileUrl });
});

module.exports = router;
