import { Button, Flex, Spinner } from "@chakra-ui/react"
import { Link } from "@tanstack/react-router" // Import Link for navigation
import UserMenu from "./UserMenu"
import useAuth from "../../hooks/useAuth"

const PublicNavbar = () => {
  const { isLoading } = useAuth()

  return (
    <>
      <Flex
        px={8}
        py={8}
        gap={4}
        justifyContent="space-between"
        alignItems="center"
      >
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
        </Flex>
        {isLoading ? (
          <Flex justify="center" align="center" height="100vh" width="full">
            <Spinner size="xl" color="ui.main" />
          </Flex>
        ) : (
          <UserMenu />
        )}
      </Flex>
    </>
  )
}

export default PublicNavbar
