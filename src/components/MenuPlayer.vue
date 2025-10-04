<script setup>

    import { ref, onMounted, nextTick, watch } from 'vue'

    const props = defineProps({
        coverPlayer: String,
        faixasPlayer: Object,
        faixaAtualPlayer: Number,
        isPlayingPlayer: Boolean,
        currentTimePlayer: Number,
        durationPlayer: Number,
        audioVolumePlayer: Number,
    })

    const emit = defineEmits(['nextFaixa', 'prevFaixa', 'playPause', 'barraProgressao', 'volumeChange'])

    // Função para formatar tempo
    const formatedTime = (segundos) => {
        if (isNaN(segundos)) {
            return "-:--"
        }
        const min = Math.floor(segundos / 60);
        const seg = Math.floor(segundos % 60);
        return `${min}:${seg < 10 ? '0' : ''}${seg}`;
    }

    const scrollContainer = ref(null);
    const scrollContent = ref(null);

    const deslocamento = ref(0)
    const scrollSlide = ref(false)

    const calcularScroll = async () => {
        await nextTick()
        const container = scrollContainer.value
        const content = scrollContent.value

        if (container && content) {
            const diff = content.scrollWidth - container.clientWidth

            if (diff > 0) {
                scrollSlide.value = true;
                deslocamento.value = -diff + "px";
                container.style.setProperty("--deslocamento", deslocamento.value)
            } else {
                scrollSlide.value = false
                deslocamento.value = "0px"
            }
        }
    }

    onMounted(() => {
        calcularScroll()
    })

    watch(() => props.faixaAtualPlayer, () => {
        calcularScroll()
    })

</script>

<template>
    <nav class="w-full bg-black text-white p-3 pt-1 bg-black-900 shrink-0">
        <div class="flex items-center justify-between">
            <div class="flex w-full items-center">

                <div class="w-1/3 text-white flex items-center gap-4">

                    <div class="w-[60px] shrink-0 rounded-md overflow-hidden">
                        <img class="h-full" :src="coverPlayer" alt="Capa de Album">
                    </div>
                    
                    <div id="container-scroll" ref="scrollContainer">
                        <h2 id="content-scroll" class="text-sm font-semibold"
                            ref="scrollContent" 
                            :class="{ marquee: scrollSlide }"
                            > 
                                {{ props.faixasPlayer[props.faixaAtualPlayer].nome }} 
                        </h2>
                        <p id="child-scroll" class="text-xs font-semibold text-gray-400">
                            {{ props.faixasPlayer[props.faixaAtualPlayer].artista }}
                        </p>
                    </div>
                </div>

                <div class="w-1/3">
                    <div class="flex flex-wrap items-center justify-center max-w-full min-w-54">
                        <div class="flex gap-4 py-1 items-center md:rounded">
                            <button 
                                @click="emit('prevFaixa')" 
                                class="hover:cursor-pointer text-neutral-400 hover:text-neutral-300 rounded-full px-2 py-1">
                                <i class="ri-skip-back-fill text-whote text-2xl"></i>
                            </button>
                            <button @click="emit('playPause')" class="hover:cursor-pointer bg-gray-200 rounded-full shadow-xl px-2 py-1">
                                <i v-if="isPlayingPlayer" class="ri-pause-large-fill text-black text-xl"></i>
                                <i v-else class="ri-play-large-fill text-black text-xl"></i>
                            </button>
                            <button 
                                @click="emit('nextFaixa')" 
                                class="hover:cursor-pointer text-neutral-400 hover:text-neutral-300 rounded-full px-2 py-1">
                                <i class="ri-skip-forward-fill text-white text-2xl"></i>
                            </button>
                        </div>
                        <div id="hover-target" class="flex items-center gap-2 w-full">
                            <span class="text-xs font-medium text-gray-500">
                                {{ formatedTime(props.currentTimePlayer) }}
                            </span>
                            <input id="andamentoMusica"
                                type="range"
                                min="0"
                                :max="props.durationPlayer"
                                :value="props.currentTimePlayer"
                                @input="emit('barraProgressao', $event.target.value)"
                                class="
                                    outline-none
                                    appearance-none
                                    w-full
                                    bg-gray-700
                                    rounded-md
                                    cursor-pointer
                                "
                            >
                            <span class="text-xs font-medium text-gray-500">
                                {{ formatedTime(props.durationPlayer) }}
                            </span>
                        </div>
                    </div>
                </div>
                <div class="w-1/3 flex items-center justify-end text-white">
                    <div class="flex items-center">
                        <i v-if="audioVolumePlayer === 0" class="ri-volume-mute-fill px-2"></i>
                        <i v-if="audioVolumePlayer >= 1 && audioVolumePlayer <= 69" class="ri-volume-down-fill px-2"></i>
                        <i v-if="audioVolumePlayer >= 70" class="ri-volume-up-fill px-2"></i>
                        <input id="barraVolume"
                            type="range"
                            min="0"
                            max="100"
                            step="1"
                            :value="props.audioVolumePlayer"
                            @input="emit('volumeChange', $event.target.value)"
                            class="
                                w-2/3
                                outline-none
                                appearance-none
                                w-full
                                bg-gray-600
                                rounded-md
                                cursor-pointer
                            "
                        >
                    </div>
                </div>
            </div>
        </div>
    </nav>
</template>