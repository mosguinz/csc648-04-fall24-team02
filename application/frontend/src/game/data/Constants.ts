export interface Recipe {
  outputItem: string
  outputAmount: number
  ingredients: { item: string; amount: number }[]
}

export const recipes: Recipe[] = [
  {
    outputItem: "iron_ingot",
    outputAmount: 1,
    ingredients: [{ item: "iron_ore", amount: 1 }],
  },
  {
    outputItem: "copper_ingot",
    outputAmount: 1,
    ingredients: [{ item: "copper_ore", amount: 1 }],
  },
  {
    outputItem: "concrete",
    outputAmount: 1,
    ingredients: [{ item: "rock", amount: 3 }],
  },
  {
    outputItem: "iron_plate",
    outputAmount: 2,
    ingredients: [{ item: "iron_ingot", amount: 3 }],
  },
  {
    outputItem: "iron_rod",
    outputAmount: 1,
    ingredients: [{ item: "iron_ingot", amount: 1 }],
  },
  {
    outputItem: "screws",
    outputAmount: 4,
    ingredients: [{ item: "iron_rod", amount: 1 }],
  },
  {
    outputItem: "copper_plate",
    outputAmount: 1,
    ingredients: [{ item: "copper_ingot", amount: 2 }],
  },
  {
    outputItem: "wire",
    outputAmount: 2,
    ingredients: [{ item: "copper_ingot", amount: 1 }],
  },
  {
    outputItem: "cable",
    outputAmount: 1,
    ingredients: [{ item: "wire", amount: 2 }],
  },
  // { outputItem: 'reinforced_iron_plate', outputAmount: 5, ingredients: [{ item: 'screws', amount: 60 }, { item: 'iron_plate', amount: 30 }] }
]

export const ResourceMap: {
  [key: integer] : string
} = {
  1: "iron_ore",
  2: "copper_ore",
  3: "rock",
  4: "iron_ingot",
  5: "copper_ingot",
  6: "concrete",
  7: "iron_plate",
  8: "copper_plate",
  9: "iron_rod",
  10: "screws",
  11: "wire",
  12: "cable"
}

export const NodePositions: {
  [key: string]: { x: number; y: number }
} = {
  iron: { x: 374, y: 247 },
  copper: { x: 807, y: 312 },
  rock: { x: 432, y: 435 },
}
