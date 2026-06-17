import axios from "axios"

const api = axios.create({
  baseURL: "http://localhost:3000"
})

// injeta token automaticamente
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token")

  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }

  return config
})

export const addToCart = async (product_id: number, quantity = 1) => {
  return api.post("/cart/add", {
    product_id,
    quantity
  })
}

export const getCart = async () => {
  return api.get("/cart")
}