import { defineStore } from "pinia";
import type { Player, PlayerStats } from "./types";

type State = {
  players: Player[];
};

export const usePlayersStore = defineStore("playerStore", {
  state: (): State => ({
    players: [],
  }),
  getters: {
    getPlayerStats: (): PlayerStats => {
      return {
        attackDamage: 0,
        abilityPower: 0,
        armor: 0,
        magicResist: 0,
        abilityHaste: 0,
        attackSpeed: 0,
        movementSpeed: 0,
      };
    },
  },
});
