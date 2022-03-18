const validateSchemaMiddleware = schema => {
	return(req,res,next) => {
		const validate = schema.validate(req.body);
		
		if (validate.error?.details[0].type === "string.empty") return res.sendStatus(400)
		if (validate.error?.details[0].type === "any.required") return res.sendStatus(400)
		if (validate.error?.details[0].type === "string.base") return res.sendStatus(400)
		if (validate.error) return res.sendStatus(422)

		next()
	}
	
};

export default validateSchemaMiddleware;