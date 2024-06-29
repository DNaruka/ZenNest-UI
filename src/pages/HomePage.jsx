import { Center, Box, Heading, Text, Button, VStack } from "@chakra-ui/react";
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <Center h="100vh">
      <Box>
        <Center marginBottom="8px">
          <Heading size="4xl">ZenNest</Heading>
        </Center>
        <VStack>
          <Text size="4xl" >Simple Property Management System</Text>
          <Link to="/login"><Button colorScheme="blue">Sign In</Button></Link>
        </VStack>
      </Box>
    </Center>
  );
};

export default HomePage;
