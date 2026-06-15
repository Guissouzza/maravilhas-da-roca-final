<script setup lang="ts">
import Cabecalho from '../components/cabecalho.vue'
import Footer from '../components/footer.vue'
</script>

<template>
<div class="min-h-screen bg-[#F6EFE6] text-[#2E1F16] antialiased">

  <Cabecalho />

  <!-- HERO EDITORIAL -->
  <section class="relative h-[85vh] flex items-center overflow-hidden">

    <img
      src="https://images.unsplash.com/photo-1464226184884-fa280b87c399"
      class="absolute inset-0 w-full h-full object-cover scale-105"
    />

    <div class="absolute inset-0 bg-gradient-to-r from-[#120C08]/95 via-[#2A1B12]/70 to-transparent"></div>

    <div class="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(196,154,85,0.25),transparent_60%)]"></div>

    <div class="relative max-w-7xl mx-auto px-8">

      <div class="max-w-3xl">

        <span class="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-xs tracking-[0.35em] uppercase">
          🌾 nossa história
        </span>

        <h1 class="mt-10 text-6xl sm:text-8xl font-black text-white leading-[1.05] font-serif">
          Feito na roça,<br />
          <span class="text-[#E7CFA7]">com verdade</span>
        </h1>

        <p class="mt-8 text-lg sm:text-xl text-white/80 max-w-2xl leading-relaxed">
          Uma jornada para preservar sabores, histórias e tradições do interior — levando o melhor da roça até você.
        </p>

      </div>

    </div>
  </section>

  <!-- MANIFESTO -->
  <section class="py-32">

    <div class="max-w-4xl mx-auto px-8 text-center">

      <h2 class="text-5xl sm:text-6xl font-black font-serif leading-tight">
        Não vendemos produtos.<br />
        <span class="text-[#C49A55]">Vendemos origem.</span>
      </h2>

      <p class="mt-10 text-lg leading-9 text-[#5A3B2B]">
        A Maravilhas da Roça nasceu da vontade de preservar o que o tempo não pode apagar:
        o sabor feito à mão, o cuidado da produção artesanal e a identidade de pequenos produtores.
      </p>

    </div>
  </section>

  <!-- BLOCO DE HISTÓRIA VISUAL -->
  <section class="py-24 bg-white">

    <div class="max-w-7xl mx-auto px-8 grid lg:grid-cols-2 gap-20 items-center">

      <img
        src="https://images.unsplash.com/photo-1500595046743-cd271d694d30"
        class="rounded-[3rem] shadow-2xl"
      />

      <div>

        <span class="text-xs tracking-[0.4em] uppercase text-[#C49A55] font-bold">
          origem
        </span>

        <h3 class="mt-6 text-5xl font-black font-serif leading-tight">
          Da terra,<br />nasce o essencial.
        </h3>

        <p class="mt-8 text-lg leading-9 text-[#5A3B2B]">
          Cada produto vem de famílias que mantêm tradições vivas há gerações.
          Nada é industrializado — tudo é feito com tempo, cuidado e verdade.
        </p>

      </div>

    </div>
  </section>

  <!-- VALORES -->
  <section class="py-28">

    <div class="max-w-7xl mx-auto px-8">

      <h2 class="text-center text-5xl font-black font-serif mb-20">
        Nossos Valores
      </h2>

      <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-10">

        <div class="bg-white/70 backdrop-blur-xl border border-[#EED9C4]/40 rounded-[2.5rem] p-10 text-center shadow-sm hover:shadow-2xl hover:-translate-y-3 transition">

          <div class="text-5xl mb-6">🌾</div>

          <h3 class="text-xl font-black">Tradição</h3>

          <p class="mt-4 text-[#5A3B2B] text-sm leading-relaxed">
            Preservamos receitas e técnicas passadas entre gerações.
          </p>

        </div>

        <div class="bg-white/70 backdrop-blur-xl border border-[#EED9C4]/40 rounded-[2.5rem] p-10 text-center shadow-sm hover:shadow-2xl hover:-translate-y-3 transition">

          <div class="text-5xl mb-6">🤝</div>

          <h3 class="text-xl font-black">Pequenos produtores</h3>

          <p class="mt-4 text-[#5A3B2B] text-sm leading-relaxed">
            Valorizamos quem produz com as próprias mãos.
          </p>

        </div>

        <div class="bg-white/70 backdrop-blur-xl border border-[#EED9C4]/40 rounded-[2.5rem] p-10 text-center shadow-sm hover:shadow-2xl hover:-translate-y-3 transition">

          <div class="text-5xl mb-6">🍯</div>

          <h3 class="text-xl font-black">Autenticidade</h3>

          <p class="mt-4 text-[#5A3B2B] text-sm leading-relaxed">
            Nada artificial — apenas o sabor real da roça.
          </p>

        </div>

      </div>

    </div>
  </section>

  <!-- FECHAMENTO IMPACTANTE -->
  <section class="relative py-40 overflow-hidden">

    <img
      src="https://images.unsplash.com/photo-1604908176997-125f25cc500f"
      class="absolute inset-0 w-full h-full object-cover scale-110"
    />

    <div class="absolute inset-0 bg-gradient-to-r from-[#120C08]/95 via-[#2A1B12]/70 to-transparent"></div>

    <div class="relative max-w-4xl mx-auto px-8 text-center text-white">

      <h2 class="text-5xl sm:text-6xl font-black font-serif leading-tight">
        A roça vive<br />
        em cada sabor
      </h2>

      <p class="mt-8 text-white/80 text-lg">
        E nós estamos aqui para manter isso vivo.
      </p>

    </div>

  </section>

  <Footer />

</div>
</template>