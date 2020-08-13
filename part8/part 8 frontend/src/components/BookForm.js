import React, { useState } from 'react'
import { useMutation } from '@apollo/client'
import { ALL_BOOKS, CREATE_BOOK, ALL_AUTHORS } from '../queries'


const BookForm = ({ setError, updateCacheWith }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [publishedString, setPublished] = useState('')
  const [currentGenre, setCurrentGenre] = useState('')
  const [genres, setGenres] = useState([])

  const [createBook] = useMutation(CREATE_BOOK, {
    refetchQueries: [{ query: ALL_BOOKS}, {query: ALL_AUTHORS }],
    onError: (error) => {
      error.networkError ? 
        setError(error.networkError.message)
        : 
        setError(error.graphQLErrors[0].message)
    },
    update: (store, response) => {
      updateCacheWith(response.data.addBook)
    }
  })

  const submit = (event) => {
    event.preventDefault()

    const published = parseInt(publishedString)

    createBook({ variables: { title, author, published, genres } })

    setTitle('')
    setAuthor('')
    setPublished('')
    setGenres([])
  }

  return (
    <div>
      <h2>Add book</h2>
      <form onSubmit={submit}>
        <div>
          title <input value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author <input value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          published <input value={publishedString}
            onChange={({ target }) => setPublished(target.value)}
          />
        </div>
        <div>
          genres <input value={currentGenre}
            //FIX
            onChange={({ target }) => setCurrentGenre(target.value)}
          />
          <button type='button' onClick={() => {
              setGenres(genres.concat(currentGenre))
              setCurrentGenre('')
            }
          }>add genre</button>
        </div>
        <button type='submit'>add!</button>
      </form>
    </div>
  )
}

export default BookForm