<script setup lang="ts">
import { computed, ref, watch } from "vue";
import ModalBackdrop from "../ModalBackdrop.vue";
import {
  precisionTree,
  dominationTree,
  sorceryTree,
  resolveTree,
  inspirationTree,
  shardTree,
  type Rune,
} from "./trees";

type Modes = "Precision" | "Domination" | "Sorcery" | "Resolve" | "Inspiration";
type Segment = "primary" | "secondary" | "shards";

const props = defineProps<{
  isOpen: boolean;
  hideBackdrop: () => void;
}>();

const trees: { img: URL; name: Modes }[] = [
  {
    img: new URL("./../../assets/runes/Precision.png", import.meta.url),
    name: "Precision",
  },
  {
    img: new URL("./../../assets/runes/Domination.png", import.meta.url),
    name: "Domination",
  },
  {
    img: new URL("./../../assets/runes/Sorcery.png", import.meta.url),
    name: "Sorcery",
  },
  {
    img: new URL("./../../assets/runes/Resolve.png", import.meta.url),
    name: "Resolve",
  },
  {
    img: new URL("./../../assets/runes/Inspiration.png", import.meta.url),
    name: "Inspiration",
  },
];

const selectedRunes = {
  keystone: ref<string | null>(null),
  row1: ref<string | null>(null),
  row2: ref<string | null>(null),
  row3: ref<string | null>(null),
  secondary1: ref<string | null>(null),
  secondary2: ref<string | null>(null),
  shardOffensive: ref<string | null>(null),
  shardMixed: ref<string | null>(null),
  shardDefensive: ref<string | null>(null),
};

const primaryMode = ref<Modes>("Precision");
const secondaryMode = ref<Modes>("Domination");

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

const runeTrees: Record<Modes, Rune[][]> = {
  Precision: precisionTree,
  Domination: dominationTree,
  Sorcery: sorceryTree,
  Resolve: resolveTree,
  Inspiration: inspirationTree,
};

const primaryTreeToDisplay = computed(() => {
  return runeTrees[primaryMode.value] ?? precisionTree;
});

const secondaryTreeToDisplay = computed(() => {
  return (runeTrees[secondaryMode.value] ?? precisionTree).slice(1);
});

function switchPrimaryMode(mode: Modes) {
  primaryMode.value = mode;
}

function switchSecondaryMode(mode: Modes) {
  secondaryMode.value = mode;
}

function switchRune(row: number, name: string, segment: Segment = "primary") {
  let key: keyof typeof selectedRunes | null = null;
  console.log(row, segment, name);
  if (segment === "primary") {
    if (row === 0) {
      key = "keystone";
    } else if (row === 1) {
      key = "row1";
    } else if (row === 2) {
      key = "row2";
    } else if (row === 3) {
      key = "row3";
    }
  } else if (segment === "secondary") {
    if (row === 0) {
      key = "secondary1";
    } else if (row === 1) {
      key = "secondary2";
    }
  } else if (segment === "shards") {
    if (row === 0) {
      key = "shardOffensive";
    } else if (row === 1) {
      key = "shardMixed";
    } else if (row === 2) {
      key = "shardDefensive";
    }
  }

  if (key) {
    selectedRunes[key].value = name;
  }
}

function checkIfRuneIsSelectedInPrimary(row: number, runeName: string) {
  let ref: string | null = null;

  if (row === 0) {
    ref = selectedRunes.keystone.value;
  }
  if (row === 1) {
    ref = selectedRunes.row1.value;
  }
  if (row === 2) {
    ref = selectedRunes.row2.value;
  }
  if (row === 3) {
    ref = selectedRunes.row3.value;
  }

  if (runeName === ref) {
    return false;
  }

  return Boolean(ref);
}

function checkIfRuneIsSelected(name: string, segment: Segment = "primary") {
  if (
    segment === "primary" &&
    (selectedRunes.keystone.value === name ||
      selectedRunes.row1.value === name ||
      selectedRunes.row2.value === name ||
      selectedRunes.row3.value === name)
  ) {
    return true;
  } else if (
    segment === "secondary" &&
    (selectedRunes.secondary1.value === name ||
      selectedRunes.secondary2.value === name)
  ) {
    return true;
  } else if (
    segment === "shards" &&
    (selectedRunes.shardOffensive.value === name ||
      selectedRunes.shardMixed.value === name ||
      selectedRunes.shardDefensive.value === name)
  ) {
    return true;
  }

  return false;
}

function resetRunes() {
  selectedRunes.keystone.value = null;
  selectedRunes.row1.value = null;
  selectedRunes.row2.value = null;
  selectedRunes.row3.value = null;
  selectedRunes.secondary1.value = null;
  selectedRunes.secondary2.value = null;
  selectedRunes.shardOffensive.value = null;
  selectedRunes.shardMixed.value = null;
  selectedRunes.shardDefensive.value = null;
}
</script>

<template>
  <ModalBackdrop :hide-backdrop="props.hideBackdrop" :is-open="props.isOpen">
    <div class="window">
      <div class="primary-tree">
        <div class="primary-header">
          <img
            v-for="tree in trees"
            :class="`${
              tree.name === primaryMode ? 'no-grayscale' : ''
            } primary-rune-icon`"
            :key="tree.name"
            :src="tree.img.toString()"
            :alt="tree.name"
            @click="() => switchPrimaryMode(tree.name)"
          />
          <button @click="resetRunes">Reset runes</button>
        </div>
        <div class="primary-content">
          <div id="precision-tree">
            <div
              class="primary-content-line"
              v-for="(line, idx) of primaryTreeToDisplay"
              :key="`line-${idx}`"
            >
              <img
                v-for="rune in line"
                :class="`${
                  checkIfRuneIsSelectedInPrimary(idx, rune.name)
                    ? ''
                    : 'no-grayscale'
                } tree-rune`"
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
      <div class="secondary-tree">
        <div class="secondary-header">
          <img
            class="primary-rune-icon"
            v-for="tree in secondaryTrees"
            :key="tree.name"
            :src="tree.img.toString()"
            :alt="tree.name"
            @click="() => switchSecondaryMode(tree.name)"
          />
        </div>
        <div class="secondary-content">
          <div
            class="secondary-content-line"
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
      <div class="shards">
        <div class="shards-content">
          <div
            class="shards-content-line"
            v-for="(line, idx) of shardTree"
            :key="`shard-line-${idx}`"
          >
            <img
              v-for="rune in line"
              :class="`${
                checkIfRuneIsSelected(rune.name, 'secondary')
                  ? 'no-grayscale'
                  : ''
              } shard-rune`"
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
  </ModalBackdrop>
</template>

<style scoped>
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
.primary-header {
  display: flex;
  gap: 5px;
}

.primary-tree {
  width: 100%;
}

.primary-rune-icon {
  border: 5px solid black;
  background-color: black;
  border-radius: 100%;
  padding: 5px;
  cursor: pointer;
  filter: grayscale(0.8);
}

.primary-rune-icon:hover {
  filter: grayscale(0.5);
}

.primary-content {
  display: flex;
  flex-direction: column;
  width: 100%;
}

.primary-content-line {
  display: flex;
}

.tree-rune {
  width: 64px;
  height: 64px;
  border-radius: 100%;
  outline: 1px solid black;
  outline-offset: -1px;
  filter: grayscale(1);
  cursor: pointer;
  transition: filter 0.2s;
}

.tree-rune:hover {
  filter: grayscale(0.5);
}

.no-grayscale {
  filter: grayscale(0) !important;
}
</style>
