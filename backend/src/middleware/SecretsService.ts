import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import HashIds from "hashids";
import { Organization } from "../entity";

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

  private static get hasher(): HashIds {
    return new HashIds(process.env.APP_SECRET, 6);
  }

  static async generateInvite(organization: Organization): Promise<string> {
    return SecretsService.hasher.encode(organization.id);
  }

  static async getOrganizationFromInvite(
    invite: string
  ): Promise<Organization> {
    const id = SecretsService.hasher.decode(invite)[0];
    return await Organization.findOne(id);
  }
}

interface TokenPayload {
  userId: number;
}
