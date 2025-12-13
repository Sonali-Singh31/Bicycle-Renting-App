import dotenv from 'dotenv';
dotenv.config();
import jwt from "jsonwebtoken";

export const verifyJwtToken = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    return res.status(401).json({ message: 'Access denied. Token missing.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    req.user = decoded.username;
    req.usertype = decoded.usertype;
    req.id = decoded.id;
  } catch (error) {
    return res.status(401).json({ message: 'Access denied. Invalid token.' });
  }

  next();
};
