<template>
  <div class="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white">

    <h1 class="text-4xl font-bold text-green-400 mb-6">
      Hello World Vue 🚀
    </h1>

    <p class="text-gray-300 mb-4">
      Tailwind funcionando corretamente
    </p>

    <button
      class="px-6 py-2 bg-green-500 hover:bg-green-600 rounded-lg transition"
      @click="count++"
    >
      Clique aqui: {{ count }}
    </button>

  </div>
</template>

<script setup>
import { ref } from "vue";

const count = ref(0);
</script>