import { Express } from "express";
import UserRouter from "./user";
import { Response, Request, NextFunction } from "express";

export default function(app: Express) {
  app.use("/api/v1/user", UserRouter);

  app.get("/api/v1", (req: Request, res: Response, next: NextFunction) => {
    return res.status(200).json({
      routes: [
        {
          path: "/api/v1/user"
        }
      ]
    });
  });
}
