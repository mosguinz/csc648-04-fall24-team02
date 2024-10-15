import {
    Container,
    Accordion,
    AccordionItem,
    AccordionButton,
    AccordionPanel,
    AccordionIcon,
    Box,
    Flex,
    Image,
    Heading,
    Text,
    Button,
    LinkOverlay,
    Link,
} from "@chakra-ui/react"
import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/about")({
    component: HomePage
})

const teamMembers = [
    {
        name: 'Katy Lam',
        role: 'Team Lead',
        bio: '',
        hiddenLink: '',
        image: 'assets/images/team-members/katy.png',
    },
    {
        name: 'Arizza Cristobal',
        role: 'Scrum Master',
        bio: 'Click my name!',
        hiddenLink: 'https://tracker.gg/valorant/profile/riot/rizzabears%23NA1/overview',
        image: 'assets/images/team-members/arizza.png',
    },
    {
        name: 'Kullathon “Mos” Sitthisarnwattanachai',
        role: 'Git Master',
        bio: 'I like Oreos and the United States Permanent Residence card.',
        hiddenLink: 'https://www.uscis.gov/green-card',
        image: 'assets/images/team-members/mos.png',
    },
    {
        name: 'Arjun Singh Gill',
        role: 'Back-end',
        bio: '',
        hiddenLink: '',
        image: 'assets/images/team-members/arjun.jpg',
    },
    {
        name: 'Matthew Aaron Weesner',
        role: 'Back-end',
        bio: '',
        hiddenLink: '',
        image: 'assets/images/team-members/matt.png',
    },
    {
        name: 'Niko Galedo',
        role: 'Front-end',
        bio: '',
        hiddenLink: '',
        image: 'assets/images/team-members/niko.png',
    },
    {
        name: 'Kevin Lam',
        role: 'Front-end',
        bio: 'erm what the sigma!',
        hiddenLink: 'assets/images/team-members/amogus.png',
        image: 'assets/images/team-members/kevin.png',
    },
];


const TeamAccordion = () => {
    return (
        <Accordion allowToggle>
            {teamMembers.map((member, index) => (
                <AccordionItem key={index}>
                    <AccordionButton>
                        <Box flex="1" textAlign="left">
                            {member.name}
                        </Box>
                        <Box flex="1" textAlign="right">
                            <Heading as='h6' size='xs'>{member.role}</Heading>
                        </Box>
                        <AccordionIcon />
                    </AccordionButton>

                    <AccordionPanel pb={4}>
                        <Flex direction={{ base: 'column', md: 'row' }} alignItems="center">
                            <Box flexShrink={0} mr={4}>
                                <Image
                                    boxSize="150px"
                                    objectFit="cover"
                                    src={member.image}
                                    alt={member.name}
                                    borderRadius="md"
                                />
                            </Box>

                            <Box flex="1">
                                <Heading as="h3" size="md" mb={2}>
                                    <Link href={member.hiddenLink || undefined}>
                                        {member.name}
                                    </Link>
                                </Heading>
                                <Text fontSize="sm" color="gray.500" mb={2}>
                                    {member.role}
                                </Text>
                                <Text mb={4}>{member.bio}</Text>
                            </Box>
                        </Flex>
                    </AccordionPanel>
                </AccordionItem>
            ))}
        </Accordion>
    );
};


function HomePage() {
    return (
        <>
            <Container mt={10}>
                <Heading as="h1" size="2xl" mb={4}>
                    Team Members
                </Heading>
                <Text fontSize="xl" mb={4} className="section-text">
                    Section 04 — Team 02
                </Text>
                <TeamAccordion />
            </Container>
        </>
    );

}