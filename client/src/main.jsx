import ReactDOM from 'react-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client'

import App from './App.jsx'
import SearchBooks from './pages/SearchBooks'
import SavedBooks from './pages/SavedBooks'

// Create an Apollo Client instance
const client = new ApolloClient({
  uri: 'http://localhost:3000/graphql', //  GraphQL server URL
  cache: new InMemoryCache()
})

ReactDOM.render(
  <ApolloProvider client={client}>
    <Router>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<SearchBooks />} />
          <Route path="/saved" element={<SavedBooks />} />
        </Route>
        <Route path="*" element={<h1 className='display-2'>Wrong page!</h1>} />
      </Routes>
    </Router>
  </ApolloProvider>,
  document.getElementById('root')
)
