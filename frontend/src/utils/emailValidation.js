const emailValidation = (email) => {
	const validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
	if (email.match(validRegex)) {
		return true
	}
	return false
}
export default emailValidation