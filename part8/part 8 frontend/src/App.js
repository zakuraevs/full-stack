import React, { useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import BookForm from './components/BookForm'
import Notify from './components/Notify'
import LoginForm from './components/LoginForm'

import { useQuery, useApolloClient } from '@apollo/client';
import { ALL_AUTHORS, ALL_BOOKS } from './queries'

const App = () => {

  const [token, setToken] = useState(null)

  const [errorMessage, setErrorMessage] = useState(null)
  const [view, setView] = useState('authors')

  const authors = useQuery(ALL_AUTHORS)
  const books = useQuery(ALL_BOOKS)
  
  const client = useApolloClient()

  console.log('AUTHORS FROM MONGO: ', authors)
  console.log('BOOKS FROM MONGO: ', books)

  if (authors.loading || books.loading)  {
    return <div>loading...</div>
  } 

  const notify = (message) => {
    setErrorMessage(message)
    setTimeout(() => {
      setErrorMessage(null)
    }, 10000)
  }

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
  }

  let displayedView

  if (view === 'authors') {
    displayedView = <Authors authors={authors.data.allAuthors} setError={notify}/>
  } else if (view === 'books') {
    displayedView = <Books books={books.data.allBooks}/>
  } else if (view === 'bookForm') {
    displayedView = <BookForm setError={notify}/>
  } 

  if (!token) {
    return (
      <div>
        <Notify errorMessage={errorMessage} />
        <h2>Login</h2>
        <LoginForm
          setToken={setToken}
          setError={notify}
          token={token}
        />
      </div>
    )
  }

  return (
    <div>
        <Notify errorMessage={errorMessage} />
        <button onClick={() => setView('authors')}>authors</button>
        <button onClick={() => setView('books')}>books</button>
        <button onClick={() => setView('bookForm')}>add book</button>
        <button onClick={logout}>log out</button>
        {displayedView}
    </div>
  )


}

export default App
