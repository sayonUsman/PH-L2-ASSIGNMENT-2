import express, { Application, Request, Response } from "express";
import cors from "cors";
import { UserRoutes } from "./app/modules/user/user.routes";

const app: Application = express();

// parsers
app.use(express.json());
app.use(cors());

// application routes
app.use("", UserRoutes);

app.get("/", (req: Request, res: Response) => {
  res.send("Welcome");
});

export default app;
