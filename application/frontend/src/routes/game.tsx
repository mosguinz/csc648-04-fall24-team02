import { createFileRoute } from "@tanstack/react-router";
import { useRef } from "react";
import { type IRefPhaserGame, PhaserGame } from "../game/PhaserGame";
import { usePageMetadata } from "../hooks/usePageMetadata";

export const Route = createFileRoute("/game")({
  component: GamePage,
});

function GamePage() {
  const phaserRef = useRef<IRefPhaserGame | null>(null);

  // Use the metadata hook to set the page title and description
  usePageMetadata(
    "Game",
    "Dive into the exciting world of Brick and Mortar's game mode and start playing now!",
  );

  return (
    <>
      <div id="app">
        <PhaserGame ref={phaserRef} />
      </div>
    </>
  );
}
