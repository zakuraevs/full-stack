const { ApolloServer, gql } = require('apollo-server')
const { v1: uuid } = require('uuid')
const mongoose = require('mongoose')
const Book = require('./models/book')
const Author = require('./models/author')
require('dotenv').config()

mongoose.set('useFindAndModify', false)

let MONGODB_URI = process.env.MONGODB_URI

console.log('connecting to', MONGODB_URI)

mongoose.connect(MONGODB_URI, { useNewUrlParser: true })
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connection to MongoDB:', error.message)
  })

const typeDefs = gql`

  type Book {
    title: String!
    published: Int!
    author: String!
    genres: [String!]!
    id: ID!
  }

  type Author {
    name: String!
    id: ID!
    born: Int
    bookCount: Int!
  }

  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
  }

  type Mutation {
    addBook(
      title: String!
      author: String!
      published: Int!
      genres: [String!]!
    ): Book,
    editAuthor(
      name: String! 
      setBornTo: Int!
    ): Author
  }  
`

const resolvers = {
  Query: {
    bookCount: () => Book.collection.countDocuments(),
    authorCount: () => Author.collection.countDocuments(),
    allBooks: (root, args) => {
      //if (args.author && !args.genre) {
      //  return books.filter(b => b.author === args.author)
      //} else if (args.genre && !args.author) {
      //  return books.filter(b => b.genres.includes(args.genre))
      //} else if (args.genre && args.author) {
      //  const filteredByAuthor = books.filter(b => b.author === args.author)
      //  const res = filteredByAuthor.filter(b => b.genres.includes(args.genre))
      //  return res
      //} else {
        return Book.find({})
      //}
    },
    allAuthors: async () => {
      console.log('all authors are requested')
      const authors = await Author.find({})
      //console.log('RESPONSE: ', authors)
      return authors
    }  
  },
  Author: {
    bookCount: (root) => {
      const allBooks = Book.find({})
      console.log('requesting all books')
      console.log('all books: ', allBooks)
      const filtered = allBooks.filter(b => b.author === root.name).length
      console.log('returning ', filtered)
      return filtered
    }
  },
  Mutation: {
    addBook: async (root, args) => {
      console.log('ADDING NEW BOOK IS REQUESTED')
      console.log('ARGS: ', args)
      const book = new Book({...args})
      //const author = book.author
      
      //if(!books.map(b => b.author).includes(author)) {
        //const newAuhtorObject = {
        //  name: author,
        //  born: null,
        //  id: uuid()
        //}
        await book.save()
        //authors = authors.concat(newAuhtorObject)

      //}
      //books = books.concat(book)
      
      return book
    },
    editAuthor: async (root, args) => {
      const authorName = args.name
      const authorInDatabase = await Author.findOne({ name: args.name })

      console.log("authorInDatabase: ", authorInDatabase)

      if(authorInDatabase) {

        //authors.map(a => a.name === authorName ? a.born = args.setBornTo : a)
        console.log("updated authorInDatabase: ", authorInDatabase)
        console.log("ALL AUTHORS: ", authors)

        return authorInDatabase
      } else {
        return null
      }
    }
    //editAuthor(
    //  name: String! 
    //  setBornTo: Int!
    //): Author

  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})