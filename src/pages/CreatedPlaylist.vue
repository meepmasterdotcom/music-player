<script setup>

import { useRoute } from 'vue-router';
import { useLibraryStore } from '@/store/library';
import { usePlaylistStore } from '@/store/playlists';
import { usePlayerStore } from '@/store/player';
import { computed, ref, watch, onMounted } from 'vue';

const route = useRoute();
const playlistStore = usePlaylistStore();
const playerStore = usePlayerStore();
const libraryStore = useLibraryStore();

const playlistSelecionada = ref(null);
const carregando = ref(true);

const carregarPlaylist = () => {
  carregando.value = true;

  const id = Number(route.params.id)
  const encontrada = playlistStore.playlists.find(p => p.id === id)

  if (encontrada) {
    playlistSelecionada.value = {
      ...encontrada,
      musicas: encontrada.musicas
    };
  } else {
    playlistSelecionada.value = null;
  }

  carregando.value = false;
  console.log('Músicas encontradas:', encontrada.musicas);
  console.log("🎧 Playlist carregada:", encontrada);
  console.log("🎵 Músicas dentro da playlist:", encontrada.musicas);


}

watch(() => route.params.id, () => {
  carregarPlaylist();
});

onMounted(() => {
  carregarPlaylist()
})

const tocarPlaylist = (index = 0) => {
  if (!playlistSelecionada.value) return;

  const faixas = playlistSelecionada.value.musicas;
  playerStore.tocarPlaylist(faixas, index);
};
</script>


<template>
  <div>
    <div v-if="carregando">
      <p class="text-white">Carregando playlist...</p>
    </div>

    <div v-else-if="playlistSelecionada">
      <div>
        <h3 class="text-white">{{ playlistSelecionada.nome }}</h3>
      </div>

      <div class="mt-5">
        <ul>
          <li 
            v-for="(faixa, i) in playlistSelecionada.musicas" 
            :key="i"
            @click="tocarPlaylist(i)" 
            class="text-white p-5 hover:bg-neutral-600 rounded-md">

            {{ faixa?.nome || 'Faixa não encontrada' }}
          </li>
        </ul>
      </div>
    </div>
    <div v-else>
      <p class="text-red-400">Playlist não encontrada.</p>
    </div>
  </div>  

</template>