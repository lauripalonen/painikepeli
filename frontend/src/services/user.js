import axios from 'axios'
const baseUrl = '/api/users'

const signup = async credentials => {
  const response = await axios.post(baseUrl, credentials)
  return response.data
}

const getPlayer = async (id) => {
  const response = await axios.get(`${baseUrl}/${id}`)
  return response.data
}

const updatePlayerPoints = async (id, player) => {
  const response = await axios.put(`${baseUrl}/${id}`, player)
  return response.data
}

export default { signup, updatePlayerPoints, getPlayer }