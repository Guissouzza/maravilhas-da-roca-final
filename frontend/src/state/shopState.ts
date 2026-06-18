import { reactive } from "vue";
import { getCart } from "../services/cartService";
import { getFavorites } from "../services/favoritesService";

/* 🔥 SINGLE SOURCE OF TRUTH */
const state = reactive({
  cartCount: 0,
  favoritesCount: 0,
});

let initialized = false;

/* =========================
   LOAD INICIAL (HEADER)
========================= */

async function refreshCart() {
  const res = await getCart();
  const items = res.data.items || [];

  state.cartCount = items.reduce(
    (t: number, i: any) => t + Number(i.Quantidade || 0),
    0
  );
}

async function refreshFavorites() {
  const res = await getFavorites();
  state.favoritesCount = res.data.length || 0;
}

async function init() {
  if (initialized) return;
  initialized = true;

  await Promise.all([refreshCart(), refreshFavorites()]);
}

/* =========================
   🔥 ATUALIZAÇÃO EM TEMPO REAL (ESSENCIAL)
   NÃO depende de API reload
========================= */

function addToCartLocal(qty = 1) {
  state.cartCount += qty;
}

function removeFromCartLocal(qty = 1) {
  state.cartCount = Math.max(0, state.cartCount - qty);
}

function addFavoriteLocal() {
  state.favoritesCount += 1;
}

function removeFavoriteLocal() {
  state.favoritesCount = Math.max(0, state.favoritesCount - 1);
}

/* =========================
   SYNC COM BACKEND (opcional)
========================= */

async function syncCart() {
  await refreshCart();
}

async function syncFavorites() {
  await refreshFavorites();
}

/* =========================
   EXPORT
========================= */

export function useShopState() {
  return {
    state,

    init,

    refreshCart,
    refreshFavorites,
    syncCart,
    syncFavorites,

    addToCartLocal,
    removeFromCartLocal,
    addFavoriteLocal,
    removeFavoriteLocal,
  };
}