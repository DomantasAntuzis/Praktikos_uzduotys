import { Request, Response, NextFunction } from "express";
import Joi from "joi";
import logger from "../config/logger";
import Produktai from "../models/products";
import Operacijos from "../models/operations";

const orderSchema = Joi.object({
  produkto_id: Joi.number().required(),
  kiekis: Joi.number().required(),
});

export function validateOrderSchema(req: Request, res: Response, next: NextFunction): void {
  const { error: validationError } = orderSchema.validate(req.body);

  if (validationError) {
    logger.error("Validation error while creating order", validationError);
    res.status(400).json({
      success: false,
      message: "Invalid request data",
      error: validationError.details.map((detail) => detail.message),
    });
  } else {
    next();
  }
}

export async function buyOrder(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    let { produkto_id, kiekis } = req.body;
    const item = await Produktai.findByPk(produkto_id);
    if (!item) {
      logger.error(`Item with id: ${produkto_id} not found`);
      res.status(404).json({ error: "Item not found" });
      return;
    }
    kiekis = parseInt(kiekis);
    const kaina = item.pirkimo_suma;
    const suma = kiekis * -kaina;
    const currentLikutis = item.likutis;
    const likutis = currentLikutis + kiekis;
    await item.update({ likutis });
    await Operacijos.create({ produkto_id, kiekis, kaina, suma });
    logger.info(`Buy order created successfully for item: ${produkto_id}. Amount bought: ${kiekis} for a total of: ${suma}`);
    res.status(200).json({
      success: true,
      message: "Buy order was successful",
    });
  } catch (error) {
    logger.error("Failed to make buy order", error);
    next(error);
  }
}

export async function sellOrder(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    let { produkto_id, kiekis } = req.body;
    const item = await Produktai.findByPk(produkto_id);
    if (!item) {
      logger.error(`Item with id: ${produkto_id} not found`);
      res.status(404).json({ error: "Item not found" });
      return;
    }
    kiekis = parseInt(kiekis);
    const kaina = item.pirkimo_suma;
    const suma = kiekis * kaina;
    const currentLikutis = item.likutis;
    const likutis = currentLikutis - kiekis;
    await item.update({ likutis });
    await Operacijos.create({ produkto_id, kiekis, kaina, suma });
    logger.info(`Sell order created successfully for item: ${produkto_id}. Amount sold: ${kiekis} for a total of: ${suma}`);
    res.status(200).json({
      success: true,
      message: "Sell order was successful",
    });
  } catch (error) {
    logger.error("Failed to make sell order", error);
    next(error);
  }
}