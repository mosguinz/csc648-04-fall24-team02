// import scenes here instead of main.ts
import TitleScene from './base/titleScreen';
import PreloadScene from './preload';
import MainGameScene from './base/mainGame';
import GameMenu from './ui/gameMenu';
import InventoryMenu from './ui/inventoryMenu';
import BuildMenu from './ui/build/buildMenu';
import CraftingMenu from './ui/craftingMenu';
import MinerPlacement from './ui/build/minerPlacement';
import Miner from '../hooks/miner';
import CrafterPlacement from './ui/build/crafterPlacement';
import Crafter from '../hooks/crafter';

export {
    TitleScene,
    PreloadScene,
    MainGameScene,
    GameMenu,
    InventoryMenu,
    BuildMenu,
    CraftingMenu,
    MinerPlacement,
    Miner,
    Crafter,
    CrafterPlacement,
};
