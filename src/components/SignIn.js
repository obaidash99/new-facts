import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Link, Navigate } from 'react-router-dom';
import GoogleButton from 'react-google-button';

const SignIn = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState('');
	const [loading, setLoading] = useState(false);
	const { currentUser, signin, googleSignIn } = useAuth();

	const handleSubmit = async (e) => {
		e.preventDefault();

		try {
			setError('');
			setLoading(true);
			await signin(email, password);
		} catch (error) {
			setLoading(false);
			switch (error.code) {
				case 'auth/user-not-found':
					setError('User not found. Please check your email or sign up for an account.');
					break;
				case 'auth/invalid-password':
					setError('Incorrect password. Please enter the correct password.');
					break;
				case 'auth/invalid-email':
					setError('Invalid email address. Please enter a valid email.');
					break;
				default:
					setError('Failed to sign in. Please try again later.');
			}
		}
	};

	return (
		<>
			{!currentUser ? (
				<div className="form-parent">
					<h1 className="form-header">Sign in to your Account</h1>
					<div className="form-container">
						<h2 style={{ textAlign: 'center' }}>Sign In</h2>
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
							<div style={{ textAlign: 'center', marginBottom: '15px' }}>
								<Link className="sign-up-btn" to="/forgot-password">
									Forgot Passowrd?
								</Link>
							</div>
							<button type="submit" disabled={loading}>
								Sign In
							</button>
							<div style={{ textAlign: 'center', margin: '5px auto' }}>
								ـــــــــــــــــــــــــ or ـــــــــــــــــــــــــ
							</div>
							<GoogleButton style={{ margin: '5px auto' }} onClick={googleSignIn} />
						</form>
						<hr />
						<div className="form-option">
							<p style={{ fontSize: '15px' }}>Doesn't have an account?</p>
							<Link className="sign-up-btn" to="/signup">
								Sign up
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

export default SignIn;
