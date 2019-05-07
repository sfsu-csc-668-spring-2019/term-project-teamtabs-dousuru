import { Request, Response } from "express";
import { NextFunction } from "connect";

import { SecretsService } from "../../controllers/SecretsService";
import { UserManager } from "../../controllers/UserManager";
import { IService } from "..";

export default class PutUserSignup implements IService {
  getRoute() {
    return "PUT /signup";
  }

  execute() {
    return (
      { body: { email, password, displayName, userName, icon } }: Request,
      response: Response,
      next: NextFunction
    ) => {
      this.validate(email, password, displayName, userName)
        .then(_ => SecretsService.encrypt(password))
        .then(encryptedPassword =>
          UserManager.createAccount(
            email,
            encryptedPassword,
            displayName,
            userName,
            icon
          )
        )
        .then(({ id }) =>
          response.json({ token: SecretsService.createToken(id) })
        )
        .catch(_ => response.sendStatus(500));
    };
  }

  validate(
    email: string,
    password: string,
    displayName: string,
    username: string
  ) {
    if (!email || !password || !displayName || !username) {
      return Promise.reject();
    } else {
      return Promise.resolve();
    }
  }
}
