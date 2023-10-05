import express from 'express';
import { HttpError } from "./errors";

export const errorMiddleware = () => (err: HttpError, _: express.Request, res: express.Response, next: express.NextFunction) => {
  if(err instanceof HttpError) {
    res.status(err.code).send(err.message);
    return;
  }
  res.status(500).send('Internal server error');
}