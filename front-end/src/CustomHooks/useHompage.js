import React, { useEffect } from 'react'

export const useHomePage = () => {

	const onLogin = (token) => {
		console.log(token);
		return ("/speeches");
	};

	const onPageLoad = (token) => {
		if(token != null){
			return ("/speeches");
		}
		else {
			return ("/login");
		}
	};

	return { onLogin, onPageLoad }
}