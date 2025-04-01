import { Request, Response, NextFunction } from 'express';

export const authenticate = (req: Request, res: Response, next: NextFunction) => {
  // Get authorization header
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: 'No authorization header' });
  }

  // Check if it's Basic auth
  if (!authHeader.startsWith('Basic ')) {
    return res.status(401).json({ message: 'Invalid authorization type' });
  }

  // Get credentials
  const base64Credentials = authHeader.split(' ')[1];
  const credentials = Buffer.from(base64Credentials, 'base64').toString('utf-8');
  const [username, password] = credentials.split(':');

  // Check credentials
  if (username === 'admin' && password === 'admin') {
    next();
  } else {
    res.status(401).json({ message: 'Invalid credentials' });
  }
}; 