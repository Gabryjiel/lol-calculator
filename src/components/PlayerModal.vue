<script setup lang="ts">
import { useBoolean } from "../composables/useBoolean";
import PlayerCreator from "./PlayerCreator/PlayerCreator.vue";

const props = defineProps<{
  handleClose: () => void;
  mode: "dealer" | "receiver";
}>();

const playerModal = useBoolean();
</script>

<template>
  <div class="drawer">
    <div class="title">
      <span> Players </span>
      <button @click="playerModal.setTrue()">Add</button>
      <button @click="props.handleClose">Close</button>
    </div>
  </div>

  <PlayerCreator
    v-if="playerModal.value.value"
    :handle-close="playerModal.setFalse"
  />
</template>

<style>
.drawer {
  position: absolute;
  width: 100vw;
  height: calc(100vh - 50px);
  top: 50px;
  left: 0;
  background-color: gray;
}
</style>
