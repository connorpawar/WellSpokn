const initialState = {
	currentUser: {},
	currentSpeech: {}
}

export default function reducer(state = initialState, action) {
	switch (action.type) {
		case 'UPDATE_SPEECH':
			return { ...state, currentSpeech: action.payload }
		case 'LOGIN_USER':
			return { ...state, currentUser: action.payload }
		case 'LOGOUT_USER':
			return { ...state, currentUser: {} }
		default:
			return state;
	}
}