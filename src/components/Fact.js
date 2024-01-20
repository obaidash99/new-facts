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

		const factRef = doc(db, 'facts', fact.id);

		if (selectedOption) {
			if (selectedOption === columnName) {
				await unselectOption(columnName);
			} else {
				const oldColumnName = selectedOption;
				await unselectOption(oldColumnName);
				await selectOption(columnName);
			}
		} else {
			await selectOption(columnName);
		}
	}

	const unselectOption = async (columnName) => {
		setSelectedOption(null);
		await updateVotes(columnName, -1);
	};

	const selectOption = async (columnName) => {
		setSelectedOption(columnName);
		await updateVotes(columnName, 1);
	};

	const updateVotes = async (columnName, incrementValue) => {
		const factRef = doc(db, 'facts', fact.id);
		await updateDoc(factRef, {
			[`votes.${columnName}`]: increment(incrementValue),
		});

		const unsubscribe = onSnapshot(factRef, (updatedFactSnapshot) => {
			const updatedFactData = {
				id: updatedFactSnapshot.id,
				...updatedFactSnapshot.data(),
			};

			setFacts((facts) =>
				facts.map((element) => (element.id === fact.id ? updatedFactData : element))
			);

			unsubscribe();
		});
	};

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
					onClick={() => handleVote('interesting')}
					disabled={selectedOption !== null && selectedOption !== 'interesting'}
				>
					👍 {fact.votes.interesting}
				</button>
				<button
					onClick={() => handleVote('mindBlowing')}
					disabled={selectedOption !== null && selectedOption !== 'mindBlowing'}
				>
					🤯 {fact.votes.mindBlowing}
				</button>
				<button
					onClick={() => handleVote('false')}
					disabled={selectedOption !== null && selectedOption !== 'false'}
				>
					⛔️ {fact.votes.false}
				</button>
			</div>
		</li>
	);
};

export default Fact;
