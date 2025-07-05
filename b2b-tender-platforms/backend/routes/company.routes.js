const express = require('express');
const router = express.Router();

const companyController = require('../controllers/company.controller');
const auth = require('../middleware/authMiddleware');
const validate = require('../middleware/validate');
const { companySchema } = require('../validators/company.validator');
const upload = require('../middleware/upload');

// Create or update company (with logo upload + validation)
router.post(
  '/',
  auth,
  upload.single('logo'),          // handles file uploads (logo)
  validate(companySchema),        // validates the company fields
  companyController.createOrUpdateCompany
);

// Get current user's company profile
router.get('/me', auth, companyController.getMyCompany);

// Search companies by name, industry, or services
router.get('/search', companyController.searchCompanies);

// Get all companies (admin/general)
router.get('/', companyController.getAllCompanies);

// Get a specific company by ID — must be last to avoid route conflict
router.get('/:id', companyController.getCompanyById);

// GET /api/company/search?query=keyword
router.get('/search', companyController.searchCompanies);


module.exports = router;
