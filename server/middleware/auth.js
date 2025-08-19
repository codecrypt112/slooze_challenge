const jwt = require('jsonwebtoken');
const { db } = require('../config/firebase');
const { doc, getDoc } = require('firebase/firestore');

const authenticateToken = async (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Access token required' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userDocRef = doc(db, 'users', decoded.userId);
    const userDoc = await getDoc(userDocRef);
    
    if (!userDoc.exists()) {
      return res.status(401).json({ error: 'User not found' });
    }

    req.user = { id: decoded.userId, ...userDoc.data() };
    next();
  } catch (error) {
    return res.status(403).json({ error: 'Invalid token' });
  }
};

const authorizeRole = (roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ error: 'Insufficient permissions' });
    }
    next();
  };
};

const authorizeCountry = (req, res, next) => {
  // Check if user can access resources from their assigned country
  if (req.body.country && req.body.country !== req.user.country) {
    return res.status(403).json({ error: 'Access restricted to your assigned country' });
  }
  next();
};

module.exports = { authenticateToken, authorizeRole, authorizeCountry };