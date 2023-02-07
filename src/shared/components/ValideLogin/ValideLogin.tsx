import { useState, useEffect } from "react";
import { Box } from "@mui/material";
import { LoginPage } from "../../../pages";
import { UserService } from "../../services/api";

interface IValideLogin {
  children: JSX.Element;
}

export const ValideLogin = ({ children }: IValideLogin) => {
  const [authenticated, setAuthenticated] = useState(false);
  const [token, setToken] = useState(localStorage.getItem("apiToken"))
  const [username, setUsername] = useState(localStorage.getItem("username"));
  const [id, setId] = useState();


  useEffect(() => {

    const getUser = async (data) => {
      const user = await UserService.getByEmail(data);
      // console.log("=====user");
      // console.log(user)
      if (user.id) {
        setAuthenticated(true);
        setId(user.id);
      } else {
        setAuthenticated(false);
        localStorage.removeItem("apiToken");
        localStorage.removeItem("username");
      }
    }

    const key = localStorage.getItem("apiToken");
    const usernameControl = localStorage.getItem("username");
    setToken(key);
    setUsername(usernameControl);
    const obj = {
      email: username
    }


    getUser(obj);

    

    
    
  }, [token, username, id]);

  return (
  <>
  {authenticated ? <Box>{children}</Box> : <LoginPage />}
  </>);
};