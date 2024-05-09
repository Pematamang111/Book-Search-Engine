import './App.css';
import { Outlet } from 'react-router-dom';
//Importing an Apollo Provider to make every request work with the Apollo server.
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
	uri: '/graphql',
	cache: new InMemoryCache(),
});

import Navbar from './components/Navbar';

function App() {
	return (
		<ApolloProvider client={client}>
			<Navbar />
			<div className="flex-column justify-center align-center min-100-vh bg-primary">
				<Outlet />
			</div>
		</ApolloProvider>
	);
}

export default App;
