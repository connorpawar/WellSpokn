import React, { useEffect } from 'react';
import { logoutUser } from '../../actions';
import { useDispatch } from "react-redux";
import { useHistory } from 'react-router-dom';

export default function Logout() {
	const dispatch = useDispatch();
	const history = useHistory();

	useEffect(() => {
		localStorage.clear()
		dispatch(logoutUser());
		history.push('/login');
	  });

	return (
		<p>Logged Out</p>
	);
}