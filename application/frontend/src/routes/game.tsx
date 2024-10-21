import { Container, Text, Heading, Divider } from "@chakra-ui/react"
import { createFileRoute } from "@tanstack/react-router"
import { IRefPhaserGame, PhaserGame } from '../game/PhaserGame'
import { useRef } from 'react';

export const Route = createFileRoute("/game")({
    component: GamePage
})

function GamePage() {
    const phaserRef = useRef<IRefPhaserGame | null>(null);
    return (
        <>
            <div id="app">
                <PhaserGame ref={phaserRef} />
            </div>
        </>
    );

}