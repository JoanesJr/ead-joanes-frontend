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
  loggout: () => any;
}

const Context = createContext<IContext>(null);


function AuthProvider({ children }: IAuthProvider) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [id, setId] = useState(null);
    const [authenticated, setAuthenticated] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async (objLogin: IApiLogin, type: string = "comum") => {
        LoginService.Login(objLogin).then( data => {
         setAuthenticated(true);
         setUsername(objLogin.username);
         setPassword(objLogin.password);
         navigate("/cursos");
         navigate(0)
        //  console.log("aqui")
        }).catch( err => {
            setUsername("");
            setPassword("");
            setAuthenticated(false);
            localStorage.removeItem("apiToken");
            localStorage.removeItem("username");
            navigate("/");
        })
        
    };

    const loggout = () => {
      localStorage.removeItem("apiToken");
      localStorage.removeItem("username");
      navigate('/');
    }

  return (
    <Context.Provider
      value={{ username, password, handleLogin, authenticated, loggout }}
    >
      {children}
    </Context.Provider>
  );
}

export { Context, AuthProvider, }