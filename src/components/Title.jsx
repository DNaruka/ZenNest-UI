import { Center, Heading } from "@chakra-ui/react";
import "./Title.scss";

const Title = () => {
  return (
    <Center marginBottom="8px">
      <Heading
        fontFamily="'Bodoni Moda', serif"
        fontWeight={900}
        fontStyle="normal"
        size="4xl"
        bgGradient="linear(to-l, #7928CA, #FF0080)"
        bgClip="text"
      >
        ZenNest
      </Heading>
    </Center>
  );
};

export default Title;
