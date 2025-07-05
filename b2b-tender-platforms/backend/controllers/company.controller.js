const { Company, User } = require('../models');
const supabase = require('../utils/supabase');
const { Op } = require('sequelize');

exports.createOrUpdateCompany = async (req, res) => {
  const userId = req.user.userId; // ✅ FIXED HERE
  const { name, industry, description, services } = req.body;

  try {
    let logoUrl = null;

    // Upload logo to Supabase if provided
    if (req.file) {
      const fileExt = req.file.originalname.split('.').pop();
      const fileName = `logo_${Date.now()}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from(process.env.SUPABASE_BUCKET)
        .upload(fileName, req.file.buffer, {
          contentType: req.file.mimetype,
          upsert: true
        });

      if (uploadError) {
        console.error("Upload Error:", uploadError);
        return res.status(500).json({ message: "Failed to upload logo" });
      }

      const { data } = supabase.storage
        .from(process.env.SUPABASE_BUCKET)
        .getPublicUrl(fileName);

      logoUrl = data.publicUrl;
    }

    // Upsert company info
    let company = await Company.findOne({ where: { userId } });

    const companyData = {
      name,
      industry,
      description,
      logoUrl: logoUrl || company?.logoUrl || null,
      services,
      userId,
    };

    if (company) {
      await company.update(companyData);
    } else {
      company = await Company.create(companyData);
    }

    res.json(company);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Something went wrong" });
  }
};

exports.getMyCompany = async (req, res) => {
  try {
    const userId = req.user.userId; // ✅ FIXED HERE

    const company = await Company.findOne({ where: { userId } });
    if (!company) return res.status(404).json({ message: "Company not found" });

    res.json(company);
  } catch (err) {
    console.error("❌ Error in getMyCompany:", err);
    res.status(500).json({ message: "Error fetching company profile" });
  }
};

exports.getCompanyById = async (req, res) => {
  try {
    const company = await Company.findByPk(req.params.id);
    if (!company) return res.status(404).json({ message: "Company not found" });

    res.json(company);
  } catch (err) {
    res.status(500).json({ message: "Error fetching company" });
  }
};

exports.getAllCompanies = async (req, res) => {
  try {
    const companies = await Company.findAll();
    res.json(companies);
  } catch (err) {
    res.status(500).json({ message: "Error fetching companies" });
  }
};

exports.searchCompanies = async (req, res) => {
  try {
    const { q } = req.query;

    const companies = await Company.findAll({
      where: {
        name: { [Op.iLike]: `%${q}%` }, // case-insensitive search
      },
    });

    res.json(companies);
  } catch (err) {
    res.status(500).json({ message: "Search failed" });
  }
};
