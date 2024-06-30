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
  Text,
} from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const LogIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [failedLogin, setFailedLogin] = useState(false);

  const [failedLoginMessage, setFailedLoginMessage] = useState("");

  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  useEffect(() => {
    if (submitted) {
      axios
        .post("http://localhost:3000/login", { email, password })
        .then((response) => {
          console.log("Success!");
        })
        .catch((err) => {
          setFailedLogin(true);
          setFailedLoginMessage(err.response.data.message);
        });
    }
    setSubmitted(false);
  }, [submitted]);

  const handleEmailChange = (e) => {
    setEmailError(false);
    setFailedLogin(false);
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPasswordError(false);
    setFailedLogin(false);
    setPassword(e.target.value);
  };

  const handleLoginSubmission = (e) => {
    e.preventDefault();
    let formValid = true;
    if (!/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      setEmailError(true);
      formValid = false;
    }

    if (password.trim().length < 8) {
      setPasswordError(true);
      formValid = false;
    }

    if (!formValid) return;
    setSubmitted(true);
  };

  return (
    <Box h="100vh" w="100vw">
      <AbsoluteCenter axs="both">
        <HStack w="400px">
          <form onSubmit={handleLoginSubmission}>
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
                {failedLogin && <Text align="center">{failedLoginMessage}</Text>}
              </VStack>
              <HStack>
                <Link to="/">
                  <Button variant="outlne">Cancel</Button>
                </Link>
                <Button isLoading={submitted} type="submit" variant="solid">
                  Sign In
                </Button>
              </HStack>
            </VStack>
          </form>
        </HStack>
      </AbsoluteCenter>
    </Box>
  );
};

export default LogIn;
