import Joi from "joi";

export const rentalSchema = Joi.object({
    customerId: Joi.number().min(1).required(),
    gameId: Joi.number().required(),
    daysRented: Joi.number().required()
  });