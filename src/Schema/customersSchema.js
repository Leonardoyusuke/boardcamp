import Joi from "joi";

export const customersSchema = Joi.object({
    name: Joi.string().min(1).required(),
    phone: Joi.string().min(10).max(13).required(),
    cpf: Joi.string().valid("^[0-9]+$").required(),
    birthday: Joi.date().iso().required()
  });