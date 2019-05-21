import { SecretsService } from "./SecretsService";
import { User } from "../entity";

export default async function authenticateSocket(token: string): Promise<User> {
  if (!token) {
    return null;
  }
  try {
    const payload = SecretsService.verifyToken(token);
    const userId = payload.userId;
    return await User.findOne(userId);
  } catch (err) {
    console.error("Invalid auth token");
    return null;
  }
}
