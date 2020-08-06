import React from 'react'
import Authors from './components/Authors'

import { useQuery } from '@apollo/client';
import { ALL_AUTHORS } from './queries'

const App = () => {

  const result = useQuery(ALL_AUTHORS)

  if (result.loading)  {
    return <div>loading...</div>
  }

  return (
    <div>
        <Authors authors={result.data.allAuthors}/>
    </div>
  )


}

export default App
