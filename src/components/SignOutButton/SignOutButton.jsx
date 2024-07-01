import { Button } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

import Cookies from "universal-cookie";
const cookies = new Cookies();

const SignOutButton = () => {
  const navigate = useNavigate();

  const onClickHandler = () => {
    cookies.remove("TOKEN", { path: "/" });

    navigate("/");
  };

  return (
    <Button variant="outline" colorScheme="red" width="100%" onClick={onClickHandler}>
      Sign Out
    </Button>
  );
};

export default SignOutButton;
