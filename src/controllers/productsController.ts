import { Request, Response, NextFunction } from "express";
import logger from "../config/logger.js";
import Joi from "joi";
import Produktai from "../models/products.js";

export async function addItem(req: Request, res: Response, next: NextFunction): Promise<void> {
  interface IAdd {
    id: number;
    pavadinimas: string;
    aprasymas: string;
    pirkimo_suma: number;
    pardavimo_suma: number;
    likutis: 0;
  }
  
  const addItemSchema = Joi.object<IAdd>({
    pavadinimas: Joi.string().required(),
    aprasymas: Joi.string().required(),
    pirkimo_suma: Joi.number().required(),
    pardavimo_suma: Joi.number().required(),
    likutis: Joi.number().optional(),
  });

  const validation = addItemSchema.validate(req.body);

  try {
    const validData = validation.value;
    const validationError = validation.error;

    if (validationError) {
      logger.error("Validation error while adding item", validationError);
      res.status(400).json({
        success: false,
        message: "Invalid request data",
        error: validationError.details.map(detail => detail.message),
      });
      return;
    }

    
    const result = await Produktai.create(validData);
    console.log("result", result.id);

    logger.info(
      `Added new item: ${result.dataValues}`,
    );
    res.status(200).json({
      success: true,
      message: "Item added successfully",
      data: {
        id: result.id,
        pavadinimas: result.dataValues.pavadinimas,
        aprasymas: result.dataValues.aprasymas,
        pirkimo_suma: result.dataValues.pirkimo_suma,
        pardavimo_suma: result.dataValues.pardavimo_suma,
      },
    });
  } catch (error) {
    logger.error("Failed to add item", error);
    next(error);
  }
}

export async function updateItem(req: Request, res: Response, next: NextFunction): Promise<void> {
  interface IUpdate {
    id: number;
    pavadinimas?: string;
    aprasymas?: string;
    pirkimo_suma?: number;
    pardavimo_suma?: number;
    likutis?: number;
  }
  
  const updateItemSchema = Joi.object<IUpdate>({
    id: Joi.string().required(),
    pavadinimas: Joi.string().optional(),
    aprasymas: Joi.string().optional(),
    pirkimo_suma: Joi.number().optional(),
    pardavimo_suma: Joi.number().optional(),
    likutis: Joi.number().optional(),
  });

  const validation = updateItemSchema.validate(req.body);

  try {
    const validData = validation.value;
    const validationError = validation.error;

    if (validationError) {
      logger.error("Validation error while updating item", validationError);
      res.status(400).json({
        success: false,
        message: "Invalid request data",
        error: validationError.details.map(detail => detail.message),
      });
      return;
    }

    const updateResult = await Produktai.update( { pavadinimas: validData?.pavadinimas, aprasymas: validData?.aprasymas, pirkimo_suma: validData?.pirkimo_suma, pardavimo_suma: validData?.pardavimo_suma, likutis: validData?.likutis }, { where: { id: validData!.id } });

    if (updateResult[0] > 0) {
      logger.info(`Item with id: ${validData!.id} was updated successfully.`);
      res.status(200).json({ message: "Item updated successfully" });
    } else {
      logger.info(`Item with id: ${validData!.id} was not found`);
      res.status(404).json({ error: "Item not found" });
    }
  } catch (error) {
    logger.error("Failed to update item", error);
    next(error);
  }
}

export async function showItems(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const allItems = await Produktai.findAll();
    res.status(200).json({
      message: allItems,
    });
  } catch (error) {
    logger.error("Failed to find items", error);
    next(error);
  }
}
