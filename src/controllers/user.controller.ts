import { Request, Response } from "express";
import User from "src/models/user";
import bcrypt from "bcrypt";
import { collections } from "src/mongo/database";
import jwt from "jsonwebtoken";

export const login = async (
  req: Request<any, any, { email: string; password: string }>,
  res: Response<{ token: string } | { error: string }>
) => {
  const { email, password } = req.body;

  console.log(email, password);
  res.send({ token: "" });
};

export const register = async (
  req: Request<any, any, User>,
  res: Response<{ token: string } | { error: string }>
) => {
  try {
    let user = req.body;
    if (!user.password) throw Error("No password provided!");

    bcrypt.hash(user.password, 10, async (err, hash) => {
      if (err) throw err;
      user.password = hash;

      const dbUser = (await collections.users!.insertOne(
        user
      )) as unknown as User;

      var token = jwt.sign({ id: dbUser.id! }, process.env.JWT_STRING!);
      res.status(200).send({ token });
    });
  } catch (err: any) {
    res.status(400).send({ error: err.message });
  }
};
