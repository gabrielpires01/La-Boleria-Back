import { connection } from "../database.js";

const postOrders = async (req, res) => {
	const {clientId, cakeId, quantity, totalPrice} = req.body;

	if (quantity >= 5 || quantity%1 !== 0 ) return res.sendStatus(400)

	try {
		const client = await connection.query(`SELECT * FROM clients WHERE id = $1`, [clientId])
		if (!client.rowCount) return res.sendStatus(404)

		const cake = await connection.query(`SELECT * FROM cakes WHERE id = $1`, [cakeId])
		if (!cake.rowCount) return res.sendStatus(404)
		
		await connection.query(`
			INSERT INTO orders 
				("clientId", "cakeId", quantity, "createdAt", "totalPrice")
			VALUES ($1,$2,$3,$4,$5)
		`, [clientId,cakeId, quantity, new Date(), totalPrice])

		return res.sendStatus(201)
	}catch(err) {
		return res.status(500).send(err)
	}
}

export { postOrders };