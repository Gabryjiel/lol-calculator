<script setup lang="ts">
import { computed, ref, watch } from "vue";
import ModalBackdrop from "../common/ModalBackdrop.vue";
import {
  shardTree,
  backgrounds,
  runeTrees,
  trees,
  type Modes,
  type Segment,
} from "./assets";

const props = defineProps<{
  isOpen: boolean;
  hideBackdrop: () => void;
}>();

const primaryMode = ref<Modes>("Precision");
const secondaryMode = ref<Modes>("Domination");
const backgroundImage = computed(() => backgrounds[primaryMode.value]);

const selectedRunes = {
  main: ref<(string | null)[]>([null, null, null, null]),
  secondary: ref<(string | null)[]>([null, null, null]),
  shards: ref<(string | null)[]>([null, null, null]),
};

let lastInserted = 0;

watch(primaryMode, async (newMode) => {
  if (newMode === secondaryMode.value) {
    const index = Object.keys(runeTrees).indexOf(secondaryMode.value);

    if (index > 0) {
      const newMode = Object.keys(runeTrees)[index - 1] as Modes;
      secondaryMode.value = newMode;
    } else {
      secondaryMode.value = "Domination";
    }
  }
});

const secondaryTrees = computed(() =>
  trees.filter((tree) => tree.name !== primaryMode.value)
);

const primaryTreeToDisplay = computed(() => {
  return runeTrees[primaryMode.value] ?? runeTrees.Precision;
});

const secondaryTreeToDisplay = computed(() => {
  return (runeTrees[secondaryMode.value] ?? runeTrees.Precision).slice(1);
});

function switchPrimaryMode(mode: Modes) {
  primaryMode.value = mode;
}

function switchSecondaryMode(mode: Modes) {
  secondaryMode.value = mode;
}

function switchRune(row: number, name: string, segment: Segment = "primary") {
  if (segment === "primary") {
    selectedRunes.main.value[row] = name;
  } else if (segment === "secondary") {
    const toNull =
      [0, 1, 2]
        .filter((value) => value !== row && value !== lastInserted)
        .at(0) ?? 0;

    selectedRunes.secondary.value[row] = name;

    if (lastInserted !== row) {
      selectedRunes.secondary.value[toNull] = null;
      lastInserted = row;
    }
  } else if (segment === "shards") {
    selectedRunes.shards.value[row] = name;
  }
}

function checkIfRuneIsSelected(
  name: string,
  segment: Segment = "primary",
  row?: number
) {
  if (segment === "primary" && selectedRunes.main.value.includes(name)) {
    return true;
  } else if (
    segment === "secondary" &&
    selectedRunes.secondary.value.includes(name)
  ) {
    return true;
  } else if (
    segment === "shards" &&
    selectedRunes.shards.value[row ?? 0] === name
  ) {
    return true;
  }

  return false;
}
</script>

