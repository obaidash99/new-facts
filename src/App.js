import { useEffect, useState } from 'react';
import CategoryFilter from './CategoryFilter';
import FactForm from './FactForm';
import FactsList from './FactsList';
// import supabase from './supabase';

import './style.css';
import Header from './Header';
import Loader from './Loader';
import SignInPage from './pages/auth/SignInPage';
import SignUpPage from './pages/auth/SignUpPage';

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

	// useEffect(
	// 	function () {
	// 		async function getFacts() {
	// 			setIsLoading(true);

	// 			let query = supabase.from('facts').select('*');

	// 			if (currentCategory !== 'all') query = query.eq('category', currentCategory);

	// 			const { data: facts, error } = await query.order('votesInteresting', {
	// 				ascending: false,
	// 			});

	// 			if (!error) setFacts(facts);
	// 			else alert('There was a problem getting the data!');
	// 			setIsLoading(false);
	// 		}
	// 		getFacts();
	// 	},
	// 	[currentCategory]
	// );

	return (
		<>
			{/* <Header showForm={showForm} setShowForm={setShowForm} />
			{showForm ? (
				<FactForm categories={CATEGORIES} setFacts={setFacts} setShowForm={setShowForm} />
			) : null}
			<main className="main">
				<CategoryFilter categories={CATEGORIES} setCurrentCategory={setCurrentCategory} />
				{isLoading ? (
					<Loader />
				) : (
					<FactsList facts={facts} setFacts={setFacts} categories={CATEGORIES} />
				)}
			</main> */}
			{/* <SignInPage /> */}
			<SignUpPage />
		</>
	);
}

export default App;
