import logger from "../config/logger.js";
export function errorHandlingMiddleware(err, req, res, next) {
    logger.error(err.stack);
    res.status(500).json({ error: 'Internal Server Error' });
}
