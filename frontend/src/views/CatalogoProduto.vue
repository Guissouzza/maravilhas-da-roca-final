<script setup lang="ts">
import { ref, onMounted, computed } from "vue";
import Footer from "../components/footer.vue";
import { useShopStore } from "../stores/shop";
import { addToCart } from "../services/cartService";

interface Product {
  id: number | string;
  name: string;
  description: string;
  price: number;
  image: string;
  // Ajustado para bater com o padrão do seu JSON (mude para 'ProCategoria' se no JSON vier maiúsculo)
  category?: string; 
  procategoria?: string; 
  ProCategoria?: string;
}

const shop = useShopStore();
const products = ref<Product[]>([]);
const loading = ref(true);

// 1. CORRIGIDO: Pega a propriedade de categoria não importa como ela venha do back-end
const categories = computed(() => {
  const unique = new Set(
    products.value.map((p) => p.category || p.procategoria || p.ProCategoria).filter(Boolean)
  );
  return ["Todas", ...Array.from(unique)];
});

// 2. CORRIGIDO: Filtros aplicando as chaves corretas que funcionam no seu template (name)
const filteredProducts = computed(() => {
  let list = products.value;

  // Filtro por Categoria vindo do Pinia
  if (shop.selectedCategory !== "Todas") {
    list = list.filter((p) => {
      const pCat = p.category || p.procategoria || p.ProCategoria;
      return pCat === shop.selectedCategory;
    });
  }

  // Filtro por Busca por Texto vindo do Pinia
  const query = shop.searchQuery.trim().toLowerCase();
  if (!query) return list;

  // Corrigido de p.ProNome para p.name para não quebrar a aplicação
  return list.filter((p) => p.name?.toLowerCase().includes(query));
});

const addProductToCart = async (product: Product) => {
  try {
    await addToCart(Number(product.id), 1);

    shop.addCart(1); // resposta imediata
  } catch (error) {
    console.error("Erro ao adicionar ao carrinho:", error);

    shop.addCart(-1); // rollback
  }
};

const isProcessing = (id: number | string) =>
  shop.togglingFavorites.includes(Number(id));

const toggleFavorite = async (productId: number | string) => {
  const id = Number(productId);

  if (shop.togglingFavorites.includes(id)) return;

  try {
    await shop.toggleFavorite(id);
  } catch (e) {
    console.error("Erro ao alternar favorito:", e);
  }
};

// CORRIGIDO: Garante que os códigos sejam comparados estritamente como Números
const favoriteIds = computed(() =>
  shop.favorites.map((f) => Number(f.ProCodigo)),
);

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
  <div
    class="min-h-screen bg-gradient-to-br from-[#FAF6EE] via-[#FDFBF7] to-[#F3EAD9] text-[#4A3728] antialiased selection:bg-[#EED9C4]"
  >
    <section class="max-w-6xl mx-auto px-4 pt-16 pb-12 text-center">
      <div
        class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#EED9C4]/50 border border-[#D9B48F]/40 text-xs font-black uppercase tracking-widest text-[#A0522D] mb-6 shadow-sm"
      >
        🌾 Tradição Mineira Extraído com Afeto
      </div>

      <h1
        class="text-4xl sm:text-6xl md:text-7xl font-serif font-black tracking-tight text-[#362212] max-w-5xl mx-auto leading-[1.08]"
      >
        O puro sabor do campo, <br class="hidden sm:inline" />
        <span class="underline decoration-[#A0522D]/30 decoration-wavy"
          >direto na sua mesa</span
        >
      </h1>

      <p
        class="text-base sm:text-xl text-[#7A5C43] max-w-2xl mx-auto mt-6 leading-relaxed font-light"
      >
        Descubra pequenos lotes artesanais de queijos premiados, doces de tacho
        e relíquias mineiras autênticas.
      </p>
    </section>

    <section class="max-w-4xl mx-auto px-6 mb-16 select-none">
      <div
        class="flex items-center justify-start sm:justify-center gap-3 overflow-x-auto py-2 scrollbar-none snap-x"
      >
        <button
          v-for="category in categories"
          :key="category"
          @click="shop.selectedCategory = category"
          class="snap-center shrink-0 px-6 py-2.5 rounded-full text-xs uppercase tracking-[0.2em] transition-all duration-300 ease-out active:scale-95"
          :class="[
            shop.selectedCategory === category
              ? 'bg-[#362212] text-[#FAF6EE] shadow-sm font-bold scale-100'
              : 'text-[#7A5C43]/70 bg-transparent font-semibold hover:text-[#362212] hover:bg-[#EED9C4]/20',
          ]"
        >
          {{ category }}
        </button>
      </div>

      <div class="w-12 h-[1px] bg-[#A0522D]/20 mx-auto mt-6"></div>
    </section>

    <main class="max-w-7xl mx-auto px-4 pb-20">
      <div
        v-if="loading"
        class="flex flex-col justify-center items-center py-40 space-y-4"
      >
        <div
          class="w-16 h-16 border-4 border-[#EED9C4]/30 border-t-[#A0522D] rounded-full animate-spin"
        ></div>
      </div>

      <div
        v-else
        class="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
      >
        <div
          v-for="product in filteredProducts"
          :key="product.id"
          class="relative group bg-white rounded-[2.2rem] border border-[#EED9C4]/20 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden"
        >
          <div class="absolute top-4 right-4 flex gap-2 z-20">
            <button
              @click="toggleFavorite(product.id)"
              :disabled="isProcessing(product.id)"
              class="w-10 h-10 flex items-center justify-center rounded-full bg-white/95 border border-[#EED9C4] hover:border-red-400 transition disabled:opacity-70 disabled:cursor-not-allowed"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="w-5 h-5 transition-transform duration-100"
                :class="[
                  favoriteIds.includes(Number(product.id))
                    ? 'text-red-500 fill-red-500 scale-110'
                    : 'text-[#422A17]',
                  isProcessing(product.id) ? 'opacity-50' : '',
                ]"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
              </svg>
            </button>

            <button
              @click="addProductToCart(product)"
              class="w-10 h-10 flex items-center justify-center rounded-full bg-white/95 border border-[#EED9C4] hover:border-[#A0522D] transition"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="w-5 h-5 text-[#422A17]"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2 9m12-9l2 9m-6-9v9"
                />
              </svg>
            </button>
          </div>

          <div class="aspect-[4/3] bg-[#FAF6EE] overflow-hidden">
            <img
              :src="
                product.image
                  ? `/images/${product.image}`
                  : '/images/default.png'
              "
              class="w-full h-full object-cover group-hover:scale-105 transition duration-500"
            />
          </div>

          <div class="p-5">
            <h2 class="font-serif font-black text-[#362212] text-lg">
              {{ product.name }}
            </h2>
            <p class="text-sm text-[#7A5C43] mt-2 line-clamp-2">
              {{ product.description }}
            </p>
            <div class="flex justify-between items-center mt-4">
              <span class="text-lg font-black text-[#362212]"
                >R$ {{ Number(product.price || 0).toFixed(2) }}</span
              >
              <button
                class="text-xs font-semibold px-4 py-2 rounded-full text-[#422A17] hover:text-[#A0522D] hover:bg-[#EED9C4]/40 transition"
              >
                Ver detalhes →
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
    <Footer />
  </div>
</template>
