import { useEffect, useState } from 'react';
import CategoryFilter from './components/CategoryFilter';
import FactForm from './components/FactForm';
import FactsList from './components/FactsList';

import './style.css';
import Header from './components/Header';
import Loader from './components/Loader';
import SignInPage from './pages/auth/Auth';

import { onAuthStateChanged } from 'firebase/auth';
import { auth, db } from './firebase';
import { collection, getDocs, query, where } from 'firebase/firestore';
import AuthProvider from './AuthContext';

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
	const [authUser, setAuthUser] = useState(null);

	useEffect(() => {
		const listen = onAuthStateChanged(auth, (user) => {
			if (user) {
				setAuthUser(user);
			} else {
				setAuthUser(null);
			}
		});

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

		return () => {
			listen();
		};
	}, [currentCategory]);

	return (
		<AuthProvider>
			<Header showForm={showForm} setShowForm={setShowForm} />
			{authUser && showForm && (
				<FactForm categories={CATEGORIES} setFacts={setFacts} setShowForm={setShowForm} />
			)}
			{!authUser && showForm && <SignInPage />}

			<main className="main">
				<CategoryFilter categories={CATEGORIES} setCurrentCategory={setCurrentCategory} />
				{isLoading ? (
					<Loader />
				) : (
					<FactsList
						facts={facts}
						setFacts={setFacts}
						currentCategory={currentCategory}
						categories={CATEGORIES}
						setShowForm={setShowForm}
					/>
				)}
			</main>
		</AuthProvider>
	);
}

export default App;
