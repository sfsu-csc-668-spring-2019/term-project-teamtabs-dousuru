import { User } from "./models";

export class UserManager {
  static async createAccount(email: string, password: string): Promise<User> {
    return await User.create({ email, password });
  }
}
