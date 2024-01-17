import React from 'react';
import { useAuth } from '../AuthContext';

const Header = ({ showForm, setShowForm }) => {
	const appTitle = 'Today I Learned';
	const { currentUser, logout } = useAuth();

	return (
		<header className="header">
			<div className="logo">
				<img src="logo.png" alt="Today I Learned Logo" />
				<h1>{appTitle}</h1>
			</div>
			<div className="action-btn">
				<button
					className="btn btn-large btn-open"
					onClick={() => setShowForm((show) => !show)}
				>
					{showForm ? 'close' : 'share a fact'}
				</button>
				{currentUser ? (
					<button className="btn btn-sign-out" type="submit" onClick={logout}>
						Sign Out
					</button>
				) : !showForm ? (
					<button
						className="btn btn-sign-in"
						type="submit"
						onClick={() => {
							setShowForm(true);
						}}
					>
						Sign in
					</button>
				) : null}
			</div>
		</header>
	);
};

export default Header;
