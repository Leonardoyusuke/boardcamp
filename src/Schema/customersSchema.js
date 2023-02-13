import Joi from "joi";

export const customersSchema = Joi.object({
    name: Joi.string().min(1).required(),
    phone: Joi.string().min(10).max(13).required(),
    cpf: Joi.string().min(11).max(11).required(),
    birthday: Joi.date().iso().required()
  });