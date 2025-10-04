<script setup>

import { usePlayerStore } from '@/store/player';

import AsideMenu from '@/components/AsideMenu.vue';
import MenuPlayer from '@/components/MenuPlayer.vue';
import NavBar from '@/components/NavBar.vue';  

const player = usePlayerStore()

</script>

<template>
    <section id="conteudo" class="flex flex-col h-screen overflow-hidden bg-black gap-2.5 px-3">
        <NavBar />

        <div id="conteudo" class="flex flex-1 overflow-hidden gap-2.5">
            <aside id="aside-container" class="flex flex-1 overflow-hidden rounded-md">
                <AsideMenu />
            </aside>
            <div id="main-container" class="flex flex-3 overflow-hidden rounded-md">
                <RouterView/>
            </div>    
        </div>

        <MenuPlayer
            :coverPlayer="player.faixas[player.faixaAtual]?.cover"
            :faixasPlayer="player.faixas" 
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
