import { Service, Inject } from "typedi";
import UserModel from "../models/User";
import { Logger } from "winston";
import { IUserData, IUserInput } from "../interface/IUser";

@Service()
export default class {
  @Inject("logger")
  logger: Logger;

  async getAllUsers(): Promise<IUserData[]> {
    try {
      const users = UserModel.find({}, { password: 0 });
      return users;
    } catch (err) {
      this.logger.error(err);
      throw new Error("Error fetching user data");
    }
  }

  async saveUser(user: IUserInput): Promise<IUserData> {
    try {
      const newUser = new UserModel({
        ...user
      });
      const out = await newUser.save();

      const temp = { ...out.toObject() };
      // delete password field
      delete temp.password;
      return temp;
    } catch (err) {
      this.logger.error(JSON.stringify(err));
      if (err.code == "11000") {
        throw new Error("Email already exists in database");
      }
      throw new Error("Error saving new user");
    }
  }
}
