<script setup>

import { usePlayerStore } from '@/store/player';
const player = usePlayerStore()



</script>

<template>

    <div id="scrollable-div" class="flex-1 bg-gray-50 p-5 rounded-md">
        <div class="p-5 text-white">
            <h1 class="text-2xl font-bold">Página de playlists 🎵</h1>
            <p>Aqui você pode ver suas músicas...</p>
        </div>

        <div class="flex gap-2 p-2 bg-gray-50 sticky top-[-20px] mt[-20px]">
            <div class="flex w-[30px] justify-center">
                <span class="text-neutral-200 font-semibold px-5">
                    #
                </span>
            </div>
            
            <div class="flex flex-3/4 no-wrap gap-3">
                <div class="text-neutral-300 font-semibold">
                    <h3>
                        Título
                    </h3>
                </div>
            </div>

            <div class="flex-2/4">
                <h3 class="text-neutral-300 font-semibold text-sm">
                    Álbum
                </h3>
            </div>
            <div class="flex-1/4">
                <h3 class="text-neutral-300 font-semibold text-sm">
                    Lançamento
                </h3>
            </div>
            <div class="flex flex-row-reverse flex-1/4 flex-end">
                <h3 class="text-neutral-300 font-semibold text-sm">
                    Duração
                </h3>
            </div>
        </div>

        <hr class="text-neutral-400 pb-5">

        <div class="flex-1 rounded-md">
            <div class="flex flex-nowrap items-center hover:cursor-pointer hover:bg-neutral-600 rounded-md p-2 gap-2"
                v-for="(faixa, index) in player.faixas" :key="index"
                @click="player.selecionarMusica(Number(index))"
            >

                <div class="flex w-[30px] justify-center">
                    <span class="text-neutral-200 font-semibold px-5">
                        {{ index + 1 }}
                    </span>
                </div>

                <div class="flex flex-3/4 no-wrap gap-3">
                    <img class="size-[45px] rounded-md" :src="faixa.cover" alt="Capa de Album">
                    <div class="text-white">
                        <h3 class="text-[15px] font-semibold">
                            {{ faixa.nome.length > 25 ? faixa.nome.substring(0, 25) + "..." : faixa.nome }}
                        </h3>
                        <span class="text-[13px] font-semibold text-neutral-300">
                            {{ faixa.artista }}
                        </span>
                    </div>
                </div>

                <div class="flex-2/4">
                    <h3 class="text-white font-semibold text-sm">
                        {{ faixa.album }}
                    </h3>
                </div>
                <div class="flex-1/4">
                    <h3 class="text-white font-semibold text-sm">
                        {{ faixa.ano }}
                    </h3>
                </div>
                <div class="flex flex-row-reverse flex-1/4 flex-end">
                    <h3 class="text-white font-semibold text-sm">
                        {{ player.formatedTime(faixa.duracao) }}
                    </h3>
                </div>
            </div>
        </div>
    </div>
</template>