<script setup lang="ts">
import { computed, ref } from "vue";
import championData from "../../data/champion.json";
import ModalBackdrop from "../common/ModalBackdrop.vue";

type Champion = typeof championData.data.Aatrox;

const props = defineProps<{
  isOpen: boolean;
  hideBackdrop: () => void;
  activeChampion: string | null;
  handleChange: (name: string) => void;
}>();

const searchPhrase = ref("");

const championList = ref<Champion[]>([]);

const filteredChampionList = computed(() => {
  return championList.value.filter((champion) =>
    champion.id.toLowerCase().includes(searchPhrase.value)
  );
});

function onSearchPhraseInput(event: Event) {
  searchPhrase.value = (event.target as HTMLInputElement).value;
}

async function fetchChampionList() {
  // const res = await fetch(
  //   "http://ddragon.leagueoflegends.com/cdn/12.14.1/data/en_US/champion.json"
  // );
  // const json = await res.json();
  const json = championData;
  championList.value = Object.values(json.data);
}

function switchChampion(championKey: string) {
  props.hideBackdrop();
  props.handleChange(championKey);
}

fetchChampionList();
</script>

<template>
  <ModalBackdrop :hide-backdrop="props.hideBackdrop" :is-open="props.isOpen">
    <div class="window">
      <div class="window-header">
        <div>Aktywny: {{ props.activeChampion }}</div>
        <input
          type="text"
          placeholder="Szukaj bohatera"
          :value="searchPhrase"
          @input="onSearchPhraseInput"
        />
        <button class="close-button" @click="props.hideBackdrop">X</button>
      </div>
      <div class="window-content">
        <img
          class="champion-icon pointer"
          v-for="champion in filteredChampionList"
          :key="champion.id"
          :src="`http://ddragon.leagueoflegends.com/cdn/12.16.1/img/champion/${champion.id}.png`"
          :alt="champion.name"
          @click="() => switchChampion(champion.id)"
        />
      </div>
    </div>
  </ModalBackdrop>
</template>

<style scoped>
body {
  width: 100vw;
  height: 100vh;
  background-color: beige;
  display: flex;
}

header {
  display: flex;
  height: 50px;
  width: 100%;
  font-size: xx-large;
  align-items: center;
  text-indent: 5px;
  border-bottom: 2px solid black;
  background-color: steelblue;
}

.left {
  height: 100%;
  flex: 2 0 0;
  background-color: aqua;
  display: flex;
  flex-direction: column;
}
.right {
  flex: 3 0 0;
  height: 100%;
  width: 60%;
  background-color: aquamarine;
}

.loading {
  width: 100%;
  height: 60%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.loading > img {
  scale: 0.8;
}

.levels {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 5px;
}

.level {
  display: flex;
  flex-direction: column;
}

.level img {
  border: 3px solid black;
}

.level-buttons {
  display: flex;
  width: 100%;
}

.level-buttons button {
  background: black;
  color: white;
  border: none;
  flex: 1 0 0;
}

.level-buttons button:hover {
  background-color: blue;
}

.pointer {
  cursor: pointer;
}

.stats {
  width: 100%;
  height: 50%;
}

.items {
  margin-top: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.items-panel {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(2, 1fr);
  gap: 5px;
  width: 200px;
  place-items: center;
}

.item {
  border: 3px solid black;
  background-color: cadetblue;
  width: 64px;
  height: 64px;
}

.item:hover {
  background-color: cornflowerblue;
}

.dialog {
  position: absolute;
  z-index: 1;
  background: rgba(0, 0, 0, 0.5);
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  display: grid;
  place-items: center;
}

.window {
  width: 700px;
  height: 600px;
  background-color: slategrey;
  border-radius: 20px;
  border: 2px solid black;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.window-header {
  margin: 10px;
  display: flex;
  width: 95%;
  height: 50px;
  justify-content: space-between;
}

.window-content {
  width: 100%;
  height: 90%;
  display: flex;
  overflow-x: hidden;
  overflow-y: auto;
  flex-wrap: wrap;
  justify-content: center;
  align-items: flex-start;
  gap: 15px;
}

.window-content .champion-icon {
  width: 64px;
  height: 64px;
  border: 1px solid black;
}

.window-header img {
  object-fit: contain;
}

.window-header input {
  width: 60%;
  color: black;
  font-size: x-large;
  border: 3px solid black;
  background-color: steelblue;
  border-radius: 20px;
  text-indent: 10px;
}

.window-header input::placeholder {
  color: darkblue;
  font-style: italic;
}

.window-header input:focus {
  outline: 1px solid darkblue;
}

.close-button {
  width: 50px;
  height: 50px;
  background-color: steelblue;
  border: 3px solid black;
  border-radius: 100%;
  font-size: larger;
  font-weight: bolder;
  cursor: pointer;
  padding: 1px;
  display: grid;
  place-items: center;
  transition: font-size 0.1s;
}

.close-button:hover {
  font-size: x-large;
}
</style>
