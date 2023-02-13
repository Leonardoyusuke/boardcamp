import { rentalSchema } from "../Schema/rentalSchema.js";

export function validationSchemaRental(req,res,next) {
    const validation = rentalSchema.validate(req.body,{abortEarly:true});
    console.log(validation,"validacao")

    if (validation.error) {
        return res.sendStatus(400);
      }
      next()
    }    
  