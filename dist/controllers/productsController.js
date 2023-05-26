import logger from "../config/logger.js";
import Joi from "joi";
import Produktai from "../models/products.js";
export async function addItem(req, res, next) {
    const addItemSchema = Joi.object({
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
        logger.info(`Added new item: ${validData}`);
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
export async function updateItem(req, res, next) {
    const updateItemSchema = Joi.object({
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
        const updateResult = await Produktai.update({ pavadinimas: validData?.pavadinimas, aprasymas: validData?.aprasymas, pirkimo_suma: validData?.pirkimo_suma, pardavimo_suma: validData?.pardavimo_suma, likutis: validData?.likutis }, { where: { id: validData.id } });
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
export async function showItems(req, res, next) {
    try {
        const allItems = await Produktai.findAll();
        res.status(200).json({
            message: allItems,
        });
    }
    catch (error) {
        logger.error("Failed to find items", error);
        next(error);
    }
}
