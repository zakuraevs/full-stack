import { gql } from '@apollo/client'

export const ALL_AUTHORS= gql`
query {
  allAuthors  {
    name
    born
    bookCount
  }
}
`
export const ALL_BOOKS= gql`
query {
  allBooks  {
    title
    published
    author {
      name
    }
    genres
  }
}
`

export const CREATE_BOOK = gql`
mutation createBook($title: String!, $author: String!, $published: Int!, $genres: [String!]!) {
  addBook(
    title: $title,
    author: $author,
    published: $published,
    genres: $genres
  ) {
    title
    published
    genres
    author { 
      name 
    }
  }
}
`

export const EDIT_BORN = gql`
  mutation editAuthor($name: String!, $setBornTo: Int!) {
    editAuthor(name: $name, setBornTo: $setBornTo)  {
      name
      born
      bookCount
    }
  }
`

export const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password)  {
      value
    }
  }
`