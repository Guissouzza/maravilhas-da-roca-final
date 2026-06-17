import axios from "axios"

const api = axios.create({
  baseURL: "http://localhost:3000"
})

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token")

  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }

  return config
})

// ➕ add
export const addToFavorites = (ProCodigo: number) => {

  return api.post("/favoritos", {
    ProCodigo
  })
}

// 📦 get
export const getFavorites = () => {
  return api.get("/favoritos")
}

// ❌ delete (AGORA CORRETO)
export const removeFromFavorites = (FavCodigo: number) => {
  return api.delete(`/favoritos/${FavCodigo}`)
}