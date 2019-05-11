import { Request, Response, NextFunction } from "express";
import { Service, IMiddlewareFunction } from "..";
import { ListManager } from "../../controllers";

export class PostListCreate extends Service {
  public getRoute(): string {
    return "POST /create";
  }

  public execute(): IMiddlewareFunction {
    return (
      { params: { name, description, projectId } }: Request,
      response: Response,
      __: NextFunction
    ) => {
      ListManager.createList(name, description, projectId)
        .then(list => {
          response.json(list);
        })
        .catch(err => {
          response.json(err);
        });
    };
  }
}
