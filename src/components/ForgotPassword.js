import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Link, Navigate } from 'react-router-dom';

const ForgotPassword = () => {
	const [email, setEmail] = useState('');
	const [error, setError] = useState('');
	const [message, setMessage] = useState('');
	const { currentUser, resetPassword } = useAuth();

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			setMessage('');
			setError('');
			await resetPassword(email);
			setMessage('Check your Email inbox for instructions!');
		} catch {
			setError('Faild to sent reset email!');
		}
	};

	return (
		<>
			{!currentUser ? (
				<div>
					<h1 className="form-header">reset your password</h1>
					<div className="form-container">
						<h2 style={{ textAlign: 'center' }}>reset password</h2>
						{error && <p className="error-message">{error}</p>}
						{message && <p className="success-message">{message}</p>}
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
							<button type="submit">sent reset link</button>
						</form>
						<hr />
						<div className="form-option">
							<p style={{ fontSize: '15px' }}>Return to Signin?</p>
							<Link className="sign-up-btn" to="/signin">
								Signin
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

export default ForgotPassword;
