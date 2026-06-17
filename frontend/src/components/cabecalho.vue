<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from "vue"
import { useRouter } from "vue-router"
import { getCart } from "../services/cartService"

const router = useRouter()

const searchQuery = ref("")
const isUserOpen = ref(false)
const cartCount = ref(0)

// 🔥 carrega carrinho
const loadCart = async () => {
  try {
    const response = await getCart()

    const items = response.data.items || []

    cartCount.value = items.reduce((total: number, item: any) => {
      return total + Number(item.Quantidade || 0)
    }, 0)

  } catch (error) {
    console.error("Erro ao carregar carrinho:", error)
    cartCount.value = 0
  }
}

// 🚪 logout
const logout = () => {
  localStorage.removeItem("token")
  router.push("/login")
}

// 🔥 evento global
const handleCartUpdate = () => {
  loadCart()
}

onMounted(() => {
  loadCart()
  window.addEventListener("cart-updated", handleCartUpdate)
})

onBeforeUnmount(() => {
  window.removeEventListener("cart-updated", handleCartUpdate)
})
</script>

<template>
  <header class="sticky top-0 z-50 backdrop-blur-2xl bg-[#FDFBF7]/80 border-b border-[#EED9C4]/40 px-4 py-4 shadow-[0_4px_30px_rgba(92,61,36,0.03)]">

    <div class="max-w-7xl mx-auto flex items-center justify-between gap-4">

      <!-- LOGO -->
      <div class="flex items-center gap-4 shrink-0">
        <img src="/images/logo_sem_fundo.png" class="w-14 h-14 object-contain" />

        <RouterLink to="/">
          <div class="flex flex-col leading-tight">
            <span class="text-xl font-serif font-black text-[#362212]">
              Maravilhas da <span class="text-[#A0522D]">Roça</span>
            </span>
            <span class="text-[10px] uppercase tracking-[0.2em] text-[#A0522D]/70 font-bold">
              Sabor Ancestral
            </span>
          </div>
        </RouterLink>
      </div>

      <!-- BUSCA -->
      <div class="flex flex-grow max-w-md relative">
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Buscar produtos..."
          class="w-full bg-[#FAF6EE] border border-[#EED9C4] rounded-2xl px-5 py-2.5 pl-10 text-sm focus:outline-none focus:ring-2 focus:ring-[#A0522D]/30"
        />
        <span class="absolute left-3 top-2.5 text-gray-400">🔍</span>
      </div>

      <!-- MENU -->
      <nav class="hidden sm:flex gap-6 text-sm font-bold text-[#7A5C43]">
        <RouterLink to="/">Início</RouterLink>
        <RouterLink to="/catalogo">Catálogo</RouterLink>
        <RouterLink to="/favoritos">Favoritos</RouterLink>
        <RouterLink to="/sobre">Sobre</RouterLink>
      </nav>

      <!-- AÇÕES -->
      <div class="flex items-center gap-5">

        <!-- CARRINHO -->
        <RouterLink to="/carrinho" class="relative group">

          <div class="w-10 h-10 flex items-center justify-center rounded-full bg-[#FAF6EE] border border-[#EED9C4] group-hover:border-[#A0522D] transition">
            <svg xmlns="http://www.w3.org/2000/svg"
              class="w-5 h-5 text-[#422A17]"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2 9m12-9l2 9m-6-9v9"/>
            </svg>
          </div>

          <!-- CONTADOR -->
          <span
            v-if="cartCount > 0"
            class="absolute -top-2 -right-2 bg-[#A0522D] text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full shadow"
          >
            {{ cartCount }}
          </span>

        </RouterLink>

        <!-- USUÁRIO -->
        <div class="relative">

          <button
            @click="isUserOpen = !isUserOpen"
            class="w-10 h-10 flex items-center justify-center rounded-full bg-[#FAF6EE] border border-[#EED9C4]"
          >
            👤
          </button>

          <div v-if="isUserOpen"
               class="absolute right-0 mt-2 w-40 bg-white border border-[#EED9C4] rounded-xl shadow-lg z-50">

            <button
              @click="logout"
              class="w-full text-left px-4 py-2 text-sm hover:bg-[#FAF6EE] text-red-600 font-bold"
            >
              Sair
            </button>

          </div>
        </div>

      </div>
    </div>
  </header>
</template>