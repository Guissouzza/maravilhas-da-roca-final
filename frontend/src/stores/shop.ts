import { defineStore } from "pinia";
import { getCart } from "../services/cartService";
import { getFavorites } from "../services/favoritesService";

export const useShopStore = defineStore("shop", {
  state: () => ({
    cartCount: 0,
    favoritesCount: 0,
  }),

  actions: {
    setCart(value: number) {
      this.cartCount = value;
    },

    addCart(amount = 1) {
      this.cartCount += amount;
    },

    setFavorites(value: number) {
      this.favoritesCount = value;
    },

    addFavorite() {
      this.favoritesCount++;
    },

    removeFavorite() {
      if (this.favoritesCount > 0) {
        this.favoritesCount--;
      }
    },

    async loadCart() {
      try {
        const response = await getCart();
        this.cartCount = (response.data?.items || []).reduce(
          (total: number, item: any) => total + Number(item.Quantidade || 0),
          0
        );
      } catch {
        this.cartCount = 0;
      }
    },

    async loadFavorites() {
      try {
        const response = await getFavorites();
        this.favoritesCount = response.data?.length || 0;
      } catch {
        this.favoritesCount = 0;
      }
    },
  },
});