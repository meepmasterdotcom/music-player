import { defineStore } from "pinia";
import { onMounted, ref, watch } from "vue";

// Tracks
import breakOnThrough from '@/assets/music/Break-on-Through-To-the-Other-Side.mp3'
import iGottaFeeling from '@/assets/music/I-Gotta-Feeling.mp3'
import isolation from '@/assets/music/Isolation.mp3'
import dragPath from '@/assets/music/Drag-Path.mp3'

// Covers
import theDoorsCover from '@/assets/img/the-doors.jpg'
import BEPcover from '@/assets/img/black-eyed-peas.jpg'
import closerCover from '@/assets/img/closer.jpg' 
import breachCover from '@/assets/img/breach.webp'

export const usePlayerStore = defineStore('player', () => {
  const faixas = ref([
    { 
      nome: "Break on Through (Through The Other Side)", 
      artista: "The Doors",
      duracao: 0,
      cover: theDoorsCover, 
      url: breakOnThrough,
      album: "The Doors",
      ano: "4 de jan. de 1967", 
    },
    { 
      nome: "I Gotta Feeling", 
      artista: "Black Eye Peas",
      duracao: 0,
      cover: BEPcover,
      url: iGottaFeeling,
      album: "The End", 
      ano: "3 de jun. de 2009",
    },
    { 
      nome: "Isolation",
      artista: "Joy Division",
      duracao: 0,
      cover: closerCover,
      url: isolation,
      album: "Closer",
      ano: "18 de jun. de 1980",
    },
    { 
      nome: "Drag Path (Devil's Eyes)", 
      artista: "twenty one pilots",
      duracao: 0,
      cover: breachCover,
      url: dragPath,
      album: "Breach - Digital Remains",
      ano: "12 de set. de 2025",
    },
  ])

  // Set inicial dos valores
  const faixaAtual = ref(0);
  const isPlaying = ref(false);
  const audio = ref(null);

  // Set inicial - Barra de andamento
  const currentTime = ref(0)
  const duration = ref(0)

  // Set inicial - Barra de volume
  const audioVolume = ref(70)

  // Atualiza informação de tempo e duração da música;
  const duracaoAudio = () => {
    faixas.value.forEach((faixa) => {
      const audioTemp = new Audio(faixa.url);
      audioTemp.addEventListener('loadedmetadata', () => {
        faixa.duracao = audioTemp.duration;
      });
    });
  }

  // Seleção com chamada autoplay da música
  const selecionarMusica = (index) => {
    faixaAtual.value = Number(index);
    loadAndPlay()
  }

  // Função autoplay
  const loadAndPlay = () => {
    if (!audio.value) return;

    audio.value.src = faixas.value[faixaAtual.value].url;
    audio.value.load();

    duracaoAudio()

    audio.value.oncanplay = () => {
      audio.value.play();
      isPlaying.value = true;
    }
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
    faixaAtual.value = (faixaAtual.value + 1) % faixas.value.length;
    loadAndPlay();
  }

  // Botão de música anterior
  const prevFaixa = () => {
    faixaAtual.value = (faixaAtual.value - 1 + faixas.value.length) % faixas.value.length;
    loadAndPlay();
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

  // Watcher para CSS da barra de progressão
  watch(currentTime, (valorBarra) => {
    const porcentagem = (valorBarra / duration.value) * 100;
    document.documentElement.style.setProperty("--progressTime", `${porcentagem}%`);
  });

  // Watcher para CSS da barra de volume
  watch(audioVolume, (novoValor) => {
    document.documentElement.style.setProperty("--progressVolume", `${novoValor}%`);
    if (audio.value) {
      audio.value.volume = novoValor / 100;
    }
  })

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
    duracaoAudio()
  })

  return {
    // Estado
    faixas, faixaAtual, isPlaying, audio, currentTime, duration, audioVolume,
    
    // Ações
    selecionarMusica, loadAndPlay, playPause, nextFaixa, prevFaixa, setProgress, setVolume, duracaoAudio, formatedTime,
  };

});
