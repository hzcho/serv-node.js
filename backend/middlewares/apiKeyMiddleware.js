const apiKeyMiddleware = (req, res, next) => { //todo вынести
    const apiKey = req.header('x-api-key');
  
    if (!apiKey || apiKey !== process.env.API_KEY) {
      return res.status(403).json({ message: 'Forbidden: Invalid API Key' });
    }
  
    next();
  };