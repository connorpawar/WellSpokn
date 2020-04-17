import { useState } from 'react'

export default function useLogin(callback) {
	const [inputs, setInputs] = useState({});
	const handleSubmit = (event) => {
		if (event) {
			event.preventDefault();
		}
		let re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

		if (re.test(inputs.email)) {
			callback();
		}
		else {
			// invalid email, maybe show an error to the user.
		}
	}
	const handleInputChange = (event) => {
		event.persist();
		setInputs(inputs => ({ ...inputs, [event.target.name]: event.target.value }));
	}
	return {
		handleSubmit,
		handleInputChange,
		inputs
	};
}