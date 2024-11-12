import { Box, Divider, Heading, Text, Icon, VStack } from '@chakra-ui/react';
import { createFileRoute } from '@tanstack/react-router';
import { useFloatAnimation } from '../hooks/useFloatAnimation';
import { FaGraduationCap } from 'react-icons/fa';

export const Route = createFileRoute('/')({
  component: HomePage,
});

function HomePage(): JSX.Element {
  const floatAnimation = useFloatAnimation(); // floating hook

  return (
    <>
      {/* Main Centered Content */}
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        height="100vh" // fixing the off-center on auto align
        flexDirection="column"
        gap={8} // Spacing between elements
      >
        {/* Main Box for Class Information */}
        <Box
          bg="ui.eggshell"
          p={{ base: 6, md: 8 }}
          borderRadius="lg"
          border="2px solid"
          borderColor="ui.main"
          boxShadow="2xl"
          textAlign="center"
          animation={floatAnimation}
          _hover={{
            transform: 'scale(1.02)',
          }}
          maxW="600px" // Fixed width to ensure consistency
          width="100%"
        >
          <Icon as={FaGraduationCap} w={12} h={12} color="ui.green" mb={4} />
          <Heading as="h1" size={{ base: 'xl', md: '2xl' }} mb={4}>
            Software Engineering Class SFSU
          </Heading>
          <Text fontSize={{ base: 'lg', md: 'xl' }} mb={4} color="ui.orange">
            Section 04
          </Text>
          <Divider my={4} borderColor="ui.main" />
          <Text fontSize={{ base: 'md', md: 'lg' }} color="ui.purple">
            Team 02
          </Text>
        </Box>

        {/* Additional Boxes: Achievements and Leaderboards */}
        <VStack spacing={6}>
          <Box
            bg="ui.eggshell"
            p={{ base: 6, md: 8 }}
            borderRadius="lg"
            border="2px solid"
            borderColor="ui.main"
            boxShadow="2xl"
            textAlign="center"
            animation={floatAnimation}
            _hover={{
              transform: 'scale(1.02)',
            }}
            maxW="600px" // Fixed width to match the main box
            width="160%"
          >
            <Heading as="h2" size={{ base: 'lg', md: 'xl' }} color="ui.green" mb={4}>
              Achievements
            </Heading>
            <Text color="ui.purple">Track your achievements and milestones in the game!</Text>
          </Box>

          <Box
            bg="ui.eggshell"
            p={{ base: 6, md: 8 }}
            borderRadius="lg"
            border="2px solid"
            borderColor="ui.main"
            boxShadow="2xl"
            textAlign="center"
            animation={floatAnimation}
            _hover={{
              transform: 'scale(1.02)',
            }}
            maxW="600px" // Fixed width to match the main box
            width="160%"
          >
            <Heading as="h2" size={{ base: 'lg', md: 'xl' }} color="ui.green" mb={4}>
              Leaderboards
            </Heading>
            <Text color="ui.purple">See where you stand among other players!</Text>
          </Box>
        </VStack>
      </Box>
    </>
  );
}

export default HomePage;
