import React, { useState } from 'react';
import { db } from '../firebase';
import { doc, getDoc, increment, updateDoc } from 'firebase/firestore';

const Fact = ({ fact, setFacts, categories }) => {
	const [isUpdating, setIsUpdating] = useState(false);
	const isDisputed = fact.votesInteresting + fact.votesMindBlowing < fact.votesFalse;

	async function handleVote(columnName) {
		setIsUpdating(true);
		const factRef = doc(db, 'facts', fact.id);
		// const currentFactSnapshot = await getDoc(factRef);
		// const currentFactData = currentFactSnapshot.data();

		// const updatedVote = {
		// 	...currentFactData.vote,
		// 	[columnName]: true,
		// };

		await updateDoc(factRef, {
			[columnName]: increment(1),
			// vote: updatedVote,
		});
		const updatedFactSnapshot = await getDoc(factRef);
		const updatedFactData = { id: updatedFactSnapshot.id, ...updatedFactSnapshot.data() };

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
					backgroundColor: categories.find((cat) => cat.name === fact.category)?.color,
				}}
			>
				{fact.category}
			</span>
			<div className="vote-buttons">
				<button onClick={() => handleVote('votesInteresting')} disabled={isUpdating}>
					👍 {fact.votesInteresting}
				</button>
				<button onClick={() => handleVote('votesMindBlowing')} disabled={isUpdating}>
					🤯 {fact.votesMindBlowing}
				</button>
				<button onClick={() => handleVote('votesFalse')} disabled={isUpdating}>
					⛔️ {fact.votesFalse}
				</button>
			</div>
		</li>
	);
};

export default Fact;
