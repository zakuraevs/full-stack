import React, { useState, useEffect } from 'react'
import { useMutation } from '@apollo/client'
import { EDIT_BORN , ALL_AUTHORS } from '../queries'


const Authors = ({ authors, setError }) => {

  const [name, setName] = useState(authors[0].name)//.length > 0 ? authors[0].name : [])
  const [setBornToString, setBorn] = useState('')

  const [editAuthor, result] = useMutation(EDIT_BORN, {
    refetchQueries: [{ query: ALL_AUTHORS}],
    onError: (error) => {
      error.networkError ? 
        setError(error.networkError.message)
        : 
        setError(error.graphQLErrors[0].message)
    }
  })

  const setBornTo = parseInt(setBornToString)

  const submit = (event) => {
    event.preventDefault()

    editAuthor({ variables: { name, setBornTo } })

    setName(authors[0].name)
    setBorn('')
  }

  useEffect(() => {
    if (result.data && result.data.editBorna === null) {
      setError('person not found')
    }
  }, [result.data]) // eslint-disable-line 

  const handleChange = (event) => {
    setName(event.target.value)
  }
  
  return (
    <div>
      <h2>Authors</h2>
      <table>
        <thead>
          <tr>
            <th>name</th>
            <th>born</th>
            <th>books</th>
          </tr>
        </thead>
        <tbody>
          {authors.map(a => 
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          )}
        </tbody>
      </table>
      <h2>Set birth year</h2>
      <select onChange={handleChange} value={name}>
        {authors.map(a => 
          <option key={a.name} value={a.name}>
            {a.name}
          </option>
        )}
      </select>
      <form onSubmit={submit}>
        <div>
          born<input
            value={setBornToString}
            onChange={({ target }) => setBorn(target.value)}
          />
        </div>
        <button type='submit'>update author</button>
      </form>
    </div>
  )
}

export default Authors