// stores/playlist.js
import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useLibraryStore } from './library'

export const usePlaylistStore = defineStore('playlist', () => {
  const library = useLibraryStore()

  const playlists = ref([]);
  const playlistSelecionada = ref(null);

  const criarPlaylist = (nome, indicesMusicas) => {
    const musicas = indicesMusicas.map(i => library.faixas[i])
    const novaPlaylist = {
      id: Date.now(),
      nome,
      musicas,
    }
    playlists.value.push(novaPlaylist)
  }

  const selecionarPlaylist = (id) => {
    playlistSelecionada.value = playlists.value.find(p => p.id === id);
  }

  const getPlaylist = (id) => playlists.value.find(p => p.id === id);

  return { 
    playlists, playlistSelecionada, 
    
    criarPlaylist, getPlaylist, selecionarPlaylist, 
  }
})
