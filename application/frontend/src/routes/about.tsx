
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Divider,
  Flex,
  Heading,
  Icon,
  Image,
  Link,
  Text,
} from '@chakra-ui/react'
import { createFileRoute } from '@tanstack/react-router'
import { keyframes } from '@emotion/react'
import { FaUsers } from 'react-icons/fa'

export const Route = createFileRoute('/about')({
  component: AboutPage,
})

const float = keyframes`
  0% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
  100% {
    transform: translateY(0);
  }
`

const teamMembers = [
  // Include your team members here
  {
    name: "Katy Lam",
    role: "Team Lead",
    bio: "",
    hiddenLink: "",
    image: "assets/images/team-members/katy.png",

  },
  {
    name: "Arizza Cristobal",
    role: "Scrum Master",
    bio: "Click my name!",
    hiddenLink:
      "https://tracker.gg/valorant/profile/riot/rizzabears%23NA1/overview",
    image: "assets/images/team-members/arizza.png",
  },
  {
    name: "Kullathon “Mos” Sitthisarnwattanachai",
    role: "Git Master",
    bio: "I like Oreos and the United States Permanent Residence card.",
    hiddenLink: "https://www.uscis.gov/green-card",
    image: "assets/images/team-members/mos.png",
  },
  {
    name: "Arjun Singh Gill",
    role: "Back-end",
    bio: "",
    hiddenLink: "",
    image: "assets/images/team-members/arjun.jpg",
  },
  {
    name: "Matthew Weesner",
    role: "Back-end",
    bio: "",
    hiddenLink: "",
    image: "assets/images/team-members/matt.png",
  },
  {
    name: "Niko Galedo",
    role: "Front-end",
    bio: "",
    hiddenLink: "",
    image: "assets/images/team-members/niko.png",
  },
  {
    name: "Kevin Lam",
    role: "Front-end",
    bio: "erm what the sigma!",
    hiddenLink: "assets/images/team-members/amogus.png",
    image: "assets/images/team-members/kevin.png",
  },
]

const TeamAccordion = () => {
  return (
    <Accordion allowToggle>
      {teamMembers.map((member, index) => (
        <AccordionItem key={index} border="none">
          <h2>
            <AccordionButton
              _expanded={{ bg: '#F48FB1', color: 'white' }}
              _hover={{ bg: '#F48FB1', color: 'white' }}
            >
              <Box flex="1" textAlign="left" color="#c3baf7">
                {member.name}
              </Box>
              <Box flex="1" textAlign="right">
                <Text fontSize="sm">{member.role}</Text>
              </Box>
              <AccordionIcon color="white" />
            </AccordionButton>
          </h2>

          <AccordionPanel pb={4}>
            <Flex
              direction={{ base: 'column', md: 'row' }}
              alignItems="center"
            >
              <Box flexShrink={0} mr={4} mb={{ base: 4, md: 0 }}>
                <Image
                  boxSize="150px"
                  objectFit="cover"
                  src={member.image}
                  alt={member.name}
                  borderRadius="md"
                />
              </Box>

              <Box flex="1" textAlign={{ base: 'center', md: 'left' }}>
                <Heading as="h3" size="md" mb={2}>
                  <Link href={member.hiddenLink || undefined}>
                    {member.name}
                  </Link>
                </Heading>
                <Text fontSize="sm" color="#f7bd52" mb={2}>
                  {member.role}
                </Text>
                <Text mb={4}>{member.bio}</Text>
              </Box>
            </Flex>
          </AccordionPanel>
        </AccordionItem>
      ))}
    </Accordion>
  )
}

function AboutPage(): JSX.Element {
  return (
    <Box
      minHeight="100vh"
      py={10}
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <Box
        bg="#FFF5EE"
        backdropFilter="blur(10px)"
        mx="auto"
        p={{ base: 6, md: 8 }}
        borderRadius="lg"
        boxShadow="2xl"
        textAlign="center"
        animation={`${float} 6s ease-in-out infinite`}
        maxWidth={{ base: '90%', md: '800px' }}
      >
        <Heading as="h1" size={{ base: 'xl', md: '2xl' }} mb={4}>
          <Icon as={FaUsers} w={8} h={8} color="#a5d061" mr={2} />
          Team Members
        </Heading>
        <Text fontSize={{ base: 'lg', md: 'xl' }} color="#f7bd52" mb={4}>
          Section 04 — Team 02
        </Text>
        <Divider my={4} borderColor="#F48FB1" />
        <TeamAccordion />
      </Box>
    </Box>
  )
}

export default AboutPage
