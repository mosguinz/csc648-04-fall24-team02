import { Container, Text, Heading, Divider } from "@chakra-ui/react"
import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/game")({
    component: GamePage
})

function GamePage() {
    return (
        <>
            <Container mt={10}>
                <Heading as="h1" size="2xl" mb={4}>
                    You just lost the game
                </Heading>
                <Text fontSize="xl" mb={4} className="section-text">
                    It's coming soon!
                </Text>
                <Divider my={4} />
                <Text fontSize="lg" className="team-text">
                    Team 02
                </Text>
            </Container>
        </>
    );

}