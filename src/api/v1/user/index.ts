import { Router } from "express";

import { celebrate, Joi } from "celebrate";

import UserControllerService from "../../../controller/user";
import { Container } from "typedi";

const router = Router();
const UserController = Container.get(UserControllerService);

router.get("/", (req, res, next) => {
  UserController.getUsers(req, res, next);
});

router.post(
  "/",
  celebrate({
    body: Joi.object().keys({
      username: Joi.string().required(),
      password: Joi.string().required(),
      email: Joi.string()
        .email({ minDomainSegments: 2 })
        .required()
    })
  }),
  (req, res, next) => {
    UserController.registerUser(req, res, next);
  }
);

export default router;
