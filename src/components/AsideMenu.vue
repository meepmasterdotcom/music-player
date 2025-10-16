<script setup>
    import { RouterLink } from 'vue-router';
    import { usePlaylistStore } from '@/store/playlists';

    const playlistStore = usePlaylistStore()

</script>

<template>
    <div class="hover:cursor-pointer rounded-md flex flex-col gap-2">
        <RouterLink to="/" class="bg-gray-100 hover:bg-neutral-500 rounded-md text-gray-200 font-bold p-5">
            Início
        </RouterLink>
        <RouterLink to="/playlist" class="bg-gray-100 hover:bg-neutral-500 rounded-md text-white font-bold p-5">
            Playlist
        </RouterLink>
        <RouterLink to="/navegar" class="bg-gray-100 hover:bg-neutral-500 rounded-md text-white font-bold p-5">
            Navegar
        </RouterLink>
    </div>

    <div class="hover:cursor-pointer rounded-md flex flex-col gap-2 mt-4">

        <div v-for="playlist in playlistStore.playlists" :key="playlist.id" 
        class="bg-gray-100 hover:bg-neutral-500 rounded-md text-gray-200 font-bold">

            <RouterLink :to="`/playlist/${playlist.id}`" class="w-full h-full p-5 block">
                {{ playlist.nome }}
            </RouterLink>
        </div>

    </div>

</template>