import React, { useState } from 'react';
import { db } from './firebase';
import { collection } from 'firebase/firestore';

const Fact = ({ fact, setFacts, categories }) => {
	const [isUpdating, setIsUpdating] = useState(false);
	const isDisputed = fact.votesInteresting + fact.votesMindBlowing < fact.votesFalse;

	async function handleVote(columnName) {
		setIsUpdating(true);
		const factRef = collection(db, 'facts');
		await factRef.update({
			[columnName]: fact[columnName] + 1,
		});
		const updatedFact = async () => await factRef.get();
		const updatedFactData = { id: updatedFact.id, ...updatedFact.data() };
		setIsUpdating(false);
		setFacts((facts) =>
			facts.map((element) => (element.id === fact.id ? updatedFactData : element))
		);
	}

	return (
		<li className="fact">
			<p>
				{isDisputed ? <span className="disputed">[⛔disputed⛔]</span> : null}
				{fact.text}
				<a href={fact.source} className="source" target="_blank" rel="noreferrer">
					(Source)
				</a>
			</p>
			<span
				className="tag"
				style={{
					backgroundColor: categories.find((cat) => cat.name === fact.category).color,
				}}
			>
				{fact.category}
			</span>
			<div className="vote-buttons">
				<button onClick={() => handleVote('votesInteresting')} disabled={isUpdating}>
					👍 {fact.votesInteresting}{' '}
				</button>
				<button onClick={() => handleVote('votesMindBlowing')} disabled={isUpdating}>
					🤯 {fact.votesMindBlowing}{' '}
				</button>
				<button onClick={() => handleVote('votesFalse')} disabled={isUpdating}>
					⛔️ {fact.votesFalse}{' '}
				</button>
			</div>
		</li>
	);
};

export default Fact;
