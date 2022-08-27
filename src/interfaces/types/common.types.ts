import { Request, Response, NextFunction } from 'express';

export type RequestHandler<Req = Request, Res = Response> = (
  req: Req,
  res: Res,
  next: NextFunction
) => Promise<any>;
