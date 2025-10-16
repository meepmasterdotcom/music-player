<script setup>
import { ref } from 'vue';
import { useLibraryStore } from '@/store/library';
import { usePlaylistStore } from '@/store/playlists';
import { useRouter } from 'vue-router';

const libraryStore = useLibraryStore()
const playlistStore = usePlaylistStore();


const nome = ref('');
const musicasSelecionadas = ref([]);

const router = useRouter()

const criarPlaylist = () => {
    if (!nome.value.trim()) {
        return alert('Nomeie a Playlist!');
    } else {
        playlistStore.criarPlaylist(nome.value, musicasSelecionadas.value);

        const novaPlaylist = playlistStore.playlists.at(-1)

        if (novaPlaylist) {
            router.push({
                name: 'created-playlist',
                params: { id: novaPlaylist.id }
            })
        }
        
        nome.value = '';
        musicasSelecionadas.value = []
    }
}

</script>

<template>

    <div class="p-5 text-white">
        <h2 class="text-2xl font-bold">Nova Playlist</h2>
    </div>

    <div class="p-5">
        <form @submit.prevent="criarPlaylist" class="flex flex-col gap-2 bg-neutral-700 p-5 rounded-md">
            <div class="flex no-wrap items-center bg-neutral-600 p-2 rounded-md">
                <label class="mr-2 text-white ">Nome da Playlist:</label>
                <input
                    v-model="nome"
                    placeholder="Minha Playlist"
                    class="bg-white rounded-md p-2"
                >
            </div>
            <div class="bg-neutral-600 p-2 rounded-md text-white">

                <h3 class="text-2xl font-bold">Selecione as músicas:</h3>
                <label v-for="(faixa, index) in libraryStore.faixas" :key="index">
                    <input 
                        type="checkbox" 
                        :value="index" 
                        v-model="musicasSelecionadas"
                    >
                    {{ faixa.nome }} <br>
                </label>
                
            </div>
            <p class="text-sm text-gray-300 mt-2">
              {{ musicasSelecionadas.length }} música(s) selecionada(s)
            </p>

            <div class="mt-5">
                <button 
                    class="bg-white py-2 px-4 rounded-md hover:bg-neutral-300 cursor-pointer"
                    type="submit"
                    >
                    Criar Playlist
                </button>
            </div>
        </form>
    </div>

</template>