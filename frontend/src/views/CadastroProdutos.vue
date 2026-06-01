<template>
  <div class="min-h-screen bg-stone-950 text-stone-100 font-sans">

    <header class="border-b border-stone-800 px-8 py-5 flex items-center justify-between">
      <div class="flex items-center gap-3">
        <span class="text-2xl">🌿</span>
        <span class="text-lg font-semibold tracking-tight text-stone-100">Maravilhas da Roça</span>
      </div>
      <span class="text-xs text-stone-500 uppercase tracking-widest">Gestão de Produtos</span>
    </header>

    <main class="max-w-5xl mx-auto px-6 py-10">

      <div class="mb-10">
        <h1 class="text-3xl font-bold text-stone-100 mb-1">
          {{ editandoId ? 'Editar produto' : 'Cadastrar produto' }}
        </h1>
        <p class="text-stone-400 text-sm">{{ editandoId ? 'Altere os dados e salve.' : 'Preencha os dados para adicionar um novo produto.' }}</p>
      </div>

      <form @submit.prevent="salvar" class="bg-stone-900 border border-stone-800 rounded-2xl p-8 mb-12">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">

          <div class="md:col-span-3">
            <label class="block text-xs font-medium text-stone-400 mb-2 uppercase tracking-wider">Nome do produto</label>
            <input
              v-model="form.ProNome"
              type="text"
              placeholder="Ex: Mel de abelha nativa"
              required
              class="w-full bg-stone-800 border border-stone-700 rounded-xl px-4 py-3 text-stone-100 placeholder-stone-600 focus:outline-none focus:border-amber-500 transition-colors"
            />
          </div>

          <div>
            <label class="block text-xs font-medium text-stone-400 mb-2 uppercase tracking-wider">Preço (R$)</label>
            <input
              v-model.number="form.ProPreco"
              type="number"
              step="0.01"
              min="0.01"
              placeholder="0,00"
              required
              class="w-full bg-stone-800 border border-stone-700 rounded-xl px-4 py-3 text-stone-100 placeholder-stone-600 focus:outline-none focus:border-amber-500 transition-colors"
            />
          </div>

          <div>
            <label class="block text-xs font-medium text-stone-400 mb-2 uppercase tracking-wider">Estoque (un)</label>
            <input
              v-model.number="form.ProEstoque"
              type="number"
              min="0"
              placeholder="0"
              required
              class="w-full bg-stone-800 border border-stone-700 rounded-xl px-4 py-3 text-stone-100 placeholder-stone-600 focus:outline-none focus:border-amber-500 transition-colors"
            />
          </div>

        </div>

        <div v-if="erro" class="mb-4 bg-red-950 border border-red-800 text-red-300 rounded-xl px-4 py-3 text-sm">
          {{ erro }}
        </div>

        <div class="flex gap-3">
          <button
            type="submit"
            :disabled="salvando"
            class="bg-amber-500 hover:bg-amber-400 disabled:opacity-50 text-stone-950 font-semibold px-6 py-3 rounded-xl transition-colors"
          >
            {{ salvando ? 'Salvando...' : (editandoId ? 'Salvar alterações' : 'Cadastrar produto') }}
          </button>
          <button
            v-if="editandoId"
            type="button"
            @click="cancelarEdicao"
            class="border border-stone-700 hover:border-stone-500 text-stone-300 px-6 py-3 rounded-xl transition-colors"
          >
            Cancelar
          </button>
        </div>
      </form>

      <div>
        <h2 class="text-xl font-semibold text-stone-200 mb-5">Produtos cadastrados</h2>

        <div v-if="carregando" class="text-stone-500 text-sm py-8 text-center">Carregando...</div>

        <div v-else-if="produtos.length === 0" class="text-stone-500 text-sm py-8 text-center border border-dashed border-stone-800 rounded-2xl">
          Nenhum produto cadastrado ainda.
        </div>

        <div v-else class="overflow-hidden border border-stone-800 rounded-2xl">
          <table class="w-full text-sm">
            <thead>
              <tr class="border-b border-stone-800 bg-stone-900">
                <th class="text-left text-xs font-medium text-stone-500 uppercase tracking-wider px-6 py-4">#</th>
                <th class="text-left text-xs font-medium text-stone-500 uppercase tracking-wider px-6 py-4">Nome</th>
                <th class="text-right text-xs font-medium text-stone-500 uppercase tracking-wider px-6 py-4">Preço</th>
                <th class="text-right text-xs font-medium text-stone-500 uppercase tracking-wider px-6 py-4">Estoque</th>
                <th class="px-6 py-4"></th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="produto in produtos"
                :key="produto.ProCodigo"
                class="border-b border-stone-800 last:border-0 hover:bg-stone-900/60 transition-colors"
              >
                <td class="px-6 py-4 text-stone-600">{{ produto.ProCodigo }}</td>
                <td class="px-6 py-4 text-stone-100 font-medium">{{ produto.ProNome }}</td>
                <td class="px-6 py-4 text-right text-amber-400 font-mono">
                  R$ {{ produto.ProPreco.toFixed(2) }}
                </td>
                <td class="px-6 py-4 text-right">
                  <span
                    :class="produto.ProEstoque > 0 ? 'text-emerald-400' : 'text-red-400'"
                  >
                    {{ produto.ProEstoque }} un
                  </span>
                </td>
                <td class="px-6 py-4">
                  <div class="flex items-center justify-end gap-3">
                    <button
                      @click="iniciarEdicao(produto)"
                      class="text-stone-400 hover:text-stone-100 transition-colors text-xs uppercase tracking-wider"
                    >
                      Editar
                    </button>
                    <button
                      @click="excluir(produto.ProCodigo)"
                      class="text-stone-600 hover:text-red-400 transition-colors text-xs uppercase tracking-wider"
                    >
                      Excluir
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

    </main>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

interface Produto {
  ProCodigo: number
  ProNome: string
  ProPreco: number
  ProEstoque: number
}

const produtos = ref<Produto[]>([])
const carregando = ref(false)
const salvando = ref(false)
const erro = ref('')
const editandoId = ref<number | null>(null)

const form = ref({ ProNome: '', ProPreco: 0, ProEstoque: 0 })

async function buscarProdutos() {
  carregando.value = true
  const res = await fetch('/produtos')
  produtos.value = await res.json()
  carregando.value = false
}

async function salvar() {
  erro.value = ''
  salvando.value = true

  const url = editandoId.value ? `/produtos/${editandoId.value}` : '/produtos'
  const method = editandoId.value ? 'PUT' : 'POST'

  const res = await fetch(url, {
    method,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(form.value),
  })

  if (!res.ok) {
    const data = await res.json()
    erro.value = 'Erro ao salvar. Verifique os campos.'
    console.error(data)
  } else {
    resetarForm()
    await buscarProdutos()
  }

  salvando.value = false
}

async function excluir(id: number) {
  if (!confirm('Excluir este produto?')) return
  await fetch(`/produtos/${id}`, { method: 'DELETE' })
  await buscarProdutos()
}

function iniciarEdicao(produto: Produto) {
  editandoId.value = produto.ProCodigo
  form.value = { ProNome: produto.ProNome, ProPreco: produto.ProPreco, ProEstoque: produto.ProEstoque }
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

function cancelarEdicao() {
  resetarForm()
}

function resetarForm() {
  editandoId.value = null
  form.value = { ProNome: '', ProPreco: 0, ProEstoque: 0 }
}

onMounted(buscarProdutos)
</script>
