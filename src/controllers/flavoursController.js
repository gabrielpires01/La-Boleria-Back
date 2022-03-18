import { connection } from "../database.js";

const postFlavours = async(req,res) => {
	const { name } = req.body;

	if (!name || name.length < 2) return res.sendStatus(400)

	try {
		const flavour = await connection.query(`SELECT * FROM flavours WHERE name = $1`, [name]);
		if (flavour.rowCount) return res.sendStatus(409)

		await connection.query(`INSERT INTO flavours (name) VALUES ($1)`, [name])

		return res.sendStatus(201)

	}catch(err) {
		return res.status(500).send(err)
	}
}

export { postFlavours }