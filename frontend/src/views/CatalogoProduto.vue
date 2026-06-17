<template>
  <div class="min-h-screen bg-gradient-to-br from-[#FAF6EE] via-[#FDFBF7] to-[#F3EAD9] text-[#4A3728] antialiased selection:bg-[#EED9C4]">

    <Cabecalho />

    <!-- HERO -->
    <section class="max-w-6xl mx-auto px-4 pt-16 pb-12 text-center">
      <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#EED9C4]/50 border border-[#D9B48F]/40 text-xs font-black uppercase tracking-widest text-[#A0522D] mb-6 shadow-sm">
        🌾 Tradição Mineira Extraído com Afeto
      </div>

      <h1 class="text-4xl sm:text-6xl md:text-7xl font-serif font-black tracking-tight text-[#362212] max-w-5xl mx-auto leading-[1.08]">
        O puro sabor do campo, <br class="hidden sm:inline" />
        <span class="underline decoration-[#A0522D]/30 decoration-wavy">
          direto na sua mesa
        </span>
      </h1>

      <p class="text-base sm:text-xl text-[#7A5C43] max-w-2xl mx-auto mt-6 leading-relaxed font-light">
        Descubra pequenos lotes artesanais de queijos premiados, doces de tacho e relíquias mineiras autênticas.
      </p>
    </section>

    <!-- FILTROS -->
    <div class="max-w-7xl mx-auto px-4 mb-12">
      <div class="flex flex-wrap items-center justify-center gap-3 bg-white/40 border border-[#EED9C4]/30 p-2 rounded-[2rem] max-w-2xl mx-auto shadow-sm backdrop-blur-md">

        <button
          v-for="cat in categories"
          :key="cat"
          @click="activeCategory = cat"
          :class="[
            'px-5 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-300',
            activeCategory === cat
              ? 'bg-[#422A17] text-white shadow-md'
              : 'text-[#7A5C43] hover:bg-[#EED9C4]/30'
          ]"
        >
          {{ cat }}
        </button>

      </div>
    </div>

    <!-- MAIN -->
    <main class="max-w-7xl mx-auto px-4 pb-20">

      <!-- LOADING -->
      <div v-if="loading" class="flex flex-col justify-center items-center py-40 space-y-4">
        <div class="w-16 h-16 border-4 border-[#EED9C4]/30 border-t-[#A0522D] rounded-full animate-spin"></div>
        <p class="text-[#7A5C43] text-xs font-black uppercase tracking-widest animate-pulse pt-4">
          Colhendo iguarias no banco de dados...
        </p>
      </div>

      <!-- PRODUCTS -->
      <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-12">

        <div
          v-for="product in filteredProducts"
          :key="product.id"
          class="relative group bg-white rounded-[2.5rem] border border-[#EED9C4]/20 shadow-[0_12px_45px_rgba(92,61,36,0.02)] hover:shadow-[0_24px_60px_rgba(92,61,36,0.12)] transition-all duration-500 flex flex-col justify-between overflow-hidden hover:-translate-y-2.5"
        >

          <!-- ÍCONE FIXO DE CARRINHO -->
          <div
            class="absolute top-4 right-4 z-20 w-11 h-11 rounded-full bg-white/95 border border-[#EED9C4]/40 shadow-lg flex items-center justify-center"
          >
            <div class="relative flex items-center justify-center">

              <!-- CARRINHO -->
              <svg xmlns="http://www.w3.org/2000/svg"
                   class="w-5 h-5 text-[#422A17]"
                   viewBox="0 0 24 24"
                   fill="none"
                   stroke="currentColor"
                   stroke-width="2">
                <path d="M6 6h15l-1.5 9h-12z"/>
                <path d="M6 6l-2-2H2"/>
                <circle cx="9" cy="20" r="1"/>
                <circle cx="18" cy="20" r="1"/>
              </svg>

              <!-- "+" -->
              <span
                class="absolute -top-1 -right-1 w-4 h-4 bg-[#A0522D] text-white text-[10px] font-bold rounded-full flex items-center justify-center shadow"
              >
                +
              </span>

            </div>
          </div>

          <!-- IMAGEM -->
          <div class="relative overflow-hidden aspect-[4/3] sm:aspect-[1/1] md:aspect-[4/3] rounded-[2.2rem] m-3.5 bg-[#FAF6EE] border border-[#EED9C4]/15 shadow-inner">
            <img
              :src="product.image ? `/images/${product.image}` : '/images/default.png'"
              :alt="product.name"
              class="w-full h-full object-cover scale-100 group-hover:scale-105 transition-all duration-700 ease-out"
              loading="lazy"
            />
          </div>

          <!-- CONTEÚDO -->
          <div class="p-6 pt-3 flex flex-col flex-grow justify-between">

            <div>
              <h2 class="text-xl font-serif font-black text-[#362212] tracking-tight group-hover:text-[#A0522D] transition-colors duration-300 line-clamp-1">
                {{ product.name }}
              </h2>

              <p class="text-[#7A5C43] text-sm font-light leading-relaxed mt-2.5 mb-6 line-clamp-2 min-h-[2.5rem] opacity-90">
                {{ product.description }}
              </p>
            </div>

            <!-- PREÇO -->
            <div class="flex items-center justify-between pt-4 border-t border-[#FAF6EE] mt-auto">

              <div class="flex flex-col">
                <span class="text-[9px] uppercase font-bold tracking-widest text-[#9E836C]">
                  Preço Unitário
                </span>

                <span class="text-2xl font-serif font-black text-[#362212] tracking-tight">
                  <span class="text-sm font-sans font-semibold text-[#7A5C43] mr-0.5">R$</span>
                  {{ Number(product.price || 0).toFixed(2) }}
                </span>
              </div>

              <button class="bg-[#422A17] hover:bg-[#A0522D] text-white font-bold text-xs tracking-wider px-5 py-3.5 rounded-2xl shadow-md transition-all duration-300">
                Ver Detalhes
              </button>

            </div>

          </div>

        </div>

      </div>

      <!-- EMPTY -->
      <div v-if="!loading && filteredProducts.length === 0"
        class="text-center py-24 bg-white/40 backdrop-blur-md rounded-[2.5rem] border border-dashed border-[#EED9C4] max-w-xl mx-auto px-6"
      >
        <span class="text-5xl">🌾</span>
        <h3 class="text-xl font-serif font-black text-[#362212] mt-4">
          Nenhum produto encontrado
        </h3>
        <p class="text-sm text-[#7A5C43] mt-2 font-light">
          Nenhum item corresponde à busca ou ao filtro selecionado.
        </p>
      </div>

    </main>

    <Footer />

  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from "vue"
