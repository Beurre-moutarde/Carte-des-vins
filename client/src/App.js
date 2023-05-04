import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useQuery, ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import { QUERY_REGION } from './utils/queries';


const client = new ApolloClient({
    uri: '/graphql',
    cache: new InMemoryCache(),
  });

  function App() {
    const { loading, error, data } = useQuery(QUERY_REGION);
  
      
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;
  
    return (
      <div>
        <h1>Regions</h1>
        <ul>
          {data.regions.map((region) => (
            <li key={region._id}>{region.region_name}</li>
          ))}
        </ul>
      </div>
    );
  }
  
  export default function WrappedApp() {
    return (
      <ApolloProvider client={client}>
        <Router>
          <Routes>
            <Route path="/" element={<App />} />
          </Routes>
        </Router>
      </ApolloProvider>
    );
  }



