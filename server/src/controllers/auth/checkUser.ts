// Check if user is in the database
// If so return boolean = true
// If not return boolean = false

import { Request, Response } from 'express';
import User from '../../models/user';

export const checkUser = async (req: Request, res: Response) => {
  

  try {
    const users = await User.find();

    if (users.length > 0) {
      return res.status(200).json({userExists: true});
    }

    return res.status(200).json({
      userExists: false,
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Server error',
    });
  }
};
