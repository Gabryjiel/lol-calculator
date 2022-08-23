import { getURL } from "../../functions/utils";

export type Rune = {
  img: URL;
  name: string;
};

export type Modes =
  | "Precision"
  | "Domination"
  | "Sorcery"
  | "Resolve"
  | "Inspiration";

export type Segment = "primary" | "secondary" | "shards";

const importURL = getURL(import.meta.url, "../../assets/runes/");

export const precisionTree: Rune[][] = [
  [
    {
      img: importURL("PressTheAttack.png"),
      name: "Press The Attack",
    },
    {
      img: importURL("LethalTempoTemp.png"),
      name: "Lethal Tempo",
    },
    {
      img: importURL("FleetFootwork.png"),
      name: "Fleet Footwork",
    },
    {
      img: importURL("Conqueror.png"),
      name: "Conqueror",
    },
  ],
  [
    {
      img: importURL("Overheal.png"),
      name: "Overheal",
    },
    {
      img: importURL("Triumph.png"),
      name: "Triumph",
    },
    {
      img: importURL("PresenceOfMind.png"),
      name: "Presence Of Mind",
    },
  ],
  [
    {
      img: importURL("LegendAlacrity.png"),
      name: "Legend Alacrity",
    },
    {
      img: importURL("LegendTenacity.png"),
      name: "Legend Tenacity",
    },
    {
      img: importURL("LegendBloodline.png"),
      name: "Legend Bloodline",
    },
  ],
  [
    {
      img: importURL("CoupDeGrace.png"),
      name: "Coup De Grace",
    },
    {
      img: importURL("CutDown.png"),
      name: "Cut Down",
    },
    {
      img: importURL("LastStand.png"),
      name: "Last Stand",
    },
  ],
];

export const dominationTree: Rune[][] = [
  [
    {
      img: importURL("Electrocute.png"),
      name: "Electrocute",
    },
    {
      img: importURL("Predator.png"),
      name: "Predator",
    },
    {
      img: importURL("DarkHarvest.png"),
      name: "Dark Harvest",
    },
    {
      img: importURL("HailOfBlades.png"),
      name: "Hail Of Blades",
    },
  ],
  [
    {
      img: importURL("CheapShot.png"),
      name: "Cheap Shot",
    },
    {
      img: importURL("TasteOfBlood.png"),
      name: "Taste Of Blood",
    },
    {
      img: importURL("SuddenImpact.png"),
      name: "Sudden Impact",
    },
  ],
  [
    {
      img: importURL("ZombieWard.png"),
      name: "Zombie Ward",
    },
    {
      img: importURL("GhostPoro.png"),
      name: "Ghost Poro",
    },
    {
      img: importURL("EyeballCollection.png"),
      name: "Eyeball Collection",
    },
  ],
  [
    {
      img: importURL("TreasureHunter.png"),
      name: "Treasure Hunter",
    },
    {
      img: importURL("IngeniousHunter.png"),
      name: "Ingenious Hunter",
    },
    {
      img: importURL("RelentlessHunter.png"),
      name: "Relentless Hunter",
    },
    {
      img: importURL("UltimateHunter.png"),
      name: "Ultimate Hunter",
    },
  ],
];

export const sorceryTree: Rune[][] = [
  [
    {
      img: importURL("SummonAery.png"),
      name: "Summon Aery",
    },
    {
      img: importURL("ArcaneComet.png"),
      name: "Arcane Comet",
    },
    {
      img: importURL("PhaseRush.png"),
      name: "Phase Rush",
    },
  ],
  [
    {
      img: importURL("NullifyingOrb.png"),
      name: "Nullifying Orb",
    },
    {
      img: importURL("ManaflowBand.png"),
      name: "Manaflow Band",
    },
    {
      img: importURL("NimbusCloak.png"),
      name: "Nimbus Cloak",
    },
  ],
  [
    {
      img: importURL("Transcendence.png"),
      name: "Transcendence",
    },
    {
      img: importURL("Celerity.png"),
      name: "Celerity",
    },
    {
      img: importURL("AbsoluteFocus.png"),
      name: "Absolute Focus",
    },
  ],
  [
    {
      img: importURL("Scorch.png"),
      name: "Scorch",
    },
    {
      img: importURL("Waterwalking.png"),
      name: "Waterwalking",
    },
    {
      img: importURL("GatheringStorm.png"),
      name: "Gathering Storm",
    },
  ],
];

