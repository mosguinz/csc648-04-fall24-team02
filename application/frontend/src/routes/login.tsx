import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons"
import {
  Box,
  Button,
  Container,
  FormControl,
  FormErrorMessage,
  Heading,
  Icon,
  Image,
  Input,
  InputGroup,
  InputRightElement,
  Link,
  Text,
  useBoolean,
} from "@chakra-ui/react"
import {
  Link as RouterLink,
  createFileRoute,
  redirect,
  useNavigate,
} from "@tanstack/react-router"
import { type SubmitHandler, useForm } from "react-hook-form"
import { FaSignInAlt } from "react-icons/fa"
import Logo from "/assets/page_images/login-image.png"
import type { Body_login_login_access_token as AccessToken } from "../client"
import useAuth, { isLoggedIn } from "../hooks/useAuth"
import { emailPattern } from "../utils"
import { useFloatAnimation } from "../hooks/useFloatAnimation";

export const Route = createFileRoute("/login")({
  component: Login,
  beforeLoad: async () => {
    if (isLoggedIn()) {
      throw redirect({
        to: "/dashboard",
      })
    }
  },
})

function Login() {
  const [show, setShow] = useBoolean()
  const { loginMutation, error, resetError } = useAuth()
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<AccessToken>({
    mode: "onBlur",
    criteriaMode: "all",
    defaultValues: {
      username: "",
      password: "",
    },
  })
  const navigate = useNavigate()
  const floatAnimation = useFloatAnimation();
  const onSubmit: SubmitHandler<AccessToken> = async (data) => {
    if (isSubmitting) return

    resetError()

    try {
      await loginMutation.mutateAsync(data)
      navigate({ to: "/dashboard" })
    } catch {
      // error is handled by useAuth hook
    }
  }

  return (
    <Container
      h="100vh"
      maxW="md"
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <Box
        as="form"
        onSubmit={handleSubmit(onSubmit)}
        bg="whiteAlpha.900"
        backdropFilter="blur(10px)"
        p={{ base: 6, md: 8 }}
        borderRadius="lg"
        boxShadow="2xl"
        textAlign="center"
        animation={floatAnimation} // Apply the floating animation
        maxWidth="400px"
        w="100%"
      >
        <Heading as="h1" size="xl" mb={4}>
          <Icon as={FaSignInAlt} w={6} h={6} mr={2} />
          Login
        </Heading>
        <Image src={Logo} alt="login" height="auto" maxW="200px" mb={4} mx="auto" />

        <FormControl id="username" isInvalid={!!errors.username || !!error} mb={4}>
          <Input
            id="username"
            {...register("username", {
              required: "Username is required",
              pattern: emailPattern,
            })}
            placeholder="Email"
            type="email"
            required
          />
          {errors.username && <FormErrorMessage>{errors.username.message}</FormErrorMessage>}
        </FormControl>

        <FormControl id="password" isInvalid={!!error} mb={4}>
          <InputGroup>
            <Input
              {...register("password", {
                required: "Password is required",
              })}
              type={show ? "text" : "password"}
              placeholder="Password"
              required
            />
            <InputRightElement color="ui.dark" _hover={{ cursor: "pointer" }}>
              <Icon
                as={show ? ViewOffIcon : ViewIcon}
                onClick={setShow.toggle}
                aria-label={show ? "Hide password" : "Show password"}
              />
            </InputRightElement>
          </InputGroup>
          {error && <FormErrorMessage>{error}</FormErrorMessage>}
        </FormControl>

        <Link as={RouterLink} to="/recover-password" color="blue.500" mb={4} display="block">
          Forgot password?
        </Link>

        <Button variant="primary" type="submit" isLoading={isSubmitting} mb={4}>
          Log In
        </Button>

        <Text>
          Don't have an account?{" "}
          <Link as={RouterLink} to="/signup" color="blue.500">
            Sign up
          </Link>
        </Text>
      </Box>
    </Container>
  );
}

export default Login;
