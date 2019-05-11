import { Request, Response, NextFunction } from "express";
import { Service, IMiddlewareFunction } from "..";
import { TaskManager } from "../../controllers";

export class GetTaskData extends Service {
  public getRoute(): string {
    return "GET /id/:taskId";
  }

  public execute(): IMiddlewareFunction {
    return (
      { params: { taskId } }: Request,
      response: Response,
      __: NextFunction
    ) => {
      TaskManager.getTaskData(taskId)
        .then(task => {
          response.json(list);
        })
        .catch(err => {
          response.json(err);
        });
    };
  }
}
