import axios from "axios"

// 🌍 Define a URL dinamicamente: se existir uma variável de ambiente na Vercel ela usa, senão cai no localhost
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:3000",
  withCredentials: true
})

// INTERCEPTOR DE ENVIAR O TOKEN
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token")

  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`
  }

  return config
})

// INTERCEPTOR DE RESPOSTA (Captura o token expirado)
api.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      console.warn("Token expirado ou inválido. Deslogando usuário...")
      
      localStorage.removeItem("token")
      window.location.href = "/login"
    }

    return Promise.reject(error)
  }
)

export default api