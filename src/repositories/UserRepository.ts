import User from "../model/users.js";

export class UserRepository {
  static async createUser(vartotojo_vardas: string, slaptazodis: string): Promise<User> {
    return User.create({ vartotojo_vardas, slaptazodis });
  }  

  static async findUserByVartotojoVardas(vartotojo_vardas: string): Promise<User | null> {
    return User.findOne({ where: { vartotojo_vardas } });
  }
}
