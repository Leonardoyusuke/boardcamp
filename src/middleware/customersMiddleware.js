import { db } from "../Config/dataBase.js";
import { customersSchema } from "../Schema/customersSchema.js";
import { customersPost } from "../Controllers/customers.js";

export function validationSchema(req,res,next) {
    const validation = customersSchema.validate(req.body,{abortEarly:true});
    console.log(validation,"validacao")

    if (validation.error) {
        return res.sendStatus(400);
      }
      next()
    }    
  