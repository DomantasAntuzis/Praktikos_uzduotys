import { Request, Response } from "express";
import { AuthService } from "../services/authService.js";
import Joi from "joi";
import logger from "../config/logger.js";

interface IAuth {
  vartotojo_vardas: string;
  slaptazodis: string;
}

const schema = Joi.object<IAuth>({
  vartotojo_vardas: Joi.string().required(),
  slaptazodis: Joi.string().required(),
});

export class AuthController {
  static async register(req: Request, res: Response): Promise<void> {
    const { vartotojo_vardas, slaptazodis } = req.body;

    const validation = schema.validate(req.body);

    if (validation.error) {
      logger.error("Validation error while registering user", validation.error);
      res.status(400).json({
        success: false,
        message: "Invalid request data",
        error: validation.error.details.map(detail => detail.message),
      });
      return;
    }

    try {
      await AuthService.register(vartotojo_vardas, slaptazodis);
      res.status(201).json({ message: "User registered successfully." });
    } catch (error) {
      logger.error("Failed to register user", error);
      res.status(500).json({ error: "Internal server error." });
    }
  }

  static async login(req: Request, res: Response): Promise<void> {
    const { vartotojo_vardas, slaptazodis } = req.body;

    const validation = schema.validate(req.body);

    if (validation.error) {
      logger.error("Validation error while logging in", validation.error);
      res.status(400).json({
        success: false,
        message: "Invalid request data",
        error: validation.error.details.map(detail => detail.message),
      });
      return;
    }

    try {
      const isAuthenticated = await AuthService.login(vartotojo_vardas, slaptazodis);
      if (isAuthenticated) {
        res.status(200).json({ message: "Login successful." });
      } else {
        res.status(401).json({ error: "Invalid credentials." });
      }
    } catch (error) {
      logger.error("Failed to perform login", error);
      res.status(500).json({ error: "Internal server error." });
    }
  }
}
