import React, { useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'


import { useQuery } from '@apollo/client';
import { ALL_AUTHORS, ALL_BOOKS } from './queries'

const App = () => {

  const [ view, setView ] = useState('authors')

  const authors = useQuery(ALL_AUTHORS)
  const books = useQuery(ALL_BOOKS)
  
  console.log('AUTHORS in APP: ', authors.data)
  console.log('BOOKS in APP: ', books.data)

  if (authors.loading || books.loading)  {
    return <div>loading...</div>
  } 

  let displayedView

  if (view === 'authors') {
    displayedView = <Authors authors={authors.data.allAuthors}/>
  } else if (view === 'books') {
    displayedView = <Books books={books.data.allBooks}/>
  }


  return (
    <div>
        <button onClick={() => setView('authors')}>authors</button>
        <button onClick={() => setView('books')}>books</button>
        {displayedView}
    </div>
  )


}

export default App
