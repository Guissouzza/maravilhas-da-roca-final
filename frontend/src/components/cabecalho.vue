<script setup lang="ts">
import { ref, computed } from "vue"
import { useRouter } from "vue-router"
import { isLoggedIn, logout, getUser } from "../services/auth"

const router = useRouter()

const searchQuery = ref("")
const isUserOpen = ref(false)

const user = computed(() => getUser())

const handleLogout = () => {
  logout()
  isUserOpen.value = false
  router.push("/login")
}
</script>

<template>
  <header
    class="sticky top-0 z-50 backdrop-blur-2xl bg-[#FDFBF7]/80 border-b border-[#EED9C4]/40 px-4 py-4 shadow-[0_4px_30px_rgba(92,61,36,0.03)]"
  >
    <div class="max-w-7xl mx-auto flex items-center justify-between gap-4">

      <!-- LOGO -->
      <div class="flex items-center gap-4 shrink-0">
        <div
          class="w-16 h-16 flex items-center justify-center overflow-hidden bg-white/50 rounded-2xl p-1 shadow-sm border border-[#EED9C4]/20"
        >
          <img
            src="/images/logo_sem_fundo.png"
            alt="Logo"
            class="w-full h-full object-contain"
          />
        </div>

        <div class="flex flex-col">
          <RouterLink to="/">
            <span
              class="text-2xl font-serif font-black tracking-tight leading-none bg-gradient-to-r from-[#362212] to-[#6E472A] bg-clip-text text-transparent"
            >
              Maravilhas da
              <span class="from-[#A0522D] to-[#D2691E] bg-clip-text text-transparent">
                Roça
              </span>
            </span>
          </RouterLink>

          <span
            class="text-[10px] tracking-[0.15em] uppercase font-bold text-[#A0522D]/70 mt-1"
          >
            Sabor Ancestral
          </span>
        </div>
      </div>

      <!-- BUSCA -->
      <div class="flex items-center flex-grow max-w-md relative">
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Buscar queijo, mel, doce..."
          class="w-full bg-[#FAF6EE] border border-[#EED9C4] rounded-2xl px-5 py-2.5 pl-12 text-sm focus:outline-none focus:ring-2 focus:ring-[#A0522D]/30 focus:border-[#A0522D]"
        />
        <span class="absolute left-4">🔍</span>
      </div>

      <!-- MENU -->
      <nav
        class="hidden sm:flex items-center gap-6 text-sm font-bold tracking-wide text-[#7A5C43]"
      >
        <RouterLink to="/">Início</RouterLink>
        <RouterLink to="/catalogo">Catálogo</RouterLink>
        <RouterLink to="/favoritos">Favoritos</RouterLink>
        <RouterLink to="/sobre">Sobre nós</RouterLink>
      </nav>

      <!-- AÇÕES -->
      <div class="flex items-center gap-5 text-[#7A5C43]">

        <!-- CARRINHO -->
        <RouterLink to="/carrinho" title="Carrinho">
          🛒
        </RouterLink>

        <!-- USUÁRIO -->
        <div class="relative">

          <button
            @click="isUserOpen = !isUserOpen"
            class="w-10 h-10 flex items-center justify-center rounded-full border border-[#EED9C4] bg-[#FAF6EE] hover:border-[#A0522D] hover:text-[#A0522D] transition-colors shadow-sm"
            title="Usuário"
          >
            <!-- 👇 ÍCONE NOVO (SVG) -->
            <svg xmlns="http://www.w3.org/2000/svg"
                 class="w-5 h-5"
                 fill="none"
                 viewBox="0 0 24 24"
                 stroke="currentColor">
              <path stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M5.121 17.804A10.97 10.97 0 0112 15c2.21 0 4.253.655 5.879 1.804M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
            </svg>
          </button>

          <!-- DROPDOWN -->
          <div
            v-if="isUserOpen"
            class="absolute right-0 mt-2 w-44 bg-white border border-[#EED9C4] rounded-xl shadow-lg z-50"
          >

            <div v-if="isLoggedIn()">

              <div class="px-4 py-2 text-xs text-gray-500 border-b">
                {{ user?.email }}
              </div>

              <button
                @click="handleLogout"
                class="w-full text-left px-4 py-2 text-sm hover:bg-[#FAF6EE]"
              >
                Sair
              </button>

            </div>

            <div v-else>
              <RouterLink
                to="/login"
                class="block px-4 py-2 text-sm hover:bg-[#FAF6EE]"
                @click="isUserOpen = false"
              >
                Login
              </RouterLink>

              <RouterLink
                to="/cadastro"
                class="block px-4 py-2 text-sm hover:bg-[#FAF6EE]"
                @click="isUserOpen = false"
              >
                Cadastro
              </RouterLink>
            </div>

          </div>

        </div>
      </div>

    </div>
  </header>
</template>