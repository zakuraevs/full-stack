import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
    const response = await axios.get(baseUrl)
    return response.data
}

const createNew = async (content) => {
    console.log('CREATED A NEW ANECDOTE THRU SERVICES')
    const object = { content, votes: 0 }
    const response = await axios.post(baseUrl, object)
    return response.data
}

const updateAnecdote = async (content, votes, id) => {
    const object = { content, votes }
    const response = await axios.put(`${baseUrl}/${id}`, object)
    return response.data
}

export default { 
    getAll,
    createNew,
    updateAnecdote
}