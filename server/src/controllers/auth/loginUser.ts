import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import User from "../../models/user";
import { comparePassword } from "../../util/authUtils";

export const login = async (req: Request, res: Response) => {
  try {
    // check if username and password are provided
    const { username, password } = req.body;
    if (!username)
      return res.status(400).send({ message: "Please provide a valid username" });
    if (!password)
      return res.status(400).send({ message: "Please enter your password" });

    // check if username has an account linked

    const user = await User.findOne({ username });

    if (!user)
      return res
        .status(400)
        .send({ message: "Account not found. Please sign up first" });

    // if password matches return token and user doc
    const storedPassword = user.password as string;
    const match = await comparePassword(password, storedPassword);
    if (!match) return res.status(400).send({ message: "Incorrect message" });

    const token = await jwt.sign(
      { username },
      process.env.JWT_SECRET as string,
      {
        expiresIn: "14d",
      }
    );

    delete user.password;

    res.send({ token, user, message: "Logged in successfully" });

    res.status(200);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error. Please try again later" });
  }
};
