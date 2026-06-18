<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from "vue";
import { useRouter } from "vue-router";
import { getCart } from "../services/cartService";
import { getFavorites } from "../services/favoritesService";

const router = useRouter();

const searchQuery = ref("");
const isUserOpen = ref(false);
const isMobileMenuOpen = ref(false);

const cartCount = ref(0);
const favoritesCount = ref(0);
const userEmail = ref<string | null>(null);

/* LOADS */
const loadCart = async () => {
  try {
    const response = await getCart();
    const items = response.data.items || [];

    cartCount.value = items.reduce((t: number, i: any) => {
      return t + Number(i.Quantidade || 0);
    }, 0);
  } catch {
    cartCount.value = 0;
  }
};

const loadFavorites = async () => {
  try {
    const response = await getFavorites();
    favoritesCount.value = response.data.length || 0;
  } catch {
    favoritesCount.value = 0;
  }
};

const loadUser = () => {
  const token = localStorage.getItem("token");
  if (!token) return;

  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    userEmail.value = payload.email;
  } catch {
    userEmail.value = null;
  }
};

const logout = () => {
  localStorage.removeItem("token");
  router.push("/login");
  isUserOpen.value = false;
};

onMounted(() => {
  loadCart();
  loadFavorites();
  loadUser();

  window.addEventListener("cart-updated", loadCart);
  window.addEventListener("favorites-updated", loadFavorites);
});

onBeforeUnmount(() => {
  window.removeEventListener("cart-updated", loadCart);
  window.removeEventListener("favorites-updated", loadFavorites);
});
</script>

<template>
  <header
    class="sticky top-0 z-50 backdrop-blur-2xl bg-[#FDFBF7]/80 border-b border-[#EED9C4]/40 px-3 sm:px-4 py-3 sm:py-4"
  >
    <div class="max-w-7xl mx-auto flex items-center gap-6">



      <!-- LOGO -->
      <RouterLink to="/" class="flex items-center gap-3 shrink-0">
        <img
          src="/images/logo_sem_fundo.png"
          class="w-10 h-10 sm:w-14 sm:h-14 object-contain"
        />

        <div class="flex flex-col leading-tight">
          <span class="text-sm sm:text-xl font-serif font-black text-[#362212]">
            Maravilhas da <span class="text-[#A0522D]">Roça</span>
          </span>
          <span
            class="text-[9px] sm:text-[10px] uppercase tracking-[0.2em] text-[#A0522D]/70 font-bold"
          >
            Sabor Ancestral
          </span>
        </div>
      </RouterLink>

            <!-- 🔍 SEARCH (ESQUERDA - MAIOR) -->
      <div class="hidden md:flex flex-1 max-w-md">
        <div class="relative w-full">
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Buscar produtos..."
            class="w-full bg-[#FAF6EE] border border-[#EED9C4] rounded-2xl px-5 py-2.5 pl-10 text-sm"
          />
          <span class="absolute left-3 top-2.5 text-gray-400">🔍</span>
        </div>
      </div>

      <!-- DIREITA (LINKS + ICONS JUNTOS) -->
      <div class="flex items-center gap-5 ml-auto">

        <!-- NAV (DIREITA) -->
        <nav class="hidden lg:flex gap-6 text-sm font-bold text-[#7A5C43]">
          <RouterLink to="/">Início</RouterLink>
          <RouterLink to="/catalogo">Catálogo</RouterLink>
          <RouterLink to="/sobre">Sobre</RouterLink>
        </nav>

        <!-- FAVORITOS -->
        <RouterLink to="/favoritos" class="relative">
          <div class="w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center rounded-full bg-[#FAF6EE] border border-[#EED9C4]">
            ❤️
          </div>
          <span class="absolute -top-2 -right-2 bg-[#A0522D] text-white text-[10px] w-5 h-5 flex items-center justify-center rounded-full">
            {{ favoritesCount }}
          </span>
        </RouterLink>

        <!-- CARRINHO -->
        <RouterLink to="/carrinho" class="relative">
          <div class="w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center rounded-full bg-[#FAF6EE] border border-[#EED9C4]">
            🛒
          </div>
          <span class="absolute -top-2 -right-2 bg-[#A0522D] text-white text-[10px] w-5 h-5 flex items-center justify-center rounded-full">
            {{ cartCount }}
          </span>
        </RouterLink>

        <!-- USER -->
        <div class="relative">
          <button
            @click="isUserOpen = !isUserOpen"
            class="w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center rounded-full bg-[#FAF6EE] border border-[#EED9C4]"
          >
            👤
          </button>

          <div
            v-if="isUserOpen"
            class="absolute right-0 mt-2 w-52 bg-white border border-[#EED9C4] rounded-xl shadow-lg"
          >
            <div class="px-4 py-3 border-b text-xs text-[#7A5C43]">
              <p class="font-bold text-[#362212]">Logado como:</p>
              <p class="truncate">{{ userEmail || "Usuário" }}</p>
            </div>

            <button
              @click="logout"
              class="w-full text-left px-4 py-2 text-sm text-red-600 font-bold"
            >
              Sair
            </button>
          </div>
        </div>

        <!-- MOBILE MENU -->
        <button
          class="lg:hidden w-9 h-9 flex items-center justify-center rounded-full bg-[#FAF6EE] border border-[#EED9C4]"
          @click="isMobileMenuOpen = !isMobileMenuOpen"
        >
          ☰
        </button>
      </div>
    </div>

    <!-- MOBILE -->
    <div
      v-if="isMobileMenuOpen"
      class="lg:hidden mt-4 px-4 pb-4 space-y-4 border-t border-[#EED9C4]/40"
    >
      <nav class="flex flex-col gap-3 font-bold text-[#7A5C43]">
        <RouterLink @click="isMobileMenuOpen = false" to="/">Início</RouterLink>
        <RouterLink @click="isMobileMenuOpen = false" to="/catalogo">Catálogo</RouterLink>
        <RouterLink @click="isMobileMenuOpen = false" to="/sobre">Sobre</RouterLink>
      </nav>

      <div class="relative md:hidden">
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Buscar produtos..."
          class="w-full bg-[#FAF6EE] border border-[#EED9C4] rounded-2xl px-4 py-2 pl-10 text-sm"
        />
        <span class="absolute left-3 top-2 text-gray-400">🔍</span>
      </div>
    </div>
  </header>
</template>