// import React, { useState } from 'react';
// // import supabase from './supabase';

// const Fact = ({ fact, setFacts, categories }) => {
// 	const [isUpdating, setIsUpdating] = useState(false);
// 	const isDisputed = fact.votesInteresting + fact.votesMindBlowing < fact.votesFalse;

// 	async function handleVote(columnName) {
// 		setIsUpdating(true);
// 		const { data: updatedFact, error } = await supabase
// 			.from('facts')
// 			.update({ [`${columnName}`]: fact[`${columnName}`] + 1 })
// 			.eq('id', fact.id)
// 			.select();
// 		setIsUpdating(false);

// 		if (!error)
// 			setFacts((facts) =>
// 				facts.map((element) => (element.id === fact.id ? updatedFact[0] : element))
// 			);
// 	}

// 	return (
// 		<li className="fact">
// 			<p>
// 				{isDisputed ? <span className="disputed">[⛔disputed⛔]</span> : null}
// 				{fact.text}
// 				<a href={fact.source} className="source" target="_blank" rel="noreferrer">
// 					(Source)
// 				</a>
// 			</p>
// 			<span
// 				className="tag"
// 				style={{
// 					backgroundColor: categories.find((cat) => cat.name === fact.category).color,
// 				}}
// 			>
// 				{fact.category}
// 			</span>
// 			<div className="vote-buttons">
// 				<button onClick={() => handleVote('votesInteresting')} disabled={isUpdating}>
// 					👍 {fact.votesInteresting}{' '}
// 				</button>
// 				<button onClick={() => handleVote('votesMindBlowing')} disabled={isUpdating}>
// 					🤯 {fact.votesMindBlowing}{' '}
// 				</button>
// 				<button onClick={() => handleVote('votesFalse')} disabled={isUpdating}>
// 					⛔️ {fact.votesFalse}{' '}
// 				</button>
// 			</div>
// 		</li>
// 	);
// };

// export default Fact;
