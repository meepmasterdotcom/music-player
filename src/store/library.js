import { defineStore } from "pinia";
import { ref } from "vue";

// Tracks
import breakOnThrough from '@/assets/music/Break-on-Through-To-the-Other-Side.mp3'
import iGottaFeeling from '@/assets/music/I-Gotta-Feeling.mp3'
import isolation from '@/assets/music/Isolation.mp3'
import dragPath from '@/assets/music/Drag-Path.mp3'
import HardRainsAGonnaFall from '@/assets/music/A-Hard-Rains-A-Gonna-Fall.mp3'
import TimesTheyAreAChangin from '@/assets/music/The-Times-They-Are A-Changin.mp3'
import WhenTheShipComesIn from '@/assets/music/When-the-Ship-Comes-In.mp3'
import Time from '@/assets/music/Time.mp3'
import Paranoid from '@/assets/music/Paranoid.mp3'
import BabeImGonnaLeaveYou from '@/assets/music/Babe-Im-Gonna-Leave-You.mp3'

// Covers
import theDoorsCover from '@/assets/img/the-doors.jpg'
import BEPcover from '@/assets/img/black-eyed-peas.jpg'
import closerCover from '@/assets/img/closer.jpg' 
import breachCover from '@/assets/img/breach.webp'
import ledZeppelinCover from '@/assets/img/led-zeppelin.jpg'
import paranoidCover from '@/assets/img/paranoid.jpg'
import TDSOTMcover from '@/assets/img/the-dark-side-of-the-moon.jpg'
import TFWcover from '@/assets/img/bob-album-2.jpg'
import TTTAACcover from '@/assets/img/bob-album.jpg'

export const useLibraryStore = defineStore("library", () => {
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
      nome: "Babe I'm Gonna Leave You",
      artista: "Led Zeppelin",
      duracao: 0,
      cover: ledZeppelinCover,
      url: BabeImGonnaLeaveYou,
      album: "Led Zeppelin",
      ano: "12 de jan. de 1969",
    },
    {
      nome: "Paranoid",
      artista: "Black Sabbath",
      duracao: 0,
      cover: paranoidCover,
      url: Paranoid,
      album: "Paranoid",
      ano: "18 de set. de 1970",
    },
    {
      nome: "Time",
      artista: "Pink Floyd",
      duracao: 0,
      cover: TDSOTMcover,
      url: Time,
      album: "The Dark Side Of The Moon",
      ano: "1 de mar. de 1973",
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
      nome: "I Gotta Feeling", 
      artista: "Black Eye Peas",
      duracao: 0,
      cover: BEPcover,
      url: iGottaFeeling,
      album: "The End", 
      ano: "3 de jun. de 2009",
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
    {
      nome: "A Hard Rain's A-Gonna Fall",
      artista: "Bob Dylan",
      duracao: 0,
      cover: TFWcover,
      url: HardRainsAGonnaFall,
      album: "The Freewheelin' Bob Dylan",
      ano: "27 de mai. de 1963",
    },
    {
      nome: "The Times They Are A-Changin'",
      artista: "Bob Dylan",
      duracao: 0,
      cover: TTTAACcover,
      url: TimesTheyAreAChangin,
      album: "The Times They Are A-Changin'",
      ano: "10 de fev. de 1964",
    },
    {
      nome: "When The Ship Comes In",
      artista: "Bob Dylan",
      duracao: 0,
      cover: TTTAACcover,
      url: WhenTheShipComesIn,
      album: "The Times They Are A-Changin'",
      ano: "10 de fev. de 1964",
    },
  ]);

  const getById = (id) => faixas.value.find(f => f.id === id);

  return {
    faixas, getById,
  }
});