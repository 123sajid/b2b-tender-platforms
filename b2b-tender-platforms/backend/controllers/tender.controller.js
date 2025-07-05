const { Tender, Company, User } = require('../models');

// Create Tender
exports.createTender = async (req, res) => {
  const userId = req.user.userId;
  const { title, description, location, deadline, budget } = req.body;

  console.log('Received Tender:', req.body); // Logging for debugging

  try {
    const company = await Company.findOne({ where: { userId } });
    if (!company) {
      return res.status(404).json({ error: 'Company not found' });
    }

    const tender = await Tender.create({
      title,
      description,
      location,
      deadline,
      budget,
      companyId: company.id,
    });

    res.status(201).json({ message: 'Tender created', tender });
  } catch (err) {
    console.error("Create Tender Error:", err);
    res.status(500).json({ error: 'Something went wrong while creating tender' });
  }
};

// Get All Tenders
exports.getAllTenders = async (req, res) => {
  try {
    const tenders = await Tender.findAll({
      include: [
        {
          model: Company,
          attributes: ['id', 'name', 'industry', 'logoUrl'],
          include: [
            {
              model: User,
              attributes: ['email'],
            },
          ],
        },
      ],
      order: [['createdAt', 'DESC']],
    });

    res.json(tenders);
  } catch (err) {
    console.error("Fetch All Tenders Error:", err);
    res.status(500).json({ error: 'Failed to fetch tenders' });
  }
};

// Get Logged-in User's Tenders
exports.getMyTenders = async (req, res) => {
  const userId = req.user.userId;

  try {
    const company = await Company.findOne({ where: { userId } });
    if (!company) {
      return res.status(404).json({ error: 'Company not found' });
    }

    const tenders = await Tender.findAll({
      where: { companyId: company.id },
      order: [['createdAt', 'DESC']],
    });

    res.json(tenders);
  } catch (err) {
    console.error("Fetch My Tenders Error:", err);
    res.status(500).json({ error: 'Failed to fetch your tenders' });
  }
};
