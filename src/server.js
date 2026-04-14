const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');

// Load environment variables from .env file
dotenv.config();

// Connect to the database
connectDB();

// Initialize Express
const app = express();

// Middleware
app.use(cors()); // Allows your frontends (Caspian Row, Cafe app) to talk to this API
app.use(express.json()); // Allows the API to understand JSON data

// A simple test route to make sure it's working
app.get('/', (req, res) => {
    res.send('Universal Billing API is running...');
});
// Import and use our new billing routes
const billingRoutes = require('./routes/billingRoutes');
app.use('/api/v1/bills', billingRoutes);
// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});