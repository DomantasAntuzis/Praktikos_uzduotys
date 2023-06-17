import { ProduktaiRepository } from "../repositories/productsRepository.js";
import Produktai from "../model/products.js";

export class ProduktaiService {
  static async addProduktai(data: Produktai): Promise<Produktai> {
    return ProduktaiRepository.createProduktai(data);
  }

  static async updateProduktai(id: number, data: Partial<Produktai>): Promise<boolean> {
    const [updateCount] = await ProduktaiRepository.updateProduktai(id, data);
    return updateCount > 0;
  }

  static async getAllProduktai(): Promise<Produktai[]> {
    return ProduktaiRepository.findAllProduktai();
  }

  static async findProduktaiById(id: number): Promise<Produktai | null> {
    return ProduktaiRepository.findProduktaiById(id);
  }
}
