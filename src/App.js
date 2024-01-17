import './style.css';
import AuthProvider from './context/AuthContext';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';
import Main from './components/Main';
import PrivateRoutes from './components/PrivateRoutes';
import DataProvider from './context/DataContext';
import ForgotPassword from './components/ForgotPassword';

function App() {
	return (
		<Router>
			<AuthProvider>
				<DataProvider>
					<Routes>
						<Route element={<PrivateRoutes />}>
							<Route path="/" exact element={<Main />} />
						</Route>
						<Route path="/signup" Component={SignUp} />
						<Route path="/signin" Component={SignIn} />
						<Route path="/forgot-password" Component={ForgotPassword} />
					</Routes>
				</DataProvider>
			</AuthProvider>
		</Router>
	);
}

export default App;
