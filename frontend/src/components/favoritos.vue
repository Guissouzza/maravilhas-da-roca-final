<template>
  <div class="min-h-screen bg-roca-bg pt-12 pb-24 font-sans">
    <div class="max-w-[1200px] mx-auto px-6">
      
      <h2 class="text-5xl font-serif font-bold text-roca-dark mb-4 text-center">
        Meus Favoritos
      </h2>

      <div v-if="carregando" class="text-center py-20">
        <p class="text-lg text-roca-medium animate-pulse">Buscando na dispensa...</p>
      </div>

      <div v-else-if="favoritos.length === 0" class="text-center py-20">
        <p class="text-2xl font-serif text-roca-dark mb-8">Sua lista está vazia.</p>
        <button class="bg-roca-dark hover:bg-[#321c11] text-white font-medium py-3 px-8 rounded-full transition duration-300">
          Explorar Catálogo
        </button>
      </div>

      <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        <div 
          v-for="item in favoritos" 
          :key="item.FavCodigo" 
          class="bg-white rounded-xl overflow-hidden border border-[#EADFCB] shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col relative"
        >
          <div class="h-56 bg-[#F5EBE1] flex items-center justify-center p-6">
            <span class="text-7xl">🧀</span>
          </div>
          
          <button @click="removerFavorito(item.ProCodigo)" class="absolute top-3 right-3 bg-white/90 hover:bg-white text-gray-400 hover:text-red-500 p-2 rounded-full shadow-sm transition-all border border-gray-100">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
          
          <div class="p-5 flex flex-col flex-grow text-center">
            <h3 class="text-lg font-bold text-roca-dark mb-2">{{ item.ProNome }}</h3>
            <p class="text-xl font-extrabold text-roca-medium mt-auto pt-4">
              R$ {{ formatarPreco(item.ProPreco) }}
            </p>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const favoritos = ref([]);
const carregando = ref(true);

const buscarFavoritos = async () => {
  try {
    const resposta = await fetch('https://favoritos-maravilhas-da-roca.onrender.com');
    if (resposta.ok) {
      favoritos.value = await resposta.json();
    }
  } catch (erro) {
    console.error('Erro:', erro);
  } finally {
    carregando.value = false;
  }
};

const formatarPreco = (valor) => {
  return Number(valor).toFixed(2).replace('.', ',');
};

const removerFavorito = async (proCodigo) => {
  if (!confirm('Deseja mesmo remover dos favoritos?')) return;

  try {
    const resposta = await fetch(`http://localhost:3000/api/favoritos/1/${proCodigo}`, {
      method: 'DELETE',
    });

    if (resposta.ok) {
      favoritos.value = favoritos.value.filter(item => item.ProCodigo !== proCodigo);
    } else {
      alert('Erro ao remover o item.');
    }
  } catch (erro) {
    console.error('Erro de conexão:', erro);
  }
};

onMounted(() => {
  buscarFavoritos();
});
</script>