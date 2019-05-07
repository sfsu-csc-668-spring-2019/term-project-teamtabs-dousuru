import { Request, Response } from "express";
import { NextFunction } from "connect";

interface IMiddlewareFunction {
  (request: Request, response: Response, next: NextFunction): void;
}

export interface IService {
  getRoute(): string;
  execute(): IMiddlewareFunction;
}
