import { useState } from 'react';
import SignIn from '../../components/SignIn';
import SignUp from '../../components/SignUp';
import './Auth.css';

const SignInPage = () => {
	const [showSignUp, setShowSignUp] = useState(false);

	const handleShowSignUp = () => {
		setShowSignUp(!showSignUp);
	};

	return !showSignUp ? (
		<SignIn handleShowSignUp={handleShowSignUp} />
	) : (
		<SignUp handleShowSignUp={handleShowSignUp} />
	);
};

export default SignInPage;
