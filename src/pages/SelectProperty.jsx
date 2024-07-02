import axios from "axios";
import {
  AbsoluteCenter,
  Box,
  Button,
  Card,
  CardBody,
  Center,
  HStack,
  Heading,
  Image,
  Text,
  VStack,
} from "@chakra-ui/react";
import Title from "../components/Title/Title";
import buildingImage from "../assets/buildingImage.png";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { motion } from "framer-motion";
const MotionCard = motion(Card);

import Cookies from "universal-cookie";
import SignOutButton from "../components/SignOutButton/SignOutButton";
const cookies = new Cookies();

const SelectProperty = () => {
  const [listOfProperties, setListOfProperties] = useState([]);
  const [isAuthorized, setIsAuthorized] = useState(true);
  const [name, setName] = useState("");

  useEffect(() => {
    const token = cookies.get("TOKEN");
    const config = {
      method: "get",
      url: import.meta.env.VITE_BASEURL+"/property",
      headers: {
        Authorization: "Bearer " + token,
      },
    };

    axios
      .request(config)
      .then((response) => {
        setListOfProperties(response.data.list);
        setName(response.data.name);
      })
      .catch(() => {
        setIsAuthorized(false);
      });
  }, []);

  const navigate = useNavigate();
  const addPropretyHandler = () => {
    navigate("/addProperty");
  };

  return (
    <Box marginTop="24px" h="80vh" w={{ base: "90vw", sm: "60vw" }}>
      <AbsoluteCenter axis="horizontal">
        <Title />
        <Center>
          {isAuthorized ? (
            <VStack marginTop="32px" h="80%" w="100%">
              <Heading size={{ base: "lg", sm: "xl" }}>Hello {name},</Heading>
              <VStack mt="24px" spacing={4}>
                {listOfProperties.map((property, key) => (
                  <Link to={`/property/${property["property_id"]}`} key={key}>
                    <MotionCard
                      direction="column"
                      overflow="hidden"
                      variant="outline"
                      size="lg"
                      width={{ base: "350px", sm: "500px" }}
                      whileHover={{
                        scale: 1.1,
                        border: "solid 2px",
                        borderColor: "#008080",
                      }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <HStack>
                        <Image
                          src={buildingImage}
                          boxSize={{ base: "50px", sm: "100px" }}
                        />
                        <VStack>
                          <CardBody>
                            <Box
                              style={{
                                whiteSpace: "nowrap",
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                              }}
                            >
                              <Heading
                                size={{ base: "sm", sm: "md" }}
                                width="240px"
                              >
                                {property.name}
                              </Heading>
                            </Box>
                            {property.location.split("\n").map((line, key) => (
                              <Text key={key}>{line}</Text>
                            ))}
                          </CardBody>
                        </VStack>
                      </HStack>
                    </MotionCard>
                  </Link>
                ))}
              </VStack>
              <Button
                variant="solid"
                colorScheme="teal"
                width="100%"
                onClick={addPropretyHandler}
              >
                Add Property
              </Button>
              <SignOutButton />
            </VStack>
          ) : (
            <VStack marginTop="32px" h="80%" w="100%" spacing={8}>
              <Heading size="xl">User Unauthorized.</Heading>

              <HStack>
                <Link to="/">
                  <Button variant="outline">Cancel</Button>
                </Link>
                <Link to="/login">
                  <Button colorScheme="teal" variant="solid">
                    Sign In
                  </Button>
                </Link>
              </HStack>
            </VStack>
          )}
        </Center>
      </AbsoluteCenter>
    </Box>
  );
};

export default SelectProperty;
