import axios from 'axios'
const baseUrl = '/api/button'

const increment = async (id, newButton) => {
  const response = await axios.put(`${baseUrl}/${id}`, newButton)
  return response.data
}

const getButton = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

export default { increment, getButton }