<script setup lang="ts">
import { ref } from 'vue'

const nome = ref('')
const email = ref('')
const senha = ref('')
const confirmarSenha = ref('')
const loading = ref(false)

const cadastrar = async () => {
  loading.value = true
  await new Promise(r => setTimeout(r, 1200))
  loading.value = false
}
</script>

<template>
<div class="min-h-screen flex items-center justify-center bg-[#F6EFE6] px-6 py-16">

  <div class="w-full max-w-2xl">

    <!-- CARD GRANDE -->
    <div class="bg-white/85 backdrop-blur-xl border border-[#EED9C4]/60 shadow-[0_40px_120px_rgba(0,0,0,0.12)] rounded-[3rem] p-14">

      <!-- HEADER -->
      <div class="text-center">

        <div class="text-6xl mb-4">🌾</div>

        <h1 class="text-5xl font-black font-serif text-[#2E1F16] leading-tight">
          Crie sua conta
        </h1>

        <p class="mt-6 text-lg text-[#6B4B36] leading-relaxed max-w-xl mx-auto">
          Seja bem-vindo à <span class="font-bold text-[#2E1F16]">Maravilhas da Roça</span>.
          Aqui você descobre produtos artesanais feitos com tempo, cuidado e tradição.
        </p>

      </div>

      <!-- SEPARADOR -->
      <div class="my-10 border-t border-[#EED9C4]/60"></div>

      <!-- FORM -->
      <div class="space-y-6">

        <div class="grid md:grid-cols-2 gap-5">

          <input
            v-model="nome"
            type="text"
            placeholder="Nome completo"
            class="w-full px-5 py-4 rounded-2xl bg-[#F7F1E8]
                   border border-[#EED9C4] outline-none
                   focus:ring-2 focus:ring-[#C49A55]/60 transition"
          />

          <input
            v-model="email"
            type="email"
            placeholder="Email"
            class="w-full px-5 py-4 rounded-2xl bg-[#F7F1E8]
                   border border-[#EED9C4] outline-none
                   focus:ring-2 focus:ring-[#C49A55]/60 transition"
          />

        </div>

        <div class="grid md:grid-cols-2 gap-5">

          <input
            v-model="senha"
            type="password"
            placeholder="Senha"
            class="w-full px-5 py-4 rounded-2xl bg-[#F7F1E8]
                   border border-[#EED9C4] outline-none
                   focus:ring-2 focus:ring-[#C49A55]/60 transition"
          />

          <input
            v-model="confirmarSenha"
            type="password"
            placeholder="Confirmar senha"
            class="w-full px-5 py-4 rounded-2xl bg-[#F7F1E8]
                   border border-[#EED9C4] outline-none
                   focus:ring-2 focus:ring-[#C49A55]/60 transition"
          />

        </div>

      </div>

      <!-- BOTÃO -->
      <button
        @click="cadastrar"
        :disabled="loading"
        class="mt-10 w-full py-5 rounded-2xl font-bold tracking-[0.25em]
               bg-[#2E1F16] hover:bg-[#C49A55]
               text-white text-lg transition-all duration-300
               shadow-lg hover:shadow-2xl disabled:opacity-50"
      >
        {{ loading ? 'Criando sua conta...' : 'CRIAR CONTA' }}
      </button>

      <!-- FOOTER TEXT -->
      <p class="text-center mt-8 text-sm text-[#6B4B36]">
        Já tem conta?
        <a class="text-[#C49A55] font-bold hover:underline">
          Entrar agora
        </a>
      </p>

    </div>

  </div>

</div>
</template>