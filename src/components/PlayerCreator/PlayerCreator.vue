<script setup lang="ts">
import { computed, reactive, ref } from "vue";
import { useBoolean } from "../../composables/useBoolean";
import ChampionsModal from "../ChampionsModal/ChampionsModal.vue";
const props = defineProps<{ handleClose: () => void }>();

interface Runes {
  keystone: string | null;
  row1: string | null;
  row2: string | null;
  row3: string | null;
  secondary1: string | null;
  secondary2: string | null;
  shardOffensive: string | null;
  shardMixed: string | null;
  shardDefensive: string | null;
}

const champion = ref<string | null>(null);
const championLevel = ref<number>(1);
const abilityLevels = reactive({
  q: 0,
  w: 0,
  e: 0,
  r: 0,
});

const runes: Runes = reactive({
  keystone: null,
  row1: null,
  row2: null,
  row3: null,
  secondary1: null,
  secondary2: null,
  shardOffensive: null,
  shardMixed: null,
  shardDefensive: null,
});

const championIconImg = computed(
  () =>
    `http://ddragon.leagueoflegends.com/cdn/12.16.1/img/champion/${champion.value}.png`
);
const abilityLevelLimits = computed(() => {
  return {
    q: 5,
    w: 5,
    e: 5,
    r: 3,
  };
});

const championModal = useBoolean();

const changeLevel = (level: number) => {
  if (level >= 1 && level <= 18) {
    championLevel.value = level;
  }
};

const changeAbilityLevel = (
  ability: keyof typeof abilityLevels,
  level: number
) => {
  const newLevelsSum = Object.entries(abilityLevels)
    .map(([key, value]) => {
      if (key === ability) {
        return level;
      }

      return value;
    })
    .reduce((all, cur) => all + cur, 0);

  if (newLevelsSum > championLevel.value) {
    return;
  }

  if (level >= 0 && level <= abilityLevelLimits.value[ability]) {
    abilityLevels[ability] = level;
  }
};

const changeChampion = (championKey: string) => {
  champion.value = championKey;
};
</script>

<template>
  <div class="drawer">
    <div class="title">
      <span>Player creation</span>
      <button>Save</button>
      <button @click="props.handleClose">Close</button>
    </div>

    <div class="champion">
      <img
        @click="championModal.setTrue"
        class="champion-icon"
        :src="championIconImg"
        :alt="champion ?? 'Choose champion'"
      />
      <div class="champion-level">
        <div class="champion-level-buttons">
          <button @click="() => changeLevel(championLevel - 1)">-</button>
          <div>{{ championLevel }}</div>
          <button @click="() => changeLevel(championLevel + 1)">+</button>
        </div>
        <div>Level</div>
      </div>
    </div>

    <div class="abilities">
      <div class="ability">
        <img alt="Q" />
        <div class="ability-bar">
          <button @click="changeAbilityLevel('q', abilityLevels.q - 1)">
            -
          </button>
          <div>{{ abilityLevels.q }}</div>
          <button @click="changeAbilityLevel('q', abilityLevels.q + 1)">
            +
          </button>
        </div>
      </div>
      <div class="ability">
        <img alt="Q" />
        <div class="ability-bar">
          <button @click="changeAbilityLevel('w', abilityLevels.w - 1)">
            -
          </button>
          <div>{{ abilityLevels.w }}</div>
          <button @click="changeAbilityLevel('w', abilityLevels.w + 1)">
            +
          </button>
        </div>
      </div>
      <div class="ability">
        <img alt="Q" />
        <div class="ability-bar">
          <button @click="changeAbilityLevel('e', abilityLevels.e - 1)">
            -
          </button>
          <div>{{ abilityLevels.e }}</div>
          <button @click="changeAbilityLevel('e', abilityLevels.e + 1)">
            +
          </button>
        </div>
      </div>
      <div class="ability">
        <img alt="Q" />
        <div class="ability-bar">
          <button @click="changeAbilityLevel('r', abilityLevels.r - 1)">
            -
          </button>
          <div>{{ abilityLevels.r }}</div>
          <button @click="changeAbilityLevel('r', abilityLevels.r + 1)">
            +
          </button>
        </div>
      </div>
    </div>

    <div class="runes">
      <div class="primary-tree">
        <div class="keystone"></div>
        <div class="rune primary-row1"></div>
        <div class="rune primary-row2"></div>
        <div class="rune primary-row3"></div>
      </div>
      <div class="secondary">
        <div class="secondary-tree">
          <div class="rune secondary-1"></div>
          <div class="rune secondary-2"></div>
        </div>
        <div class="shard-tree">
          <div class="rune shard-offensive"></div>
          <div class="rune shard-mixed"></div>
          <div class="rune shard-defensive"></div>
        </div>
      </div>
    </div>

    <div class="items">
      <div class="item"></div>
      <div class="item"></div>
      <div class="item"></div>
      <div class="item"></div>
      <div class="item"></div>
      <div class="item"></div>
    </div>
  </div>

  <ChampionsModal
    :hide-backdrop="championModal.setFalse"
    :is-open="championModal.value.value"
    :active-champion="champion"
    :handle-change="changeChampion"
  />

  <!-- <RunesModal
    :hide-backdrop="runesModal.setFalse"
    :is-open="runesModal.value.value"
  /> -->
