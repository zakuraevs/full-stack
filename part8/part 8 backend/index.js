const { ApolloServer, gql } = require('apollo-server')
const { v1: uuid } = require('uuid')
const mongoose = require('mongoose')
const Book = require('./models/book')
const Author = require('./models/author')
const User = require('./models/user')
require('dotenv').config()
const jwt = require('jsonwebtoken')

mongoose.set('useFindAndModify', false)

const JWT_SECRET = process.env.JWT_SECRET

const MONGODB_URI = process.env.MONGODB_URI

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

  type User {
    username: String!
    favoriteGenre: String!
    id: ID!
  }
  
  type Token {
    value: String!
  }

  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
    me: User
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
    createUser(
      username: String!
      favoriteGenre: String!
    ): User
    login(
      username: String!
      password: String!
    ): Token
  }  
`

const resolvers = {
  Query: {
    bookCount: () => Book.collection.countDocuments(),
    authorCount: () => Author.collection.countDocuments(),
    allBooks: async (root, args) => {
      console.log("ALL BOOKSREQUESTED")
      const books  = await Book.find({})
      return books
    },
    allAuthors: async () => {
      const authors = await Author.find({})
      return authors
    },
    me: (root, args, context) => {
      return context.currentUser
    }
  },
  Author: {
    bookCount: async (root) => {
      
      const allBooks = await Book.find({ author: root.id })
      return allBooks.length
    }
  },
  Book: {
    author: async (root) => {
      console.log("AUTHOR OF BOOK REQUESTED")

      //console.log('ROOT: ', root)

      //console.log('OBJ ID: ', root.author)
      
      const authInDB = await Author.findById(root.author)
      console.log("AUTHOR FOUND: ", authInDB)
      //console.log('AUT FOUND: ', authInDB.name)

      return {
        name: authInDB.name//root.author
      }
    }
  },
  Mutation: {
    addBook: async (root, args, context) => {

      const currentUser = context.currentUser

      if (!currentUser) {
        throw new AuthenticationError("not authenticated")
      }

      const matchingAuthor = await Author.findOne({ name: args.author })

      if (matchingAuthor) {
        console.log('GENRES: ', args.genres)

        const book = new Book({
          title: args.title,
          published: args.published,
          author: matchingAuthor,
          genres: args.genres
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
        console.log('GENRES: ', args.genres)

        const book = new Book({
          title: args.title,
          published: args.published,
          author: newAuthor,
          genres: args.genres
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
    editAuthor: async (root, args, context) => {
      const currentUser = context.currentUser

      if (!currentUser) {
        throw new AuthenticationError("not authenticated")
      }

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
    },
    createUser: (root, args) => {
      const user = new User({ username: args.username, favoriteGenre: args.favoriteGenre})
  
      return user.save()
        .catch(error => {
          throw new UserInputError(error.message, {
            invalidArgs: args,
          })
        })
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username })
  
      if ( !user || args.password !== 'secret' ) {
        throw new UserInputError("wrong credentials")
      }
  
      const userForToken = {
        username: user.username,
        id: user._id,
      }
  
      return { value: jwt.sign(userForToken, JWT_SECRET) }
    },

  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const auth = req ? req.headers.authorization : null
    if (auth && auth.toLowerCase().startsWith('bearer ')) {
      const decodedToken = jwt.verify(
        auth.substring(7), JWT_SECRET
      )
      const currentUser = await User.findById(decodedToken.id)
      return { currentUser }
    }
  }
})

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})