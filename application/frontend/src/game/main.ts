import { Game } from "phaser";
import { config } from "./config";

const StartGame = (parent: string) => {
  const newGame = new Game({ ...config, parent });
  return newGame;
};

export default StartGame;
