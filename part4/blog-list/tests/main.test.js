const dummy = require('../utils/list_helper').dummy
const totalLikes = require('../utils/list_helper').totalLikes
const favoriteBlog = require('../utils/list_helper').favoriteBlog
const mostBlogs = require('../utils/list_helper').mostBlogs
const mostLikes = require('../utils/list_helper').mostLikes


const blogs = [
  {
    _id: '5a422a851b54a676234d17f7',
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
    __v: 0,
  },
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url:
      'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0,
  },
  {
    _id: '5a422b3a1b54a676234d17f9',
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    likes: 12,
    __v: 0,
  },
  {
    _id: '5a422b891b54a676234d17fa',
    title: 'First class tests',
    author: 'Robert C. Martin',
    url:
     'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
    likes: 10,
    __v: 0,
  },
  {
    _id: '5a422ba71b54a676234d17fb',
    title: 'TDD harms architecture',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
    likes: 0,
    __v: 0,
  },
  {
    _id: '5a422bc61b54a676234d17fc',
    title: 'Type wars',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
    likes: 2,
    __v: 0,
  },
]

describe('dummy', () => {
  test('dummy returns one', () => {
    const blogs = []

    const result = dummy(blogs)
    expect(result).toBe(1)
  })
})

describe('total likes', () => {

  test('of empty list is zero', () => {
    expect(totalLikes([])).toBe(0)
  })

  test('when one blog, equals to likes of one', () => {
    const onePost = [blogs[0]]

    expect(totalLikes(onePost)).toBe(7)
  })

  test('of a list of blogs is correct', () => {
    expect(totalLikes(blogs)).toBe(36)
  })
})

//FAV BLOG
describe('fav blog', () => {

  test('of empty list is zero', () => {
    expect(favoriteBlog([])).toBe(undefined)
  })

  test('when one blog, equals itself', () => {
    const onePost = [blogs[0]]

    expect(favoriteBlog(onePost).likes).toEqual(blogs[0].likes)
  })

  test('of a list of blogs is correct', () => {
    expect(favoriteBlog(blogs).likes).toEqual(blogs[2].likes)
  })
})


//AUTH WITH MOST BLOGS
describe('most blogs', () => {

  test('result test', () => {
    expect(mostBlogs(blogs)).toEqual({
      author: 'Robert C. Martin',
      blogs: 3
    })
  })

})

//AUTH WITH MOST LIKES
describe('most blogs', () => {

  test('result test', () => {
    expect(mostLikes(blogs)).toEqual({
      author: 'Edsger W. Dijkstra',
      likes: 17
    })
  })

})
