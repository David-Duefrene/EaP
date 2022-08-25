import React, { useState } from 'react'

import {
	ApolloClient, InMemoryCache, gql,
} from '@apollo/client'

import AddCharacter from './AddCharacter/AddCharacter'
import logo from './logo.svg'
import './App.css'

// The client
const client = new ApolloClient({
	uri: 'http://localhost:4000',
	cache: new InMemoryCache(),
})

const App = () => {
	const [ count, setCount ] = useState([])

	client.query({
		query: gql`
    query ExampleQuery {
      books {
        title
      }
    }
    `,
	}).then((result) => setCount(result.data.books))

	return (
		<div className='App'>
			<header className='App-header'>
				<img src={logo} className='App-logo' alt='logo' />
				<p>Hello Vite, React, GraphQL, and Electron!</p>
				<p>env is {process.env.NODE_ENV}</p>
				<AddCharacter />
				<p>QL Query: {count.map((book, index) => <p key={index}>{
					//@ts-expect-error placeholder
					book.title
				}</p>)}</p>
			</header>
		</div>
	)
}

export default App
