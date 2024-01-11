import { createUserWithEmailAndPassword } from 'firebase/auth';
import React, { useState } from 'react';
import { auth } from '../firebase';

const SignUp = ({ handleShowSignUp }) => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

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
		<>
			<h1 className="form-header">Create an Account!</h1>
			<div className="form-container">
				<h2 style={{ textAlign: 'center' }}>Sign Up</h2>
				<form className="form" onSubmit={handleSignUp}>
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
					<button type="submit">Sign Up</button>
				</form>
				<hr />
				<div className="form-option">
					<p style={{ fontSize: '15px' }}>Return to sign in?</p>
					<button className="sign-up-btn" onClick={handleShowSignUp}>
						Sign in
					</button>
				</div>
			</div>
		</>
	);
};

export default SignUp;
