import { User } from "../entity";

export class UserManager {
  static async createAccount(email: string, password: string, displayName: string, userName: string, icon: string): Promise<User> {
    const user = await User.create({
      email,
      password,
      displayName,
      userName,
      icon
    });
    return user.save();
  }


  //deleteAccount



  //get all accounts in organization



  //get all accounts in project


  //find account by email
}
