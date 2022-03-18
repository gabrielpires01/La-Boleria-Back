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

const getOrders = async(req, res) => {
	const { date } = req.query;
	 
	let expression = '';
	if (date) {
		expression = `WHERE "createdAt" >= '${date}'::date AND "createdAt" < ('${date}'::date + '1 day'::interval)`
	}
	
	try {
		const orders = await connection.query(`SELECT * FROM orders ${expression}`);
		if (!orders.rowCount) return res.sendStatus(404)
		
		const orderList = await Promise.all(orders.rows.map(async (order) => {
			const client = await connection.query(`SELECT * FROM clients WHERE id = $1`, [order.clientId])
			const cake = await connection.query(`SELECT * FROM cakes WHERE id = $1`, [order.cakeId])
			
			return {
				client: client.rows[0],
				cake: cake.rows[0],
				createdAt: order.createdAt,
				quantity: order.quantity,
				totalPrice: order.totalPrice
			}
		}));
		
		return res.status(200).send(orderList)

	}catch(err) {
		return res.status(500).send(err)
	}
};

export { postOrders, getOrders };