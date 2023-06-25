import { Request, Response, NextFunction } from "express";
import { ProduktaiService } from "../services/produktaiService.js";
import Produktai from "../model/products.js";
import Joi from "joi";
// import logger from "../config/logger.js";

export async function addProduktai(req: Request, res: Response, next: NextFunction): Promise<void> {
  const produktaiSchema = Joi.object<Produktai>({
    pavadinimas: Joi.string().required(),
    aprasymas: Joi.string().required(),
    pirkimo_suma: Joi.number().positive().required(),
    pardavimo_suma: Joi.number().positive().required(),
    likutis: Joi.number().optional(),
  });

  const validation = produktaiSchema.validate(req.body);

  if (validation.error) {
    // logger(`Validation error while adding item ${validation.error.message}`);
    res.status(400).json({
      success: false,
      message: "Invalid request data",
      error: validation.error.details.map(detail => detail.message),
    });
    return;
  }

  try {
    const { value } = validation;
    const result = await ProduktaiService.addProduktai(value);

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
    // logger(`Failed to add item ${error}`);
    next(error);
  }
}

export async function updateProduktai(req: Request, res: Response, next: NextFunction): Promise<void> {
  const updateItemSchema = Joi.object<Produktai>({
    id: Joi.number().required(),
    pavadinimas: Joi.string().optional(),
    aprasymas: Joi.string().optional(),
    pirkimo_suma: Joi.number().positive().optional(),
    pardavimo_suma: Joi.number().positive().optional(),
    likutis: Joi.number().optional(),
  });

  try {
    const validation = updateItemSchema.validate(req.body);
    if (validation.error) {
      // logger(`Validation error while updating item ${validation.error.message}`);
      res.status(400).json({
        success: false,
        message: "Invalid request data",
        error: validation.error.details.map(detail => detail.message),
      });
      return;
    }

    const { value } = validation;
    const { id, ...data } = value;
    const success = await ProduktaiService.updateProduktai(id, data);

    if (success) {
      res.status(200).json({ message: "Item updated successfully" });
    } else {
      res.status(404).json({ error: "Item not found" });
    }
  } catch (error) {
    // logger(`Failed to update item ${error}`);
    next(error);
  }
}

export async function getAllProduktai(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const allItems = await ProduktaiService.getAllProduktai();
    res.status(200).json(allItems);
  } catch (error) {
    // logger(`Failed to get all items ${error}`);
    next(error);
  }
}
