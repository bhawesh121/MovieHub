const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET || 'secret';

module.exports = (req, res, next) => {
  try {
    const auth = req.headers.authorization;
    if(!auth) return res.status(401).json({ message: 'Unauthorized' });
    const token = auth.split(' ')[1];
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = { id: decoded.id, email: decoded.email };
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
};
