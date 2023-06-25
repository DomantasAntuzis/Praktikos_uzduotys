import { Request, Response, NextFunction } from "express";
import Joi from "joi";
// import logger from "../config/logger.js";
import { ProduktaiService } from "../services/produktaiService.js";
import { OperacijosService } from "../services/operationsService.js";

export async function buyOrder(req: Request, res: Response, next: NextFunction): Promise<void> {
  interface IOrder {
    produkto_id: number;
    kiekis: number;
  }

  const orderSchema = Joi.object<IOrder>({
    produkto_id: Joi.number().greater(0).integer().required(),
    kiekis: Joi.number().greater(0).integer().required(),
  });

  const validation = orderSchema.validate(req.body);

  if (validation.error) {
    // logger(`Validation error while creating order ${validation.error.message}`);
    res.status(400).json({
      success: false,
      message: "Invalid request data",
      error: validation.error.details.map(detail => detail.message),
    });
    return;
  }

  try {
    const { produkto_id, kiekis } = validation.value;
    const item = await ProduktaiService.findProduktaiById(produkto_id);
    if (!item) {
      // logger(`Item with id: ${produkto_id} not found`);
      res.status(404).json({ error: "Item not found" });
      return;
    }
    const kaina = item.dataValues.pirkimo_suma;
    const suma = kiekis * -kaina;
    const currentLikutis = item.dataValues.likutis;
    const likutis = currentLikutis + kiekis;
    await ProduktaiService.updateProduktai(produkto_id, { likutis });
    await OperacijosService.addOperacija({ produkto_id, kiekis, kaina, suma });
    // logger(`Buy order created successfully for item: ${produkto_id}. Amount bought: ${kiekis} for a total of: ${suma}`);
    res.status(200).json({
      success: true,
      message: "Buy order was successful",
    });
  } catch (error) {
    // logger(`Failed to make buy order ${error}`);
    next(error);
  }
}

export async function sellOrder(req: Request, res: Response, next: NextFunction): Promise<void> {
  interface IOrder {
    produkto_id: number;
    kiekis: number;
  }

  const orderSchema = Joi.object<IOrder>({
    produkto_id: Joi.number().greater(0).integer().required(),
    kiekis: Joi.number().greater(0).integer().required(),
  });

  const validation = orderSchema.validate(req.body);

  if (validation.error) {
    // logger(`Validation error while creating order ${validation.error.message}`);
    res.status(400).json({
      success: false,
      message: "Invalid request data",
      error: validation.error.details.map(detail => detail.message),
    });
    return;
  }

  try {
    const { produkto_id, kiekis } = validation.value;
    const item = await ProduktaiService.findProduktaiById(produkto_id);
    if (!item) {
      // logger(`Item with id: ${produkto_id} not found`);
      res.status(404).json({ error: "Item not found" });
      return;
    }
    const kaina = item.dataValues.pardavimo_suma;
    const suma = kiekis * kaina;
    const currentLikutis = item.dataValues.likutis;
    const likutis = currentLikutis - kiekis;

    if (likutis < 0) {
      // logger(`Not enough stock for item: ${produkto_id}`);
      res.status(400).json({ error: "Out of stock" });
      return;
    }

    await ProduktaiService.updateProduktai(produkto_id, { likutis });
    await OperacijosService.addOperacija({ produkto_id, kiekis, kaina, suma });
    // logger(`Sell order created successfully for item: ${produkto_id}. Amount sold: ${kiekis} for a total of: ${suma}`);
    res.status(200).json({
      success: true,
      message: "Sell order was successful",
    });
  } catch (error) {
    // logger(`Failed to make sell order ${error}`);
    next(error);
  }
}

export async function showOrders(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const allOrders = await OperacijosService.getAllOperacijos();
    res.status(200).json({
      message: allOrders,
    });
  } catch (error) {
    // logger(`Failed to get orders ${error}`);
    next(error);
  }
}
