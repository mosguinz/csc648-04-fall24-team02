
export interface Crafter {
  // recipe the crafter is building
  recipe_id: number
}
export interface Assembler {
  // recipe the assembler is building
  recipe_id: number
}

export interface gameData {
  inventory: {
    // resource_id and count of resource
    id: number
  },

  miner: {
    // key: node, value: number of miners on the node
    node: number
  },

  // list of crafters
  crafter: Crafter[]
  // list of assemblers
  assembler: Assembler[]
}
