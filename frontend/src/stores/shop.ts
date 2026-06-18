import { defineStore } from "pinia";
import { getCart } from "../services/cartService";
import {
  getFavorites,
  addToFavorites,
  removeFromFavorites,
} from "../services/favoritesService";

interface Favorite {
  FavCodigo: number;
  ProCodigo: number;
}

export const useShopStore = defineStore("shop", {
  state: () => ({
    cartCount: 0,
    favorites: [] as Favorite[],
    searchQuery: "",
    isLoadingCart: false,
    isLoadingFavorites: false,
    togglingFavorites: [] as number[],
  }),

  getters: {
    favoritesCount: (state) => state.favorites.length,
  },

  actions: {
    addCart(amount = 1) {
      this.cartCount += amount;
    },

    setCartCount(count: number) {
      this.cartCount = count;
    },

    clearStore() {
      this.cartCount = 0;
      this.favorites = [];
      this.searchQuery = "";
      this.togglingFavorites = [];
    },

    async toggleFavorite(productId: number) {
      const id = Number(productId);

      if (this.togglingFavorites.includes(id)) return;
      this.togglingFavorites.push(id);

      try {
        const index = this.favorites.findIndex(
          (f) => Number(f.ProCodigo) === id,
        );

        // =========================
        // REMOVE
        // =========================
        if (index !== -1) {
          const removed = this.favorites[index];
          this.favorites.splice(index, 1);

          const favId = Number(removed.FavCodigo);

          await removeFromFavorites(favId);
          return;
        }

        // =========================
        // ADD (optimistic)
        // =========================
        const temp: Favorite = {
          FavCodigo: Date.now(),
          ProCodigo: id,
        };

        this.favorites.push(temp);

        const response = await addToFavorites(id);

        const raw = response?.data || response;
        const realId = Number(raw?.FavCodigo || raw?.favCodigo || raw?.id);

        if (realId) {
          const item = this.favorites.find(
            (f) => Number(f.ProCodigo) === id && f.FavCodigo === temp.FavCodigo,
          );

          if (item) {
            item.FavCodigo = realId;
          }
        }
      } catch (error) {
        console.error("Erro ao alternar favorito:", error);

        // rollback seguro (CORRIGIDO)
        this.favorites = this.favorites.filter(
          (f) => Number(f.ProCodigo) !== id,
        );
      } finally {
        this.togglingFavorites = this.togglingFavorites.filter((x) => x !== id);
      }
    },

    async loadCart() {
      if (this.isLoadingCart) return;
      this.isLoadingCart = true;

      try {
        const response = await getCart();
        this.cartCount = (response?.data?.items || []).reduce(
          (total: number, item: any) =>
            total + Number(item.Quantidade || item.quantidade || 0),
          0,
        );
      } catch (error) {
        console.error("Erro ao carregar carrinho:", error);
        this.cartCount = 0;
      } finally {
        this.isLoadingCart = false;
      }
    },

    async loadFavorites() {
      if (this.isLoadingFavorites) return;
      this.isLoadingFavorites = true;

      try {
        const response = await getFavorites();
        const rawList = response?.data || response || [];

        // Normaliza as propriedades vindas do back-end para o padrão camelCase/PascalCase esperado
        this.favorites = rawList.map((item: any) => ({
          FavCodigo: Number(item.FavCodigo || item.favCodigo || item.id),
          ProCodigo: Number(item.ProCodigo || item.proCodigo || item.productId),
        }));
      } catch (error) {
        console.error("Erro ao carregar favoritos:", error);
        this.favorites = [];
      } finally {
        this.isLoadingFavorites = false;
      }
    },
  },
});
