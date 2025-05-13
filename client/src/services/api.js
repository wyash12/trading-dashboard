import axios from "axios"

const API_BASE_URL = "http://localhost:5000/api"

export const fetchEvents = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/events`)
    return response.data
  } catch (error) {
    console.error("Error fetching events:", error)
    throw error
  }
}

export const fetchFilteredEvents = async (filters) => {
  try {
    const params = {}

    if (filters.country) {
      params.country = filters.country
    }

    if (filters.impact) {
      params.impact = filters.impact
    }

    const response = await axios.get(`${API_BASE_URL}/events/filter`, { params })
    return response.data
  } catch (error) {
    console.error("Error fetching filtered events:", error)
    throw error
  }
}
