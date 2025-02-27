const jwt = require('jsonwebtoken');

const verifyToken = async (req, res, next) => {
  
  const authHeader = req.header('Authorization');
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Access denied, no token provided' });
  }
  const token = authHeader.split(' ')[1];
  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified; // Store user data in request object
    next();
  } catch (error) {
    res.status(400).json({ error: 'Invalid or expired token' });
  }
};

const authorizeRoles = (...roles) => { 
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ error: 'Access denied' });
    }
    next();
  };
};
module.exports = { verifyToken, authorizeRoles };