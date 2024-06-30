import {
  Box,
  FormControl,
  FormLabel,
  Input,
  VStack,
  AbsoluteCenter,
  HStack,
  Button,
  FormErrorMessage,
} from "@chakra-ui/react";
import { useState } from "react";
import { Link } from "react-router-dom";

const LogIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const handleEmailChange = (e) => {
    setEmailError(false);
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPasswordError(false);
    setPassword(e.target.value);
  };

  const handleLoginSubmission = () => {
    let formValid = true;
    if (!/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      setEmailError(true);
      formValid = false;
    }

    if (password.length < 8) {
      setPasswordError(true);
      formValid = false;
    }

    if (!formValid) return;
  };

  return (
    <Box h="100vh" w="100vw">
      <AbsoluteCenter axs="both">
        <HStack w="400px">
          <VStack>
            <VStack>
              <FormControl isRequired isInvalid={emailError}>
                <FormLabel>Email address</FormLabel>
                <Input
                  size="lg"
                  type="email"
                  onChange={handleEmailChange}
                  value={email}
                />
                <FormErrorMessage>
                  Please enter valid email address.
                </FormErrorMessage>
              </FormControl>
              <FormControl isRequired isInvalid={passwordError}>
                <FormLabel>Password</FormLabel>
                <Input
                  size="lg"
                  type="password"
                  onChange={handlePasswordChange}
                  value={password}
                />
                <FormErrorMessage>
                  Please enter valid password.
                </FormErrorMessage>
              </FormControl>
            </VStack>
            <HStack>
              <Link to="/">
                <Button variant="outlne">Cancel</Button>
              </Link>
              <Button variant="solid" onClick={handleLoginSubmission}>
                Sign In
              </Button>
            </HStack>
          </VStack>
        </HStack>
      </AbsoluteCenter>
    </Box>
  );
};

export default LogIn;
