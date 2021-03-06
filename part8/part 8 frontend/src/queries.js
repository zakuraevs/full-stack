import { gql } from '@apollo/client'

const BOOK_DETAILS = gql`
  fragment bookDetails on Book {
    title
    published
    author {
      name
    }
    genres
  }
`

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
query allBooks($genre: String) {
  allBooks(genre: $genre)  {
    title
    published
    author {
      name
    }
    genres
  }
}
`

export const GET_USER = gql`
  query {
    me {
      username
      favoriteGenre
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

export const REFETCH = gql`
  mutation refetch {
    refetch {
      response
    }
  }
`

export const BOOK_ADDED = gql`
  subscription {
    bookAdded {
      ...bookDetails
    }
  }
  ${BOOK_DETAILS}
`

