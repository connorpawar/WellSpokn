export const loginUser = (user) => ({
	type: 'LOGIN_USER',
	user     //payload
})

export const logoutUser = () => ({
	type: 'LOGOUT_USER'
})