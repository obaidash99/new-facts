import React, { useState } from 'react';
import { useAuth } from '../AuthContext';
import { Navigate } from 'react-router-dom';

function isValidEmail(email) {
	var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
	return regex.test(email);
}

const SignUp = ({ handleShowSignUp }) => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const { currentUser, signup } = useAuth();

	const handleSignUp = async (e) => {
		e.preventDefault();
		if (email && isValidEmail(email) && password) {
			await signup(email, password);
		}
	};

	return (
		<>
			{!currentUser ? (
				<div>
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
								onChange={(e) => setEmail(e.target.value)}
								required
							/>

							<label htmlFor="password">Password:</label>
							<input
								type="password"
								id="password"
								placeholder="Enter your password"
								value={password}
								onChange={(e) => setPassword(e.target.value)}
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
				</div>
			) : (
				<Navigate to="/" />
			)}
		</>
	);
};

export default SignUp;
