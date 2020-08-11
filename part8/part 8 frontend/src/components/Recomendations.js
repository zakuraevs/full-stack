import React from 'react'

const Recomendations = ({ books, user }) => {

  console.log('USER: ', user)
  console.log('GENRE: ', user.favoriteGenre)
  console.log('BOOKS: ', books)
  return (
    <div>
      <h2>Recomendations</h2>
      <h4>Welcome {user.username}. Books in your favorite genre {user.favoriteGenre}:</h4>

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
            .filter(b => b.genres.includes(user.favoriteGenre))
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

export default Recomendations
