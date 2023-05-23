import { Request, Response, NextFunction } from "express";
import logger from "../config/logger.js";

export function errorHandlingMiddleware(err: Error, req: Request, res: Response, next: NextFunction): void {
    logger.error(err.stack);

    res.status(500).json({ error: 'Internal Server Error' });
}
