export const loginUser = (user) => ({
	type: 'LOGIN_USER',
	payload: user     
})

export const logoutUser = () => ({
	type: 'LOGOUT_USER'
})

export const updateSpeech = (speech) => ({
	type: 'UPDATE_SPEECH',
	payload: speech     
})