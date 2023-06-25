import { Request, Response } from "express";
// import logger from "../config/logger.js";

export function errorHandlingMiddleware(err: Error, req: Request, res: Response): void {
  // logger(`${err.stack}`);
  console.log(err.stack);

  res.status(500).json({ error: "Internal Server Error" });
}
