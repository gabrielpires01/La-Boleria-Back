import Joi from "joi";

const expression = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/;

export const cakeValidation = Joi.object({
	name: Joi.string().required(),
	price: Joi.number().min(0).required(),
	description: Joi.string(),
	image: Joi.string().pattern(expression).required(),
	flavourId: Joi.number()
})