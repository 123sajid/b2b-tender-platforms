const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();


const db = require('../models'); // Sequelize models

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Serve static files from /uploads folder
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// Test Route
app.get('/', (req, res) => {
  res.send('B2B Tender API Running');
});

// Routes
const authRoutes = require('../routes/auth.routes');
const companyRoutes = require('../routes/company.routes');
const tenderRoutes = require('../routes/tender.routes');
const applicationRoutes = require('../routes/application.routes');
const uploadRoutes = require('../routes/upload.routes');

app.use('/api/auth', authRoutes);
app.use('/api/company', companyRoutes);
app.use('/api/tenders', tenderRoutes);
app.use('/api/applications', applicationRoutes);
app.use('/api/upload', uploadRoutes);

// Start server after syncing database
const PORT = process.env.PORT || 5000;

db.sequelize.sync().then(() => {
  console.log('✅ Database synced');
  app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
  });
}).catch((err) => {
  console.error('❌ Failed to connect to database:', err);
});
