import React from 'react'

const Books = ({books}) => {



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
            {books.map(b => 
              <tr key={b.title}>
                <td>{b.title}</td>
                <td>{b.author.name}</td>
                <td>{b.published}</td>
              </tr>
            )}
          </tbody>
        </table> 
    </div>
  )
}

export default Books