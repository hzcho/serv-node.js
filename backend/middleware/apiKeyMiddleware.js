function apiKeyMiddleware (req, res, next) {
    const apiKey = req.header('x-api-key');
  
    if (!apiKey || apiKey !== process.env.API_KEY) {
      return res.status(403).json({ message: 'Forbidden: Invalid API Key' });
    }
  
    next();
  };

  module.exports = apiKeyMiddleware;