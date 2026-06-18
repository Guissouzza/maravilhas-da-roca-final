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

    clearStore() {
      this.cartCount = 0;
      this.favorites = [];
      this.searchQuery = "";
      this.togglingFavorites = [];
    },

    async toggleFavorite(productId: number) {
      // Impede múltiplos cliques concorrentes no mesmo produto
      if (this.togglingFavorites.includes(productId)) return;
      this.togglingFavorites.push(productId);

      // Normaliza a busca para garantir compatibilidade com qualquer retorno de API
      const index = this.favorites.findIndex(
        (f) => Number(f.ProCodigo || (f as any).proCodigo) === Number(productId)
      );

      // 1. REGRA DE REMOÇÃO
      if (index !== -1) {
        const removed = this.favorites[index];
        this.favorites.splice(index, 1); // Remove imediatamente da tela (Otimista)

        try {
          // Garante que pega o ID do favorito de forma resiliente
          const idParaRemover = removed.FavCodigo || (removed as any).favCodigo;
          await removeFromFavorites(idParaRemover);
        } catch (error) {
          console.error("Erro ao remover dos favoritos:", error);
          // Se falhar no servidor, devolve para a tela (Rollback)
          this.favorites.splice(index, 0, removed);
        } finally {
          this.togglingFavorites = this.togglingFavorites.filter((id) => id !== productId);
        }
        return;
      }

      // 2. REGRA DE ADIÇÃO
      const timestampId = Date.now();
      const temp: Favorite = {
        FavCodigo: timestampId,
        ProCodigo: productId,
      };

      this.favorites.push(temp); // Adiciona imediatamente na tela (Otimista)

      try {
        const response = await addToFavorites(productId);
        
        // Extrai o código retornado independente se está dentro de .data ou direto na response
        const rawData = response?.data || response;
        const realFavCodigo = rawData?.FavCodigo || rawData?.favCodigo || rawData?.id;

        if (realFavCodigo) {
          // Atualiza o ID temporário para o ID real do banco de dados
          const item = this.favorites.find(
            (f) => Number(f.ProCodigo) === Number(productId) && f.FavCodigo === timestampId
          );
          if (item) {
            item.FavCodigo = Number(realFavCodigo);
          }
        }
      } catch (error) {
        console.error("Erro ao adicionar aos favoritos:", error);
        // Se a API der erro, desfaz a inserção em tela
        this.favorites = this.favorites.filter((f) => f.FavCodigo !== timestampId);
      } finally {
        this.togglingFavorites = this.togglingFavorites.filter((id) => id !== productId);
      }
    },

    async loadCart() {
      if (this.isLoadingCart) return;
      this.isLoadingCart = true;

      try {
        const response = await getCart();
        this.cartCount = (response?.data?.items || []).reduce(
          (total: number, item: any) => total + Number(item.Quantidade || item.quantidade || 0),
          0
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