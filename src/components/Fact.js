import React, { useEffect, useState } from 'react';
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

		if (selectedOption) {
			if (selectedOption === columnName) {
				unselectOption(columnName);
			} else {
				// User is changing the vote, unselect the old vote
				const oldColumnName = selectedOption;
				await unselectOption(oldColumnName);
				// Select the new vote
				await selectOption(columnName);
			}
		} else {
			// User is selecting a new vote
			await selectOption(columnName);
		}
	}

	const unselectOption = async (columnName) => {
		setVotes((prevVotes) => ({ ...prevVotes, [columnName]: prevVotes[columnName] - 1 }));
		setSelectedOption(null);

		await updateVotes(columnName, -1);
		// Remove the user's previous vote from localStorage
		localStorage.removeItem(`vote_${fact.id}`);
	};

	const selectOption = async (columnName) => {
		setVotes((prevVotes) => ({ ...prevVotes, [columnName]: prevVotes[columnName] + 1 }));
		setSelectedOption(columnName);

		// Mark that the user has voted for this fact
		localStorage.setItem(`vote_${fact.id}`, columnName);

		await updateVotes(columnName, 1);
	};

	const updateVotes = async (columnName, incrementValue) => {
		const factRef = doc(db, 'facts', fact.id);
		await updateDoc(factRef, {
			[columnName]: increment(incrementValue),
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
	};

	// useEffect to load user's vote on component mount
	useEffect(() => {
		const userVote = localStorage.getItem(`vote_${fact.id}`);
		if (userVote) {
			// User has voted, disable other options
			setSelectedOption(userVote);
		}
	}, [fact.id]);

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
