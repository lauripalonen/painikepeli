import axios from 'axios'
const baseUrl = '/api/users'

const signup = async credentials => {
  const response = await axios.post(baseUrl, credentials)
  return response.data
}

const getUser = async (id) => {
  const response = await axios.get(`${baseUrl}/${id}`)
  return response.data
}

const computeUserPoints = async (id, { user, buttonPushCount }) => {
  const response = await axios.put(`${baseUrl}/${id}/points`, { user, buttonPushCount })
  return response.data
}

const resetUserPoints = async (id, user) => {
  const response = await axios.put(`${baseUrl}/${id}/reset`, user)
  return response.data
}

export default { signup, getUser, computeUserPoints, resetUserPoints }