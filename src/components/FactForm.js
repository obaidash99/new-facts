import React, { useState } from 'react';
import { db } from '../firebase';
import { addDoc, collection, doc, getDoc } from 'firebase/firestore';
import { useData } from '../context/DataContext';

function isValidHttpUrl(string) {
	let url;

	try {
		url = new URL(string);
	} catch (_) {
		return false;
	}

	return url.protocol === 'http:' || url.protocol === 'https:';
}

const FactForm = () => {
	const [text, setText] = useState('');
	const [source, setSource] = useState('');
	const [category, setCategoty] = useState('');
	const [isUploading, setIsUploading] = useState(false);
	const { categories, setFacts, setShowForm } = useData();

	async function handleSubmit(e) {
		e.preventDefault();
		if (text && category && isValidHttpUrl(source) && text.length <= 200) {
			setIsUploading(true);

			const newFactRef = await addDoc(collection(db, 'facts'), {
				text: text,
				category: category,
				source: source,
				votes: { false: 0, interesting: 0, mindBlowing: 0 },
			});

			const newFactSnapshot = await getDoc(doc(db, 'facts', newFactRef.id));
			const newFactData = { id: newFactSnapshot.id, ...newFactSnapshot.data() };

			setIsUploading(false);
			setFacts((facts) => [newFactData, ...facts]);

			setText('');
			setSource('');
			setCategoty('');
			setShowForm(false);
		}
	}

	return (
		<form className="fact-form" onSubmit={handleSubmit}>
			<input
				type="text"
				placeholder="Share a fact with the world..."
				value={text}
				onChange={(e) => setText(e.target.value)}
				disabled={isUploading}
			/>
			<span>{200 - text.length}</span>
			<input
				type="text"
				placeholder="http://example.com"
				value={source}
				onChange={(e) => setSource(e.target.value)}
				disabled={isUploading}
			/>
			<select
				value={category}
				onChange={(e) => setCategoty(e.target.value.toLocaleLowerCase())}
				disabled={isUploading}
			>
				<option value="">Choose category:</option>
				{categories.map((cat) => (
					<option key={cat.name} value={cat.name}>
						{cat.name.toUpperCase()}
					</option>
				))}
			</select>
			<button className="btn btn-large" disabled={isUploading}>
				Post
			</button>
		</form>
	);
};

export default FactForm;
