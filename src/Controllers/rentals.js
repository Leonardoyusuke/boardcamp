import { db } from "../Config/dataBase.js";
import dayjs from "dayjs";

export async function rentalsGet (req, res){
    try {
        const rentals = await db.query("SELECT * FROM rentals")
        res.send(rentals.rows)
    } catch (error) {
        res.status(500).send(error.message);
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
        console.log(validationCustomer.rowCount,"validacao")
        if(validationDaysRented.rowCount < 1 ){
            return res.sendStatus(400)
        }
        if(validationCustomer.rowCount < 1  || daysRented <= 0){
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
        res.status(500).send(error.message);

    }
}
export async function rentalsEndPost (req, res){
    
}
export async function rentalsDelete (req, res){
    
}