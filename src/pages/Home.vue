<script>
import { RouterLink } from 'vue-router';

</script>

<template>

  <div class="p-5 text-white">
    <h1 class="text-2xl font-bold">Página Inicial 🎵</h1>
    <p>Aqui será as recomendações e playlists iniciais...</p>
  </div>

  <section class="flex gap-4 p-5">
    <RouterLink to="/playlist/add" class="flex items-center justify-center text-center bg-neutral-700 text-white w-[150px] h-[150px] rounded-md p-2">
      Crie Sua Playlist
    </RouterLink>
    <div class="flex items-center justify-center text-center bg-neutral-700 text-white w-[150px] h-[150px] rounded-md p-2">
      Suas Músicas
    </div>
    <div class="flex items-center justify-center text-center bg-neutral-700 text-white w-[150px] h-[150px] rounded-md p-2">
      Adicione Suas Músicas
    </div>
  </section>


</template>