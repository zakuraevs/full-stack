import axios from 'axios'

//Should be changed to relative URL according to course
//but i dont get why
//EDIT: changed
//I get why now: if it's not relative and I want to test
//frontend locally, it will still load data from the remote url
const baseUrl = '/api/persons'

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