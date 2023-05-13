import { Request, Response } from "express";
import * as query from "../models/operations";
import * as query2 from "../models/products";
// import logger from "../config/logger";

export function buyOrder(req: Request, res: Response): void {
  let { produkto_id, kiekis } = req.body;
  kiekis = parseInt(kiekis, 10);

  query
    .findItem({ id: produkto_id })
    .then((item: any) => {
      const kaina = parseFloat(item[0][0].pirkimo_suma);
      const suma = kiekis * -kaina;
      const currentLikutis = item[0][0].likutis;
      const likutis = currentLikutis + kiekis;
      const id = Number(produkto_id);

console.log(id, kiekis, kaina, suma);

      query2.updateItem({
        id,
        likutis,
      });

      query
        .createOrder({
          produkto_id: id,
          kiekis,
          kaina,
          suma,
        })
        .then(() => {
          res.status(200).json({
            success: true,
            message: "Buy order was successful",
          });
        })
        .catch((error: Error) => {
          console.log("this1")
          res.status(500).json({
            success: false,
            message: "Failed to make buy order",
            error: error.message,
          });
        });
      })
      .catch((error: Error) => {
      console.log("this2")
      res.status(500).json({
        success: false,
        message: "Failed to make buy order",
        error: error.message,
      });
    });
}


export function sellOrder(req: Request, res: Response): void {
  let { produkto_id, kiekis } = req.body;
  kiekis = parseInt(kiekis, 10);

  query
    .findItem({ id: produkto_id })
    .then((item: any) => {
      const kaina = item[0][0].pirkimo_suma;
      const suma = kiekis * kaina;
      const currentLikutis = item[0][0].likutis;
      const likutis = currentLikutis - kiekis;
      let id = produkto_id;

      query2.updateItem({
        id,
        likutis,
      });

      query.createOrder({produkto_id, kiekis, kaina, suma});

      // logger.info(`Sell order created successfully for item: ${produkto_id}. Amount sold: ${kiekis} for a total of: ${suma}`);
      res.status(200).json({
        success: true,
        message: "Sell order was successful",
      });
    })
    .catch((error: Error) => {
      // logger.error("Failed to create sell order", error);
      res.status(500).json({
        success: false,
        message: "Failed to make sell order",
        error: error.message,
      });
    });
}
