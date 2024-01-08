import { useState } from 'react';
import { auth } from '../firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';

const SignIn = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const handleEmail = (e) => {
		setEmail(e.target.value);
	};

	const handlePassword = (e) => {
		setPassword(e.target.value);
	};

	const handleSignIn = (e) => {
		e.preventDefault();
		signInWithEmailAndPassword(auth, email, password)
			.then((userCredintial) => console.log(userCredintial))
			.catch((error) => console.log(error));
	};

	return (
		<div className="signin-container">
			<h2>Sign In</h2>
			<form className="signin-form" onSubmit={handleSignIn}>
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

				<button type="submit">Sign In</button>
			</form>
		</div>
	);
};

export default SignIn;
