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