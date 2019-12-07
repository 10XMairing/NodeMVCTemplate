import * as parser from "body-parser";
import { errors as CelebrateErrors } from "celebrate";
import * as express from "express";
import * as cors from "cors";
import { Express } from "express";
import * as morgan from "morgan";
// routes
export default function(app: Express) {
  app.use(parser.json());
  app.use(
    parser.urlencoded({
      extended: false
    })
  );

  // cors

  app.use(cors());
  app.use(morgan("combined"));
  // load router
  app.use("/uploads", express.static("uploads"));
  //   load router
  require("../api/v1").default(app);

  app.get("/", (req, res, next) => {
    return res.status(200).json({
      message: "Hello Node Template!"
    });
  });

  app.use(CelebrateErrors());
  //  load routes
  // error handlers
  app.use((req, res, next) => {
    const err = new Error("Not found");
    err["status"] = 404;
    next(err);
  });

  app.use((err, req, res, next) => {
    /**
     * Handle 401 thrown by express-jwt library
     */
    if (err.name === "UnauthorizedError") {
      return res
        .status(err.status)
        .send({ message: err.message })
        .end();
    }
    return next(err);
  });
  app.use((err, req, res, next) => {
    res.status(err.status || 500);
    // return joi errors with a 404
    if (err.joi) {
      res.status(400);
      return res.json({
        message: err.joi.details[0].message || "Error"
      });
    }
    res.json({
      message: err.message,
      error: err
    });
  });
}
