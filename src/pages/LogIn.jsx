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
import { Link, useNavigate } from "react-router-dom";

import Cookies from "universal-cookie";
import Title from "../components/Title/Title";
const cookies = new Cookies();

const LogIn = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = cookies.get("TOKEN");

    if (token) {
      navigate("/selectProperty");
    }
  }, []);

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
          cookies.set("TOKEN", response.data.auth.token);
          navigate("/selectProperty");
        })
        .catch((err) => {
          setFailedLogin(true);
          setFailedLoginMessage(err.response.data.message);
        })
        .finally(() => {
          setSubmitted(false);
        });
    }
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
      <AbsoluteCenter axis="both">
        <Box marginBottom="8px">
          <Title />
        </Box>
        <form onSubmit={handleLoginSubmission}>
          <VStack>
            <VStack>
              <FormControl isRequired isInvalid={emailError}>
                <FormLabel fontWeight={600}>Email</FormLabel>
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
                <FormLabel fontWeight={600}>Password</FormLabel>
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
                <Button variant="outline">Cancel</Button>
              </Link>
              <Button isLoading={submitted} type="submit" variant="solid">
                Sign In
              </Button>
            </HStack>
          </VStack>
        </form>
      </AbsoluteCenter>
    </Box>
  );
};

export default LogIn;
