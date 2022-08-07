const emailValidation = (req, res) => {
	const email = req.body.userEmail;
	const validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
	if (email.match(validRegex)){
		return
	}
	return res.json({
		errors: {
			msg: 'invalide email format',
			code: 10003
		}, result: false
	})
}

const ageValidation = (req, res) => {
	const age = req.body.userAge;
	if (!age) {
		return res.json({
			errors: {
				msg: 'empty age',
				code: 10006
			}
		})
	}
	if (isNaN(age)) {
		return res.json({
			errors: {
				msg: 'age is not a Number',
				code: 10005
			}
		})
	}
	if (age < 18) {
		return res.json({
			errors: {
				msg: 'age should be greater than 18',
				code: 10008
			}
		})
	}
}
export {emailValidation, ageValidation}