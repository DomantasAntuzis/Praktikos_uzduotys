import { Request, Response, NextFunction } from "express";
import { ProduktaiService } from "../services/produktaiService.js";
import Produktai from "../model/products.js";

export async function addProduktai(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const data: Produktai = req.body;
    const result = await ProduktaiService.addProduktai(data);

    res.status(201).json({
      success: true,
      message: "Item added successfully",
      data: {
        id: result.id,
        pavadinimas: result.pavadinimas,
        aprasymas: result.aprasymas,
        pirkimo_suma: result.pirkimo_suma,
        pardavimo_suma: result.pardavimo_suma,
      },
    });
  } catch (error) {
    next(error);
  }
}

export async function updateProduktai(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { id, ...data }: { id?: number; [key: string]: any } = req.body;

    if (!id) {
      res.status(400).json({ error: "ID must be provided" });
      return;
    }

    const success = await ProduktaiService.updateProduktai(id, data);

    if (success) {
      res.status(200).json({ message: "Item updated successfully" });
    } else {
      res.status(404).json({ error: "Item not found" });
    }
  } catch (error) {
    next(error);
  }
}

export async function getAllProduktai(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const allItems = await ProduktaiService.getAllProduktai();
    res.status(200).json(allItems);
  } catch (error) {
    next(error);
  }
}
