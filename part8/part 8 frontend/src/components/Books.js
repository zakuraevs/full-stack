import React, { useState } from 'react'
const _ = require('lodash')
const Books = ({ books }) => {

  const [genre, setGenre] = useState('all')
  const genres = books.map(b => b.genres).reduce(reducer, ['all'])

  function reducer(accumulator, current) {
    return _.union(accumulator, current)
  }

  const handleChange = (event) => {
    setGenre(event.target.value)

  }

  return (
    <div>
      <h2>Books</h2>
      <h4>Filter by genre</h4>
      <select onChange={handleChange} value={genre}>
        {genres.map(g =>
          <option key={g} value={g}>
            {g}
          </option>
        )}
      </select>

      <table>
        <thead>
          <tr>
            <th>title</th>
            <th>author</th>
            <th>published</th>
          </tr>
        </thead>
        <tbody>
          {books
            .filter(b => genre === 'all' ? b : b.genres.includes(genre))
            .map(b =>
              <tr key={b.title}>
                <td>{b.title}</td>
                <td>{b.author.name}</td>
                <td>{b.published}</td>
              </tr>
            )
          }
        </tbody>
      </table>
    </div>
  )
}

export default Books
