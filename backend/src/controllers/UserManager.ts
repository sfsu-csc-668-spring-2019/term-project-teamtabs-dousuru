import { User } from "../entity";

export class UserManager {
  static async createAccount(email: string, password: string): Promise<User> {
    return await User.create({ email, password });
  }
}
