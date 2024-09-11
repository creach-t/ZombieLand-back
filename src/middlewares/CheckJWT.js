import jwt from 'jsonwebtoken';
import 'dotenv/config';

function checkJWT(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ error: 'No token provided' });
  }

  const token = authHeader.split(' ')[1];

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: 'Invalid token' });
    }

    req.session.user = decoded;
    console.log(' checkjwt : ' + req.session.user);

    next();
  });
}

export default checkJWT;
