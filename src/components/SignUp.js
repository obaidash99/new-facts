import { createUserWithEmailAndPassword } from 'firebase/auth';
import React, { useState } from 'react';
import { auth } from '../firebase';

const SignUp = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');

	const handleEmail = (e) => {
		setEmail(e.target.value);
	};

	const handlePassword = (e) => {
		setPassword(e.target.value);
	};

	const handleSignUp = (e) => {
		e.preventDefault();
		createUserWithEmailAndPassword(auth, email, password)
			.then((userCredential) => {
				console.log(userCredential);
			})
			.catch((error) => console.log(error));
	};

	return (
		<div className="signup-container">
			<h2>Sign Up</h2>
			<form className="signup-form" onSubmit={handleSignUp}>
				<label htmlFor="email">Email:</label>
				<input
					type="email"
					id="email"
					placeholder="Enter your email"
					value={email}
					onChange={handleEmail}
					required
				/>

				<label htmlFor="password">Password:</label>
				<input
					type="password"
					id="password"
					placeholder="Enter your password"
					value={password}
					onChange={handlePassword}
					required
				/>

				{/* <label htmlFor="confirmPassword">Confirm Password:</label>
				<input
					type="password"
					id="confirmPassword"
					placeholder="Confirm your password"
					value={confirmPassword}
					onChange={(e) => setConfirmPassword(e.target.value)}
					required
				/> */}

				<button type="submit">Sign Up</button>
			</form>
		</div>
	);
};

export default SignUp;
