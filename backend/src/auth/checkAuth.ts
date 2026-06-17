import axios from 'axios'

export async function checkAuth() {
  const token = localStorage.getItem('token')

  if (!token) return false

  try {
    await axios.get('http://localhost:3000/auth/me', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    return true
  } catch {
    localStorage.removeItem('token')
    return false
  }
}