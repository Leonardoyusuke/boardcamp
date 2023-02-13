import { db } from "../Config/dataBase.js";
import dayjs from "dayjs";

export async function rentalsGet (req, res){
    try {
        const rentals = await db.query("SELECT * FROM rentals")
        res.send(rentals.rows)
    } catch (error) {
        res.status(400).send(error.message)
    }

}
export async function rentalsPost (req, res){
    const {customerId , gameId, daysRented} = req.body
    const rentDate = dayjs().format("YYYY-MM-DD")
    const returnDate = null
    const delayFee = null
    console.log(daysRented)

    try {
        const pricePerDay = await db.query(`SELECT "pricePerDay" FROM games WHERE id = $1`,[gameId])
        const originalPrice = pricePerDay.rows[0].pricePerDay * daysRented 
        const validationCustomer = await db.query(`SELECT * From customers WHERE id = $1`,[customerId])
        const validationDaysRented = await db.query(`SELECT "stockTotal" From games WHERE id = $1`,[gameId])
        console.log(validationDaysRented.rows[0].stockTotal,"days rents")
        if(validationDaysRented.rows[0].stockTotal < daysRented){
            return res.sendStatus(400)

        }        
        

        if(validationDaysRented.rowCount < 1 ){
            return res.sendStatus(400)
        }
        if(validationCustomer.rowCount < 1  || gameId < 0 || daysRented <= 0){
            return res.sendStatus(400)
        }

        await db.query(`INSERT INTO rentals (
            "customerId",
            "gameId",
            "rentDate",
            "daysRented",
            "returnDate",
            "originalPrice",
            "delayFee"
            ) 
            Values($1,$2,$3,$4,$5,$6,$7)`,
            [customerId,gameId,rentDate,daysRented,returnDate,originalPrice,delayFee]
            )
            res.sendStatus(201)
        
            

    } catch (error) {
        res.status(400).send(error.message)

    }
}
export async function rentalsEndPost (req, res){
const id = req.params.id
const returnDate = dayjs().format("YYYY-MM-DD")
try {
    const dayRented = await db.query(`SELECT "daysRented" FROM rentals where id = $1`,[id])
    const daysRented = dayRented.rows[0].daysRented
    const rentalDate = await db.query(`SELECT "rentDate" FROM rentals where id = $1`,[id] )
    const fee =  dayjs(returnDate).diff(rentalDate.rows[0].rentDate, 'day') - Number(daysRented)
    if (rentalDate.rows.length === 0) {
        return res.sendStatus(404)
    }
	if (rentalDate.rows[0].returnDate !== null){
         return res.sendStatus(400) 
    }
    console.log(fee)
    if (fee >= 1){
        console.log(rentalDate)
        const unitaryPrice = await db.query(`SELECT * FROM games WHERE id = $1`,[rentalDate.rows[0].gameId])
        const delayFee = fee * unitaryPrice.rows[0].pricePerDay
        await db.query(`UPDATE rentals SET "delayFee" = $1 WHERE "id" = $2`,[delayFee,id])
    }
    return res.sendStatus(200)


} catch (error) {
    res.status(400).send(error.message)

}


}
export async function rentalsDelete (req, res){
    const id = req.params.id
    try {
        let rental = await db.query('SELECT * FROM rentals WHERE "id" = $1', [id]);
        rental = rental.rows[0];
        if (!rental){ 
            return res.sendStatus(404)
        }
    
        if (!rental.returnDate){
            return res.sendStatus(400)
        }
    
        await db.query('DELETE FROM rentals WHERE "id" = $1', [id]);
    
        return res.sendStatus(200);
      } catch (error) {
        return res.status(500).send(error);
      }
    }