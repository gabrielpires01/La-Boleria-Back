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
			
			const cake = await connection.query(`
				SELECT c.id, c.name, c.price, c.description, c.image, f.name AS "flavourName"
				FROM cakes c 
				JOIN flavours f ON c."flavourId" = f.id
				WHERE c.id = $1`, [order.cakeId])
			
			return {
				client: client.rows[0],
				cake: cake.rows[0],
				createdAt: order.createdAt,
				quantity: order.quantity,
				totalPrice: order.totalPrice,
				isDelivered: order.isDelivered
			}
		}));
		
		return res.status(200).send(orderList)

	}catch(err) {
		return res.status(500).send(err)
	}
};

const getOneOrder = async(req,res) => {
	const { id } = req.params;
	if (isNaN(Number(id))) return res.sendStatus(400)
	
	try {
		
		const order = await connection.query('SELECT * FROM orders WHERE id = $1', [id]);
		if (!order.rowCount) return res.sendStatus(404)

		const client = await connection.query(`SELECT * FROM clients WHERE id = $1`, [order.rows[0].clientId])
		
		const cake = await connection.query(`
				SELECT c.id, c.name, c.price, c.description, c.image, f.name AS "flavourName"
				FROM cakes c 
				JOIN flavours f ON c."flavourId" = f.id
				WHERE c.id = $1`, [order.rows[0].cakeId])
		

		const fullOrder = {
			client: client.rows[0],
			cake: cake.rows[0],
			createdAt: order.rows[0].createdAt,
			quantity: order.rows[0].quantity,
			totalPrice: order.rows[0].totalPrice,
			isDelivered: order.rows[0].isDelivered
		};
		
		return res.status(200).send(fullOrder)
	} catch(err) {
		return res.status(500).send(err)
	}
}

const patchDeliveredOrder = async(req,res) => {
	const { id } = req.params;
	if (isNaN(Number(id))) return res.sendStatus(400)

	try {
		const order = await connection.query('SELECT * FROM orders WHERE id = $1', [id]);
		if (!order.rowCount) return res.sendStatus(404)

		await connection.query(`
			UPDATE orders
			SET "isDelivered" = $1
			WHERE id = $2
		`,[true, id])

		return res.sendStatus(204)
	} catch(err) {
		return res.status(500).send(err)
	}
}

export { postOrders, getOrders, getOneOrder, patchDeliveredOrder };