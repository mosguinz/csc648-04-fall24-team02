// PublicNavbar.jsx or PublicNavbar.tsx
import { Button, Flex, Spinner } from "@chakra-ui/react"
import { Link } from "@tanstack/react-router"
import useAuth from "../../hooks/useAuth"
import UserMenu from "./UserMenu"

const PublicNavbar = () => {
  const { isLoading } = useAuth()

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
          bg="#a5d061"
          color="white"
          _hover={{ bg: "ui.dark" }}
        >
          Home
        </Button>
        <Button
          as={Link}
          to="/about"
          bg="#f7bd52"
          color="white"
          _hover={{ bg: "ui.dark" }}
        >
          About
        </Button>
        <Button
          as={Link}
          to="/game"
          bg=" #c3baf7"
          color="white"
          _hover={{ bg: "ui.dark" }}
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
  )
}

export default PublicNavbar