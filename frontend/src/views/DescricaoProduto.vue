<template>
  <div class="min-h-screen flex flex-col bg-stone-50 text-stone-800 antialiased font-sans">

    <Cabecalho />

    <!-- TUDO QUE NÃO É FOOTER VIRA MAIN -->
    <main class="flex-1">

      <!-- TOPO -->
      <div class="bg-amber-50 border-b border-stone-200 py-3 shadow-inner">
        <div class="max-w-7xl mx-auto px-4 flex gap-4 justify-center items-center">
          <span class="text-xs font-bold text-stone-500 uppercase">
            Ver outro produto da Nuvem:
          </span>

          <button 
            @click="mudarProduto(1)" 
            :class="[
              'px-4 py-1.5 rounded-full text-xs font-bold border transition',
              idProdutoAtual === 1 
                ? 'bg-amber-700 text-white border-amber-700' 
                : 'bg-white text-stone-700 border-stone-300 hover:bg-stone-100'
            ]"
          >
            🧀 Queijo Canastra
          </button>

          <button 
            @click="mudarProduto(2)" 
            :class="[
              'px-4 py-1.5 rounded-full text-xs font-bold border transition',
              idProdutoAtual === 2 
                ? 'bg-amber-700 text-white border-amber-700' 
                : 'bg-white text-stone-700 border-stone-300 hover:bg-stone-100'
            ]"
          >
            🍯 Mel Silvestre
          </button>
        </div>
      </div>

      <!-- LOADING -->
      <div v-if="loading" class="flex flex-col items-center justify-center min-h-[60vh]">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-700"></div>
        <p class="mt-4 text-stone-500 font-medium">
          Buscando produto ID #00{{ idProdutoAtual }} na nuvem...
        </p>
      </div>

      <!-- ERRO -->
      <div v-else-if="erro" class="flex items-center justify-center min-h-[60vh]">
        <div class="max-w-md p-8 bg-white rounded-2xl border border-stone-200 shadow-sm text-center">
          <span class="text-4xl">⚠️</span>
          <h2 class="text-xl font-bold text-stone-950 mt-3">
            Erro na Integração
          </h2>
          <p class="text-stone-500 text-sm mt-2 mb-6">
            {{ erro }}
          </p>

          <button 
            @click="carregarProdutoDaNuvem" 
            class="w-full py-2.5 bg-amber-700 hover:bg-amber-800 text-white font-bold rounded-xl text-sm transition"
          >
            🔄 Tentar Novamente
          </button>
        </div>
      </div>

      <!-- PRODUTO -->
      <main v-else-if="produto" class="max-w-7xl mx-auto px-4 py-12">
        <!-- seu conteúdo aqui -->
      </main>

    </main>

    <!-- FOOTER AGORA FICA NO FINAL REAL DA PÁGINA -->
    <Footer />

  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import Cabecalho from '../components/cabecalho.vue';
import Footer from '../components/footer.vue'


const produto = ref(null);
const loading = ref(true);
const erro = ref(null);
const quantidade = ref(1);
const idProdutoAtual = ref(1); // Controla qual ID buscar

const carregarProdutoDaNuvem = async () => {
  loading.value = true;
  erro.value = null;
  try {
    // Passa o ID dinâmico na URL
    const response = await fetch(`http://localhost:3000/api/produtos/${idProdutoAtual.value}`);
    if (!response.ok) throw new Error('Produto não encontrado na base de dados em nuvem.');
    produto.value = await response.json();
    quantidade.value = 1; // Reseta o contador
  } catch (err) {
    erro.value = err.message || 'Erro de comunicação com o servidor API.';
  } finally {
    loading.value = false;
  }
};

const mudarProduto = (id) => {
  idProdutoAtual.value = id;
  carregarProdutoDaNuvem();
};

const adicionarAoCarrinho = () => {
  alert(`Uai, excelente escolha! ${quantidade.value}x "${produto.value.nome}" adicionado(s) com sucesso.`);
};

onMounted(() => {
  carregarProdutoDaNuvem();
});
</script>