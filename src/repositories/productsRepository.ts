import Produktai from "../model/products.js";

export class ProduktaiRepository {
  static async createProduktai(data: Produktai): Promise<Produktai> {
    return Produktai.create(data);
  }

  static async updateProduktai(id: number, data: Partial<Produktai>): Promise<[number, Produktai[]]> {
    const [affectedCount] = await Produktai.update(data, { where: { id } });
    const updatedProduktai = await Produktai.findAll({ where: { id } });
  
    return [affectedCount, updatedProduktai];
  }
  
  static async findAllProduktai(): Promise<Produktai[]> {
    return Produktai.findAll();
  }
}
