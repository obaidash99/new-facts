import CategoryFilter from './CategoryFilter';
import Loader from './Loader';
import FactsList from './FactsList';
import Header from './Header';
import FactForm from './FactForm';
import { useAuth } from '../context/AuthContext';
import '../style.css';
import { useData } from '../context/DataContext';

export default function Main() {
	const { currentUser } = useAuth();
	const { isLoading, showForm } = useData();

	return (
		<>
			<Header />
			{currentUser && showForm && <FactForm />}
			<div className="main">
				<CategoryFilter />
				{isLoading ? <Loader /> : <FactsList />}
			</div>
		</>
	);
}
