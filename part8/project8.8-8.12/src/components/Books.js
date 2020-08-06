import React, { useState, useEffect } from 'react'
import { useQuery } from '@apollo/client';
import { ALL_AUTHORS, ALL_BOOKS } from '../queries'


//import { FIND_PERSON } from '../queries'


const Books = ({books}) => {

  //const books = useQuery(ALL_BOOKS)

  //console.log('BOOKS: ', books.data)
  //console.log('LOADING: ', books.loading)


  //if (books.loading)  {
  //  return <div>loading...</div>
  //}

  return (
    <div>
      <h2>Books</h2>
        <table>
          <thead>
            <tr>
              <th>title</th>
              <th>author</th>
              <th>published</th>
            </tr>
          </thead>
          <tbody>
            {books.map(a => 
              <tr key={a.title}>
                <td>{a.title}</td>
                <td>{a.author}</td>
                <td>{a.published}</td>
              </tr>
            )}
          </tbody>
        </table> 
    </div>
  )
}

export default Books