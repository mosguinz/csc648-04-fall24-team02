import { useEffect, useRef } from "react";
import { Container, Text, Heading, Divider } from "@chakra-ui/react";
import { createFileRoute } from "@tanstack/react-router";
import StartGame from "../game/main";

// Create the route for the game
export const Route = createFileRoute("/game")({
    component: GamePage,
});

function GamePage() {
    // Create a reference to attach Phaser to
    const gameContainerRef = useRef<HTMLDivElement | null>(null);

    // Initialize the Phaser game in a useEffect hook
    useEffect(() => {
        let game: Phaser.Game | null = null;

        // Ensure the DOM element exists before starting the Phaser game
        if (gameContainerRef.current) {
            game = StartGame(gameContainerRef.current.id); // Start the Phaser game using the container ID
        }

        // Cleanup the game when the component unmounts
        return () => {
            if (game) {
                game.destroy(true); // Destroy the Phaser game instance to prevent memory leaks
            }
        };
    }, []);

    return (
        <>
            <Container mt={10}>
                <Heading as="h1" size="2xl" mb={4}>
                    Welcome to the Cookie Clicker Game
                </Heading>
                <Divider my={4} />
                
                {/* This is where the Phaser game will be attached */}
                <div id="game-container" ref={gameContainerRef} style={{ width: "100%", height: "720px", margin: "0 auto" }} />
            </Container>
        </>
    );
}