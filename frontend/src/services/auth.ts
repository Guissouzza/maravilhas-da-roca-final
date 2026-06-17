interface UserPayload {
  id: number
  email: string
  role: string
  iat?: number
  exp?: number
}

export function logout() {
  localStorage.removeItem('token')
}

export function getToken() {
  return localStorage.getItem('token')
}

export function isLoggedIn() {
  return !!localStorage.getItem('token')
}

// decode simples do JWT (sem lib externa)
export function getUser(): UserPayload | null {
  const token = localStorage.getItem('token')

  if (!token) return null

  try {
    const base64Payload = token.split('.')[1]
    const payload = JSON.parse(atob(base64Payload))
    return payload
  } catch {
    return null
  }
}