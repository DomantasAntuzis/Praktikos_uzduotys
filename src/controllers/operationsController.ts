import { Request, Response } from "express";
import * as query from "../models/operations";
import * as query2 from "../models/products";
import Joi from "joi";
import logger from "../config/logger";

const orderSchema = Joi.object({
  produkto_id: Joi.string().required(),
  kiekis: Joi.number().required(),
});

export function buyOrder(req: Request, res: Response): void {
  const { error: validationError, value: validData } = orderSchema.validate(
    req.body
  );

  if (validationError) {
    logger.error("Validation error while creating buy order", validationError);
    res.status(400).json({
      success: false,
      message: "Invalid request data",
      error: validationError.details.map((detail) => detail.message),
    });
    return;
  }

  let { produkto_id, kiekis } = validData;
  kiekis = parseInt(kiekis, 10);

  query
    .findItem({ id: produkto_id })
    .then((item: any) => {
      const kaina = parseInt(item[0][0].pirkimo_suma);
      const suma = kiekis * -kaina;
      const currentLikutis = item[0][0].likutis;
      const likutis = currentLikutis + kiekis;
      const id = produkto_id;

      query2
        .updateItem({ id, likutis })
        .then(() => {
          return query.createOrder({ produkto_id: id, kiekis, kaina, suma });
        })
        .then(() => {
          logger.info(`Buy order created successfully for item: ${produkto_id}. Amount bought: ${kiekis} for a total of: ${suma}`);
          res.status(200).json({
            success: true,
            message: "Buy order was successful",
          });
        })
        .catch((error: Error) => {
          logger.error("Failed to make buy order", error);
          res.status(500).json({
            success: false,
            message: "Failed to make buy order",
            error: error.message,
          });
        });
    })
    .catch((error: Error) => {
      logger.error("Failed to find item", error);
      res.status(500).json({
        success: false,
        message: "Failed to find item",
        error: error.message,
      });
    });
}

export function sellOrder(req: Request, res: Response): void {
  const { error: validationError, value: validData } = orderSchema.validate(req.body);

  if (validationError) {
    logger.error("Validation error while creating buy order", validationError);
    res.status(400).json({
      success: false,
      message: "Invalid request data",
      error: validationError.details.map((detail) => detail.message),
    });
    return;
  }

  let { produkto_id, kiekis } = validData;

  kiekis = parseInt(kiekis, 10);

  query
    .findItem({ id: produkto_id })
    .then((item: any) => {
      const kaina = item[0][0].pirkimo_suma;
      const suma = kiekis * kaina;
      const currentLikutis = item[0][0].likutis;
      const likutis = currentLikutis - kiekis;
      const id = produkto_id;

      query2
        .updateItem({ id, likutis })
        .then(() => {
          return query.createOrder({ produkto_id: id, kiekis, kaina, suma });
        })
        .then(() => {
          logger.info(`Sell order created successfully for item: ${produkto_id}. Amount sold: ${kiekis} for a total of: ${suma}`);
          res.status(200).json({
            success: true,
            message: "Sell order was successful",
          });
        })
        .catch((error: Error) => {
          logger.error("Failed to make sell order", error);
          res.status(500).json({
            success: false,
            message: "Failed to make sell order",
            error: error.message,
          });
        });
    })
    .catch((error: Error) => {
      logger.error("Failed to find item", error);
      res.status(500).json({
        success: false,
        message: "Failed to find item",
        error: error.message,
      });
    });
}
