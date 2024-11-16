// PublicNavbar.jsx or PublicNavbar.tsx
import { Button, Flex, Spinner } from "@chakra-ui/react";
import { Link } from "@tanstack/react-router";
import useAuth from "../../hooks/useAuth";
import UserMenu from "./UserMenu";

const PublicNavbar = () => {
  const { isLoading } = useAuth();

  return (
    <Flex
      px={8}
      py={8}
      gap={4}
      justifyContent="space-between"
      alignItems="center"
    >
      {/* Navigation Links */}
      <Flex gap={4}>
        <Button
          as={Link}
          to="/"
          bg="ui.softGreen"
          color="white"
          size="lg" // Make button larger
          px={10} // Increase horizontal padding
          py={6} // Increase vertical padding
          _hover={{ bg: "ui.darkPink" }}
        >
          Home
        </Button>
        <Button
          as={Link}
          to="/about"
          bg="ui.eggPink"
          color="white"
          size="lg"
          px={10}
          py={6}
          _hover={{ bg: "ui.darkPink" }}
        >
          About
        </Button>
        <Button
          as={Link}
          to="/game"
          bg="#c3baf7"
          color="white"
          size="lg"
          px={10}
          py={6}
          _hover={{ bg: "ui.darkPink" }}
        >
          Game
        </Button>
      </Flex>
      {isLoading ? (
        <Flex justify="center" align="center" height="100vh" width="full">
          <Spinner size="xl" color="ui.main" />
        </Flex>
      ) : (
        <UserMenu />
      )}
    </Flex>
  );
};

export default PublicNavbar;
