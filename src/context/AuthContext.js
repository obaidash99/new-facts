import { createContext, useContext, useEffect, useState } from 'react';
import { auth } from '../firebase';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
	const [currentUser, setCurrentUser] = useState(null);

	useEffect(() => {
		const unsubscrube = auth.onAuthStateChanged((user) => {
			setCurrentUser(user);
		});

		return () => {
			unsubscrube();
		};
	}, []);

	const value = {
		currentUser,
	};

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
	return useContext(AuthContext);
};
