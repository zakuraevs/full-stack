import axios from 'axios'

//Should be changed to relative URL according to course
//but i dont get why
const baseUrl = 'https://mighty-forest-37221.herokuapp.com/api/persons'

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

const create = newObject => {
    const request = axios.post(baseUrl, newObject)
    return request.then(response => response.data)
}

const deleteContact = id => {
    const request = axios.delete(baseUrl+'/'+id)
    return request.then(response => response.data)
}

const updatePhone = (id ,newObject) => {
const request = axios.put(`${baseUrl}/${id}`, newObject)
  return request.then(response => response.data)
}

export default {getAll, create, deleteContact, updatePhone}