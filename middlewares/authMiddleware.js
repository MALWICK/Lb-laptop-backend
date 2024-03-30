const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  // Extract the JWT token from the headers
  const token = req.headers.authorization?.split(' ')[1];

  // Check if the token exists
  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  try {
    // Verify the token and extract the userId from the payload
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decodedToken.userId; // Attach the userId to the request object
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Invalid token' });
  }
};

module.exports = authMiddleware;