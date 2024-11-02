import { Box, Divider, Heading, Text, Icon } from '@chakra-ui/react'
import { createFileRoute } from '@tanstack/react-router'
import { keyframes } from '@emotion/react'
import { FaGraduationCap } from 'react-icons/fa'

export const Route = createFileRoute('/')({
  component: HomePage,
})

// float animation
const float = keyframes`
  0% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-15px);
  }
  100% {
    transform: translateY(0);
  }
`

function HomePage(): JSX.Element {
  return (
    <>
      <Box
        bg="white"
        p={{ base: 6, md: 8 }}
        borderRadius="lg"
        border="2px solid"
        borderColor="#F48FB1"
        boxShadow="2xl"
        textAlign="center"
        animation={`${float} 6s ease-in-out infinite`}
        _hover={{
          transform: 'scale(1.02)',
        }}
        position="fixed"
        top="35%"
        left="40%"
        transform="translate(-50%, -50%)"
      >
        <Icon as={FaGraduationCap} w={12} h={12} color="#F48FB1" mb={4} />
        <Heading as="h1" size={{ base: 'xl', md: '2xl' }} mb={4}>
          Software Engineering Class SFSU
        </Heading>
        <Text fontSize={{ base: 'lg', md: 'xl' }} mb={4}>
          Section 04
        </Text>
        <Divider my={4} borderColor="#F48FB1" />
        <Text fontSize={{ base: 'md', md: 'lg' }}>Team 02</Text>
      </Box>
    </>
  )
}

export default HomePage
