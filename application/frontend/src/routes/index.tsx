import { Container, Text, Heading, Divider } from "@chakra-ui/react"
import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/")({
    component: HomePage
})

function HomePage() {
    return (
        <>
            <Container mt={10}>
                <Heading as="h1" size="2xl" mb={4}>
                    Software Engineering Class SFSU
                </Heading>
                <Text fontSize="xl" mb={4} className="section-text">
                    Section 04
                </Text>
                <Divider my={4} />
                <Text fontSize="lg" className="team-text">
                    Team 02
                </Text>
            </Container>
        </>
    );

}