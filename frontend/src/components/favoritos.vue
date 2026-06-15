<template>
  <div class="min-h-screen bg-gradient-to-br from-[#FAF6EE] via-[#FDFBF7] to-[#F3EAD9] text-[#4A3728] antialiased">

    <!-- HERO / TÍTULO -->
    <section class="max-w-6xl mx-auto px-4 pt-16 pb-10 text-center">

  <h1 class="text-4xl sm:text-6xl md:text-7xl font-serif font-black text-[#362212] leading-[1.05]">
    <span class="underline decoration-[#A0522D]/30 decoration-wavy">
      Meus Favoritos
    </span>
  </h1>

  <p class="text-[#7A5C43] mt-6 text-base sm:text-xl font-light max-w-2xl mx-auto">
    Seus produtos mais queridos da roça reunidos em um só lugar.
  </p>

</section>

    <main class="max-w-7xl mx-auto px-4 pb-20">

      <!-- LOADING -->
      <div v-if="carregando" class="flex flex-col items-center justify-center py-40 space-y-4">
        <div class="w-16 h-16 border-4 border-[#EED9C4]/30 border-t-[#A0522D] rounded-full animate-spin"></div>
        <p class="text-[#7A5C43] text-xs font-black uppercase tracking-widest animate-pulse pt-4">
          Buscando seus favoritos...
        </p>
      </div>

      <!-- EMPTY -->
      <div v-else-if="favoritos.length === 0"
        class="text-center py-24 bg-white/40 backdrop-blur-md rounded-[2.5rem] border border-dashed border-[#EED9C4] max-w-xl mx-auto px-6">

        <span class="text-5xl">🧺</span>

        <h3 class="text-xl font-serif font-black text-[#362212] mt-4">
          Nenhum favorito ainda
        </h3>

        <p class="text-sm text-[#7A5C43] mt-2 font-light">
          Explore o catálogo e salve seus produtos preferidos.
        </p>

      </div>

      <!-- GRID (MESMO PADRÃO DO CATÁLOGO) -->
      <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-12">

        <div
          v-for="item in favoritos"
          :key="item.ProCodigo"
          class="group bg-white rounded-[2.5rem] border border-[#EED9C4]/20 shadow-[0_12px_45px_rgba(92,61,36,0.02)] hover:shadow-[0_24px_60px_rgba(92,61,36,0.12)] transition-all duration-500 flex flex-col justify-between overflow-hidden hover:-translate-y-2.5 relative"
        >

          <!-- IMAGEM (igual catálogo) -->
          <div class="relative overflow-hidden aspect-[4/3] sm:aspect-[1/1] md:aspect-[4/3] rounded-[2.2rem] m-3.5 bg-[#FAF6EE] border border-[#EED9C4]/15 shadow-inner flex items-center justify-center">
            <span class="text-7xl group-hover:scale-110 transition duration-700">
              🧀
            </span>
          </div>

          <!-- BOTÃO REMOVER -->
          <button
            @click="removerFavorito(item.ProCodigo)"
            class="absolute top-6 right-6 bg-white/90 hover:bg-white text-gray-400 hover:text-red-500 p-2 rounded-full shadow-sm transition-all border border-gray-100"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>

          <!-- CONTEÚDO (igual catálogo) -->
          <div class="p-6 pt-3 flex flex-col flex-grow justify-between text-center">

            <h2 class="text-xl font-serif font-black text-[#362212] tracking-tight group-hover:text-[#A0522D] transition">
              {{ item.ProNome }}
            </h2>

            <p class="text-[#7A5C43] text-sm font-light mt-2 mb-6 line-clamp-2 min-h-[2.5rem] opacity-90">
              Produto selecionado da roça
            </p>

            <div class="flex items-center justify-center gap-1 pt-4 border-t border-[#FAF6EE] mt-auto">

              <span class="text-sm font-semibold text-[#7A5C43]">R$</span>

              <span class="text-2xl font-serif font-black text-[#362212] tracking-tight">
                {{ formatarPreco(item.ProPreco) }}
              </span>

            </div>

          </div>

        </div>

      </div>

    </main>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const favoritos = ref([])
const carregando = ref(true)

const buscarFavoritos = async () => {
  try {
    const res = await fetch('https://favoritos-maravilhas-da-roca.onrender.com/api/favoritos/1')
    const data = await res.json()

    favoritos.value = data.filter((item, index, self) =>
      index === self.findIndex(t => t.ProCodigo === item.ProCodigo)
    )

  } finally {
    carregando.value = false
  }
}

const formatarPreco = (valor) => {
  return Number(valor).toFixed(2).replace('.', ',')
}

const removerFavorito = async (proCodigo) => {
  if (!confirm('Remover dos favoritos?')) return

  await fetch(
    `https://favoritos-maravilhas-da-roca.onrender.com/api/favoritos/1/${proCodigo}`,
    { method: 'DELETE' }
  )

  favoritos.value = favoritos.value.filter(i => i.ProCodigo !== proCodigo)
}

onMounted(buscarFavoritos)
</script>