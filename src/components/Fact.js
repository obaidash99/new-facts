import React, { useState } from 'react';
import { auth, db } from '../firebase';
import { doc, increment, onSnapshot, updateDoc } from 'firebase/firestore';

const Fact = ({ fact, setFacts, categories, setShowForm }) => {
	const [isUpdating, setIsUpdating] = useState(false);
	const [selectedOption, setSelectedOption] = useState(null);
	const [votes, setVotes] = useState({
		votesInteresting: fact.votesInteresting,
		votesMindBlowing: fact.votesMindBlowing,
		votesFalse: fact.votesFalse,
	});
	const isDisputed = fact.votesInteresting + fact.votesMindBlowing < fact.votesFalse;

	async function handleVote(columnName) {
		if (!auth.currentUser) {
			setShowForm(true);
			return;
		}

		setIsUpdating(true);
		const factRef = doc(db, 'facts', fact.id);

		if (selectedOption) {
			if (selectedOption === columnName) {
				setVotes((prevVotes) => ({
					...prevVotes,
					[columnName]: prevVotes[columnName] - 1,
				}));
				setSelectedOption(null);

				await updateDoc(factRef, {
					[columnName]: increment(-1),
				});

				const unsubscribe = onSnapshot(factRef, (updatedFactSnapshot) => {
					const updatedFactData = {
						id: updatedFactSnapshot.id,
						...updatedFactSnapshot.data(),
					};

					setIsUpdating(false);
					setFacts((facts) =>
						facts.map((element) => (element.id === fact.id ? updatedFactData : element))
					);

					unsubscribe();
				});

				return;
			}
			setIsUpdating(false);
			return;
		}

		setVotes((prevVotes) => ({
			...prevVotes,
			[columnName]: prevVotes[columnName] + 1,
		}));
		setSelectedOption(columnName);

		await updateDoc(factRef, {
			[columnName]: increment(1),
		});

		const unsubscribe = onSnapshot(factRef, (updatedFactSnapshot) => {
			const updatedFactData = {
				id: updatedFactSnapshot.id,
				...updatedFactSnapshot.data(),
			};

			setIsUpdating(false);
			setFacts((facts) =>
				facts.map((element) => (element.id === fact.id ? updatedFactData : element))
			);

			unsubscribe();
		});
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
				<button
					onClick={() => handleVote('votesInteresting')}
					disabled={selectedOption !== null && selectedOption !== 'votesInteresting'}
				>
					👍 {fact.votesInteresting}
				</button>
				<button
					onClick={() => handleVote('votesMindBlowing')}
					disabled={selectedOption !== null && selectedOption !== 'votesMindBlowing'}
				>
					🤯 {fact.votesMindBlowing}
				</button>
				<button
					onClick={() => handleVote('votesFalse')}
					disabled={selectedOption !== null && selectedOption !== 'votesFalse'}
				>
					⛔️ {fact.votesFalse}
				</button>
			</div>
		</li>
	);
};

export default Fact;
