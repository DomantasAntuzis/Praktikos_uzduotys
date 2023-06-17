import { OperacijosRepository } from "../repositories/operationsRepository.js";
import { Operacijos, OperacijosAttributes } from "../model/operations.js";

export class OperacijosService {
  static async addOperacija(data: OperacijosAttributes): Promise<Operacijos> {
    return OperacijosRepository.createOperacija(data);
  }

  static async getAllOperacijos(): Promise<Operacijos[]> {
    return OperacijosRepository.findAllOperacijos();
  }
}
