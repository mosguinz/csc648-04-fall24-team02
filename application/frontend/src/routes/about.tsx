import { Box, Divider, Flex, Heading, Icon, Text } from "@chakra-ui/react"
import { createFileRoute } from "@tanstack/react-router"
import { FaGamepad, FaUsers } from "react-icons/fa"
import TeamAccordion from "../components/Common/TeamAccordion" // Import TeamAccordion component
import { useFloatAnimation } from "../hooks/useFloatAnimation"
import { usePageMetadata } from "../hooks/usePageMetadata"

export const Route = createFileRoute("/about")({
  component: AboutPage,
})

function AboutPage(): JSX.Element {
  const floatAnimation = useFloatAnimation()
  usePageMetadata("About")

  return (
    <Box minHeight="100vh" py={10} px={4}>
      <Flex
        direction={{ base: "column", md: "row" }}
        alignItems="flex-start"
        justifyContent="center"
        gap={6}
      >
        {/* Team Members Box */}
        <Box
          bg="ui.eggshell"
          backdropFilter="blur(10px)"
          p={{ base: 6, md: 8 }}
          borderRadius="lg"
          boxShadow="2xl"
          textAlign="center"
          animation={floatAnimation}
          maxWidth={{ base: "100%", md: "45%" }}
          flex="1"
        >
          <Heading as="h1" size={{ base: "xl", md: "2xl" }} mb={4}>
            <Icon as={FaUsers} w={8} h={8} color="ui.green" mr={2} />
            Team Members
          </Heading>
          <Text fontSize={{ base: "lg", md: "xl" }} color="ui.orange" mb={4}>
            Section 04 — Team 02
          </Text>
          <Divider my={4} borderColor="ui.main" />
          <TeamAccordion />
        </Box>

        {/* Game Description Box */}
        <Box
          bg="#FFF5EE"
          backdropFilter="blur(10px)"
          p={{ base: 6, md: 8 }}
          borderRadius="lg"
          boxShadow="2xl"
          textAlign="center"
          animation={floatAnimation}
          maxWidth={{ base: "100%", md: "45%" }}
          flex="1"
        >
          <Heading as="h1" size={{ base: "xl", md: "2xl" }} mb={4}>
            <Icon as={FaGamepad} w={8} h={8} color="ui.green" mr={2} />
            How the Game Works
          </Heading>
          <Text fontSize={{ base: "lg", md: "xl" }} color="ui.orange" mb={4}>
            Brief Description
          </Text>
          <Divider my={4} borderColor="ui.main" />
          <Text fontSize="md" textAlign="left">
            Welcome to our game! In this game, you will collect resources and
            find out what you can build, overcome mysteries, and compete with
            others to unlock achievements and get the best drip. The game is
            designed to test your curiosity and provide endless fun. Get ready
            to click!
          </Text>
        </Box>
      </Flex>
    </Box>
  )
}

export default AboutPage
