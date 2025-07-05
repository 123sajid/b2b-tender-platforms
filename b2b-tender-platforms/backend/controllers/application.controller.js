const { Company, Tender, TenderApplication } = require('../models');

exports.applyToTender = async (req, res) => {
  const userId = req.user.userId;
  const { tenderId, message } = req.body;

  try {
    const company = await Company.findOne({ where: { userId } });
    if (!company) return res.status(404).json({ error: 'Company not found' });

    const tender = await Tender.findByPk(tenderId);
    if (!tender) return res.status(404).json({ error: 'Tender not found' });

    // Prevent applying to own tender
    if (tender.companyId === company.id) {
      return res.status(400).json({ error: 'You cannot apply to your own tender' });
    }

    const existing = await TenderApplication.findOne({
      where: { tenderId, companyId: company.id }
    });

    if (existing) return res.status(400).json({ error: 'You already applied to this tender' });

    const application = await TenderApplication.create({
      tenderId,
      companyId: company.id,
      message
    });

    res.status(201).json({ message: 'Application submitted', application });
  } catch (err) {
    res.status(500).json({ error: 'Failed to apply' });
  }
};

exports.getTenderApplications = async (req, res) => {
  const userId = req.user.userId;

  try {
    const company = await Company.findOne({ where: { userId } });

    // Applications received for your tenders
    const tenders = await Tender.findAll({
      where: { companyId: company.id },
      include: ['TenderApplications']
    });

    res.json(tenders);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch applications' });
  }
};

exports.getMyApplications = async (req, res) => {
  const userId = req.user.userId;

  try {
    const company = await Company.findOne({ where: { userId } });

    const apps = await TenderApplication.findAll({
      where: { companyId: company.id },
      include: ['Tender']
    });

    res.json(apps);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch your applications' });
  }
};
