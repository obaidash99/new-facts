import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Link, Navigate } from 'react-router-dom';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '../firebase';
import GoogleButton from 'react-google-button';

function isValidEmail(email) {
	var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
	return regex.test(email);
}

const SignUp = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [passwordConf, setPasswordConf] = useState('');
	const [error, setError] = useState('');
	const [loading, setLoading] = useState(false);
	const { currentUser, signup, googleSignIn } = useAuth();

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (password !== passwordConf) {
			return setError("Passwords don't match");
		}

		if (email && isValidEmail(email) && password) {
			try {
				setError('');
				setLoading(true);

				const userCredential = await signup(email, password);
				const user = userCredential.user;

				await addDoc(collection(db, 'users'), {
					id: user.uid,
					email: user.email,
					votes: {},
				});

				setLoading(false);
			} catch (error) {
				setLoading(false);
				switch (error.code) {
					case 'auth/weak-password':
						setError('Password is too weak. Choose a stronger password.');
						break;
					case 'auth/email-already-in-use':
						setError('Email is already in use. Please use a different email.');
						break;
					case 'auth/invalid-email':
						setError('Invalid email address. Please enter a valid email.');
						break;
					default:
						setError('Failed to sign up. Please try again later.');
				}
			}
		}
	};

	return (
		<>
			{!currentUser ? (
				<div className="form-parent">
					<h1 className="form-header">Create an Account</h1>
					<div className="form-container">
						<h2 style={{ textAlign: 'center' }}>Sign Up</h2>
						{error && <p className="error-message">{error}</p>}
						<form className="form" onSubmit={handleSubmit}>
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

							<label htmlFor="passwordConf">Confirm Password:</label>
							<input
								type="password"
								id="passwordConf"
								placeholder="Enter your password"
								value={passwordConf}
								onChange={(e) => setPasswordConf(e.target.value)}
								required
							/>
							<button type="submit" disabled={loading}>
								Sign Up
							</button>
							<div style={{ textAlign: 'center', margin: '5px auto' }}>
								ـــــــــــــــــــــــــ or ـــــــــــــــــــــــــ
							</div>
							<GoogleButton style={{ margin: '5px auto' }} onClick={googleSignIn} />
						</form>
						<hr />
						<div className="form-option">
							<p style={{ fontSize: '15px' }}>Return to sign in?</p>
							<Link className="sign-up-btn" to="/signin">
								Sign in
							</Link>
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
