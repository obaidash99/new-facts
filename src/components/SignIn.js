import { useState } from 'react';
import { auth } from '../firebase';
import { useAuth } from '../AuthContext';
import { Navigate } from 'react-router-dom';

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
							<button className="sign-up-btn" onClick={handleShowSignUp}>
								Sign up
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

export default SignIn;
