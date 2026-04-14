const express = require('express');
const router = express.Router();
const { generateBill } = require('../controllers/billingController');
const verifyApiKey = require('../middleware/auth'); // Import the guard

// Add 'verifyApiKey' right before 'generateBill'
router.post('/generate', verifyApiKey, generateBill);

module.exports = router;