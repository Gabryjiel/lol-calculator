<script setup lang="ts">
import { ref } from "vue";
import PlayersCalculator from "./components/PlayersCalculator/PlayersCalculator.vue";
import PlayerCreator from "./components/PlayerCreator/PlayerCreator.vue";
import { useBoolean } from "./composables/useBoolean";
import PlayerModal from "./components/PlayerModal.vue";

const viewMode = ref<"creator" | "calculator">("creator");
const playerModal = useBoolean();
const addMode = ref<"dealer" | "receiver">("dealer");

const onAddNewDealerClick = () => {
  addMode.value = "dealer";
  playerModal.setTrue();
};

const onAddNewReceiverClick = () => {
  addMode.value = "receiver";
  playerModal.setTrue();
};

const onClosePlayerModal = () => {
  playerModal.setFalse();
};
</script>

<template>
  <div id="container">
    <header>
      <div>Lol Calculator</div>
    </header>

    <main>
      <section id="dealers">
        <div class="title">
          <span>Dealers</span>
          <button @click="onAddNewDealerClick">Add</button>
        </div>
      </section>
      <section id="receivers">
        <div class="title">
          <span>Receivers</span>
          <button @click="onAddNewReceiverClick">Add</button>
        </div>
      </section>
    </main>
  </div>

  <PlayerModal
    v-if="playerModal.value.value === true"
    :handle-close="onClosePlayerModal"
    :mode="addMode"
  />
</template>

<style>
#container {
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
}

header {
  display: flex;
  height: 50px;
  width: 100%;
  font-size: xx-large;
  align-items: center;
  text-indent: 5px;
  background-color: gray;
}

main {
  flex: 1 0 0;
}

.title {
  width: 100%;
  background-color: gray;
  border-top: 2px solid black;
  border-bottom: 2px solid black;
  display: flex;
  justify-content: space-around;
  padding: 5px 0px;
}

#dealers {
  background-color: steelblue;
  height: 50%;
  width: 100%;
}

#receivers {
  background-color: tomato;
  height: 50%;
  width: 100%;
}
</style>
