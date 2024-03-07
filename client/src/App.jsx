import './App.css';
import { Outlet } from 'react-router-dom';
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client';

import Navbar from './components/Navbar';

// Apollo Client
const client = new ApolloClient({
  uri: 'http://localhost:3000/graphql', // Replace with your GraphQL server URL
  cache: new InMemoryCache()
});

function App() {
  return (
    <ApolloProvider client={client}>
      <div>
        <Navbar />
        <Outlet />
      </div>
    </ApolloProvider>
  );
}

export default App;
