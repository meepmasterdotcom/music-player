<script setup>
  import { onMounted, ref, watch } from 'vue';
  import { usePlayerStore } from './store/player';
import NovaPlaylist from './pages/NovaPlaylist.vue';

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

  watch(
    () => player.playlistAtiva?.[faixaAtual],
    (novaFaixa) => {
      if (novaFaixa && player.audio) {
        player.audio.src = novaFaixa.url;
        player.audio.load();

        if (player.isPlaying) {
          player.audio.play()
        }
      }
    }
  );
</script>

<template>
    <audio 
      ref="audioRef"
      type="audio/mpeg" 
      :src="player.playlistAtiva?.[player.faixaAtual]?.url" 
      @timeupdate="player.currentTime = $event.target.currentTime"
      @loadedmetadata="player.duration = $event.target.duration"
      @ended="player.nextFaixa()"
      controls
      hidden
      >
    </audio>

  <RouterView />

</template>