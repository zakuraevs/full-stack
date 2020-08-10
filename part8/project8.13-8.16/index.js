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
    author: Author!
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
      return Book.find({})
    },
    allAuthors: async () => {
      const authors = await Author.find({})
      return authors
    }
  },
  Author: {
    bookCount: async (root) => {
      const allBooks = await Book.find({ author: root.id })
      return allBooks.length
    }
  },
  Mutation: {
    addBook: async (root, args) => {


      const matchingAuthor = await Author.findOne({ name: args.author })

      if (matchingAuthor) {
        const book = new Book({
          title: args.title,
          published: args.published,
          author: matchingAuthor,
          genress: args.genres
        })

        try {
          await book.save()
        } catch (error) {
          console.log('ERROR: ', error.message)
          throw new UserInputError(error.message, {
            invalidArgs: args,
          })
        }
        return book
      } else {
        const newAuthor = new Author({
          name: args.author,
          born: null,
          bookCount: 1
        })
        try {
          await newAuthor.save()
        } catch (error) {
          console.log('ERROR: ', error.message)
          throw new UserInputError(error.message, {
            invalidArgs: args,
          })
        }
        const book = new Book({
          title: args.title,
          published: args.published,
          author: newAuthor,
          genress: args.genres
        })
        try {
          await book.save()
        } catch (error) {
          console.log('ERROR: ', error.message)
          throw new UserInputError(error.message, {
            invalidArgs: args,
          })
        }
        return book
      }


    },
    editAuthor: async (root, args) => {
      const updatedAuthor = await Author.findOneAndUpdate({ name: args.name }, { born: args.setBornTo })

      try {
        if (updatedAuthor) {
          return updatedAuthor
        }
        return null
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      }
    }

  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})