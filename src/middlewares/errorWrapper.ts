import { RequestHandler, NextFunction, Request, Response } from 'express';

const errorWrapper =
  (handler: RequestHandler) =>
  (req: Request, res: Response, next: NextFunction) => {
    return Promise.resolve(handler(req, res, next)).catch(next);
  };

export default errorWrapper;
