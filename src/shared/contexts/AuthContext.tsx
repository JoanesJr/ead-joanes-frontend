import { createContext, useState } from "react";
import { LoginService } from "../services/api";
import { IApiLogin } from "../services/api/interfaces";
import { Api } from "../services/api/axios-config";
import { useNavigate } from "react-router-dom";

interface IAuthProvider {
    children: React.ReactNode;
}

interface IContext {
  username: string;
  password: string;
  authenticated: boolean;
  handleLogin: any;
  validateLogin;
}

const Context = createContext<IContext>(null);


function AuthProvider({ children }: IAuthProvider) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [id, setId] = useState(null);
    const [authenticated, setAuthenticated] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async (objLogin: IApiLogin) => {
        LoginService.Login(objLogin).then( data => {
         setAuthenticated(true);
         setUsername(objLogin.username);
         setPassword(objLogin.password);
         navigate("/cursos");
        }).catch( err => {
            setUsername("");
            setPassword("");
            setAuthenticated(false);
            localStorage.removeItem("apiToken");
            localStorage.removeItem("username");
        })
        
    };

    const validateLogin = async () => {
        LoginService.ValidateLogin().then( data => {
            console.log("validado");
        }).catch(err => {
            console.log("n validado");
            console.log(err);
        })
    }


  return (
    <Context.Provider
      value={{ username, password, handleLogin, authenticated, validateLogin }}
    >
      {children}
    </Context.Provider>
  );
}

export { Context, AuthProvider }