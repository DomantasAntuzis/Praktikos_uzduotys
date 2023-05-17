import { Request, Response, NextFunction } from "express";
import Joi from "joi";
import logger from "../config/logger";
import { findItem, createOrder } from "../models/operations";
import { updateItem } from "../models/products";

const orderSchema = Joi.object({
  produkto_id: Joi.string().required(),
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
    const { produkto_id, kiekis } = req.body;
    const item = await findItem({ id: produkto_id });
    const kaina = parseInt(item[0][0].pirkimo_suma);
    const suma = kiekis * -kaina;
    const currentLikutis = item[0][0].likutis;
    const likutis = currentLikutis + kiekis;
    const id = produkto_id;
    await updateItem({ id, likutis });
    await createOrder({ produkto_id: id, kiekis, kaina, suma });
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
    const { produkto_id, kiekis } = req.body;
    const item = await findItem({ id: produkto_id });
    const kaina = item[0][0].pirkimo_suma;
    const suma = kiekis * kaina;
    const currentLikutis = item[0][0].likutis;
    const likutis = currentLikutis - kiekis;
    const id = produkto_id;
    await updateItem({ id, likutis });
    await createOrder({ produkto_id: id, kiekis, kaina, suma });
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
