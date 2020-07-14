const _ = require('lodash')

const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  const reducer = (sum, item) => {
    return sum + item
  }

  const arrayOfLikes = blogs.map(blog => blog.likes)

  return arrayOfLikes.length === 0
      ? 0
      : arrayOfLikes.reduce(reducer, 0)

}

const favoriteBlog = (blogs) => {

  if (blogs.length === 0) return undefined

  let fav = blogs[0]

  for(let i = 0, l = blogs.length; i < l; i++ ) {
    blogs[i].likes > fav.likes ? fav = blogs[i] : null
  }

  return ({
    title: fav.title,
    author: fav.author,
    likes: fav.likes
  })

}

const mostBlogs = (blogs) => {

  //Return an object that counts elements of collection (blogs)
  //by a value of an element
  const author_blog_map = _.countBy(blogs, a => a.author)

  const maxAuthor =
  Object
    .keys(author_blog_map)
    .reduce((a,b) => author_blog_map[a] > author_blog_map[b] ? a : b)

  const maxBlogs =
  Object
    .values(author_blog_map)
    .reduce((a,b) => a > b ? a : b)


  return {
    author: maxAuthor,
    blogs: maxBlogs
  }
}

const mostLikes = (blogs) => {

  //Object with keys as authors and values as arrays containing all blog posts by the author
  const authorsGroupped = _.groupBy(blogs, a => a.author)

  //Transforms the object above:
  //Keys stay the same, but values are mapped to
  //total likes across posts by same author
  const likes =
    _.mapValues(authorsGroupped,
      array => array
        .map(object => object.likes)
        .reduce((a, b) => a + b)
    )

  const maxAuthor =
  Object
    .keys(likes)
    .reduce((a,b) => likes[a] > likes[b] ? a : b)

  const maxLikes =
  Object
    .values(likes)
    .reduce((a,b) => a > b ? a : b)

  return {
    author: maxAuthor,
    likes: maxLikes
  }
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}