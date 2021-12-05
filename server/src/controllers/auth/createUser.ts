import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import User, { IUser } from "../../models/user";
import { hashPassword } from "../../util/authUtils";
const dotenv = require("dotenv");
dotenv.config();

export const createUser = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;
    if (!username) return res.status(400).send("name required");
    if (!password) return res.status(400).send("Password required");
    if (!username) return res.status(400).send("Username required");

    //can't have duplicate accounts
    const usernameInUse = await User.findOne({ username }).exec();
    if (usernameInUse)
      return res.status(400).send("Username already in use. Please login");

    const hashedPassword = await hashPassword(password);
    const user = await (
      await User.create({ username, password: hashedPassword })
    ).toObject();

    //Use cookies instead of local storage; more secure from XSS
    const token = await jwt.sign({ username }, process.env.JWT_SECRET as string, {
      expiresIn: "14d",
      algorithm: "HS256",
    });

    delete user.password;
    res.status(200).json({ user, token });
    res.json({ message: "Successful registration", user });
  } catch (err) {
    console.log(err);
    res.status(500).send("Error please try again later");
  }
};
