import React from 'react';
import Fact from './Fact';
import { useData } from '../context/DataContext';

const FactsList = () => {
	const { facts, setFacts, categories, currentCategory, setShowForm } = useData();

	if (facts.length === 0) {
		return (
			<p className="loader">
				No facts for the{' '}
				<span
					style={{
						color: categories.find((cat) => cat.name === currentCategory)?.color,
					}}
				>
					{currentCategory}
				</span>{' '}
				category YET! Add your own! 🔥
			</p>
		);
	}
	return (
		<section>
			<ul className="facts-list">
				{facts.map((fact) => (
					<Fact
						key={fact.id}
						fact={fact}
						setFacts={setFacts}
						setShowForm={setShowForm}
						categories={categories}
					/>
				))}
			</ul>
			<p>There are {facts.length} facts in the database. Add Your Own!</p>
		</section>
	);
};

export default FactsList;
