import { createFileRoute } from "@tanstack/react-router"
import { useRef } from "react"
import { type IRefPhaserGame, PhaserGame } from "../game/PhaserGame"

export const Route = createFileRoute("/game")({
  component: GamePage,
})

function GamePage() {
  const phaserRef = useRef<IRefPhaserGame | null>(null)
  return (
    <>
      <div id="app">
        <PhaserGame ref={phaserRef} />
      </div>
    </>
  )
}
