import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Link, Navigate } from 'react-router-dom';

const SignIn = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState('');
	const [loading, setLoading] = useState(false);
	const { currentUser, signin } = useAuth();

	const handleSubmit = async (e) => {
		e.preventDefault();

		try {
			setError('');
			setLoading(true);
			await signin(email, password);
		} catch {
			setLoading(false);
			setError('Faild to Sign in!');
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
