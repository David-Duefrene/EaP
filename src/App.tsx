import { useState } from 'react'

import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  useQuery,
  gql
} from "@apollo/client";

import logo from './logo.svg'
import './App.css'

  // the client
  const client = new ApolloClient({
    uri: 'http://localhost:4000',
    cache: new InMemoryCache()
  });

function App() {
  const [count, setCount] = useState([])

  client.query({
    query: gql`
    query ExampleQuery {
      books {
        title
      }
    }
    `
  }).then(result => setCount(result.data.books));

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>Hello Vite + React!</p>
        <p>
          count is: {count.map(book => <p>{book.title}</p>)}
        </p>
      </header>
    </div>
  )
}

export default App
