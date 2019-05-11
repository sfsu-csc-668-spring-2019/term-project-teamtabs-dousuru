import { Request, Response, NextFunction } from "express";
import { Service, IMiddlewareFunction } from "..";
import { ListManager } from "../../controllers";
import { List } from "../../entity";

export class GetListData extends Service {
  public getRoute(): string {
    return "GET /list/:listId";
  }

  public execute(): IMiddlewareFunction {
    return (
      { params: { listId } }: Request,
      response: Response,
      __: NextFunction
    ) => {
      ListManager.getListData(listId)
        .then(list => {
          response.json(list);
        })
        .catch(err => {
          response.json(err);
        });
    };
  }
}
