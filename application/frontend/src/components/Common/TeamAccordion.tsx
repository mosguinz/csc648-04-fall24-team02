import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Flex,
  Heading,
  Image,
  Link,
  Text,
} from "@chakra-ui/react";
import { useTeamAccordion } from "../../hooks/useTeamAccordion";

const TeamAccordion = () => {
  const teamMembers = useTeamAccordion(); // Retrieve team members from the hook

  return (
    <Accordion allowToggle>
      {teamMembers.map((member, index) => (
        <AccordionItem key={index} border="none">
          <h2>
            <AccordionButton
              _expanded={{ bg: "ui.main", color: "white" }}
              _hover={{ bg: "ui.main", color: "white" }}
            >
              <Box flex="1" textAlign="left" color="ui.purple">
                {member.name}
              </Box>
              <Box flex="1" textAlign="right">
                <Text fontSize="sm">{member.role}</Text>
              </Box>
              <AccordionIcon color="white" />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4}>
            <Flex direction={{ base: "column", md: "row" }} alignItems="center">
              <Box flexShrink={0} mr={4} mb={{ base: 4, md: 0 }}>
                <Image
                  boxSize="150px"
                  objectFit="cover"
                  src={member.image}
                  alt={member.name}
                  borderRadius="md"
                />
              </Box>
              <Box flex="1" textAlign={{ base: "center", md: "left" }}>
                <Heading as="h3" size="md" mb={2}>
                  <Link href={member.hiddenLink || undefined}>{member.name}</Link>
                </Heading>
                <Text fontSize="sm" color="ui.orange" mb={2}>
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

export default TeamAccordion;
