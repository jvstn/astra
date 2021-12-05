import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

declare global {
  namespace Express {
    interface Request {
      username?: string;
    }
  }
}

export const checkAuth = (req: Request, res: Response, next: NextFunction) => {
  if (!req.headers.authorization) {
    return res.status(401).send({ message: 'No request headers' });
  }
  const token = req.headers.authorization.split(' ')[1];
  if (token === 'null') {
    return res.status(401).send({ message: 'Token missing' });
  }
  try {
    const secret = process.env.JWT_SECRET as string;
    const decoded = jwt.verify(token, secret);
    req.username = (<jwt.JwtPayload>decoded)['username'];
    next();
  } catch (error) {
    res.status(401).send({ message: 'Unauthorized request' });
  }
}