import React from 'react';
import CategoryFilter from './CategoryFilter';
import Loader from './Loader';
import FactsList from './FactsList';
import Header from './Header';
import FactForm from './FactForm';
import { useAuth } from '../context/AuthContext';
import '../style.css';

export default function Main({
	categories,
	setCurrentCategory,
	isLoading,
	facts,
	setFacts,
	currentCategory,
	setShowForm,
	showForm,
}) {
	const { currentUser } = useAuth();
	return (
		<>
			<Header showForm={showForm} setShowForm={setShowForm} />
			{currentUser && showForm && (
				<FactForm categories={categories} setFacts={setFacts} setShowForm={setShowForm} />
			)}
			<div className="main">
				<CategoryFilter categories={categories} setCurrentCategory={setCurrentCategory} />
				{isLoading ? (
					<Loader />
				) : (
					<FactsList
						facts={facts}
						setFacts={setFacts}
						currentCategory={currentCategory}
						categories={categories}
						setShowForm={setShowForm}
					/>
				)}
			</div>
		</>
	);
}
