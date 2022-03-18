const validateSchemaMiddleware = schema => {
	return(req,res,next) => {
		const validate = schema.validate(req.body);
		if (validate.error) return res.sendStatus(422)

		next()
	}
	
};

export default validateSchemaMiddleware;