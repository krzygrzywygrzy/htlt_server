import express, { Response } from "express";
import connectToDatabase from "./mongo/database";
import { userRouter } from "./routes/user.router";

const run = async () => {
  try {
    await connectToDatabase();

    const port = process.env.PORT || 8080;
    const app = express();
    app.use(express.json());
    app.use("/users", userRouter);

    app.get("/", (_, res: Response) => {
      res.send("Hello! Go Harder Than Last Time");
    });

    app.listen(port, () => {
      console.log(`Server started at :${port}`);
    });
  } catch (err: any) {
    console.error("Database connection failed", err);
    process.exit();
  }
};

run();
