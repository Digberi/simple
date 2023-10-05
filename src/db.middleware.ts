import express from "express";
import { DB } from "./types";

const db: DB = new Map();

export const dbMiddleware = () => (req: express.Request, res: express.Response, next: express.NextFunction) => {
  const context = {
    db
  }
  req.context = {
    ...req.context,
    ...context
  };
  next();
}