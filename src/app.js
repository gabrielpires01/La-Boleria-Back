import dotenv from 'dotenv';
import express, { json } from 'express';
import router from './routes/index.js';
dotenv.config()

const app = express();
app.use(json());

app.use(router)

const PORT = 5000;
app.listen(PORT, () => {
	console.log(`Listening on port ${PORT}`)
})