export const resolveTree: Rune[][] = [
  [
    {
      img: importURL("GraspOfTheUndying.png"),
      name: "Grasp Of The Undying",
    },
    {
      img: importURL("Aftershock.png"),
      name: "Aftershock",
    },
    {
      img: importURL("Guardian.png"),
      name: "Guardian",
    },
  ],
  [
    {
      img: importURL("Demolish.png"),
      name: "Demolish",
    },
    {
      img: importURL("FontOfLife.png"),
      name: "Font Of Life",
    },
    {
      img: importURL("ShieldBash.png"),
      name: "Shield Bash",
    },
  ],
  [
    {
      img: importURL("Conditioning.png"),
      name: "Conditioning",
    },
    {
      img: importURL("SecondWind.png"),
      name: "Second Wind",
    },
    {
      img: importURL("BonePlating.png"),
      name: "Bone Plating",
    },
  ],
  [
    {
      img: importURL("Overgrowth.png"),
      name: "Overgrowth",
    },
    {
      img: importURL("Revitalize.png"),
      name: "Revitalize",
    },
    {
      img: importURL("Unflinching.png"),
      name: "Unflinching",
    },
  ],
];

export const inspirationTree: Rune[][] = [
  [
    {
      img: importURL("GlacialAugment.png"),
      name: "Glacial Augment",
    },
    {
      img: importURL("UnsealedSpellbook.png"),
      name: "Unsealed Spellbook",
    },
    {
      img: importURL("FirstStrike.png"),
      name: "FirstStrike",
    },
  ],
  [
    {
      img: importURL("HextechFlashtraption.png"),
      name: "Hextech Flashtraption",
    },
    {
      img: importURL("MagicalFootwear.png"),
      name: "Magical Footwear",
    },
    {
      img: importURL("PerfectTiming.png"),
      name: "PerfectTiming",
    },
  ],
  [
    {
      img: importURL("FuturesMarket.png"),
      name: "Future's Market",
    },
    {
      img: importURL("MinionDematerializer.png"),
      name: "Minion Dematerializer",
    },
    {
      img: importURL("BiscuitDelivery.png"),
      name: "Biscuit Delivery",
    },
  ],
  [
    {
      img: importURL("CosmicInsight.png"),
      name: "Cosmic Insight",
    },
    {
      img: importURL("ApproachVelocity.png"),
      name: "Approach Velocity",
    },
    {
      img: importURL("TimeWarpTonic.png"),
      name: "Time Warp Tonic",
    },
  ],
];

export const shardTree: Rune[][] = [
  [
    {
      img: importURL("AdaptiveForce.png"),
      name: "Adaptive Force",
    },
    {
      img: importURL("AttackSpeed.png"),
      name: "Attack Speed",
    },
    {
      img: importURL("AbilityHaste.png"),
      name: "Ability Haste",
    },
  ],
  [
    {
      img: importURL("AdaptiveForce.png"),
      name: "Adaptive Force",
    },
    {
      img: importURL("Armor.png"),
      name: "Armor",
    },
    {
      img: importURL("MagicResist.png"),
      name: "Magic Resist",
    },
  ],
  [
    {
      img: importURL("Health.png"),
      name: "Health",
    },
    {
      img: importURL("Armor.png"),
      name: "Armor",
    },
    {
      img: importURL("MagicResist.png"),
      name: "Magic Resist",
    },
  ],
];

export const trees: { img: URL; name: Modes }[] = [
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

export const backgrounds = {
  Precision: importURL("BackgroundPrecision.webp"),
  Domination: importURL("BackgroundDomination.webp"),
  Sorcery: importURL("BackgroundSorcery.webp"),
  Resolve: importURL("BackgroundResolve.webp"),
  Inspiration: importURL("BackgroundInspiration.webp"),
};

export const runeTrees: Record<Modes, Rune[][]> = {
  Precision: precisionTree,
  Domination: dominationTree,
  Sorcery: sorceryTree,
  Resolve: resolveTree,
  Inspiration: inspirationTree,
};
