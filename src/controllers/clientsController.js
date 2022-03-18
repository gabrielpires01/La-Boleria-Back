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

export { postClients };