import { createContext, useContext, useEffect, useState } from 'react';

import { db } from '../firebase';
import { collection, getDocs, query, where } from 'firebase/firestore';

const DataContext = createContext();

export function useData() {
	return useContext(DataContext);
}

export default function DataProvider({ children }) {
	const [showForm, setShowForm] = useState(false);
	const [facts, setFacts] = useState([]);
	const [users, setUsers] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [currentCategory, setCurrentCategory] = useState('all');
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

	useEffect(() => {
		const getFacts = async () => {
			setIsLoading(true);

			const factsRef = collection(db, 'facts');
			const factsSnapshot = await getDocs(factsRef);
			const usersRef = collection(db, 'users');
			const usersSnapshot = await getDocs(usersRef);

			let facts = factsSnapshot.docs.map((doc) => ({
				...doc.data(),
				id: doc.id,
			}));

			if (currentCategory !== 'all') {
				const q = query(factsRef, where('category', '==', currentCategory));
				const catSnapshot = await getDocs(q);

				facts = catSnapshot.docs.map((doc) => ({
					...doc.data(),
					id: doc.id,
				}));
			}

			let users = usersSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

			setIsLoading(false);
			setFacts(facts);
			setUsers(users);
		};
		getFacts();
	}, [currentCategory]);

	const value = {
		showForm,
		setShowForm,
		facts,
		setFacts,
		isLoading,
		setIsLoading,
		currentCategory,
		setCurrentCategory,
		categories: CATEGORIES,
		users,
		setUsers,
	};

	return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
}
