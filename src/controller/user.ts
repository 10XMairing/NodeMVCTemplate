import { Service, Inject } from "typedi";
import { Request, Response, NextFunction } from "express";
import UserService from "../services/UserService";

@Service()
export default class UserController {
  @Inject()
  UserServiceIns: UserService;

  async getUsers(req: Request, res: Response, next: NextFunction) {
    try {
      const users = await this.UserServiceIns.getAllUsers();

      return res.status(200).json({
        message: "All users fetched from db",
        total: users.length,
        users
      });
    } catch (err) {
      err["status"] = 400;
      next(err);
    }
  }

  async registerUser(req: Request, res: Response, next: NextFunction) {
    try {
      const { username, email, password } = req.body;

      const user = await this.UserServiceIns.saveUser({
        username,
        email,
        password
      });

      return res.status(200).json({
        message: "User registered successfully",
        user
      });
    } catch (err) {
      err["status"] = 400;
      next(err);
    }
  }
}
