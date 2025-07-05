const multer = require('multer');
const storage = multer.memoryStorage(); // Required for buffer upload
const upload = multer({ storage });
module.exports = upload;
