import { db } from "../Config/dataBase.js"
export async function gamesGet(req, res){
    try {
        const games = await db.query("SELECT * FROM games")
        res.send(games)
    } catch (error) {
        res.status(500).send(error.message);
    }

}

export async function gamesPost(req, res){
    const {name,image,stockTotal,pricePerDay} = req.body
    if(!name || name.lenght === 0 ){
        return res.send(400) 
    }
    if(stockTotal <= 0 ||pricePerDay <= 0){
        return res.send(400) 
    }
    try {
        const validation = await db.query(`SELECT * FROM games WHERE name = $1`,[name])
        if(validation.rowCount > 0){
            return res.sendStatus(409)
        }
        await db.query(`INSERT INTO games (name, image ,"stockTotal" ,"pricePerDay")
         VALUES ($1,$2,$3,$4)`,[name,image,stockTotal,pricePerDay])
        res.sendStatus(201)
    } catch (error) {
        res.status(500).send(error.message);

    }

}

