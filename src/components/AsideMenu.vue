<script setup>
    import { RouterLink } from 'vue-router';

</script>

<template>
    <div id="scrollable-div" class="flex-1 bg-gray-50 p-5 rounded-md">
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
    </div>
</template>