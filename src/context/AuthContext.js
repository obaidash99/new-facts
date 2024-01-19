import {
	createUserWithEmailAndPassword,
	sendPasswordResetEmail,
	signInWithEmailAndPassword,
	signOut,
	updateEmail,
	updatePassword,
	signInWithPopup,
} from 'firebase/auth';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { auth, provider } from '../firebase';

const AuthContext = createContext();

export function useAuth() {
	return useContext(AuthContext);
}

export default function AuthProvider({ children }) {
	const [loading, setloading] = useState(true);
	const [currentUser, setCurrentUser] = useState();

	function signin(email, password) {
		return signInWithEmailAndPassword(auth, email, password);
	}

	function signup(email, password) {
		return createUserWithEmailAndPassword(auth, email, password);
	}

	function logout() {
		return signOut(auth);
	}

	function resetPassword(email) {
		return sendPasswordResetEmail(auth, email);
	}

	function editEmail(email) {
		return updateEmail(auth.currentUser, email);
	}

	function editPassword(password) {
		return updatePassword(auth.currentUser, password);
	}

	function googleSignIn() {
		return signInWithPopup(auth, provider);
	}

	useEffect(() => {
		const unsubscribe = auth.onAuthStateChanged((user) => {
			setCurrentUser(user);
			setloading(false);
		});

		return unsubscribe;
	}, []);

	const value = {
		currentUser,
		signin,
		signup,
		resetPassword,
		logout,
		editEmail,
		editPassword,
		googleSignIn,
	};

	return (
		<AuthContext.Provider value={value}>{!loading && children}</AuthContext.Provider>
	);
}
