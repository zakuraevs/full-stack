import React from 'react'
import { useQuery } from '@apollo/client'
import {  ALL_BOOKS } from '../queries'


const Recomendations = ({ books, user }) => {

  const recomendations = useQuery(ALL_BOOKS)

  console.log('RECOMENDATIONS: ', recomendations)

  console.log('USER: ', user)
  console.log('GENRE: ', user.favoriteGenre)
  console.log('BOOKS: ', books)
  return (
    <div>
      <h2>Recomendations</h2>
      <h4>Welcome {user.username}! Books in your favorite genre {user.favoriteGenre}:</h4>

      <table>
        <thead>
          <tr>
            <th>title</th>
            <th>author</th>
            <th>published</th>
          </tr>
        </thead>
        <tbody>
          {recomendations.data.allBooks
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
