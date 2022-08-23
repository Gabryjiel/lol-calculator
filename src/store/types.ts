export type Stat =
  | "attackDamage"
  | "abilityPower"
  | "armor"
  | "healthPoints"
  | "attackSpeed"
  | "abilityHaste"
  | "mana";

export type ChampionStats = {
  battackSpeedeAttackDamage: number;
  baseAttackSpeed: number;
};

export type Champion = {
  name: string;
  level: number;
  stats: ChampionStats;
};

export type Item = {
  name: string;
  stats: { name: Stat; value: number }[];
};

export type Player = {
  champion: Champion | null;
  items: Item[];
  runes: {
    keystone: null | string;
    primaryRow1: null | string;
    primaryRow2: null | string;
    primaryRow3: null | string;
    secondaryRow1: null | string;
    secondaryRow2: null | string;
    shardOffensive: null | string;
    shardMixed: null | string;
    shardDefensive: null | string;
  };
};

export type State = {
  player: Player;
  opponent: Player;
};

export type PlayerStats = {
  attackDamage: number;
  abilityPower: number;
  armor: number;
  magicResist: number;
  abilityHaste: number;
  attackSpeed: number;
  movementSpeed: number;
};
