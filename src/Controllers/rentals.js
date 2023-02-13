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

    try {
        const pricePerDay = await db.query(`SELECT "pricePerDay" FROM games WHERE id = $1`,[gameId])
        const originalPrice = pricePerDay * daysRented 
        const validationCustomer = await db.query(`SELECT * From customers WHERE id = $1`,[customerId])
        const validationDaysRented = await db.query(`SELECT "stockTotal" From games WHERE id = $1`,[gameId])
    
        if(validationDaysRented.rowCount < 1 ){
            return res.sendStatus(400)
        }
        if(validationCustomer.rowCount < 1 || daysRented <= 0){
            return res.sendStatus(400)
        }
        await db.query(`INSERT INTO rentals (
            "customerId",
            "gameId",
            "rentDate",
            "daysRented",
            "returnDate",
            "originalPrice",
            "delayFee",
            customer,
            game
            ) 
            Values($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)`,
            [customerId,gameId,rentDate,daysRented,returnDate,originalPrice,delayFee,customerId,gameId]
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