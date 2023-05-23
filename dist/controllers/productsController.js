import logger from "../config/logger.js";
import Joi from "joi";
import Produktai from "../models/products.js";
const addItemSchema = Joi.object({
    pavadinimas: Joi.string().required(),
    aprasymas: Joi.string().required(),
    pirkimo_suma: Joi.number().required(),
    pardavimo_suma: Joi.number().required(),
    likutis: Joi.number().required(),
});
export async function addItem(req, res, next) {
    try {
        const { error: validationError, value: validData } = addItemSchema.validate(req.body);
        if (validationError) {
            logger.error("Validation error while adding item", validationError);
            res.status(400).json({
                success: false,
                message: "Invalid request data",
                error: validationError.details.map((detail) => detail.message),
            });
            return;
        }
        console.log(validData);
        const result = await Produktai.create(validData);
        logger.info(`Added new item: ${validData.pavadinimas}. Updated data: aprasymas: ${validData.aprasymas}, pirkimo_suma: ${validData.pirkimo_suma}, pardavimo suma: ${validData.pardavimo_suma}, likutis: ${validData.likutis}`);
        res.status(200).json({
            success: true,
            message: "Item added successfully",
            data: result,
        });
    }
    catch (error) {
        logger.error("Failed to add item", error);
        next(error);
    }
}
const updateItemSchema = Joi.object({
    id: Joi.string().required(),
    pavadinimas: Joi.string(),
    aprasymas: Joi.string(),
    pirkimo_suma: Joi.number(),
    pardavimo_suma: Joi.number(),
    likutis: Joi.number(),
});
export async function updateItem(req, res, next) {
    try {
        const { error: validationError, value: validData } = updateItemSchema.validate(req.body);
        if (validationError) {
            logger.error("Validation error while updating item", validationError);
            res.status(400).json({
                success: false,
                message: "Invalid request data",
                error: validationError.details.map((detail) => detail.message),
            });
            return;
        }
        const updateResult = await Produktai.update(validData, { where: { id: validData.id } });
        if (updateResult[0] > 0) {
            logger.info(`Item with id: ${validData.id} was updated successfully.`);
            res.status(200).json({ message: "Item updated successfully" });
        }
        else {
            logger.info(`Item with id: ${validData.id} was not found`);
            res.status(404).json({ error: "Item not found" });
        }
    }
    catch (error) {
        logger.error("Failed to update item", error);
        next(error);
    }
}