import Cabecalho from "../components/cabecalho.vue"
import Footer from "../components/footer.vue"

interface Product {
  id: number
  name: string
  description: string
  price: number
  image: string
}

const products = ref<Product[]>([])
const loading = ref(true)
const searchQuery = ref("")
const activeCategory = ref("Todos")

const categories = ["Todos", "Queijos", "Doces & Geléias", "Bebidas"]

const filteredProducts = computed(() => {
  const search = searchQuery.value.toLowerCase()

  return products.value.filter(product => {
    const name = (product.name ?? "").toLowerCase()
    const desc = (product.description ?? "").toLowerCase()

    const matchesSearch =
      name.includes(search) || desc.includes(search)

    if (activeCategory.value === "Todos") return matchesSearch

    if (activeCategory.value === "Queijos")
      return matchesSearch && name.includes("queijo")

    if (activeCategory.value === "Doces & Geléias")
      return matchesSearch &&
        (name.includes("doce") ||
         name.includes("geleia") ||
         name.includes("compota"))

    if (activeCategory.value === "Bebidas")
      return matchesSearch &&
        (name.includes("cachaça") ||
         name.includes("leite"))

    return matchesSearch
  })
})

onMounted(async () => {
  try {
    const response = await fetch("http://localhost:3000/products")

    const data = await response.json()

    products.value = data
  } catch (error) {
    console.error("Erro ao buscar produtos:", error)
  } finally {
    loading.value = false
  }
})
</script>