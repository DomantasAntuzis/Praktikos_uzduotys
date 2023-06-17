import { Operacijos, OperacijosAttributes } from "../model/operations.js";

export class OperacijosRepository {
  static async createOperacija(data: OperacijosAttributes): Promise<Operacijos> {
    return Operacijos.create(data);
  }

  static async findAllOperacijos(): Promise<Operacijos[]> {
    return Operacijos.findAll();
  }
}
