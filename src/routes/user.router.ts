import express, { Request, Response } from "express";
import User from "src/models/user";
import { collections } from "../mongo/database";

export const userRouter = express.Router();
userRouter.use(express.json());

userRouter.get("/", async (_req: Request, res: Response) => {
  const users = (await collections.users
    ?.find({})
    .toArray()) as unknown as User[];

  res.status(200).send(users);
});
