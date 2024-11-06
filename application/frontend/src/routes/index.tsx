import { Box, Divider, Heading, Text, Icon } from '@chakra-ui/react'
import { createFileRoute } from '@tanstack/react-router'
import { useFloatAnimation } from '../hooks/useFloatAnimation';
import { FaGraduationCap } from 'react-icons/fa'

export const Route = createFileRoute('/')({
  component: HomePage,
})

function HomePage(): JSX.Element {
  const floatAnimation = useFloatAnimation(); // floating hook

  return (
    <>
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
        position="fixed"
        top="35%"
        left="40%"
        transform="translate(-50%, -50%)"
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
    </>
  );
}

export default HomePage;