<template>
  <ModalBackdrop :hide-backdrop="props.hideBackdrop" :is-open="props.isOpen">
    <div
      class="window"
      :style="{ backgroundImage: `url(${backgroundImage.toString()})` }"
    >
      <div class="primary-container">
        <div class="primary-balls"></div>
        <div class="primary-content">
          <div class="primary-header">
            <img
              v-for="tree in trees"
              :class="`${
                tree.name === primaryMode ? 'primary-rune-icon-active' : ''
              } primary-rune-icon`"
              :key="tree.name"
              :src="tree.img.toString()"
              :alt="tree.name"
              @click="() => switchPrimaryMode(tree.name)"
            />
          </div>
          <div class="primary-tree">
            <div
              class="rune-line"
              v-for="(line, idx) of primaryTreeToDisplay"
              :key="`line-${idx}`"
            >
              <img
                v-for="rune in line"
                :class="`${
                  checkIfRuneIsSelected(rune.name, 'primary', idx)
                    ? 'no-grayscale'
                    : ''
                } ${idx === 0 ? 'keystone' : 'tree-rune'}`"
                :src="rune.img.toString()"
                :alt="rune.name"
                :key="rune.name"
                :title="rune.name"
                @click="() => switchRune(idx, rune.name)"
              />
            </div>
          </div>
        </div>
      </div>
      <div class="secondary-container">
        <div class="secondary-subcontainer">
          <div class="secondary-balls"></div>
          <div class="secondary-content">
            <div class="secondary-header">
              <img
                :class="`${
                  tree.name === secondaryMode ? 'primary-rune-icon-active' : ''
                } primary-rune-icon`"
                v-for="tree in secondaryTrees"
                :key="tree.name"
                :src="tree.img.toString()"
                :alt="tree.name"
                @click="() => switchSecondaryMode(tree.name)"
              />
            </div>
            <div class="secondary-tree">
              <div
                class="rune-line"
                v-for="(line, idx) of secondaryTreeToDisplay"
                :key="`line-${idx}`"
              >
                <img
                  v-for="rune in line"
                  :class="`${
                    checkIfRuneIsSelected(rune.name, 'secondary')
                      ? 'no-grayscale'
                      : ''
                  } tree-rune`"
                  :src="rune.img.toString()"
                  :alt="rune.name"
                  :key="rune.name"
                  :title="rune.name"
                  @click="() => switchRune(idx, rune.name, 'secondary')"
                />
              </div>
            </div>
          </div>
        </div>
        <div class="shards-subcontainer">
          <div class="shards-balls"></div>
          <div class="shards-content">
            <div
              class="shards-content-line"
              v-for="(line, idx) of shardTree"
              :key="`shards-line-${idx}`"
            >
              <img
                v-for="rune in line"
                :class="`${
                  checkIfRuneIsSelected(rune.name, 'shards', idx)
                    ? 'no-grayscale'
                    : ''
                } shards-rune`"
                :src="rune.img.toString()"
                :alt="rune.name"
                :key="rune.name"
                :title="rune.name"
                @click="() => switchRune(idx, rune.name, 'shards')"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </ModalBackdrop>
</template>

<style scoped>
.window {
  width: 1326px;
  height: 807px;
  background-color: slategrey;
  border: 2px solid black;
  overflow: clip;
  display: flex;
  align-items: center;
  background-size: contain;
  background-repeat: no-repeat;
}
.primary-container {
  width: 40%;
  height: 100%;
  display: flex;
}
.primary-balls {
  height: 100%;
  width: 0%;
}
.primary-content {
  height: 100%;
  width: 90%;
}
.primary-header,
.secondary-header {
  display: flex;
  height: 100px;
  width: 100%;
  gap: 10px;
  justify-content: center;
  align-items: center;
}

.primary-tree {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
}

.rune-line {
  display: flex;
  gap: 10px;
  width: 60%;
  justify-content: space-around;
}
.primary-rune-icon {
  border-radius: 100%;
  padding: 5px;
  cursor: pointer;
  width: 40px;
  height: 40px;
  border: 2px solid transparent;
  transition: border 0.2s;
}

.primary-rune-icon:hover {
  border: 2px solid gold;
  border-radius: 100%;
}

.primary-rune-icon-active {
  border: 2px solid gold;
  border-radius: 100%;
}

.primary-content {
  display: flex;
  flex-direction: column;
  width: 100%;
}

.primary-content-line {
  display: flex;
}

.keystone {
  width: 96px;
  height: 96px;
  filter: grayscale(1);
  cursor: pointer;
  border-radius: 100%;
  transition: outline 0.2s;
  transition: filter 0.2s;
}

.tree-rune {
  width: 64px;
  height: 64px;
  border-radius: 100%;
  outline: 1px solid black;
  outline-offset: -1px;
  filter: grayscale(1);
  cursor: pointer;
  transition: outline 0.2s;
  transition: filter 0.2s;
}

.tree-rune:hover,
.keystone:hover {
  outline: 1px solid gold;
}
.no-grayscale {
  filter: grayscale(0) !important;
}
.secondary-container {
  width: 30%;
  height: 100%;
  display: flex;
  flex-direction: column;
}
.secondary-subcontainer {
  width: 100%;
  height: 60%;
  display: flex;
}
.secondary-balls {
  height: 100%;
  width: 0%;
}
.shards-subcontainer {
  width: 100%;
  height: 40%;
  display: flex;
}
.secondary-content {
  width: 90%;
  height: 100%;
  display: flex;
  flex-direction: column;
}
.secondary-tree {
  width: 100%;
  flex: 1 0 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
}
.shards-balls {
  width: 0%;
  height: 100%;
}
.shards-content {
  width: 90%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
}
.shards-content-line {
  display: flex;
  gap: 10px;
}

.shards-rune {
  border-radius: 100%;
  background-color: rgb(0, 0, 0);
  border: 2px solid darkgoldenrod;
  cursor: pointer;
  filter: grayscale(1);
}

.shards-rune:hover {
  border: 2px solid gold;
}
</style>
