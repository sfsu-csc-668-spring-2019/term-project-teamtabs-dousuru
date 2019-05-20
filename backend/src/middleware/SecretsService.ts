import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export class SecretsService {
  static async encrypt(password: string): Promise<string> {
    const encrypted = await bcrypt.hash(password, 5);
    return encrypted;
  }

  static async compare(raw: string, encrypted: string): Promise<boolean> {
    return await bcrypt.compare(raw, encrypted);
  }

  static createToken(userId: number): string {
    return jwt.sign({ userId }, process.env.APP_SECRET);
  }

  static verifyToken(token: string): TokenPayload {
    return jwt.verify(token, process.env.APP_SECRET) as TokenPayload;
  }
}

interface TokenPayload {
  userId: number;
}
