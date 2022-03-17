import express, { Request, Response } from "express";
import { collections } from "../mongo/database";

export const userRouter = express.Router();
userRouter.use(express.json());

userRouter.get("/", async (_req: Request, res: Response) => {
  const users = await collections.users?.find({}).toArray();

  res.status(200).send(users);
});