</template>

<style scoped>
.drawer > div {
  width: 100%;
}
.champion {
  height: 100px;
  display: flex;
  justify-content: space-around;
  align-items: center;
}

.champion-icon {
  width: 64px;
  height: 64px;
  border: 1px solid black;
  display: flex;
  justify-content: center;
  align-items: center;
}

.champion-level {
  width: 150px;
}

.champion-level div {
  width: 100%;
  text-align: center;
}

.champion-level-buttons {
  height: 50px;
  display: flex;
  justify-content: space-between;
}

.champion-level-buttons button {
  width: 33%;
  height: 100%;
  border-radius: 0;
  border: none;
  border: 1px solid black;
  padding: 0;
}

.champion-level-buttons button:nth-of-type(1) {
  border-top-left-radius: 25%;
  border-bottom-left-radius: 25%;
}

.champion-level-buttons button:nth-of-type(2) {
  border-top-right-radius: 25%;
  border-bottom-right-radius: 25%;
}

.champion-level-buttons div {
  flex: 1 0 0;
  height: 100%;
  font-size: 2em;
  display: flex;
  justify-content: center;
  align-items: center;
  border-top: 1px solid black;
  border-bottom: 1px solid black;
}

.abilities {
  height: 100px;
  display: flex;
  justify-content: space-around;
  align-items: center;
}

.ability {
  width: 64px;
  height: 64px;
  border: 1px solid black;
  position: relative;
}

.ability img {
  width: 100%;
  height: 100%;
}

.ability-bar {
  width: 120%;
  height: 24px;
  left: -10%;
  bottom: -20%;
  position: absolute;
  display: flex;
  justify-content: space-between;
  background-color: bisque;
  border-radius: 10%;
  overflow: hidden;
}

.ability-bar button {
  width: 24px;
  height: 24px;
  padding: 0;
  border: none;
  border-radius: 0;
}

.runes {
  height: 100px;
  display: flex;
  flex-direction: column;
}

.primary-tree {
  width: 100%;
  height: 50%;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
}

.keystone {
  width: 32px;
  height: 32px;
  border: 1px solid black;
}

.rune {
  width: 24px;
  height: 24px;
  border: 1px solid black;
}

.secondary {
  width: 100%;
  height: 50%;
  display: flex;
  align-items: center;
}

.secondary-tree {
  width: 50%;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
}

.shard-tree {
  width: 50%;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
}

.items {
  height: 100px;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
}

.item {
  height: 50px;
  width: 50px;
  border: 1px solid black;
}
</style>
