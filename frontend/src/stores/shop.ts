import { defineStore } from "pinia";
import { getCart } from "../services/cartService";
import { getProducts } from "../services/productService"; // <-- Importação do novo serviço
import {
  getFavorites,
  addToFavorites,
  removeFromFavorites,
} from "../services/favoritesService";

interface Favorite {
  FavCodigo: number;
  ProCodigo: number;
}

interface Product {
  id: number | string;
  name: string;
  description: string;
  price: number;
  image: string;
  category?: string;
  procategoria?: string;
  ProCategoria?: string;
}

export const useShopStore = defineStore("shop", {
  state: () => ({
    products: [] as Product[], // Store agora gerencia a lista global de produtos
    cartCount: 0,
    favorites: [] as Favorite[],
    searchQuery: "",
    isLoadingCart: false,
    isLoadingFavorites: false,
    isLoadingProducts: false, // Loading específico para a requisição de produtos
    selectedCategory: "Todas",
    togglingFavorites: [] as number[],
  }),

  getters: {
    favoritesCount: (state) => state.favorites.length,
  },

  actions: {
    async loadProducts() {
      // Evita requisições duplicadas se os produtos já existirem ou se houver uma chamada em andamento
      if (this.products.length > 0) return;
      if (this.isLoadingProducts) return;
      
      this.isLoadingProducts = true;

      try {
        const response = await getProducts();
        // Segue o padrão do Axios (.data) igual aos seus outros serviços
        this.products = response?.data || response || [];
      } catch (error) {
        console.error("Erro ao carregar produtos:", error);
        this.products = [];
      } finally {
        this.isLoadingProducts = false;
      }
    },

    addCart(amount = 1) {
      this.cartCount += amount;
    },

    setCartCount(count: number) {
      this.cartCount = count;
    },

    clearStore() {
      this.products = [];
      this.cartCount = 0;
      this.favorites = [];
      this.searchQuery = "";
      this.selectedCategory = "Todas";
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

        // rollback seguro
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

        // Normaliza as propriedades vindas do back-end
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