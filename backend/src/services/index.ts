import { Request, Response, NextFunction } from "express";
import { AuthRequest } from "../types/AuthRequest";
import authenticate from "../middleware/authMiddleware";

export interface IMiddlewareFunction {
  (request: Request, response: Response, next: NextFunction): void;
}

export interface IService {
  getRoute(): string;
  execute(): IMiddlewareFunction;
}

export abstract class Service implements IService {
  public abstract getRoute(): string;
  public abstract execute(): IMiddlewareFunction;
}

export interface IAuthenticatedMiddlewareFunction {
  (request: AuthRequest, response: Response, next: NextFunction): void;
}

export interface IAuthenticatedService {
  getRoute(): string;
  execute(): IMiddlewareFunction;
  authenticatedExecute(): IAuthenticatedMiddlewareFunction;
}

export abstract class AuthenticatedService implements IAuthenticatedService {
  public abstract getRoute(): string;
  public execute(): IMiddlewareFunction {
    return (request: Request, response: Response, _: NextFunction) => {
      authenticate(request, response, this.authenticatedExecute());
    };
  }
  public abstract authenticatedExecute(): IAuthenticatedMiddlewareFunction;
}
