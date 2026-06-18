<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { RouterLink, useRouter } from "vue-router";
import { useShopStore } from "../stores/shop";

const router = useRouter();
const shop = useShopStore();

const isUserOpen = ref(false);
const userEmail = ref<string | null>(null);

const cartCount = computed(() => shop.cartCount);
const favoritesCount = computed(() => shop.favoritesCount);

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

  // garante limpeza total do estado global
  shop.clearStore();

  // evita UI bug de dropdown aberto
  isUserOpen.value = false;

  router.push("/login");
};

onMounted(async () => {
  loadUser();

  if (!userEmail.value) return;

  try {
    await Promise.all([
      shop.loadCart(),
      shop.loadFavorites(),
    ]);
  } catch (err) {
    console.error("Erro no carregamento dos dados do Header:", err);
  }
});
</script>

<template>
  <header class="sticky top-0 z-50 backdrop-blur-2xl bg-[#FDFBF7]/80 border-b border-[#EED9C4]/40 px-3 sm:px-4 py-3 sm:py-4">
    <div class="max-w-7xl mx-auto flex items-center gap-6">
      <RouterLink to="/" class="flex items-center gap-3 shrink-0">
        <img src="/images/logo_sem_fundo.png" class="w-10 h-10 sm:w-14 sm:h-14 object-contain" />
        <div class="flex flex-col leading-tight">
          <span class="text-sm sm:text-xl font-serif font-black text-[#362212]">
            Maravilhas da <span class="text-[#A0522D]"> Roça </span>
          </span>
          <span class="text-[9px] sm:text-[10px] uppercase tracking-[0.2em] text-[#A0522D]/70 font-bold">
            Sabor Ancestral
          </span>
        </div>
      </RouterLink>

      <div class="hidden md:flex flex-1 max-w-md">
        <div class="relative w-full">
          <input
            v-model="shop.searchQuery"
            type="text"
            placeholder="Buscar produtos..."
            class="w-full bg-[#FAF6EE] border border-[#EED9C4] rounded-2xl px-5 py-2.5 pl-10 text-sm"
          />
          <span class="absolute left-3 top-2.5 text-gray-400"> 🔍 </span>
        </div>
      </div>

      <div class="flex items-center gap-5 ml-auto">
        <nav class="hidden lg:flex gap-6 text-sm font-bold text-[#7A5C43]">
          <RouterLink to="/"> Início </RouterLink>
          <RouterLink to="/catalogo"> Catálogo </RouterLink>
          <RouterLink to="/sobre"> Sobre </RouterLink>
        </nav>

        <RouterLink to="/favoritos" class="relative">
          <div class="w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center bg-[#FAF6EE] border border-[#EED9C4]">
            ❤️
          </div>
          <span class="absolute -top-2 -right-2 bg-[#A0522D] text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center">
            {{ favoritesCount }}
          </span>
        </RouterLink>

        <RouterLink to="/carrinho" class="relative">
          <div class="w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center bg-[#FAF6EE] border border-[#EED9C4]">
            🛒
          </div>
          <span class="absolute -top-2 -right-2 bg-[#A0522D] text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center">
            {{ cartCount }}
          </span>
        </RouterLink>

        <div class="relative">
          <button @click="isUserOpen = !isUserOpen" class="w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center bg-[#FAF6EE] border border-[#EED9C4]">
            👤
          </button>

          <div v-if="isUserOpen" class="absolute right-0 mt-2 w-52 bg-white border border-[#EED9C4] rounded-xl shadow-lg">
            <div class="px-4 py-3 border-b">
              <p class="font-bold">Logado como:</p>
              <p class="truncate">{{ userEmail || "Usuário" }}</p>
            </div>
            <button @click="logout" class="w-full text-left px-4 py-2 text-red-600 font-bold">
              Sair
            </button>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>