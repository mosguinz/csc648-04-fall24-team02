export const GAME_WIDTH = 2048;
export const GAME_HEIGHT = 1152;
export const NSP = 32;

export interface Recipe {
  outputItem: string
  outputAmount: number
  ingredients: { item: string; amount: number }[]
}

export interface position {
  x: number,
  y: number
}

export const recipes: Recipe[] = [
  // Placeholder recipe for indexing to start at 1 (miner.ts, cannot pass id = 0 to most things)
  {
    outputItem: "",
    outputAmount: 0,
    ingredients: [{ item: "", amount: 0 }]
  },
  {
    outputItem: "4",
    outputAmount: 1,
    ingredients: [{ item: "1", amount: 1 }],
  },
  {
    outputItem: "5",
    outputAmount: 1,
    ingredients: [{ item: "2", amount: 1 }],
  },
  {
    outputItem: "6",
    outputAmount: 1,
    ingredients: [{ item: "3", amount: 3 }],
  },
  {
    outputItem: "7",
    outputAmount: 2,
    ingredients: [{ item: "4", amount: 3 }],
  },
  {
    outputItem: "8",
    outputAmount: 1,
    ingredients: [{ item: "5", amount: 1 }],
  },
  {
    outputItem: "9",
    outputAmount: 4,
    ingredients: [{ item: "6", amount: 1 }],
  }
]