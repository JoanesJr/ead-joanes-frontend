import { useContext, useState, useEffect } from "react";
import { Context } from "../../contexts";
import { Box } from "@mui/material";
import { isExpired, decodeToken } from "react-jwt";

interface IValideLogin {
  children: JSX.Element;
}

export const ValideLogin = ({ children }: IValideLogin) => {
  const [authenticated, setAuthenticated] = useState(false);
  const [token, setToken] = useState(localStorage.getItem("apiToken"))
  const auth = useContext(Context)

  useEffect(() => {
    const key = localStorage.getItem("apiToken");
    setToken(key);
    auth.validateLogin().then( data => {
        console.log(data);
    }).catch(err => {
        console.log("deu ruim")
    })
  }, [token, localStorage.getItem("apiToken")]);

  return (
    <Box>
        {children}
    </Box>
  );
};