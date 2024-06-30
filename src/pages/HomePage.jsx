import { Center, Box, Text, Button, VStack } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import Title from "../components/Title";

const HomePage = () => {
  return (
    <Center h="100vh">
      <Box>
        <Title />
        <VStack>
          <Text size="4xl">Simple Property Management System</Text>
          <Link to="/login">
            <Button>Sign In</Button>
          </Link>
        </VStack>
      </Box>
    </Center>
  );
};

export default HomePage;
