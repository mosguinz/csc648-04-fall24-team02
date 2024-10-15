import { Button, Flex, Icon, useDisclosure } from "@chakra-ui/react";
import { FaPlus } from "react-icons/fa";
import { Link } from "@tanstack/react-router"; // Import Link for navigation
import type { ComponentType, ElementType } from "react";
import UserMenu from "./UserMenu";


const PublicNavbar = () => {
  return (
    <>
      <Flex px={8} py={8} gap={4} justifyContent="space-between" alignItems="center">
        {/* Navigation Links */}
        <Flex gap={4}>
          <Button as={Link} to="/" variant="link">
            Home
          </Button>
          <Button as={Link} to="/about" variant="link">
            About
          </Button>
          <Button as={Link} to="/game" variant="link">
            Game
          </Button>
          <Button as={Link} to="/login" variant="link">
            Login
          </Button>
          <UserMenu/>
        </Flex>
      </Flex>
    </>
  );
};

export default PublicNavbar;
