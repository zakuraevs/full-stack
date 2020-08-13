import React, { useState, useEffect } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import BookForm from './components/BookForm'
import Notify from './components/Notify'
import LoginForm from './components/LoginForm'
import Recomendations from './components/Recomendations'

import { useQuery, useSubscription, useApolloClient } from '@apollo/client';
import { ALL_AUTHORS, ALL_BOOKS, GET_USER, BOOK_ADDED } from './queries'

const App = () => {

  const [token, setToken] = useState(null)

  const [errorMessage, setErrorMessage] = useState(null)
  const [view, setView] = useState('authors')

  const authors = useQuery(ALL_AUTHORS)
  const books = useQuery(ALL_BOOKS)
  const user = useQuery(GET_USER)
  const client = useApolloClient()

  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {

      updateCache(subscriptionData)

      window.alert("New book added: " + subscriptionData.data.bookAdded.title)
      
    }
  })

  useEffect(() => {
    const token = localStorage.getItem('library-user-token')
    if ( token ) {
      setToken(token)
    }
  }, [])

  const updateCacheWith = (addedBook) => {
    const includedIn = (set, object) => 
      set.map(p => p.id).includes(object.id)  

    const dataInStore = client.readQuery({ query: ALL_BOOKS })
    if (!includedIn(dataInStore.allBooks, addedBook)) {
      client.writeQuery({
        query: ALL_BOOKS,
        data: { allBooks : dataInStore.allBooks.concat(addedBook) }
      })
    }   
  }

  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      const addedBook = subscriptionData.data.bookAdded
      notify(`${addedBook.title} added`)
      updateCacheWith(addedBook)
    }
  })

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

  function updateCache(subscriptionData) {
    const bookData = client.readQuery({ query: ALL_BOOKS })

    const newBook = {
      title: subscriptionData.data.bookAdded.title,
      author: subscriptionData.data.bookAdded.author,
      published: subscriptionData.data.bookAdded.published,
      genres: subscriptionData.data.bookAdded.genres
    }

    client.writeQuery({
      query: ALL_BOOKS,
      data: {
        allBooks: [...bookData.allBooks, newBook],
      }
    })

    const authorData = client.readQuery({ query: ALL_AUTHORS })

    const newAuthor = {
      name: subscriptionData.data.bookAdded.author.name
    }

    client.writeQuery({
      query: ALL_AUTHORS,
      data: {
        allAuthors: [...authorData.allAuthors, newAuthor],
      },
    })
  }

  let displayedView

  if (view === 'authors') {
    displayedView = <Authors authors={authors.data.allAuthors} setError={notify}/>
  } else if (view === 'books') {
    displayedView = <Books books={books.data.allBooks}/>
  } else if (view === 'recomendations') {
    displayedView = <Recomendations setError={notify} user={user.data.me} books={books.data.allBooks}/>
  } else if (view === 'bookForm') {
    displayedView = <BookForm setError={notify} updateCacheWith={updateCacheWith}/>
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
        <button onClick={() => setView('recomendations')}>recomendations</button>
        <button onClick={logout}>log out</button>
        {displayedView}
    </div>
  )
}

export default App
