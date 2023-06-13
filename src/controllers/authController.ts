import { Request, Response } from "express";
import { AuthService } from "../services/authService.js";

export class AuthController {
  static async register(req: Request, res: Response): Promise<void> {
    const { vartotojo_vardas, slaptazodis } = req.body;

    try {
      await AuthService.register(vartotojo_vardas, slaptazodis);
      res.status(201).json({ message: "User registered successfully." });
    } catch (error) {
      res.status(500).json({ error: "Internal server error." });
    }
  }

  static async login(req: Request, res: Response): Promise<void> {
    const { vartotojo_vardas, slaptazodis } = req.body;

    try {
      const isAuthenticated = await AuthService.login(vartotojo_vardas, slaptazodis);
      if (isAuthenticated) {
        res.status(200).json({ message: "Login successful." });
      } else {
        res.status(401).json({ error: "Invalid credentials." });
      }
    } catch (error) {
      res.status(500).json({ error: "Internal server error." });
    }
  }
}
