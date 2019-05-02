import { User } from "../entity";

export class UserManager {
  static async createAccount(email: string, password: string): Promise<User> {
    const user = await User.create({
      email,
      password,
      displayName: "a coasdol new display name",
      userName: "a user fsdaname"
    });
    return user.save();
  }
}
