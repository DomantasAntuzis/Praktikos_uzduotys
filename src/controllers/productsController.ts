import { Request, Response } from "express";
import * as query from "../models/products";
// import logger from '../config/logger';

export function addItem(req: Request, res: Response): void {
  const { pavadinimas, aprasymas, pirkimo_suma, pardavimo_suma, likutis } = req.body;

  const itemParams = {
    pavadinimas,
    aprasymas,
    pirkimo_suma,
    pardavimo_suma,
    likutis,
  };

  query
    .addItem(itemParams)
    .then((result: any) => {
      // logger.info(
      //   `Added new item: ${pavadinimas}. Updated data: aprasymas: ${aprasymas}, pirkimo_suma: ${pirkimo_suma}, pardavimo suma: ${pardavimo_suma}, likutis: ${likutis}`
      // );
      res.status(200).json({
        success: true,
        message: "Item added successfully",
        data: result,
      });
    })
    .catch((error: Error) => {
      // logger.error("Failed to create sell order", error);
      res.status(500).json({
        success: false,
        message: "Failed to add item",
        error: error.message,
      });
    });
}


export function updateItem(req: Request, res: Response): void {
  const itemId: string = req.params.id;
  const { id, ...updatedFields } = req.body;

  query
    .updateItem({
      id: itemId,
      ...updatedFields,
    })
    .then((updateResult: any) => {
      if (updateResult[0].affectedRows > 0) {
        // logger.info(
        //   `Item with id: ${itemId} was updated successfully. Updated columns: ${JSON.stringify(updatedFields)}`
        // );
        res.status(200).json({ message: "Item updated successfully" });
      } else {
        // logger.info(`Item with id: ${itemId} was not found`);
        res.status(404).json({ error: "Item not found" });
      }
    })
    .catch((error: Error) => {
      // logger.error("Failed to update item", error);
      res.status(500).json({ error: "Internal server error" });
    });
}
