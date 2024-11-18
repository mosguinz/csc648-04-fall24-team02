import { Box, Divider, Heading, Text, VStack, Icon } from '@chakra-ui/react';
import { createFileRoute } from '@tanstack/react-router';
import { FaCrown, FaUserAlt } from 'react-icons/fa';
import { useFloatAnimation } from '../hooks/useFloatAnimation';
import { usePageMetadata } from "../hooks/usePageMetadata";
export const Route = createFileRoute('/leaderboard')({
  component: LeaderBoardPage,
});

function LeaderBoardPage(): JSX.Element {
  const floatAnimation = useFloatAnimation(); // Floating animation hook
    usePageMetadata(
    "Leaderboard",
    "checkout the leaderboard!"
  );
  // Mock leaderboard data
  // will need to come up with template to pull infor from backend and update based on who
  // holds the most resources currently as a place holder before we come up with a point system
  const leaderboardData = [
    { rank: 1, name: 'Player1', score: 1500 },
    { rank: 2, name: 'Player2', score: 1200 },
    { rank: 3, name: 'Player3', score: 1000 },
    { rank: 4, name: 'Player4', score: 800 },
    { rank: 5, name: 'Player5', score: 600 },
  ];

  return (
    <Box minHeight="100vh" py={10} px={4}>
      <Box
        bg="ui.eggshell"
        p={{ base: 6, md: 8 }}
        borderRadius="lg"
        border="2px solid"
        borderColor="ui.main"
        boxShadow="2xl"
        textAlign="center"
        animation={floatAnimation}
        maxW={{ base: '90%', md: '70%', lg: '50%' }}
        mx="auto"
      >
        <Icon as={FaCrown} w={12} h={12} color="ui.green" mb={4} />
        <Heading as="h1" size={{ base: 'xl', md: '2xl' }} mb={4}>
          Leaderboards
        </Heading>
        <Text fontSize={{ base: 'lg', md: 'xl' }} color="ui.orange" mb={4}>
          Top Players of the Week
        </Text>
        <Divider my={4} borderColor="ui.main" />

        <VStack spacing={4} align="stretch">
          {leaderboardData.map((player) => (
            <Box
              key={player.rank}
              bg="ui.secondary"
              p={4}
              borderRadius="md"
              boxShadow="md"
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              _hover={{
                transform: 'scale(1.02)',
                boxShadow: '0px 4px 15px rgba(165, 208, 97, 0.4)',
              }}
            >
              <Text fontSize="lg" fontWeight="bold" color="ui.green">
                #{player.rank}
              </Text>
              <Box display="flex" alignItems="center" gap={2}>
                <Icon as={FaUserAlt} color="ui.darkPink" />
                <Text fontSize="md" fontWeight="bold" color="ui.darkPink">
                  {player.name}
                </Text>
              </Box>
              <Text fontSize="md" color="ui.purple">
                {player.score} pts
              </Text>
            </Box>
          ))}
        </VStack>
      </Box>
    </Box>
  );
}

export default LeaderBoardPage;
