import { connection } from "../database.js";

const postClients = async(req, res) => {
	const {name, address, phone} = req.body;

	if (!name || !address || !phone) return res.sendStatus(400)
	if (phone.length > 11 || phone.length < 10) return res.sendStatus(400)

	try {
		await connection.query(`INSERT INTO clients (name, address, phone) VALUES ($1,$2,$3)`, [name, address, phone]);

		return res.sendStatus(201)
	}catch(err) {
		return res.status(500).send(err)
	}
}

const getClientOrder = async(req, res) => {
	const { id } = req.params;

	try {
		const client = await connection.query(`SELECT * FROM clients WHERE id = $1`, [id]);
		if (!client.rowCount) return res.sendStatus(404)

		const orders = await connection.query(`SELECT * FROM orders WHERE "clientId" = $1`, [id]);

		const clientOrders = await Promise.all(orders.rows.map(async(order)  => {
			const cake = await connection.query(`SELECT * FROM cakes WHERE id = $1`, [order.cakeId]);

			return {
				orderId: order.id,
				quantity: order.quantity,
				cretedAt: order.createdAt,
				totalPrice: order.totalPrice,
				cakeName: cake.rows[0].name
			}
		}))

		return res.status(200).send(clientOrders)
	}catch(err) {
		return res.status(500).send(err)
	}
}

export { postClients, getClientOrder };