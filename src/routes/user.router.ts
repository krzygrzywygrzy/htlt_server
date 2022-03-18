import express from "express";
import { login, register } from "../express/user.express";

export const userRouter = express.Router();
userRouter.use(express.json());

// userRouter.get("/", async (_req: Request, res: Response) => {
//   const users = (await collections.users
//     ?.find({})
//     .toArray()) as unknown as User[];

//   res.status(200).send(users);
// });

userRouter.post("/login", login);
userRouter.post("/register", register);
