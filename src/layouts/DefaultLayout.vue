<script setup>

import { usePlayerStore } from '@/store/player';
import { usePlaylistStore } from '@/store/playlists';

import AsideMenu from '@/components/AsideMenu.vue';
import MenuPlayer from '@/components/MenuPlayer.vue';
import NavBar from '@/components/NavBar.vue';  

const player = usePlayerStore();
const playlist = usePlaylistStore();
</script>

<template>
    <section id="conteudo" class="flex flex-col h-screen overflow-hidden bg-black gap-2.5 px-3">
        <NavBar />

        <main id="conteudo" class="flex flex-1 overflow-hidden gap-2.5">
            <aside id="aside-container" class="flex flex-1 overflow-hidden rounded-md">
                <div id="scrollable-div" class="flex-1 bg-gray-50 p-5 rounded-md">
                    <AsideMenu />
                </div>
            </aside>
            <div id="main-container" class="flex flex-3 overflow-hidden rounded-md">
                <div  id="scrollable-div" class="flex-1 bg-gray-50 p-5 rounded-md">
                    <RouterView/>
                </div>
            </div>    
        </main>

        <MenuPlayer
            :coverPlayer="player.filaAtual[player.faixaAtual]?.cover || ''"
            :faixasPlayer="player.filaAtual" 
            :faixaAtualPlayer="player.faixaAtual"
            :isPlayingPlayer="player.isPlaying"
            :currentTimePlayer="player.currentTime"
            :durationPlayer="player.duration"
            :audioVolumePlayer="player.audioVolume"

            @nextFaixa="player.nextFaixa"
            @prevFaixa="player.prevFaixa" 
            @playPause="player.playPause"
            @barraProgressao="player.setProgress"
            @volumeChange="player.setVolume"
        />
    </section>
</template>
