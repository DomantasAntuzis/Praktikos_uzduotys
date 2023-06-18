import bcrypt from "bcrypt";
import { UserRepository } from "../repositories/UserRepository.js";

export class AuthService {
  static async register(email: string, password: string): Promise<void> {
    const hashedPassword = await bcrypt.hash(password, 10);
    await UserRepository.createUser(email, hashedPassword);
  }

  static async login(vartotojo_vardas: string, slaptazodis: string): Promise<boolean> {
    const user = await UserRepository.findUserByVartotojoVardas(vartotojo_vardas);
    console.log("user:", user);
    
    if (!user) {
      console.log("User not found");
      return false;
    }

    const passwordMatch = await bcrypt.compare(slaptazodis, user.dataValues.slaptazodis);
    console.log("Password Match:", passwordMatch);
    return passwordMatch;
  }

  static async getUserPermissions(username: string): Promise<number | null | undefined> {
    const user = await UserRepository.findUserByVartotojoVardas(username);
    return user ? user.dataValues.leidimai : null;
  }
}
