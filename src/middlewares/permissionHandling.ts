import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import Permissions from "../permissions.js";

const secretKey = "secret-key";

interface DecodedToken {
  vartotojo_vardas: string;
  permissions: number;
}

export function checkPermissions(requiredPermission: Permissions) {
  return function (req: Request, res: Response, next: NextFunction) {
    const token = req.headers.authorization?.split(" ")[1];

    if (token) {
      try {
        const decodedToken = jwt.verify(token, secretKey) as DecodedToken;

        if (decodedToken.permissions & requiredPermission) {
          next();
        } else {
          res.status(403).json({ error: "Insufficient permissions." });
        }
      } catch (error) {
        res.status(401).json({ error: "Invalid token." });
      }
    } else {
      res.status(401).json({ error: "Token is missing." });
    }
  };
}
