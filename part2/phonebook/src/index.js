import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'

const contacts = [
  {
    name: 'Artas Hellas',
    phone: '040-123456',
    id: 'Artas Hellas'
  }

]

ReactDOM.render(
  <App contacts={contacts} />,
  document.getElementById('root')
)