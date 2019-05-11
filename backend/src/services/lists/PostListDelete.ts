import { Request, Response, NextFunction } from "express";
import { Service, IMiddlewareFunction } from "..";
import { ListManager } from "../../controllers";
import { List } from "../../entity";

export class PostListDelete extends Service {
  public getRoute(): string {
    return "POST /list/:listId/delete";
  }

  public execute(): IMiddlewareFunction {
    return ({ params: { listId } }, response: Response, __: NextFunction) => {
      ListManager.remove(listId)
        .then(response.json)
        .catch(err => response.json(err));
    };
  }
}
