const verifyApiKey = (req, res, next) => {
    // 1. Grab the key the website sent in the header
    const providedKey = req.header('x-api-key');

    // 2. Grab your list of valid keys from the .env file
    const validKeys = process.env.VALID_API_KEYS.split(',');

    // 3. Check if the key exists and matches
    if (!providedKey || !validKeys.includes(providedKey)) {
        return res.status(401).json({ 
            success: false, 
            message: "Unauthorized: Invalid or missing API Key" 
        });
    }

    // If the key is good, let them into the API!
    next();
};

module.exports = verifyApiKey;