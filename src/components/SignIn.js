import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Link, Navigate } from 'react-router-dom';
import '../Auth.css';

const SignIn = ({ handleShowSignUp }) => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const { currentUser, signin } = useAuth();

	const handleSignIn = async (e) => {
		e.preventDefault();
		await signin(email, password);
	};

	return (
		<>
			{!currentUser ? (
				<div>
					<h1 className="form-header">You need to Sign in first!</h1>
					<div className="form-container">
						<h2 style={{ textAlign: 'center' }}>Sign In</h2>
						<form className="form" onSubmit={handleSignIn}>
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

							<button type="submit">Sign In</button>
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
