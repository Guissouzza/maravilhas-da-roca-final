<script setup lang="ts">
import { ref, onMounted, computed } from "vue";
import Footer from "../components/footer.vue";
import { useShopStore } from "../stores/shop";
import { addToCart } from "../services/cartService";

interface Product {
  id: number | string; // Segurança caso o ID venha como texto da API
  name: string;
  description: string;
  price: number;
  image: string;
}

const shop = useShopStore();
const products = ref<Product[]>([]);
const loading = ref(true);

// CORRIGIDO: Proteção contra espaços vazios na busca
const filteredProducts = computed(() => {
  const query = shop.searchQuery.trim().toLowerCase();
  if (!query) return products.value;
  return products.value.filter((p) =>
    p.name.toLowerCase().includes(query)
  );
});

const addProductToCart = async (product: Product) => {
  try {
    await addToCart(Number(product.id), 1);

    shop.addCart(1); // ✔️ correto e suficiente
  } catch (error) {
    console.error("Erro ao adicionar ao carrinho:", error);
  }
};

const isProcessing = (id: number | string) => shop.togglingFavorites.includes(Number(id));

const toggleFavorite = async (productId: number | string) => {
  await shop.toggleFavorite(Number(productId));
};

// CORRIGIDO: Garante que os códigos sejam comparados estritamente como Números
const favoriteSet = computed(() => {
  return new Set(shop.favorites.map((f) => Number(f.ProCodigo)));
});

onMounted(async () => {
  try {
    const res = await fetch("http://localhost:3000/products");
    if (!res.ok) throw new Error("Falha na resposta do servidor");
    products.value = await res.json();
  } catch (error) {
    console.error("Erro ao carregar produtos:", error);
  } finally {
    loading.value = false;
  }
});
</script>

<template>
  <div class="min-h-screen bg-gradient-to-br from-[#FAF6EE] via-[#FDFBF7] to-[#F3EAD9] text-[#4A3728] antialiased selection:bg-[#EED9C4]">
    <section class="max-w-6xl mx-auto px-4 pt-16 pb-12 text-center">
      <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#EED9C4]/50 border border-[#D9B48F]/40 text-xs font-black uppercase tracking-widest text-[#A0522D] mb-6 shadow-sm">
        🌾 Tradição Mineira Extraído com Afeto
      </div>

      <h1 class="text-4xl sm:text-6xl md:text-7xl font-serif font-black tracking-tight text-[#362212] max-w-5xl mx-auto leading-[1.08]">
        O puro sabor do campo, <br class="hidden sm:inline" />
        <span class="underline decoration-[#A0522D]/30 decoration-wavy">direto na sua mesa</span>
      </h1>

      <p class="text-base sm:text-xl text-[#7A5C43] max-w-2xl mx-auto mt-6 leading-relaxed font-light">
        Descubra pequenos lotes artesanais de queijos premiados, doces de tacho e relíquias mineiras autênticas.
      </p>
    </section>

    <main class="max-w-7xl mx-auto px-4 pb-20">
      <div v-if="loading" class="flex flex-col justify-center items-center py-40 space-y-4">
        <div class="w-16 h-16 border-4 border-[#EED9C4]/30 border-t-[#A0522D] rounded-full animate-spin"></div>
      </div>

      <div v-else class="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        <div v-for="product in filteredProducts" :key="product.id" class="relative group bg-white rounded-[2.2rem] border border-[#EED9C4]/20 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden">
          <div class="absolute top-4 right-4 flex gap-2 z-20">
            
            <button @click="toggleFavorite(product.id)" :disabled="isProcessing(product.id)" class="w-10 h-10 flex items-center justify-center rounded-full bg-white/95 border border-[#EED9C4] hover:border-red-400 transition disabled:opacity-70 disabled:cursor-not-allowed">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 transition-transform duration-100" :class="[favoriteSet.has(Number(product.id)) ? 'text-red-500 fill-red-500 scale-110' : 'text-[#422A17]', isProcessing(product.id) ? 'opacity-50' : '']" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </button>

            <button @click="addProductToCart(product)" class="w-10 h-10 flex items-center justify-center rounded-full bg-white/95 border border-[#EED9C4] hover:border-[#A0522D] transition">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-[#422A17]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2 9m12-9l2 9m-6-9v9" />
              </svg>
            </button>
          </div>

          <div class="aspect-[4/3] bg-[#FAF6EE] overflow-hidden">
            <img :src="product.image ? `/images/${product.image}` : '/images/default.png'" class="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
          </div>

          <div class="p-5">
            <h2 class="font-serif font-black text-[#362212] text-lg">{{ product.name }}</h2>
            <p class="text-sm text-[#7A5C43] mt-2 line-clamp-2">{{ product.description }}</p>
            <div class="flex justify-between items-center mt-4">
              <span class="text-lg font-black text-[#362212]">R$ {{ Number(product.price || 0).toFixed(2) }}</span>
              <button class="text-xs font-semibold px-4 py-2 rounded-full text-[#422A17] hover:text-[#A0522D] hover:bg-[#EED9C4]/40 transition">Ver detalhes →</button>
            </div>
          </div>
        </div>
      </div>
    </main>
    <Footer />
  </div>
</template>