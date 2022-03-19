import { connection } from "../database.js";

const postCakes = async(req, res) => {
	const { name, price, description, image, flavourId} = req.body;
	
	if (price <= 0) return res.sendStatus(400)
	
	if (!name || name.length < 2) return res.sendStatus(400)
	
	if (typeof description !== 'string' && description) return res.sendStatus(400)

	try {
		const cake = await connection.query(`SELECT * FROM cakes WHERE name = $1`, [name]);
		if (cake.rowCount) return res.sendStatus(409)
		const flavour = await connection.query(`SELECT * FROM flavours WHERE id = $1`, [flavourId]);
		if (!flavour.rowCount) return res.sendStatus(404)

		await connection.query(`
			INSERT INTO cakes (name, price, description, image, "flavourId") 
			VALUES ($1,$2,$3,$4,$5)`, [name, price, description, image, flavourId]);

		return res.sendStatus(201)

	}catch(err) {
		return res.status(500).send(err)
	}
}

export { postCakes }