import { defineStore } from "pinia";
import { nextTick, onMounted, ref, watch, computed } from "vue";
import { usePlaylistStore } from "./playlists";
import { useLibraryStore } from "./library";

export const usePlayerStore = defineStore('player', () => {
  const playlistStore = usePlaylistStore();
  const libraryStore = useLibraryStore();

  const faixas = ref([])

  const tocando = ref(false)
  const novasFaixas = ref(null)

  const filaAtual = ref([]);
  const faixaAtual = ref(0);
  const contextoAtivo = ref(null);
  const isPlaying = ref(false);
  const audio = ref(new Audio());

  const currentTime = ref(0)
  const duration = ref(0)
  const audioVolume = ref(70)

  // Função autoplay
  const loadAndPlay = () => {
    const faixa = filaAtual.value[faixaAtual.value];
    if (!faixa) return;

    audio.value.src = faixa.url;
    audio.value.load();

    audio.value.oncanplay = () => {
      audio.value.play();
      isPlaying.value = true;
    };

    console.log(`🎶 Tocando [${contextoAtivo.value || "Sem contexto"}]:`, faixa?.nome);
  }

  // Seleção com chamada autoplay da música
  const selecionarMusica = (index, lista = null) => {
    if (lista) {
      filaAtual.value = [...lista];
    }

    faixaAtual.value = index;
    isPlaying.value = true

    const faixa = filaAtual.value[faixaAtual.value];
    console.log("🎧 Tocando:", faixa?.nome);
    loadAndPlay();
  }

  // Função para tocar nova playlist
  const tocarPlaylist = async (musicas, index = 0, contexto = "global") => {
    if (!novasFaixas || novasFaixas.length === 0) return 

    faixas.value = novasFaixas;
    faixaAtual.value = index;
    tocando.value = true;

    if (audio.value) {
      loadAndPlay();  
    }

    contextoAtivo.value = contexto;
    filaAtual.value = [...musicas];
    faixaAtual.value = index;

    await nextTick();
    loadAndPlay();
  }

  // Função Play-Pause do menu
  const playPause = async () => {
    if (!audio.value) return;

    try {
      if (isPlaying.value) {
        audio.value.pause();
      } else {
        await audio.value.play()
      }
      isPlaying.value = !isPlaying.value;
    } catch (err) {
      console.warn("Reprodução bloqueada", err);
    };
  }

  // Botões de próxima música
  const nextFaixa = () => {
    if (faixaAtual.value < filaAtual.value.length - 1) {
      faixaAtual.value++;
      loadAndPlay();
    }
  }

  // Botão de música anterior
  const prevFaixa = () => {
  if (faixaAtual.value > 0) {
      faixaAtual.value--;
      loadAndPlay();
    }
  }

  // Arrastar barra de progressão
  const setProgress = (progresso) => {
    if (audio.value) {
      audio.value.currentTime = Number(progresso);
      currentTime.value = Number(progresso)
    }
  }

  // Função para atualizar CSS do volume com input:range
  const setVolume = (vol) => {
    const percent = Number(vol);
    audioVolume.value = percent

    if (audio.value) {
      audio.value.volume = percent / 100;
    };
  }  

  // ---------- Watchers ---------- //
  watch(currentTime, (valorBarra) => {
    const porcentagem = (valorBarra / duration.value) * 100;
    document.documentElement.style.setProperty("--progressTime", `${porcentagem}%`);
  });

  watch(audioVolume, (novoValor) => {
    document.documentElement.style.setProperty("--progressVolume", `${novoValor}%`);
    if (audio.value) {
      audio.value.volume = novoValor / 100;
    }
  })
  
  // Atualiza informação de tempo e duração da música;
  const duracaoAudio = (lista = libraryStore.faixas) => {
    lista.forEach((faixa) => {
      const audioTemp = new Audio(faixa.url);
      audioTemp.addEventListener('loadedmetadata', () => {
        faixa.duracao = audioTemp.duration;
      });
    });
  };

  // Função para formatação de tempo
  const formatedTime = (segundos) => {
    if (isNaN(segundos)) {
      return "-:--"
    }
    const min = Math.floor(segundos / 60);
    const seg = Math.floor(segundos % 60);
    return `${min}:${seg < 10 ? '0' : ''}${seg}`;
  }

  onMounted(() => {
    audio.value = new Audio()
    duracaoAudio()

    filaAtual.value = [...libraryStore.faixas]
    faixaAtual.value = 0
    contextoAtivo.value = "Biblioteca"
    isPlaying.value = false

    audio.value.src = filaAtual.value[faixaAtual.value].url
    audio.value.load()
  })

  return {
    // Estado
    faixaAtual, faixas, filaAtual, contextoAtivo, isPlaying, audio, currentTime, duration, audioVolume,
    
    // Ações
    selecionarMusica, loadAndPlay, playPause, nextFaixa, prevFaixa, setProgress, setVolume, tocarPlaylist, duracaoAudio, formatedTime,
  };

});
