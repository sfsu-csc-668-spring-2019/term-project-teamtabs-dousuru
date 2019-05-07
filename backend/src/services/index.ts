import { Request, Response, NextFunction } from "express";

export interface IMiddlewareFunction {
  (request: Request, response: Response, next: NextFunction): void;
}

export interface IService {
  getRoute(): string;
  execute(): IMiddlewareFunction;
}
