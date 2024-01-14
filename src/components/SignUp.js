import { createUserWithEmailAndPassword } from 'firebase/auth';
import React, { useState } from 'react';
import { auth } from '../firebase';

function isValidEmail(email) {
	var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
	return regex.test(email);
}

const SignUp = ({ handleShowSignUp }) => {
	const [email, setEmail] = useState('');
	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');
	const [password, setPassword] = useState('');
	// const [image, setImage] = useState('');

	const handleSignUp = async (e) => {
		e.preventDefault();
		if (email && firstName && lastName && isValidEmail(email) && password) {
			await createUserWithEmailAndPassword(auth, email, password);
		}
	};

	return (
		<>
			<h1 className="form-header">Create an Account!</h1>
			<div className="form-container">
				<h2 style={{ textAlign: 'center' }}>Sign Up</h2>
				<form className="form" onSubmit={handleSignUp}>
					<label htmlFor="firstName">First Name:</label>
					<input
						type="firstName"
						id="firstName"
						placeholder="Enter your first name"
						value={firstName}
						onChange={(e) => setFirstName(e.target.value)}
						required
					/>
					<label htmlFor="lastName">Last Name:</label>
					<input
						type="lastName"
						id="lastName"
						placeholder="Enter your last name"
						value={lastName}
						onChange={(e) => setLastName(e.target.value)}
						required
					/>
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
					{/* <label htmlFor="file">Image:</label>
					<input type="file" id="file" value={image} required /> */}
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
