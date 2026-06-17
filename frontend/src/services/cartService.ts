import api from "./api"

export const addToCart = (product_id: number, quantity = 1) => {
  return api.post("/cart/add", { product_id, quantity })
}

export const getCart = () => {
  return api.get("/cart")
}