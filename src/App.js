import { useEffect, useState } from 'react';
import './style.css';

import { db } from './firebase';
import { collection, getDocs, query, where } from 'firebase/firestore';
import AuthProvider from './context/AuthContext';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';
import Main from './components/Main';
import PrivateRoutes from './components/PrivateRoutes';

const CATEGORIES = [
	{ name: 'technology', color: '#3b82f6' },
	{ name: 'science', color: '#16a34a' },
	{ name: 'finance', color: '#ef4444' },
	{ name: 'society', color: '#eab308' },
	{ name: 'entertainment', color: '#db2777' },
	{ name: 'health', color: '#14b8a6' },
	{ name: 'history', color: '#f97316' },
	{ name: 'news', color: '#8b5cf6' },
];

function App() {
	const [showForm, setShowForm] = useState(false);
	const [facts, setFacts] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [currentCategory, setCurrentCategory] = useState('all');

	useEffect(() => {
		const getFacts = async () => {
			setIsLoading(true);

			const ref = collection(db, 'facts');
			const snapshot = await getDocs(ref);

			let facts = snapshot.docs.map((doc) => ({
				...doc.data(),
				id: doc.id,
			}));

			if (currentCategory !== 'all') {
				const q = query(ref, where('category', '==', currentCategory));
				const catSnapshot = await getDocs(q);

				facts = catSnapshot.docs.map((doc) => ({
					...doc.data(),
					id: doc.id,
				}));
			}

			setIsLoading(false);
			setFacts(facts);
		};
		getFacts();
	}, [currentCategory]);

	return (
		<Router>
			<AuthProvider>
				<Routes>
					<Route element={<PrivateRoutes />}>
						<Route
							path="/"
							exact
							element={
								<Main
									categories={CATEGORIES}
									setCurrentCategory={setCurrentCategory}
									facts={facts}
									setFacts={setFacts}
									currentCategory={currentCategory}
									setShowForm={setShowForm}
									showForm={showForm}
								/>
							}
						/>
					</Route>
					<Route path="/signup" Component={SignUp} />
					<Route path="/signin" Component={SignIn} />
				</Routes>
			</AuthProvider>
		</Router>
	);
}

export default App;
