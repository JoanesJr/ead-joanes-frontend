import { useState, useEffect, useContext } from "react";
import { Box } from "@mui/material";
import { LoginPage } from "../../../pages";
import { LoginService, UserService } from "../../services/api";
import { Context } from "../../contexts";
import { LocalStorage } from "../../services/localStorage";

interface IValideLogin {
  children: JSX.Element;
  type?: string;
}

export const ValideLogin = ({ children, type = 'comum' }: IValideLogin) => {
  const [authenticated, setAuthenticated] = useState(false);
  const [token, setToken] = useState(LocalStorage.getItem("JSF_TK_A_U_L"))
  const [username, setUsername] = useState(LocalStorage.getItem("JSF_U_N_I"));
  const [id, setId] = useState();
  const context = useContext(Context);


  useEffect(() => {


    const validateToken = async () => {
      // const token = LocalStorage.getItem("JSF_TK_A_U_L");
      await LoginService.ValidateLogin()
    }

    const getUser = async (data) => {
      const user = await UserService.getByEmail(data);
      // console.log("=====user");
      // console.log(user)
      if (type == 'admin') {
        if (user.id && user.admin) {
          setAuthenticated(true);
          setId(user.id);
        } else {
          setAuthenticated(false);
          LocalStorage.removeItem("JSF_TK_A_U_L");
          LocalStorage.removeItem("JSF_U_N_I");
        }
      } else {
        if (user.id) {
          setAuthenticated(true);
          setId(user.id);
        } else {
          setAuthenticated(false);
          LocalStorage.removeItem("JSF_TK_A_U_L");
          LocalStorage.removeItem("JSF_U_N_I");
        }
      }

      
    }

    const key = LocalStorage.getItem("JSF_TK_A_U_L");
    const usernameControl = LocalStorage.getItem("JSF_U_N_I");
    setToken(key);
    setUsername(usernameControl);
    const obj = {
      email: username
    }


    validateToken();
    getUser(obj);
    

    

    
    
  }, [token, username, id]);

  return (
  <>
  {authenticated ? <Box>{children}</Box> : <LoginPage />}
  </>);
};