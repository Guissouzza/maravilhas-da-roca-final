<template>
  <!-- CONTAINER PRINCIPAL COM GRADIENTE SUAVE -->
  <div class="min-h-screen bg-gradient-to-br from-[#FAF6EE] via-[#FDFBF7] to-[#F3EAD9] text-[#4A3728] antialiased selection:bg-[#EED9C4]">
    
    <!-- HEADER PREMIUM COM MENU DE NAVEGAÇÃO -->
    <header class="sticky top-0 z-50 backdrop-blur-2xl bg-[#FDFBF7]/80 border-b border-[#EED9C4]/40 px-4 py-4 shadow-[0_4px_30px_rgba(92,61,36,0.03)]">
      <div class="max-w-7xl mx-auto flex items-center justify-between gap-4">
        
        <!-- LOGO E MARCA (ESTÁTICA) -->
        <div class="flex items-center gap-4 shrink-0">
          <div class="w-16 h-16 flex items-center justify-center overflow-hidden bg-white/50 rounded-2xl p-1 shadow-sm border border-[#EED9C4]/20">
            <img src="/images/logo_sem_fundo.png" alt="Logo" class="w-full h-full object-contain" />
          </div>
          <div class="flex flex-col">
            <span class="text-2xl font-serif font-black tracking-tight leading-none bg-gradient-to-r from-[#362212] to-[#6E472A] bg-clip-text text-transparent">
              Maravilhas da <span class="from-[#A0522D] to-[#D2691E] bg-clip-text text-transparent">Roça</span>
            </span>
            <span class="text-[10px] tracking-[0.15em] uppercase font-bold text-[#A0522D]/70 mt-1">Sabor Ancestral</span>
          </div>
        </div>
        
        <!-- BARRA DE BUSCA EM TEMPO REAL -->
        <div class="flex items-center flex-grow max-w-md relative">
          <input 
            v-model="searchQuery" 
            type="text" 
            placeholder="Buscar queijo, mel, doce..." 
            class="w-full bg-[#FAF6EE] border border-[#EED9C4] rounded-2xl px-5 py-2.5 pl-12 text-sm focus:outline-none focus:ring-2 focus:ring-[#A0522D]/30 focus:border-[#A0522D] transition-all"
          />
          <span class="absolute left-4">🔍</span>
        </div>

        <!-- MENU INDICANDO CATÁLOGO SELECIONADO -->
        <nav class="hidden sm:flex items-center gap-6 text-sm font-bold tracking-wide text-[#7A5C43]">
          <a href="#" class="hover:text-[#A0522D] transition-colors">Início</a>
          <a href="#" class="text-[#A0522D] border-b-2 border-[#A0522D] pb-1 font-black">Catálogo</a>
          <a href="#" class="hover:text-[#A0522D] transition-colors">Sobre Nós</a>
        </nav>
      </div>
    </header>

    <!-- HERO SECTION RESPONSIVA -->
    <section class="max-w-6xl mx-auto px-4 pt-16 pb-12 text-center">
      <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#EED9C4]/50 border border-[#D9B48F]/40 text-xs font-black uppercase tracking-widest text-[#A0522D] mb-6 shadow-sm">
        🌾 Tradição Mineira Extraído com Afeto
      </div>
      <h1 class="text-4xl sm:text-6xl md:text-7xl font-serif font-black tracking-tight text-[#362212] max-w-5xl mx-auto leading-[1.08]">
        O puro sabor do campo, <br class="hidden sm:inline" />
        <span class="underline decoration-[#A0522D]/30 decoration-wavy">direto na sua mesa</span>
      </h1>
      <p class="text-base sm:text-xl text-[#7A5C43] max-w-2xl mx-auto mt-6 leading-relaxed font-light">
        Descubra pequenos lotes artesanais de queijos premiados, doces de tacho e relíquias mineiras autênticas selecionadas na roça.
      </p>
    </section>

    <!-- COMPONENTE DE FILTROS -->
    <div class="max-w-7xl mx-auto px-4 mb-12">
      <div class="flex flex-wrap items-center justify-center gap-3 bg-white/40 border border-[#EED9C4]/30 p-2 rounded-[2rem] max-w-2xl mx-auto shadow-sm backdrop-blur-md">
        <button 
          v-for="cat in categories" 
          :key="cat"
          @click="activeCategory = cat"
          :class="[
            'px-5 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-300',
            activeCategory === cat ? 'bg-[#422A17] text-white shadow-md' : 'text-[#7A5C43] hover:bg-[#EED9C4]/30'
          ]"
        >
          {{ cat }}
        </button>
      </div>
    </div>

    <!-- SEÇÃO CENTRAL -->
    <main class="max-w-7xl mx-auto px-4 pb-20">
      
      <!-- LOADING STATE -->
      <div v-if="loading" class="flex flex-col justify-center items-center py-40 space-y-4">
        <div class="w-16 h-16 border-4 border-[#EED9C4]/30 border-t-[#A0522D] rounded-full animate-spin"></div>
        <p class="text-[#7A5C43] text-xs font-black uppercase tracking-widest animate-pulse pt-4">
          Colhendo iguarias no banco de dados...
        </p>
      </div>

      <!-- GRID PRINCIPAL DE PRODUTOS RESPONSIVO (SEM BADGE DE FAVORITO) -->
      <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-12">
        <div
          v-for="product in filteredProducts"
          :key="product.id"
          class="group bg-white rounded-[2.5rem] border border-[#EED9C4]/20 shadow-[0_12px_45px_rgba(92,61,36,0.02)] hover:shadow-[0_24px_60px_rgba(92,61,36,0.12)] transition-all duration-500 flex flex-col justify-between overflow-hidden hover:-translate-y-2.5"
        >
          <!-- IMAGEM COM PROPORÇÃO CORRETA -->
          <div class="relative overflow-hidden aspect-[4/3] sm:aspect-[1/1] md:aspect-[4/3] rounded-[2.2rem] m-3.5 bg-[#FAF6EE] border border-[#EED9C4]/15 shadow-inner">
            <img
              :src="`/images/${product.image}`"
              :alt="product.name"
              class="w-full h-full object-cover scale-100 group-hover:scale-105 transition-all duration-700 ease-out filter brightness-[0.98] group-hover:brightness-100"
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

            <!-- VALORES E AÇÃO -->
            <div class="flex items-center justify-between pt-4 border-t border-[#FAF6EE] mt-auto">
              <div class="flex flex-col">
                <span class="text-[9px] uppercase font-bold tracking-widest text-[#9E836C]">Preço Unitário</span>
                <span class="text-2xl font-serif font-black text-[#362212] tracking-tight">
                  <span class="text-sm font-sans font-semibold text-[#7A5C43] mr-0.5">R$</span>{{ product.price.toFixed(2) }}
                </span>
              </div>

              <button
                class="bg-[#422A17] hover:bg-[#A0522D] text-[#FFFDF9] font-bold text-xs tracking-wider px-5 py-3.5 rounded-2xl shadow-md transition-all duration-300 border border-[#362212]/10"
              >
                Ver Detalhes
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- EMPTY STATE -->
      <div v-if="!loading && filteredProducts.length === 0" class="text-center py-24 bg-white/40 backdrop-blur-md rounded-[2.5rem] border border-dashed border-[#EED9C4] max-w-xl mx-auto px-6">
        <span class="text-5xl">🌾</span>
        <h3 class="text-xl font-serif font-black text-[#362212] mt-4">Nenhum produto encontrado</h3>
        <p class="text-sm text-[#7A5C43] mt-2 font-light">Nenhum item corresponde à busca ou ao filtro selecionado.</p>
      </div>
    </main>

    <!-- RODAPÉ -->
    <footer class="bg-[#2C1A0D] text-[#EED9C4]/40 text-xs py-12 text-center px-4">
      <div class="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
        <div class="flex flex-col text-center sm:text-left">
          <p class="font-bold text-[#EED9C4]/70 text-sm">Maravilhas da Roça LTDA</p>
          <p class="mt-1 font-light">&copy; 2026 Todos os direitos reservados. Produtos com selo de origem artesanal.</p>
        </div>
        <p class="font-light tracking-wide flex items-center gap-1 justify-center bg-white/5 px-4 py-2 rounded-xl border border-white/5">
          Feito com orgulho pelas tradições rústicas de Minas Gerais <span class="text-[#A0522D] animate-pulse">🤎</span>
        </p>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from "vue"

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
  return products.value.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.value.toLowerCase()) || 
                          product.description.toLowerCase().includes(searchQuery.value.toLowerCase())
    
    if (activeCategory.value === "Todos") return matchesSearch
    if (activeCategory.value === "Queijos") return matchesSearch && product.name.toLowerCase().includes("queijo")
    if (activeCategory.value === "Doces & Geléias") return matchesSearch && (product.name.toLowerCase().includes("doce") || product.name.toLowerCase().includes("geleia") || product.name.toLowerCase().includes("compota"))
    if (activeCategory.value === "Bebidas") return matchesSearch && (product.name.toLowerCase().includes("cachaça") || product.name.toLowerCase().includes("leite"))
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