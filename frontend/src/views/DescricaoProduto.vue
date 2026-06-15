<template>
  <div class="min-h-screen bg-stone-50 text-stone-800 antialiased font-sans">

  <cabecalho />

    <div class="bg-amber-50 border-b border-stone-200 py-3 shadow-inner">
      <div class="max-w-7xl mx-auto px-4 flex gap-4 justify-center items-center">
        <span class="text-xs font-bold text-stone-500 uppercase">Ver outro produto da Nuvem:</span>
        <button 
          @click="mudarProduto(1)" 
          :class="['px-4 py-1.5 rounded-full text-xs font-bold border transition', idProdutoAtual === 1 ? 'bg-amber-700 text-white border-amber-700' : 'bg-white text-stone-700 border-stone-300 hover:bg-stone-100']"
        >
          🧀 Queijo Canastra
        </button>
        <button 
          @click="mudarProduto(2)" 
          :class="['px-4 py-1.5 rounded-full text-xs font-bold border transition', idProdutoAtual === 2 ? 'bg-amber-700 text-white border-amber-700' : 'bg-white text-stone-700 border-stone-300 hover:bg-stone-100']"
        >
          🍯 Mel Silvestre
        </button>
      </div>
    </div>

    <div v-if="loading" class="flex flex-col items-center justify-center min-h-[60vh]">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-700"></div>
      <p class="mt-4 text-stone-500 font-medium">Buscando produto ID #00{{ idProdutoAtual }} na nuvem...</p>
    </div>

    <div v-else-if="erro" class="max-w-md mx-auto mt-20 p-8 bg-white rounded-2xl border border-stone-200 shadow-sm text-center">
      <span class="text-4xl">⚠️</span>
      <h2 class="text-xl font-bold text-stone-950 mt-3">Erro na Integração</h2>
      <p class="text-stone-500 text-sm mt-2 mb-6">{{ erro }}</p>
      <button @click="carregarProdutoDaNuvem" class="w-full py-2.5 bg-amber-700 hover:bg-amber-800 text-white font-bold rounded-xl text-sm transition">
        🔄 Tentar Novamente
      </button>
    </div>

    <main v-else-if="produto" class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div class="bg-white rounded-3xl p-6 md:p-10 shadow-sm border border-stone-200 grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        
        <div class="aspect-square bg-stone-50 rounded-2xl overflow-hidden border border-stone-200 flex items-center justify-center relative shadow-inner">
          <img :src="produto.imagem_url" :alt="produto.nome" class="w-full h-full object-cover" />
          <span v-if="produto.estoque <= 5" class="absolute bottom-4 right-4 bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-full uppercase">
            Apenas {{ produto.estoque }} no estoque!
          </span>
        </div>

        <div class="flex flex-col h-full justify-between space-y-8">
          <div>
            <span class="text-xs font-bold tracking-widest text-amber-900 bg-amber-100 px-3 py-1 rounded-full uppercase">
              {{ produto.categoria }}
            </span>
            
            <h1 class="text-3xl md:text-4xl font-black text-stone-900 mt-4 mb-3 font-serif tracking-tight">
              {{ produto.nome }}
            </h1>
            <p class="text-xs text-stone-400 font-mono">ID no MySQL: #00{{ produto.id }}</p>

            <div class="border-y border-stone-200 py-4 my-6">
              <span class="text-3xl font-black text-emerald-700">
                R$ {{ produto.preco.toFixed(2) }}
              </span>
              <span class="text-xs text-stone-400 block mt-1">Estoque atualizado na nuvem: {{ produto.estoque }} unidades</span>
            </div>

            <p class="text-stone-600 leading-relaxed text-base">
              {{ produto.descricao }}
            </p>

            <div v-if="produto.specs && produto.specs.length" class="mt-6 space-y-2">
              <h3 class="text-xs font-bold text-stone-400 uppercase tracking-wider">Ficha Técnica:</h3>
              <ul class="list-disc pl-5 text-stone-600 space-y-1 text-sm">
                <li v-for="(spec, index) in produto.specs" :key="index">{{ spec }}</li>
              </ul>
            </div>
          </div>

          <div class="space-y-4 pt-6 border-t border-stone-200">
            <div class="flex items-center justify-between">
              <span class="text-sm font-bold text-stone-600">Quantidade</span>
              <div class="flex items-center bg-stone-50 rounded-xl p-1 border border-stone-200 shadow-inner">
                <button @click="quantidade > 1 ? quantidade-- : null" class="w-9 h-9 flex items-center justify-center text-stone-500 hover:text-stone-900 font-bold text-lg">-</button>
                <span class="w-12 text-center font-bold text-stone-800">{{ quantidade }}</span>
                <button @click="quantidade < produto.estoque ? quantidade++ : null" class="w-9 h-9 flex items-center justify-center text-stone-500 hover:text-stone-900 font-bold text-lg">+</button>
              </div>
            </div>

            <button @click="adicionarAoCarrinho" class="w-full bg-amber-700 hover:bg-amber-800 text-white font-bold py-4 px-6 rounded-xl transition shadow-md flex items-center justify-center gap-2 text-lg active:scale-[0.99]">
              <span>🛒</span> Adicionar à Cesta
            </button>
          </div>
        </div>

      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import Cabecalho from './components/cabecalho.vue'

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