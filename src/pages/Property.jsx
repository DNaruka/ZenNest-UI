import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";

import {
  AbsoluteCenter,
  Button,
  Heading,
  VStack,
  Box,
  Input,
  FormControl,
  FormLabel,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Stack,
} from "@chakra-ui/react";
import SignOutButton from "../components/SignOutButton/SignOutButton";
import Title from "../components/Title/Title";

import { motion } from "framer-motion";
const MotionInput = motion(Input);
const MotionNumberInput = motion(NumberInput);

import Cookies from "universal-cookie";
const cookies = new Cookies();

const Property = () => {
  const params = useParams();
  const propertyId = params.propertyId;

  const [name, setName] = useState();
  const [invalidName, setInvalidName] = useState(false);
  const [postalCode, setPostalCode] = useState();
  const [invalidPostalCode, setInvalidPostalCode] = useState(false);
  const [floors, setFloors] = useState();
  const [invalidFloors, setInvalidFloors] = useState(false);
  const [addressLine1, setAddressLine1] = useState();
  const [invalidAd1, setInvalidAd1] = useState(false);
  const [addressLine2, setAddressLine2] = useState();

  const [isAuthorized, setIsAuthorized] = useState(true);
  const [isChanged, setIsChanged] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [deleted, setDeleted] = useState(false);
  const [ogData, setOgData] = useState([]);

  const navigate = useNavigate();

  const token = cookies.get("TOKEN");
  const config = {
    url: "http://localhost:3000/property/" + propertyId,
    headers: {
      Authorization: "Bearer " + token,
    },
  };
  useEffect(() => {
    axios
      .request({ ...config, method: "get" })
      .then((response) => {
        const data = response.data;
        setOgData([data.name, data.postalCode, data.maxFloors, data.location]);
      })
      .catch(() => {
        setIsAuthorized(false);
      });
  }, [propertyId]);

  useEffect(() => {
    if (ogData.length > 0) {
      setName(ogData[0]);
      setPostalCode(ogData[1]);
      setFloors(ogData[2]);
      const [ad1, ad2] = ogData[3].split("\n");
      setAddressLine1(ad1);
      setAddressLine2(ad2);
    }
  }, [ogData]);

  useEffect(() => {
    setIsChanged(true);
    if (ogData[0] !== name) return;
    if (ogData[1] !== postalCode) return;
    if (ogData[2] !== floors) return;
    if (ogData[3] !== addressLine1 + "\n" + addressLine2) return;

    setIsChanged(false);
  }, [ogData, name, postalCode, floors, addressLine1, addressLine2]);

  useEffect(() => {
    if (submitted) {
      const data = {
        name,
        postalCode: postalCode,
        maxFloors: floors,
        location: addressLine1 + "\n" + addressLine2,
      };
      axios
        .request({ ...config, method: "put", data })
        .then((response) => {
          const data = response.data;
          setOgData([
            data.name,
            data.postalCode,
            data.maxFloors,
            data.location,
          ]);
        })
        .catch((err) => {
          //   setIsAuthorized(false);
          console.log(err);
        })
        .finally(() => {
          setSubmitted(false);
        });
    }
  }, [submitted]);

  const nameChangeHandler = (e) => {
    setName(e.target.value);
    setInvalidName(false);
  };

  const postalCodeChangeHandler = (e) => {
    setPostalCode(e.target.value);
    setInvalidPostalCode(false);
  };

  const floorChangeHandler = (e) => {
    setFloors(e);
    setInvalidFloors(false);
  };

  const ad1ChangeHandler = (e) => {
    setAddressLine1(e.target.value);
    setInvalidAd1(false);
  };

  const ad2ChangeHandler = (e) => {
    setAddressLine2(e.target.value);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    let formValid = true;
    if (name.length < 4) {
      setInvalidName(true);
      formValid = false;
    }
    if (addressLine1.length < 4) {
      setInvalidAd1(true);
      formValid = false;
    }
    if (postalCode.length < 4) {
      setInvalidPostalCode(true);
      formValid = false;
    }
    if (!Number.isInteger(+floors) || floors < 3 || floors > 90) {
      setInvalidFloors(true);
      formValid = false;
    }
    if (formValid) setSubmitted(true);
  };

  useEffect(() => {
    if (deleted) {
      axios
        .request({ ...config, method: "delete" })
        .then(() => {
          setDeleted(false);
          navigate("/selectProperty");
        })
        .catch((err) => {
          setDeleted(false);
          console.log(err);
        });
    }
  }, [deleted]);

  const deleteHandler = () => {
    setDeleted(true);
  };
  return (
    <Box marginTop="24px" h="80vh" w={{ base: "90vw", sm: "60vw" }}>
      <AbsoluteCenter axis="horizontal" flexDirection="column">
        <Box mx="24px">
          <Title />
        </Box>

        {isAuthorized ? (
          <Box mt="24px">
            <form onSubmit={submitHandler}>
              <VStack mx="auto" spacing={8}>
                <FormControl isRequired isInvalid={invalidName}>
                  <MotionInput
                    fontSize={{ base: "3xl", sm: "72px" }}
                    height="auto"
                    width="auto"
                    fontWeight="900"
                    value={name}
                    textAlign="center"
                    border="none"
                    onChange={nameChangeHandler}
                    whileFocus={{ scale: 1.1 }}
                    whileHover={{ scale: 1.1 }}
                  />
                </FormControl>
                <Stack
                  direction={{ base: "column", sm: "row" }}
                  spacing={{ base: 4, sm: 8 }}
                  width={{ base: "auto", sm: "470px" }}
                >
                  <FormControl isRequired isInvalid={invalidFloors}>
                    <FormLabel>Floors</FormLabel>
                    <MotionNumberInput
                      allowMouseWheel
                      defaultValue={15}
                      min={3}
                      max={99}
                      value={floors}
                      onChange={floorChangeHandler}
                      whileFocus={{ scale: 1.2 }}
                      whileHover={{ scale: 1.2 }}
                      whileTap={{ scale: 1.2 }}
                      size={{ base: "lg", sm: "md" }}
                    >
                      <NumberInputField />
                      <NumberInputStepper>
                        <NumberIncrementStepper />
                        <NumberDecrementStepper />
                      </NumberInputStepper>
                    </MotionNumberInput>
                  </FormControl>
                  <FormControl isRequired isInvalid={invalidPostalCode}>
                    <FormLabel>Postal Code</FormLabel>
                    <MotionInput
                      onChange={postalCodeChangeHandler}
                      value={postalCode}
                      whileFocus={{ scale: 1.2 }}
                      whileHover={{ scale: 1.2 }}
                      size={{ base: "lg", sm: "md" }}
                    />
                  </FormControl>
                </Stack>
                <VStack mx="auto">
                  <FormControl width="auto" isRequired isInvalid={invalidAd1}>
                    <FormLabel>Address Line 1</FormLabel>
                    <MotionInput
                      value={addressLine1}
                      onChange={ad1ChangeHandler}
                      whileFocus={{ scale: 1.2 }}
                      whileHover={{ scale: 1.2 }}
                      size={{ base: "lg", sm: "md" }}
                      width={{ base: "auto", sm: "470px" }}
                    />
                  </FormControl>
                  <FormControl width="auto">
                    <FormLabel>Address Line 2</FormLabel>
                    <MotionInput
                      value={addressLine2}
                      onChange={ad2ChangeHandler}
                      whileFocus={{ scale: 1.2 }}
                      whileHover={{ scale: 1.2 }}
                      size={{ base: "lg", sm: "md" }}
                      width={{ base: "auto", sm: "470px" }}
                    />
                  </FormControl>
                </VStack>
                <VStack>
                  <Stack direction={{ base: "column", sm: "row" }}>
                    <Link to="/selectProperty">
                      <Button size="lg" variant="outline">
                        Back
                      </Button>
                    </Link>
                    <Button type="submit" size="lg" isDisabled={!isChanged}>
                      Save
                    </Button>
                  </Stack>
                  <Button
                    size="lg"
                    colorScheme="red"
                    variant="solid"
                    onClick={deleteHandler}
                  >
                    Delete
                  </Button>
                </VStack>
              </VStack>
            </form>
          </Box>
        ) : (
          <VStack marginTop="32px" h="80%" w="100%" spacing={8}>
            <Heading size="xl">
              User unauthorized to view this property.
            </Heading>
            <Stack direction={{ base: "column", sm: "row" }}>
              <Link to="/selectProperty">
                <Button variant="outline">Select Property</Button>
              </Link>
              <SignOutButton />
            </Stack>
          </VStack>
        )}
      </AbsoluteCenter>
    </Box>
  );
};

export default Property;
