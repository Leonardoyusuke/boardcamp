import { db } from "../Config/dataBase.js";


export async function customersGet(req, res){
    try {
        const customers = await db.query("SELECT * FROM customers")
        res.send(customers.rows)
    } catch (error) {
        res.status(500).send(error.message);
    }
}

export async function customersIdGet(req, res){
    const id = req.params.id
    try {
        const customers = await db.query("SELECT * FROM customers Where id = $1",[id])
        if(!customers.rowCount ){
            return res.send(404)
        }
        else {
            res.send(customers.rows[0])
        }
        
    } catch (error) {
        res.status(500).send(error.message);
    }
}

export async function customersPost(req, res){
    const {name,phone,cpf,birthday} = req.body

    try {
        const cpfValidation = await db.query(`SELECT * FROM customers WHERE cpf = $1`,[cpf])
        console.log(cpfValidation)
        if(cpfValidation.rowCount > 0){
            return res.sendStatus(409)
        }
        await db.query(`INSERT INTO customers (name, phone ,cpf ,birthday)
         VALUES ($1,$2,$3,$4)`,[name,phone,cpf,birthday])
        res.sendStatus(201)
    } catch (error) {
        res.status(500).send(error.message);
    }
}

export async function customersPut(req, res){
    const id = req.params.id
    const {name,phone,cpf,birthday} = req.body

    try {
        const cpfValidation = await db.query(`SELECT id FROM customers WHERE cpf and id = $1`,[cpf,id])
        if(cpfValidation.rowCount > 0){
          return res.sendStatus(409)
   }
        await db.query(`UPDATE customers set 
        name = $1,
        phone = $2, 
        cpf = $3, 
        birthday = $4
        Where id = $5`
        ,[name,phone,cpf,birthday,id])
        res.sendStatus(200)
    } catch (error) {
        res.status(500).send(error.message);
    }


}