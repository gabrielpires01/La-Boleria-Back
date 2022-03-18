import Joi from 'joi';

const clientValidationSchema = Joi.object({
	name: Joi.string(),
	address: Joi.string(),
	phone: Joi.string()
});

export default clientValidationSchema;