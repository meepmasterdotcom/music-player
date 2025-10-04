<script setup>
  import { onMounted, ref } from 'vue';
  import { usePlayerStore } from './store/player';

  const player = usePlayerStore()
  const audioRef = ref(null)

  onMounted(() => {
    player.audio = audioRef.value;

    // Atualiza o tempo conforme toca
    if (player.audio) {
      player.audio.ontimeupdate = () => {
        player.currentTime = player.audio.currentTime
      }
      
      // Valor padrão do volume em porcentagem
      player.audio.volume = player.audioVolume / 100;
    }
    document.documentElement.style.setProperty("--progressVolume", `${player.audioVolume}%`);
  })

</script>

<template>
    <audio 
      ref="audioRef"
      type="audio/mpeg" 
      :src="player.faixas[player.faixaAtual]?.url" 
      @timeupdate="player.currentTime = $event.target.currentTime"
      @loadedmetadata="player.duration = $event.target.duration"
      @ended="player.nextFaixa()"
      controls
      hidden
      >
    </audio>

  <RouterView />

</template>